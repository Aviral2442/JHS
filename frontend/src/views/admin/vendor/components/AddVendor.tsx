import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface VendorForm {
  vendor_service_type: string;
  vendor_category_l3: string;
  vendor_duty_status: string;
  vendor_booking_status: string;
  vendor_wallet: string;
  vendor_profile_pic: string;
  vendor_name: string;
  vendor_mobile: string;
  vendor_email: string;
  vendor_address: string;
  vendor_pincode: string;
  vendor_city_id: string;
  vendor_state_id: string;
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
  vendor_company_commission_percentage: string;
}

const initialForm: VendorForm = {
  vendor_service_type: "",
  vendor_category_l3: "",
  vendor_duty_status: "1",
  vendor_booking_status: "1",
  vendor_wallet: "0",
  vendor_profile_pic: "",
  vendor_name: "",
  vendor_mobile: "",
  vendor_email: "",
  vendor_address: "",
  vendor_pincode: "",
  vendor_city_id: "",
  vendor_state_id: "",
  vendor_live_location_lat: "",
  vendor_live_location_long: "",
  vendor_aadhar_front: "",
  vendor_aadhar_back: "",
  vendor_aadhar_no: "",
  vendor_pan_img: "",
  vendor_pan_no: "",
  vendor_account_no: "",
  vendor_account_holder_name: "",
  vendor_account_bank_ifsc: "",
  vendor_company_commission_percentage: "",
};

