import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import toast from "react-hot-toast";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface ModuleData {
  module_name: string;
  module_icon: string;
  module_route: string;
  module_order_priority?: number;
  status: number | string;
}

const initialForm: ModuleData = {
  module_name: "",
  module_icon: "",
  module_route: "",
  module_order_priority: 0,
  status: "",
};

const AddModules: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const isEditMode = !!moduleId;

  const [form, setForm] = useState<ModuleData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Fetch existing module data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchModule = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/role-base-access-control/module_data_fetch/${moduleId}`,
        );
        const data = res.data;
        if (data?.jsonData?.module_details) {
          const v = data.jsonData.module_details;
          setForm({
            module_name: v.module_name || "",
            module_icon: v.module_icon || "",
            module_route: v.module_route || "",
            module_order_priority: v.module_order_priority !== undefined ? v.module_order_priority : 0,
            status: v.status !== undefined ? v.status : "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch module:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchModule();
  }, [isEditMode, moduleId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    const nextValue =
      name === "module_order_priority"
        ? value === ""
          ? undefined
          : Number(value)
        : value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.module_name.trim())
      newErrors.module_name = "Module name is required.";
    if (!form.module_icon.trim())
      newErrors.module_icon = "Module icon is required.";
    if (!form.module_route.trim())
      newErrors.module_route = "Module route is required.";
    if (form.module_order_priority === undefined || form.module_order_priority === null || form.module_order_priority === 0)
      newErrors.module_order_priority = "Module order priority is required.";
    if (form.status === "") newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (isEditMode) {
        const res = await axios.put(
          `${baseURL}/api/role-base-access-control/update_module/${moduleId}`,
          form,
        );
        if (res.data?.status === 200) {
          navigate("/admin/modules");
        } else {
          alert(res.data?.message || "Failed to update module.");
        }
      } else {
        const res = await axios.post(
          `${baseURL}/api/role-base-access-control/add_module`,
          form,
        );
        if (res.data?.status === 200) {
          toast.success("Module added successfully!");
          // navigate("/admin/modules");
          setForm(initialForm);
        } else {
          alert(res.data?.message || "Failed to add module.");
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
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={isEditMode ? "Edit Module | Admin" : "Add Module | Admin"}
        description={isEditMode ? "Edit module details" : "Add a new module"}
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Module" : "Add Module"}
          </h3>
          <button
            onClick={() => navigate("/admin/modules")}
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 lg:p-6 space-y-8">
          <fieldset>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputField
                label="Module Icon (SVG or Class) *"
                name="module_icon"
                value={form.module_icon}
                onChange={handleChange}
                error={errors.module_icon}
                placeholder="Enter module icon"
              />
              <InputField
                label="Module Name *"
                name="module_name"
                value={form.module_name}
                onChange={handleChange}
                error={errors.module_name}
                placeholder="Enter module name"
              />

              <InputField
                label="Module Order Priority *"
                name="module_order_priority"
                value={form.module_order_priority ?? ""}
                onChange={handleChange}
                error={errors.module_order_priority}
                type="number"
                placeholder="Enter module order priority"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 md:col-span-3">
                Use icons from{" "}
                <a
                  href="https://react-icons.github.io/react-icons/icons/lu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 hover:underline"
                >
                  react-icons/lu
                </a>
                .
              </p>
              <InputField
                label="Module Route *"
                name="module_route"
                value={form.module_route}
                onChange={handleChange}
                error={errors.module_route}
                placeholder="Enter module route (e.g., /admin/dashboard)"
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status *
                </label>
                <select
                  name="status"
                  value={form.status}
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
                {errors.status && (
                  <p className="mt-1 text-xs text-red-500">{errors.status}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/modules")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              {loading
                ? "Saving..."
                : isEditMode
                  ? "Update Module"
                  : "Add Module"}
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
  value: string | number;
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

export default AddModules;
