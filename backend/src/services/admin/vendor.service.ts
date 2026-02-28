import dbConfig from "../../config/db_Config";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { buildFilters } from "../../utils/filters";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";

// GET VENDOR LIST SERVICE
export const getVendorListService = async (filters?: {
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
            dateColumn: "vendor.vendor_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "vendor.vendor_status = 0",
                inactive: "vendor.vendor_status = 1",
                blocked: "vendor.vendor_status = 2",
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
            const searchConditon = `vendor.vendor_name LIKE ? OR vendor.vendor_mobile LIKE ? OR vendor.vendor_id LIKE ?`;
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
                vendor.vendor_id,
                vendor.vendor_name,
                vendor.vendor_email,
                vendor.vendor_mobile,
                vendor.vendor_status,
                vendor.vendor_createdAt,
                category_level_1.category_level1_name,
                city.city_name
            FROM vendor
            LEFT JOIN category_level_1 ON category_level_1.category_level1_id = vendor.vendor_service_type
            LEFT JOIN city ON city.city_id = vendor.vendor_city_id
            ${finalWhereSQL}
            ORDER BY vendor.vendor_createdAt DESC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFilterApplied) {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM vendor`);
            const acturalTotal = countAllRows[0]?.total || 0;

            if (acturalTotal < 100) {
                total = acturalTotal;
            } else {
                total = 100;
            }
        } else {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM vendor ${finalWhereSQL}`, params);
            total = countAllRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Vendor list fetched successfully.",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                vendor_list: rows,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while fetching the vendor list.",
            jsonData: {},
        }
    }
};

