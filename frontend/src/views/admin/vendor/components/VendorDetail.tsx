import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_BACK_URL || "";

interface VendorDetails {
  vendor_id: number;
  vendor_service_type: number;
  vendor_category_l3: string;
  vendor_duty_status: number;
  vendor_booking_status: number;
  vendor_wallet: number;
  vendor_profile_pic: string;
  vendor_name: string;
  vendor_mobile: string;
  vendor_email: string;
  vendor_address: string;
  vendor_pincode: string;
  vendor_city_id: number;
  vendor_state_id: number;
  vendor_live_location_lat: string;
  vendor_live_location_long: string;
  vendor_aadhar_front: string;
  vendor_aadhar_back: string;
  vendor_aadhar_no: string;
  vendor_pan_img: string;
  vendor_pan_no: string;
  vendor_account_no: string;
  vendor_account_holder_name: string;
  vendor_account_bank_ifsc: string;
  vendor_account_status: number;
  vendor_status: number;
  vendor_registration_step: number;
  vendor_referal_code: string;
  vendor_company_commission_percentage: number;
  vendor_createdAt: string | number;
  category_level1_name?: string;
  city_name?: string;
  state_name?: string;
}

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Active", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  1: { label: "Inactive", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  2: { label: "Blocked", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-56 shrink-0">{label}</dt>
    <dd className="text-sm text-gray-800 dark:text-gray-200 break-all">{value || <span className="text-gray-400 dark:text-gray-500">—</span>}</dd>
  </div>
);

const VendorDetail: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/vendor/fetch_vendor_details/${vendorId}`);
        const data = res.data;
        if (data?.jsonData?.vendor_details) {
          setVendor(data.jsonData.vendor_details);
        } else {
          setError("Vendor not found.");
        }
      } catch (err) {
        console.error("Failed to fetch vendor details:", err);
        setError("Failed to load vendor details.");
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) fetchDetails();
  }, [vendorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 text-lg">{error || "Something went wrong."}</p>
        <button
          onClick={() => navigate("/admin/vendor")}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Back to Vendor List
        </button>
      </div>
    );
  }

  const status = statusMap[vendor.vendor_status] || { label: "Unknown", color: "bg-gray-100 text-gray-600" };

  return (
    <>
      <PageMeta title={`${vendor.vendor_name || "Vendor"} | Detail`} description="Vendor detail view" />

      <div className="space-y-6">
        {/* Header Card */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => navigate("/admin/vendor")}
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

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 lg:p-6">
            {/* Avatar */}
            <div className="shrink-0">
              {vendor.vendor_profile_pic ? (
                <img
                  src={`${baseURL}${vendor.vendor_profile_pic}`}
                  alt={vendor.vendor_name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg dark:border-gray-700"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-3xl font-bold border-4 border-white shadow-lg dark:border-gray-700">
                  {vendor.vendor_name?.charAt(0)?.toUpperCase() || "V"}
                </div>
              )}
            </div>

            {/* Name + Quick Info */}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {vendor.vendor_name || "Unnamed Vendor"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: #{vendor.vendor_id}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 justify-center sm:justify-start">
                {vendor.vendor_email && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4L8 8.5L14 4M2 12H14V4H2V12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {vendor.vendor_email}
                  </span>
                )}
                {vendor.vendor_mobile && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 2H10.5C11.05 2 11.5 2.45 11.5 3V13C11.5 13.55 11.05 14 10.5 14H5.5C4.95 14 4.5 13.55 4.5 13V3C4.5 2.45 4.95 2 5.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 11.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {vendor.vendor_mobile}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <dl className="space-y-0">
              <InfoRow label="Full Name" value={vendor.vendor_name} />
              <InfoRow label="Email" value={vendor.vendor_email} />
              <InfoRow label="Mobile" value={vendor.vendor_mobile} />
              <InfoRow label="Referral Code" value={
                vendor.vendor_referal_code ? (
                  <span className="inline-flex px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">
                    {vendor.vendor_referal_code}
                  </span>
                ) : null
              } />
              <InfoRow label="Registered At" value={vendor.vendor_createdAt ? formatDate(vendor.vendor_createdAt) : null} />
            </dl>
          </div>

          {/* Address Information */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Address Information</h3>
            <dl className="space-y-0">
              <InfoRow label="Address" value={vendor.vendor_address} />
              <InfoRow label="Pincode" value={vendor.vendor_pincode} />
              <InfoRow label="City" value={vendor.city_name || (vendor.vendor_city_id ? `ID: ${vendor.vendor_city_id}` : null)} />
              <InfoRow label="State" value={vendor.state_name || (vendor.vendor_state_id ? `ID: ${vendor.vendor_state_id}` : null)} />
              <InfoRow label="Latitude" value={vendor.vendor_live_location_lat} />
              <InfoRow label="Longitude" value={vendor.vendor_live_location_long} />
            </dl>
          </div>

          {/* Service & Status */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Service & Status</h3>
            <dl className="space-y-0">
              <InfoRow label="Service Type" value={vendor.category_level1_name || (vendor.vendor_service_type ? `ID: ${vendor.vendor_service_type}` : null)} />
              <InfoRow label="Category L3" value={vendor.vendor_category_l3} />
              <InfoRow label="Duty Status" value={vendor.vendor_duty_status != null ? (vendor.vendor_duty_status === 1 ? "On Duty" : "Off Duty") : null} />
              <InfoRow label="Booking Status" value={vendor.vendor_booking_status != null ? (vendor.vendor_booking_status === 1 ? "Available" : "Unavailable") : null} />
              <InfoRow label="Status" value={
                <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${status.color}`}>
                  {status.label}
                </span>
              } />
              <InfoRow label="Account Status" value={vendor.vendor_account_status != null ? (vendor.vendor_account_status === 0 ? "Verified" : "Unverified") : null} />
              <InfoRow label="Registration Step" value={vendor.vendor_registration_step} />
              <InfoRow label="Commission %" value={vendor.vendor_company_commission_percentage != null ? `${vendor.vendor_company_commission_percentage}%` : null} />
              <InfoRow label="Wallet" value={
                vendor.vendor_wallet != null ? (
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ₹{Number(vendor.vendor_wallet).toFixed(2)}
                  </span>
                ) : null
              } />
            </dl>
          </div>

          {/* KYC & Bank Details */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">KYC & Bank Details</h3>
            <dl className="space-y-0">
              <InfoRow label="Aadhar No" value={vendor.vendor_aadhar_no} />
              <InfoRow label="Aadhar Front" value={
                vendor.vendor_aadhar_front ? (
                  <img src={`${baseURL}${vendor.vendor_aadhar_front}`} alt="Aadhar Front" className="h-20 rounded border object-cover" />
                ) : null
              } />
              <InfoRow label="Aadhar Back" value={
                vendor.vendor_aadhar_back ? (
                  <img src={`${baseURL}${vendor.vendor_aadhar_back}`} alt="Aadhar Back" className="h-20 rounded border object-cover" />
                ) : null
              } />
              <InfoRow label="PAN No" value={vendor.vendor_pan_no} />
              <InfoRow label="PAN Image" value={
                vendor.vendor_pan_img ? (
                  <img src={`${baseURL}${vendor.vendor_pan_img}`} alt="PAN" className="h-20 rounded border object-cover" />
                ) : null
              } />
              <InfoRow label="Account No" value={vendor.vendor_account_no} />
              <InfoRow label="Account Holder" value={vendor.vendor_account_holder_name} />
              <InfoRow label="Bank IFSC" value={vendor.vendor_account_bank_ifsc} />
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDetail;
