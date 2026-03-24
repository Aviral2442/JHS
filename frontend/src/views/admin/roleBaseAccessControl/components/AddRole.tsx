import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface roleData {
  role_name: string;
  role_description: string;
  role_status: number | string;
}

const initialForm: roleData = {
  role_name: "",
  role_description: "",
  role_status: "",
};

const AddVendor: React.FC = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const isEditMode = !!roleId;

  const [form, setForm] = useState<roleData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Fetch existing vendor data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchVendor = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/role-base-access-control/role_data_fetch/${roleId}`,
        );
        const data = res.data;
        // console.log("Fetched role data:", data);
        if (data?.jsonData?.role_details) {
          const v = data.jsonData.role_details;
          setForm({
            role_name: v.role_name || "",
            role_description: v.role_description || "",
            role_status: v.role_status !== undefined ? v.role_status : "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch role:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchVendor();
  }, [isEditMode, roleId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.role_name.trim()) newErrors.role_name = "Role name is required.";
    if (!form.role_description.trim())
      newErrors.role_description = "Role description is required.";
    if (form.role_status === "") newErrors.role_status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        console.log("Submitting form:", form);
      setLoading(true);
      if (isEditMode) {
        const res = await axios.put(
          `${baseURL}/api/role-base-access-control/update_role/${roleId}`,
          form,
        );
        if (res.data?.status === 200) {
          navigate("/admin/roles");
        } else {
          alert(res.data?.message || "Failed to update role.");
        }
      } else {
        const res = await axios.post(
          `${baseURL}/api/role-base-access-control/add_role`,
          form,
        );
        if (res.data?.status === 200) {
          navigate("/admin/roles");
        } else {
          alert(res.data?.message || "Failed to add role.");
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
        title={isEditMode ? "Edit Role | Admin" : "Add Role | Admin"}
        description={isEditMode ? "Edit role details" : "Add a new role"}
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Role" : "Add Role"}
          </h3>
          <button
            onClick={() => navigate("/admin/roles")}
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 lg:p-6 space-y-8">
          <fieldset>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputField
                label="Name *"
                name="role_name"
                value={form.role_name}
                onChange={handleChange}
                error={errors.role_name}
                placeholder="Enter role name"
              />
              <InputField
                label="Description *"
                name="role_description"
                value={form.role_description}
                onChange={handleChange}
                error={errors.role_description}
                placeholder="Enter role description"
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status *
                </label>
                <select
                  name="role_status"
                  value={form.role_status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
                                dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="0">Active</option>
                  <option value="1">Inactive</option>
                </select>
                {errors.role_status && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.role_status}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/roles")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : isEditMode ? "Update Role" : "Add Role"}
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
  placeholder?: string;
}> = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
        dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default AddVendor;