// FETCH VENDOR DETAILS SERVICE
export const fetchVendorDetailsService = async (vendorId: string) => {
    try {
        const [results]: any = await dbConfig.query(
            `SELECT *
            FROM vendor
            WHERE vendor.vendor_id = ?`,
            [vendorId]
        );

        if (results.length === 0) {
            return {
                status: 404,
                message: "Vendor not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Vendor details fetched successfully.",
            jsonData: {
                vendor_details: results[0],
            },
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while fetching the vendor details.",
            jsonData: {},
        }
    }
};

// ADD VENDOR DETAIL SERVICE
export const addVendorDetailsService = async (Data: any) => {
    try {
        const insertData = {
            vendor_service_type: Data.vendor_service_type,
            vendor_category_l3: Data.vendor_category_l3,
            vendor_duty_status: Data.vendor_duty_status,
            vendor_booking_status: Data.vendor_booking_status,
            vendor_wallet: Data.vendor_wallet,
            vendor_profile_pic: "",
            vendor_name: Data.vendor_name,
            vendor_mobile: Data.vendor_mobile,
            vendor_email: Data.vendor_email,
            vendor_address: Data.vendor_address,
            vendor_pincode: Data.vendor_pincode,
            vendor_city_id: Data.vendor_city_id,
            vendor_state_id: Data.vendor_state_id,
            vendor_live_location_lat: Data.vendor_live_location_lat,
            vendor_live_location_long: Data.vendor_live_location_long,
            vendor_aadhar_front: "",
            vendor_aadhar_back: "",
            vendor_aadhar_no: Data.vendor_aadhar_no,
            vendor_pan_img: "",
            vendor_pan_no: Data.vendor_pan_no,
            vendor_account_no: Data.vendor_account_no,
            vendor_account_holder_name: Data.vendor_account_holder_name,
            vendor_account_bank_ifsc: Data.vendor_account_bank_ifsc,
            vendor_account_status: 1,
            vendor_status: 1,
            vendor_registration_step: 1,
            vendor_referal_code: "",
            vendor_company_commission_percentage: Data.vendor_company_commission_percentage,
            vendor_createdAt: currentUnixTimeStamp(),
        }

        const vendor_profile = await saveBase64File(
            Data.vendor_profile_pic,
            "vendor",
            "profile",
        )
        insertData.vendor_profile_pic = vendor_profile;

        const vendor_aadhar_front = await saveBase64File(
            Data.vendor_aadhar_front,
            "vendor",
            "aadhar_front",
        )
        insertData.vendor_aadhar_front = vendor_aadhar_front;

        const vendor_aadhar_back = await saveBase64File(
            Data.vendor_aadhar_back,
            "vendor",
            "aadhar_back",
        )
        insertData.vendor_aadhar_back = vendor_aadhar_back;

        const vendor_pan_img = await saveBase64File(
            Data.vendor_pan_img,
            "vendor",
            "pan",
        )
        insertData.vendor_pan_img = vendor_pan_img;

        const [result]: any = await dbConfig.query(
            `INSERT INTO vendor SET ?`,
            [insertData]
        );

        const randomString = "JHS" + insertData.vendor_name.replace(/\s/g, '').substring(0, 3).toUpperCase() + result.insertId;
        await dbConfig.query(
            `UPDATE vendor SET vendor_referal_code = ? WHERE vendor_id = ?`,
            [randomString, result.insertId]
        );

        return {
            status: 200,
            message: "Vendor added successfully.",
            jsonData: {}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while adding the vendor.",
            jsonData: {},
        }
    }
}

// UPDATE VENDOR DETAIL SERVICE
export const updateVendorDetailsService = async (vendorId: number, Data: any) => {
    try {
        const updateData: any = {};

        if (Data.vendor_service_type) updateData.vendor_service_type = Data.vendor_service_type;
        if (Data.vendor_category_l3) updateData.vendor_category_l3 = Data.vendor_category_l3;
        if (Data.vendor_duty_status) updateData.vendor_duty_status = Data.vendor_duty_status;
        if (Data.vendor_booking_status) updateData.vendor_booking_status = Data.vendor_booking_status;
        if (Data.vendor_wallet) updateData.vendor_wallet = Data.vendor_wallet;
        if (Data.vendor_name) updateData.vendor_name = Data.vendor_name;
        if (Data.vendor_mobile) updateData.vendor_mobile = Data.vendor_mobile;
        if (Data.vendor_email) updateData.vendor_email = Data.vendor_email;
        if (Data.vendor_address) updateData.vendor_address = Data.vendor_address;
        if (Data.vendor_pincode) updateData.vendor_pincode = Data.vendor_pincode;
        if (Data.vendor_city_id) updateData.vendor_city_id = Data.vendor_city_id;
        if (Data.vendor_state_id) updateData.vendor_state_id = Data.vendor_state_id
        if (Data.vendor_live_location_lat) updateData.vendor_live_location_lat = Data.vendor_live_location_lat;
        if (Data.vendor_live_location_long) updateData.vendor_live_location_long = Data.vendor_live_location_long;
        if (Data.vendor_aadhar_no) updateData.vendor_aadhar_no = Data.vendor_aadhar_no;
        if (Data.vendor_pan_no) updateData.vendor_pan_no = Data.vendor_pan_no;
        if (Data.vendor_account_no) updateData.vendor_account_no = Data.vendor_account_no;
        if (Data.vendor_account_holder_name) updateData.vendor_account_holder_name = Data.vendor_account_holder_name;
        if (Data.vendor_account_bank_ifsc) updateData.vendor_account_bank_ifsc = Data.vendor_account_bank_ifsc;
        if (Data.vendor_company_commission_percentage) updateData.vendor_company_commission_percentage = Data.vendor_company_commission_percentage;

        if (Data.vendor_profile_pic) {
            const vendor_profile = await saveBase64File(
                Data.vendor_profile_pic,
                "vendor",
                "profile",
            )
            updateData.vendor_profile_pic = vendor_profile;
        }

        if (Data.vendor_aadhar_front) {
            const vendor_aadhar_front = await saveBase64File(
                Data.vendor_aadhar_front,
                "vendor",
                "aadhar_front",
            )
            updateData.vendor_aadhar_front = vendor_aadhar_front;
        }

        if (Data.vendor_aadhar_back) {
            const vendor_aadhar_back = await saveBase64File(
                Data.vendor_aadhar_back,
                "vendor",
                "aadhar_back",
            )
            updateData.vendor_aadhar_back = vendor_aadhar_back;
        }

        if (Data.vendor_pan_img) {
            const vendor_pan_img = await saveBase64File(
                Data.vendor_pan_img,
                "vendor",
                "pan",
            )
            updateData.vendor_pan_img = vendor_pan_img;
        }

        const [result]: any = await dbConfig.query(
            `UPDATE vendor SET ? WHERE vendor_id = ?`,
            [updateData, vendorId]
        );

        return {
            status: 200,
            message: "Vendor details updated successfully.",
            jsonData: result
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while updating the vendor details.",
            jsonData: {},
        }
    }
};

// VENDOR VERIFY STATUS SERVICE
export const vendorVerifyStatusService = async (vendorId: Number) => {
    try {
        const [results]: any = await dbConfig.query(
            `UPDATE vendor 
            SET vendor_status = 0,
            vendor_account_status = 0 
            WHERE vendor_id = ?`,
            [vendorId]
        )

        return {
            status: 200,
            message: "Vendor Verified Successfully!",
            jsonData: {}
        }
    } catch (error) {
        console.error(error)
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// VENDOR BLOCK STATUS SERVICE
export const vendorBlockStatusService = async (vendorId: Number) => {
    try {
        const [results]: any = await dbConfig.query(
            `UPDATE vendor 
            SET vendor_status = 2,
            vendor_account_status = 1
            WHERE vendor_id = ?`,
            [vendorId]
        )
        return {
            status: 200,
            message: "Vendor Blocked Successfully!",
            jsonData: {}
        }
    } catch (error) {
        console.error(error)
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// SEARCH VENDOR SERVICE
export const searchVendorService = async (searchTerm: string) => {
    try {
        const likeSearchTerm = `%${searchTerm}%`;

        const [rows]: any = await dbConfig.query(
            `SELECT 
                vendor.vendor_id,
                vendor.vendor_name,
                vendor.vendor_mobile,
                vendor.vendor_status
            FROM vendor
            WHERE vendor.vendor_mobile LIKE ?
            ORDER BY vendor.vendor_createdAt DESC`,
            [likeSearchTerm]
        );

        return {
            status: 200,
            message: "Vendor search completed successfully.",
            jsonData: {
                vendor_list: rows,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while searching for vendors.",
            jsonData: {},
        }
    }
};