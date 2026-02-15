import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import * as Yup from "yup";
import toast from "react-hot-toast";

const blogValidationSchema = Yup.object().shape({
  blog_category_id: Yup.string().required("Blog category is required"),
  blog_title: Yup.string().required("Blog title is required"),
  blog_title_sku: Yup.string().required("Blog title SKU is required"),
  blog_short_desc: Yup.string().required("Blog short description is required"),
  blog_long_desc: Yup.string().required("Blog long description is required"),
  blog_thumbnail: Yup.string().required("Blog thumbnail is required"),
  blog_tags: Yup.string().required("Blog tags are required"),
  blog_meta_title: Yup.string().required("Blog meta title is required"),
  blog_meta_desc: Yup.string().required("Blog meta description is required"),
  blog_meta_keyword: Yup.string().required("Blog meta keywords are required"),
});

const baseURL = (import.meta as any).env.VITE_BACK_URL || "";

interface BlogForm {
  blog_category_id: string;
  blog_title: string;
  blog_title_sku: string;
  blog_short_desc: string;
  blog_long_desc: string;
  blog_thumbnail: string;
  blog_tags: string;
  blog_meta_title: string;
  blog_meta_desc: string;
  blog_meta_keyword: string;
}

const AddBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const isEditMode = !!blogId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<BlogForm>({
    blog_category_id: "",
    blog_title: "",
    blog_title_sku: "",
    blog_short_desc: "",
    blog_long_desc: "",
    blog_thumbnail: "",
    blog_tags: "",
    blog_meta_title: "",
    blog_meta_desc: "",
    blog_meta_keyword: "",
  });

  // Fetch category data on mount (for both add and edit modes)
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/category/get_category_level_one_list`,
        );
        console.log("Category Level One List:", res.data);
        setCategoryList(res.data?.jsonData?.category_level_one_list || []);
      } catch (error) {
        console.error("Failed to fetch category level one list:", error);
        alert("Failed to load category data.");
      }
    };

    fetchCategoryData();
  }, []);

  // Fetch blog details when in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchBlogDetails = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/category/get_blog_details/${blogId}`,
        );
        const blog = res.data?.jsonData?.blog_details;
        if (blog) {
          setForm({
            blog_category_id: blog.blog_category_id?.toString() || "",
            blog_title: blog.blog_title || "",
            blog_title_sku: blog.blog_title_sku || "",
            blog_short_desc: blog.blog_short_desc || "",
            blog_long_desc: blog.blog_long_desc || "",
            blog_thumbnail: "",
            blog_tags: blog.blog_tags || "",
            blog_meta_title: blog.blog_meta_title || "",
            blog_meta_desc: blog.blog_meta_desc || "",
            blog_meta_keyword: blog.blog_meta_keyword || "",
          });
          if (blog.blog_thumbnail) {
            setThumbnailPreview(`${baseURL}${blog.blog_thumbnail}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
        alert("Failed to load blog details.");
      } finally {
        setFetching(false);
      }
    };

    fetchBlogDetails();
  }, [blogId, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      setForm((prev) => ({ ...prev, blog_thumbnail: base64 }));
      setThumbnailPreview(base64);
      if (errors.blog_thumbnail) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.blog_thumbnail;
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
      // For edit mode, thumbnail is optional (keep existing if not changed)
      const validationData =
        isEditMode && !form.blog_thumbnail
          ? { ...form, blog_thumbnail: "existing" }
          : form;
      await blogValidationSchema.validate(validationData, {
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

    try {
      setLoading(true);
      let res;
      if (isEditMode) {
        res = await axios.put(
          `${baseURL}/api/category/update_blog/${blogId}`,
          form,
        );
      } else {
        res = await axios.post(`${baseURL}/api/category/add_blog`, form);
      }
      if (res.data?.status === 200) {
        toast.success(`Blog ${isEditMode ? "updated" : "added"} successfully!`);
        navigate("/admin/blog");
      } else {
        alert(
          res.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} blog.`,
        );
      }
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "add"} blog:`, error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 lg:p-6 text-center text-gray-400 dark:text-gray-500 py-20">
          Loading blog details...
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={isEditMode ? "Edit Blog | Admin" : "Add Blog | Admin"}
        description={isEditMode ? "Edit blog post" : "Add a new blog post"}
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {isEditMode ? "Edit Blog" : "Add Blog"}
            </h3>
            <button
              type="button"
              onClick={() => navigate("/admin/blog")}
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
            <div className="flex gap-5">
              {/* Blog Title */}
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blog_title"
                  value={form.blog_title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                />
                {errors.blog_title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.blog_title}
                  </p>
                )}
              </div>

              {/* Blog Title SKU */}
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Blog Title SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blog_title_sku"
                  value={form.blog_title_sku}
                  onChange={handleChange}
                  placeholder="Enter blog title SKU"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                />
                {errors.blog_title_sku && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.blog_title_sku}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              {/* Category ID */}
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category ID <span className="text-red-500">*</span>
                </label>
                <select
                  name="blog_category_id"
                  value={form.blog_category_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                >
                  <option value="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300">Select category</option>
                    {categoryList.map((cat) => (
                    <option
                      key={cat.category_level1_id}
                      value={cat.category_level1_id}
                      className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {cat.category_level1_name}
                    </option>
                    ))}
                </select>
                {errors.blog_category_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.blog_category_id}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blog_tags"
                  value={form.blog_tags}
                  onChange={handleChange}
                  placeholder="Enter tags (comma separated)"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                />
                {errors.blog_tags && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.blog_tags}
                  </p>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="blog_short_desc"
                value={form.blog_short_desc}
                onChange={handleChange}
                rows={3}
                placeholder="Enter short description"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.blog_short_desc && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.blog_short_desc}
                </p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Long Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="blog_long_desc"
                value={form.blog_long_desc}
                onChange={handleChange}
                rows={6}
                placeholder="Enter detailed blog content"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.blog_long_desc && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.blog_long_desc}
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Thumbnail Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#1c3c57] file:px-3 file:py-1 file:text-sm file:text-white focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                />
                {errors.blog_thumbnail && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.blog_thumbnail}
                  </p>
                )}
              </div>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="h-24 w-auto rounded-lg border border-gray-200 object-cover dark:border-gray-600"
                />
              )}
            </div>

            {/* SEO Section */}
            <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
              <h4 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
                SEO Settings
              </h4>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Meta Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="blog_meta_title"
                    value={form.blog_meta_title}
                    onChange={handleChange}
                    placeholder="Enter meta title"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                  />
                  {errors.blog_meta_title && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.blog_meta_title}
                    </p>
                  )}
                </div>

                {/* Meta Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Meta Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="blog_meta_desc"
                    value={form.blog_meta_desc}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter meta description"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                  />
                  {errors.blog_meta_desc && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.blog_meta_desc}
                    </p>
                  )}
                </div>

                {/* Meta Keywords */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Meta Keywords <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="blog_meta_keyword"
                    value={form.blog_meta_keyword}
                    onChange={handleChange}
                    placeholder="Enter meta keywords (comma separated)"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                  />
                  {errors.blog_meta_keyword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.blog_meta_keyword}
                    </p>
                  )}
                </div>
              </div>
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
                    ? "Update Blog"
                    : "Add Blog"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/blog")}
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

export default AddBlog;