const AddVendor: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const isEditMode = !!vendorId;

  const [form, setForm] = useState<VendorForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Preview states for file uploads
  const [profilePreview, setProfilePreview] = useState("");
  const [aadharFrontPreview, setAadharFrontPreview] = useState("");
  const [aadharBackPreview, setAadharBackPreview] = useState("");
  const [panPreview, setPanPreview] = useState("");

  // Fetch existing vendor data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchVendor = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`${baseURL}/api/vendor/fetch_vendor_details/${vendorId}`);
        const data = res.data;
        if (data?.jsonData?.vendor_details) {
          const v = data.jsonData.vendor_details;
          setForm({
            vendor_service_type: v.vendor_service_type?.toString() || "",
            vendor_category_l3: v.vendor_category_l3?.toString() || "",
            vendor_duty_status: v.vendor_duty_status?.toString() || "1",
            vendor_booking_status: v.vendor_booking_status?.toString() || "1",
            vendor_wallet: v.vendor_wallet?.toString() || "0",
            vendor_profile_pic: "",
            vendor_name: v.vendor_name || "",
            vendor_mobile: v.vendor_mobile || "",
            vendor_email: v.vendor_email || "",
            vendor_address: v.vendor_address || "",
            vendor_pincode: v.vendor_pincode || "",
            vendor_city_id: v.vendor_city_id?.toString() || "",
            vendor_state_id: v.vendor_state_id?.toString() || "",
            vendor_live_location_lat: v.vendor_live_location_lat || "",
            vendor_live_location_long: v.vendor_live_location_long || "",
            vendor_aadhar_front: "",
            vendor_aadhar_back: "",
            vendor_aadhar_no: v.vendor_aadhar_no || "",
            vendor_pan_img: "",
            vendor_pan_no: v.vendor_pan_no || "",
            vendor_account_no: v.vendor_account_no || "",
            vendor_account_holder_name: v.vendor_account_holder_name || "",
            vendor_account_bank_ifsc: v.vendor_account_bank_ifsc || "",
            vendor_company_commission_percentage: v.vendor_company_commission_percentage?.toString() || "",
          });
          if (v.vendor_profile_pic) setProfilePreview(`${baseURL}${v.vendor_profile_pic}`);
          if (v.vendor_aadhar_front) setAadharFrontPreview(`${baseURL}${v.vendor_aadhar_front}`);
          if (v.vendor_aadhar_back) setAadharBackPreview(`${baseURL}${v.vendor_aadhar_back}`);
          if (v.vendor_pan_img) setPanPreview(`${baseURL}${v.vendor_pan_img}`);
        }
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchVendor();
  }, [isEditMode, vendorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof VendorForm, setPreview: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, [field]: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.vendor_name.trim()) newErrors.vendor_name = "Name is required.";
    if (!form.vendor_mobile.trim()) newErrors.vendor_mobile = "Mobile is required.";
    if (!form.vendor_email.trim()) newErrors.vendor_email = "Email is required.";
    if (!form.vendor_service_type) newErrors.vendor_service_type = "Service type is required.";
    if (!form.vendor_address.trim()) newErrors.vendor_address = "Address is required.";
    if (!form.vendor_pincode.trim()) newErrors.vendor_pincode = "Pincode is required.";
    if (!form.vendor_city_id) newErrors.vendor_city_id = "City is required.";
    if (!form.vendor_state_id) newErrors.vendor_state_id = "State is required.";

    if (!isEditMode) {
      if (!form.vendor_profile_pic) newErrors.vendor_profile_pic = "Profile picture is required.";
      if (!form.vendor_aadhar_front) newErrors.vendor_aadhar_front = "Aadhar front is required.";
      if (!form.vendor_aadhar_back) newErrors.vendor_aadhar_back = "Aadhar back is required.";
      if (!form.vendor_pan_img) newErrors.vendor_pan_img = "PAN image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (isEditMode) {
        const res = await axios.put(`${baseURL}/api/vendor/update_vendor_details/${vendorId}`, form);
        if (res.data?.status === 200) {
          navigate("/admin/vendor");
        } else {
          alert(res.data?.message || "Failed to update vendor.");
        }
      } else {
        const res = await axios.post(`${baseURL}/api/vendor/add_vendor_details`, form);
        if (res.data?.status === 200) {
          navigate("/admin/vendor");
        } else {
          alert(res.data?.message || "Failed to add vendor.");
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={isEditMode ? "Edit Vendor | Admin" : "Add Vendor | Admin"}
        description={isEditMode ? "Edit vendor details" : "Add a new vendor"}
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Vendor" : "Add Vendor"}
          </h3>
          <button
            onClick={() => navigate("/admin/vendor")}
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 lg:p-6 space-y-8">
          {/* Personal Information */}
          <fieldset>
            <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">Personal Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Name *" name="vendor_name" value={form.vendor_name} onChange={handleChange} error={errors.vendor_name} />
              <InputField label="Email *" name="vendor_email" type="email" value={form.vendor_email} onChange={handleChange} error={errors.vendor_email} />
              <InputField label="Mobile *" name="vendor_mobile" value={form.vendor_mobile} onChange={handleChange} error={errors.vendor_mobile} />
              <InputField label="Commission %" name="vendor_company_commission_percentage" type="number" value={form.vendor_company_commission_percentage} onChange={handleChange} error={errors.vendor_company_commission_percentage} />
            </div>
          </fieldset>

          {/* Service Information */}
          <fieldset>
            <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">Service Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Service Type (Category L1 ID) *" name="vendor_service_type" value={form.vendor_service_type} onChange={handleChange} error={errors.vendor_service_type} />
              <InputField label="Category L3" name="vendor_category_l3" value={form.vendor_category_l3} onChange={handleChange} error={errors.vendor_category_l3} />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Duty Status</label>
                <select name="vendor_duty_status" value={form.vendor_duty_status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none">
                  <option value="1">On Duty</option>
                  <option value="0">Off Duty</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Booking Status</label>
                <select name="vendor_booking_status" value={form.vendor_booking_status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none">
                  <option value="1">Available</option>
                  <option value="0">Unavailable</option>
                </select>
              </div>
              <InputField label="Wallet Amount" name="vendor_wallet" type="number" value={form.vendor_wallet} onChange={handleChange} error={errors.vendor_wallet} />
            </div>
          </fieldset>

          {/* Address Information */}
          <fieldset>
            <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">Address Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
                <textarea name="vendor_address" value={form.vendor_address} onChange={handleChange} rows={3} className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none" />
                {errors.vendor_address && <p className="mt-1 text-xs text-red-500">{errors.vendor_address}</p>}
              </div>
              <InputField label="Pincode *" name="vendor_pincode" value={form.vendor_pincode} onChange={handleChange} error={errors.vendor_pincode} />
              <InputField label="City ID *" name="vendor_city_id" value={form.vendor_city_id} onChange={handleChange} error={errors.vendor_city_id} />
              <InputField label="State ID *" name="vendor_state_id" value={form.vendor_state_id} onChange={handleChange} error={errors.vendor_state_id} />
              <InputField label="Latitude" name="vendor_live_location_lat" value={form.vendor_live_location_lat} onChange={handleChange} error={errors.vendor_live_location_lat} />
              <InputField label="Longitude" name="vendor_live_location_long" value={form.vendor_live_location_long} onChange={handleChange} error={errors.vendor_live_location_long} />
            </div>
          </fieldset>

          {/* KYC Documents */}
          <fieldset>
            <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">KYC Documents</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Aadhar No" name="vendor_aadhar_no" value={form.vendor_aadhar_no} onChange={handleChange} error={errors.vendor_aadhar_no} />
              <InputField label="PAN No" name="vendor_pan_no" value={form.vendor_pan_no} onChange={handleChange} error={errors.vendor_pan_no} />

              <FileInput label={`Profile Picture ${isEditMode ? "" : "*"}`} error={errors.vendor_profile_pic} preview={profilePreview} onChange={(e) => handleFileChange(e, "vendor_profile_pic", setProfilePreview)} />
              <FileInput label={`Aadhar Front ${isEditMode ? "" : "*"}`} error={errors.vendor_aadhar_front} preview={aadharFrontPreview} onChange={(e) => handleFileChange(e, "vendor_aadhar_front", setAadharFrontPreview)} />
              <FileInput label={`Aadhar Back ${isEditMode ? "" : "*"}`} error={errors.vendor_aadhar_back} preview={aadharBackPreview} onChange={(e) => handleFileChange(e, "vendor_aadhar_back", setAadharBackPreview)} />
              <FileInput label={`PAN Image ${isEditMode ? "" : "*"}`} error={errors.vendor_pan_img} preview={panPreview} onChange={(e) => handleFileChange(e, "vendor_pan_img", setPanPreview)} />
            </div>
          </fieldset>

          {/* Bank Details */}
          <fieldset>
            <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">Bank Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Account No" name="vendor_account_no" value={form.vendor_account_no} onChange={handleChange} error={errors.vendor_account_no} />
              <InputField label="Account Holder Name" name="vendor_account_holder_name" value={form.vendor_account_holder_name} onChange={handleChange} error={errors.vendor_account_holder_name} />
              <InputField label="Bank IFSC" name="vendor_account_bank_ifsc" value={form.vendor_account_bank_ifsc} onChange={handleChange} error={errors.vendor_account_bank_ifsc} />
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/vendor")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : isEditMode ? "Update Vendor" : "Add Vendor"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

/* ---- Reusable Input Field ---- */
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}> = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
        dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

/* ---- Reusable File Input ---- */
const FileInput: React.FC<{
  label: string;
  error?: string;
  preview: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, error, preview, onChange }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50
        file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100
        dark:text-gray-400 dark:file:bg-brand-900/20 dark:file:text-brand-400"
    />
    {preview && (
      <img src={preview} alt="Preview" className="mt-2 h-20 rounded border object-cover" />
    )}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default AddVendor;
