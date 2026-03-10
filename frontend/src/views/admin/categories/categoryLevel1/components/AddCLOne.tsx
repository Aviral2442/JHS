import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../../components/common/PageMeta";
import * as Yup from "yup";

const categoryValidationSchema = Yup.object().shape({
  category_level1_name: Yup.string().required("Category name is required"),
  category_level1_img: Yup.string().required("Category image is required"),
});

const baseURL = (import.meta as any).env.VITE_URL || "";

interface CategoryForm {
  category_level1_name: string;
  category_level1_img: string;
}

const AddCLOne: React.FC = () => {
  const { catLvl1Id } = useParams<{ catLvl1Id: string }>();
  const isEditMode = !!catLvl1Id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<CategoryForm>({
    category_level1_name: "",
    category_level1_img: "",
  });

  // Fetch category details when in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCategoryDetails = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/category/get_category_level_one/${catLvl1Id}`,
        );
        const category = res.data?.jsonData?.category_level_one_details;
        if (category) {
          setForm({
            category_level1_name: category.category_level1_name || "",
            category_level1_img: "",
          });
          if (category.category_level1_img) {
            setImagePreview(`${baseURL}${category.category_level1_img}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch category details:", error);
        alert("Failed to load category details.");
      } finally {
        setFetching(false);
      }
    };

    fetchCategoryDetails();
  }, [catLvl1Id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, category_level1_img: base64 }));
      setImagePreview(base64);
      if (errors.category_level1_img) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.category_level1_img;
          return next;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // For edit mode, image is optional (keep existing if not changed)
      const validationData =
        isEditMode && !form.category_level1_img
          ? { ...form, category_level1_img: "existing" }
          : form;
      await categoryValidationSchema.validate(validationData, {
        abortEarly: false,
      });
    } catch (err: any) {
      if (err.inner) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      }
      return;
    }
    console.log("Submitting form with data:", form);
    try {
      setLoading(true);
      let res;
      if (isEditMode) {
        res = await axios.put(
          `${baseURL}/api/category/update_category_level_one/${catLvl1Id}`,
          form,
        );
      } else {
        res = await axios.post(
          `${baseURL}/api/category/add_category_level_one`,
          form,
        );
      }
      if (res.data?.status === 200) {
        alert(
          isEditMode
            ? "Category updated successfully!"
            : "Category added successfully!",
        );
        navigate("/admin/category/level-one");
      } else {
        alert(
          res.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} category.`,
        );
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "add"} category:`,
        error,
      );
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 lg:p-6 text-center text-gray-400 dark:text-gray-500 py-20">
          Loading category details...
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={
          isEditMode
            ? "Edit Category Level One | Admin"
            : "Add Category Level One | Admin"
        }
        description={
          isEditMode ? "Edit category" : "Add a new category level one"
        }
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {isEditMode ? "Edit Category Level One" : "Add Category Level One"}
            </h3>
            <button
              type="button"
              onClick={() => navigate("/admin/category-level-one")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12.8337 7H1.16699M1.16699 7L7.00033 12.8333M1.16699 7L7.00033 1.16667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category_level1_name"
                value={form.category_level1_name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.category_level1_name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.category_level1_name}
                </p>
              )}
            </div>

            {/* Category Image */}
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#1c3c57] file:px-3 file:py-1 file:text-sm file:text-white focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                />
                {errors.category_level1_img && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.category_level1_img}
                  </p>
                )}
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="h-24 w-24 rounded-lg border border-gray-200 object-cover dark:border-gray-600"
                />
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#1c3c57] px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Submitting..."
                  : isEditMode
                    ? "Update Category"
                    : "Add Category"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/category/level-one")}
                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCLOne;