import dbConfig from "../../config/db_Config";
import { buildFilters } from "../../utils/filters";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";


// GET BOOKING LIST SERVICE
export const getBookingListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {
    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
        const offset = (page - 1) * limit;
        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "booking.booking_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                enquiry: "booking.booking_status = 0",
                confirm: "booking.booking_status = 1",
                vendorAssigned: "booking.booking_status = 2",
                ongoing: "booking.booking_status = 3",
                complete: "booking.booking_status = 4",
                cancel: "booking.booking_status = 5",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL += ` WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchConditon = `booking.booking_city_name LIKE ? OR booking.booking_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchConditon})`;
            } else {
                finalWhereSQL += ` WHERE ${searchConditon}`;
            }
            params.push(searchTerm, searchTerm, searchTerm);
        }

        const isDateFilerApplied = filters?.date || (filters?.fromDate && filters?.toDate);
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFilterApplied = !isDateFilerApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        if (noFilterApplied) {
            effectiveLimit = limit;
            effectiveOffset = (page - 1) * limit;
        }

        const query = `
            SELECT 
                booking.booking_id,
                category_level_1.category_level1_name,
                category_level_3.category_level3_name,
                booking.booking_city_name,
                consumer.consumer_full_name,
                booking.booking_consumer_id,
                consumer.consumer_mobile,
                booking.booking_address,
                booking.booking_city_name,
                booking.booking_state_name,
                booking.booking_status,
                booking.booking_schedule_time,
                booking.booking_createdAt
            FROM booking
            LEFT JOIN category_level_1 ON category_level_1.category_level1_id = booking.booking_service_type
            LEFT JOIN category_level_3 ON category_level_3.category_level3_id = booking.booking_category_l3
            LEFT JOIN consumer ON consumer.consumer_id = booking.booking_consumer_id
            ${finalWhereSQL}
            ORDER BY booking.booking_createdAt DESC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFilterApplied) {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM booking`);
            const acturalTotal = countAllRows[0]?.total || 0;

            if (acturalTotal < 100) {
                total = acturalTotal;
            } else {
                total = 100;
            }
        } else {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM booking ${finalWhereSQL}`, params);
            total = countAllRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Booking list fetched successfully.",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                booking_list: rows,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while fetching the booking list.",
            jsonData: {},
        }
    }
};

// FETCH BOOKING DETAILS SERVICE
export const fetchBookingDetailsService = async (bookingId: number) => {
    try {
        const [results]: any = await dbConfig.query(`
            SELECT 
                booking.*, 
                consumer.consumer_full_name,
                consumer.consumer_mobile,
                category_level_1.category_level1_name,
                category_level_3.category_level3_name
            FROM booking
            LEFT JOIN consumer ON consumer.consumer_id = booking.booking_consumer_id
            LEFT JOIN category_level_1 ON category_level_1.category_level1_id = booking.booking_service_type
            LEFT JOIN category_level_3 ON category_level_3.category_level3_id = booking.booking_category_l3
            WHERE booking.booking_id = ?
        `, [bookingId]);

        if (results.length === 0) {
            return {
                status: 404,
                message: "Booking not found.",
                jsonData: {},
            }
        }

        const bookingDetails = results[0];

        return {
            status: 200,
            message: "Booking details fetched successfully.",
            jsonData: {
                booking_details: bookingDetails,
            },
        }


    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while fetching the booking details.",
            jsonData: {},
        }
    }
};

// ADD BOOKING DETAILS SERVICE
export const addBookingDetailsService = async (data: any) => {
    try {

        const insertData = {
            booking_service_type: data.booking_service_type,
            booking_category_l3: data.booking_category_l3,
            booking_consumer_id: data.booking_consumer_id,
            booking_address: data.booking_address,
            booking_city_name: data.booking_city_name,
            booking_state_name: data.booking_state_name,
            booking_pincode: data.booking_pincode,
            booking_lat: data.booking_lat,
            booking_long: data.booking_long,
            booking_otp: data.booking_otp,
            booking_otp_status: 1,
            booking_assigned_vendor_id: data.booking_assigned_vendor_id,
            booking_schedule_time: data.booking_schedule_time,
            booking_status: 0,
            booking_createdAt: currentUnixTimeStamp(),
        };


        const generateOtp = Math.floor(1000 + Math.random() * 9000);

        insertData.booking_otp = generateOtp;

        const [result]: any = await dbConfig.query(
            `INSERT INTO booking SET ?`,
            [insertData]
        )

        return {
            status: 200,
            message: "Booking details added successfully.",
            jsonData: {
                booking_id: result.insertId,
            },
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while adding the booking details.",
            jsonData: {},
        }
    }
};

// UPDATE BOOKING DETAILS SERVICE
export const updateBookingDetailsService = async (bookingId: number, data: any) => {
    try {
        const updateData: any = {};

        if (data.booking_service_type) updateData.booking_service_type = data.booking_service_type;
        if (data.booking_category_l3) updateData.booking_category_l3 = data.booking_category_l3;
        if (data.booking_consumer_id) updateData.booking_consumer_id = data.booking_consumer_id;
        if (data.booking_address) updateData.booking_address = data.booking_address;
        if (data.booking_city_name) updateData.booking_city_name = data.booking_city_name;
        if (data.booking_state_name) updateData.booking_state_name = data.booking_state_name;
        if (data.booking_pincode) updateData.booking_pincode = data.booking_pincode;
        if (data.booking_lat) updateData.booking_lat = data.booking_lat;
        if (data.booking_long) updateData.booking_long = data.booking_long;
        if (data.booking_assigned_vendor_id) updateData.booking_assigned_vendor_id = data.booking_assigned_vendor_id;
        if (data.bookings_schedule_time) updateData.bookings_schedule_time = data.bookings_schedule_time;

        const [result]: any = await dbConfig.query(
            `UPDATE booking SET ? WHERE booking_id = ?`,
            [updateData, bookingId]
        );

        if (result.affectedRows === 0) {
            return {
                status: 404,
                message: "Booking not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Booking details updated successfully.",
            jsonData: {
                booking_id: bookingId,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while updating the booking details.",
            jsonData: {},
        };
    }
};
