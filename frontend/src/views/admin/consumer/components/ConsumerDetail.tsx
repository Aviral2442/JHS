import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface ConsumerDetails {
  consumer_id: number;
  consumer_source: string;
  consumer_wallet_amount: number;
  consumer_full_name: string;
  consumer_mobile: string;
  consumer_email: string;
  consumer_gender: string;
  consumer_profile_pic: string;
  consumer_address: string;
  consumer_state_id: number;
  consumer_city_id: number;
  consumer_zipcode: string;
  consumer_password: string;
  consumer_referral_code: string;
  consumer_referredBy_consumer_id: number;
  consumer_referredBy_consumer_code: string;
  consumer_otp_code: string;
  consumer_registration_steps: number;
  consumer_policy_agree_status: number;
  consumer_status: number;
  consumer_createdAt: string | number;
  state_name?: string;
  city_name?: string;
}

const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Active", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  1: { label: "Inactive", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  2: { label: "Blocked", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
};

const genderMap: Record<string, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
};

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-56 shrink-0">{label}</dt>
    <dd className="text-sm text-gray-800 dark:text-gray-200 break-all">{value || <span className="text-gray-400 dark:text-gray-500">—</span>}</dd>
  </div>
);

const ConsumerDetail: React.FC = () => {
  const { consumerId } = useParams<{ consumerId: string }>();
  const navigate = useNavigate();
  const [consumer, setConsumer] = useState<ConsumerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/consumer/fetch_consumer_details/${consumerId}`);
        const data = res.data;
        if (data?.jsonData?.consumer_details) {
          setConsumer(data.jsonData.consumer_details);
        } else {
          setError("Consumer not found.");
        }
      } catch (err) {
        console.error("Failed to fetch consumer details:", err);
        setError("Failed to load consumer details.");
      } finally {
        setLoading(false);
      }
    };

    if (consumerId) fetchDetails();
  }, [consumerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !consumer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 text-lg">{error || "Something went wrong."}</p>
        <button
          onClick={() => navigate("/admin/consumer")}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Back to Consumer List
        </button>
      </div>
    );
  }

  const status = statusMap[consumer.consumer_status] || { label: "Unknown", color: "bg-gray-100 text-gray-600" };

  return (
    <>
      <PageMeta title={`${consumer.consumer_full_name || "Consumer"} | Detail`} description="Consumer detail view" />

      <div className="space-y-6">
        {/* Header Card */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => navigate("/admin/consumer")}
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
              {consumer.consumer_profile_pic ? (
                <img
                  src={`${baseURL}${consumer.consumer_profile_pic}`}
                  alt={consumer.consumer_full_name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg dark:border-gray-700"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-3xl font-bold border-4 border-white shadow-lg dark:border-gray-700">
                  {consumer.consumer_full_name?.charAt(0)?.toUpperCase() || "C"}
                </div>
              )}
            </div>

            {/* Name + Quick Info */}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {consumer.consumer_full_name || "Unnamed Consumer"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: #{consumer.consumer_id}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 justify-center sm:justify-start">
                {consumer.consumer_email && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4L8 8.5L14 4M2 12H14V4H2V12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {consumer.consumer_email}
                  </span>
                )}
                {consumer.consumer_mobile && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 2H10.5C11.05 2 11.5 2.45 11.5 3V13C11.5 13.55 11.05 14 10.5 14H5.5C4.95 14 4.5 13.55 4.5 13V3C4.5 2.45 4.95 2 5.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 11.5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {consumer.consumer_mobile}
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
              <InfoRow label="Full Name" value={consumer.consumer_full_name} />
              <InfoRow label="Email" value={consumer.consumer_email} />
              <InfoRow label="Mobile" value={consumer.consumer_mobile} />
              <InfoRow
                label="Gender"
                value={consumer.consumer_gender ? (genderMap[consumer.consumer_gender] || consumer.consumer_gender) : null}
              />
              <InfoRow label="Source" value={consumer.consumer_source} />
              <InfoRow
                label="Registered At"
                value={consumer.consumer_createdAt ? formatDate(consumer.consumer_createdAt) : null}
              />
            </dl>
          </div>

          {/* Address Information */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Address Information</h3>
            <dl className="space-y-0">
              <InfoRow label="Address" value={consumer.consumer_address} />
              <InfoRow label="State" value={consumer.state_name || (consumer.consumer_state_id ? `ID: ${consumer.consumer_state_id}` : null)} />
              <InfoRow label="City" value={consumer.city_name || (consumer.consumer_city_id ? `ID: ${consumer.consumer_city_id}` : null)} />
              <InfoRow label="Zipcode" value={consumer.consumer_zipcode} />
            </dl>
          </div>

          {/* Wallet & Referral */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Wallet & Referral</h3>
            <dl className="space-y-0">
              <InfoRow
                label="Wallet Amount"
                value={
                  consumer.consumer_wallet_amount != null ? (
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ₹{Number(consumer.consumer_wallet_amount).toFixed(2)}
                    </span>
                  ) : null
                }
              />
              <InfoRow label="Referral Code" value={
                consumer.consumer_referral_code ? (
                  <span className="inline-flex px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">
                    {consumer.consumer_referral_code}
                  </span>
                ) : null
              } />
              <InfoRow label="Referred By (Consumer ID)" value={consumer.consumer_referredBy_consumer_id || null} />
              <InfoRow label="Referred By (Code)" value={consumer.consumer_referredBy_consumer_code} />
            </dl>
          </div>

          {/* Account & Security */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 lg:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Account & Security</h3>
            <dl className="space-y-0">
              <InfoRow
                label="Status"
                value={
                  <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                }
              />
              <InfoRow label="OTP Code" value={consumer.consumer_otp_code} />
              <InfoRow label="Registration Steps" value={consumer.consumer_registration_steps} />
              <InfoRow
                label="Policy Agreement"
                value={
                  consumer.consumer_policy_agree_status != null ? (
                    consumer.consumer_policy_agree_status === 1 ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Agreed
                      </span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400">Not Agreed</span>
                    )
                  ) : null
                }
              />
              <InfoRow
                label="Password"
                value={
                  consumer.consumer_password ? (
                    <span className="text-gray-400 dark:text-gray-500 tracking-widest">••••••••</span>
                  ) : null
                }
              />
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsumerDetail;
