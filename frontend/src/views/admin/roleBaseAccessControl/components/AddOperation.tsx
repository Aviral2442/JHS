import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface OperationData {
  module_id: number | string;
  operation_name: string;
  operation_slug: string;
  operation_order_priority: number | string;
}

interface ModuleItem {
  module_id: number;
  module_name: string;
}

const initialForm: OperationData = {
  module_id: "",
  operation_name: "",
  operation_slug: "",
  operation_order_priority: "",
};

const AddOperation: React.FC = () => {
  const navigate = useNavigate();
  const { operationId } = useParams();
  const isEditMode = !!operationId;

  const [form, setForm] = useState<OperationData>(initialForm);
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/role-base-access-control/get_modules_list`,
          {
            params: {
              page: 1,
              limit: 100,
              status: "active",
            },
          },
        );

        setModules(res.data?.jsonData?.modules_list || []);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      }
    };

    fetchModules();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchOperation = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/role-base-access-control/operation_data_fetch/${operationId}`,
        );
        const data = res.data;
        if (data?.jsonData?.operation_details) {
          const op = data.jsonData.operation_details;
          setForm({
            module_id: op.module_id !== undefined ? op.module_id : "",
            operation_name: op.operation_name || "",
            operation_slug: op.operation_slug || "",
            operation_order_priority: op.operation_order_priority !== undefined ? op.operation_order_priority : "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch operation:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchOperation();
  }, [isEditMode, operationId]);

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

    if (form.module_id === "") newErrors.module_id = "Module is required.";
    if (!form.operation_name.trim()) {
      newErrors.operation_name = "Operation name is required.";
    }
    if (!form.operation_slug.trim()) {
      newErrors.operation_slug = "Operation slug is required.";
    }
      if (form.operation_order_priority === "") {
      newErrors.operation_order_priority = "Operation order priority is required.";
    } else if (isNaN(Number(form.operation_order_priority))) {
      newErrors.operation_order_priority = "Operation order priority must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      module_id: Number(form.module_id),
      operation_name: form.operation_name.trim(),
      operation_slug: form.operation_slug.trim(),
      operation_order_priority: Number(form.operation_order_priority),
    };

    try {
      setLoading(true);
      if (isEditMode) {
        const res = await axios.put(
          `${baseURL}/api/role-base-access-control/update_operation/${operationId}`,
          payload,
        );

        if (res.data?.status === 200) {
          navigate("/admin/operations");
        } else {
          alert(res.data?.message || "Failed to update operation.");
        }
      } else {
        const res = await axios.post(
          `${baseURL}/api/role-base-access-control/add_operation`,
          payload,
        );

        if (res.data?.status === 200) {
          // navigate("/admin/operations");
          setForm(initialForm);
        } else {
          alert(res.data?.message || "Failed to add operation.");
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
        title={isEditMode ? "Edit Operation | Admin" : "Add Operation | Admin"}
        description={isEditMode ? "Edit operation details" : "Add a new operation"}
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Operation" : "Add Operation"}
          </h3>
          <button
            onClick={() => navigate("/admin/operations")}
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 lg:p-6 space-y-8">
          <fieldset>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Module *
                </label>
                <select
                  name="module_id"
                  value={form.module_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
                    dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Module
                  </option>
                  {modules.map((moduleItem) => (
                    <option key={moduleItem.module_id} value={moduleItem.module_id}>
                      {moduleItem.module_name}
                    </option>
                  ))}
                </select>
                {errors.module_id && (
                  <p className="mt-1 text-xs text-red-500">{errors.module_id}</p>
                )}
              </div>

              <InputField
                label="Operation Name *"
                name="operation_name"
                value={form.operation_name}
                onChange={handleChange}
                error={errors.operation_name}
                placeholder="Enter operation name"
              />

              <InputField
                label="Operation Slug *"
                name="operation_slug"
                value={form.operation_slug}
                onChange={handleChange}
                error={errors.operation_slug}
                placeholder="Enter operation slug"
              />

              <InputField
                label="Operation Order Priority *"
                name="operation_order_priority"
                value={form.operation_order_priority ?? ""}
                onChange={handleChange}
                error={errors.operation_order_priority}
                type="number"
                placeholder="Enter operation order priority"
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/operations")}
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
                  ? "Update Operation"
                  : "Add Operation"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

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

export default AddOperation;