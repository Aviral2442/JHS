import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_BACK_URL || "";

interface BookingDetails {
  booking_id: number;
  booking_service_type: number;
  booking_category_l3: number;
  booking_consumer_id: number;
  booking_address: string;
  booking_city_name: string;
  booking_state_name: string;
  booking_pincode: string;
  booking_lat: string;
  booking_long: string;
  booking_otp: number;
  booking_otp_status: number;
  booking_assigned_vendor_id: number;
  booking_schedule_time: string | number;
  booking_status: number;
  booking_createdAt: string | number;
  consumer_full_name?: string;
  consumer_mobile?: string;
  category_level1_name?: string;
  category_level3_name?: string;
}

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Enquiry", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  1: { label: "Confirm", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  2: { label: "Vendor Assigned", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  3: { label: "Ongoing", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  4: { label: "Complete", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  5: { label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-56 shrink-0">{label}</dt>
    <dd className="text-sm text-gray-800 dark:text-gray-200 break-all">{value || <span className="text-gray-400 dark:text-gray-500">—</span>}</dd>
  </div>
);

const BookingDetail: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/booking/fetch_booking_details/${bookingId}`);
        const data = res.data;
        if (data?.jsonData?.booking_details) {
          setBooking(data.jsonData.booking_details);
        } else {
          setError("Booking not found.");
        }
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 text-lg">{error || "Something went wrong."}</p>
        <button
          onClick={() => navigate("/admin/booking")}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Back to Booking List
        </button>
      </div>
    );
  }

  const status = statusMap[booking.booking_status] || { label: "Unknown", color: "bg-gray-100 text-gray-600" };

  return (
    <>
      <PageMeta title={`Booking #${booking.booking_id} | Detail`} description="Booking detail view" />

      <div className="space-y-6">
        {/* Header Card */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => navigate("/admin/booking")}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to List
            </button>
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Booking Header */}
          <div className="p-5 lg:p-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Booking #{booking.booking_id}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {booking.consumer_full_name && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C9.66 8 11 6.66 11 5C11 3.34 9.66 2 8 2C6.34 2 5 3.34 5 5C5 6.66 6.34 8 8 8ZM8 9.5C5.33 9.5 0 10.84 0 13.5V14H16V13.5C16 10.84 10.67 9.5 8 9.5Z" fill="currentColor" />
                    </svg>
                    {booking.consumer_full_name}
                  </span>
                )}
                {booking.consumer_mobile && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 2H10.5C11.05 2 11.5 2.45 11.5 3V13C11.5 13.55 11.05 14 10.5 14H5.5C4.95 14 4.5 13.55 4.5 13V3C4.5 2.45 4.95 2 5.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 11.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {booking.consumer_mobile}
                  </span>
                )}
                {booking.booking_createdAt && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Created: {formatDate(booking.booking_createdAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Information */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Service Information</h3>
            <dl className="space-y-0">
              <InfoRow label="Service Type" value={booking.category_level1_name || (booking.booking_service_type ? `ID: ${booking.booking_service_type}` : null)} />
              <InfoRow label="Category L3" value={booking.category_level3_name || (booking.booking_category_l3 ? `ID: ${booking.booking_category_l3}` : null)} />
              <InfoRow label="Consumer" value={booking.consumer_full_name || (booking.booking_consumer_id ? `ID: ${booking.booking_consumer_id}` : null)} />
              <InfoRow label="Consumer Mobile" value={booking.consumer_mobile} />
              <InfoRow label="Assigned Vendor ID" value={booking.booking_assigned_vendor_id || null} />
              <InfoRow label="Schedule Time" value={booking.booking_schedule_time ? formatDate(booking.booking_schedule_time) : null} />
            </dl>
          </div>

          {/* Address Information */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Address Information</h3>
            <dl className="space-y-0">
              <InfoRow label="Address" value={booking.booking_address} />
              <InfoRow label="City" value={booking.booking_city_name} />
              <InfoRow label="State" value={booking.booking_state_name} />
              <InfoRow label="Pincode" value={booking.booking_pincode} />
              <InfoRow label="Latitude" value={booking.booking_lat} />
              <InfoRow label="Longitude" value={booking.booking_long} />
            </dl>
          </div>

          {/* Status & OTP */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Status & Verification</h3>
            <dl className="space-y-0">
              <InfoRow label="Status" value={
                <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${status.color}`}>
                  {status.label}
                </span>
              } />
              <InfoRow label="OTP" value={booking.booking_otp} />
              <InfoRow label="OTP Status" value={
                booking.booking_otp_status != null ? (
                  booking.booking_otp_status === 1 ? (
                    <span className="text-green-600 dark:text-green-400">Pending</span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">Verified</span>
                  )
                ) : null
              } />
              <InfoRow label="Created At" value={booking.booking_createdAt ? formatDate(booking.booking_createdAt) : null} />
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
