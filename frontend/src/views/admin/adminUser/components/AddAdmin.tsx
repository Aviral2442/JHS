import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import * as Yup from "yup";

const adminValidationSchema = Yup.object().shape({
    role_id: Yup.string().required("Role is required"),
    admin_name: Yup.string().required("Admin name is required"),
    admin_profile: Yup.string().required("Admin profile picture is required"),
    admin_email: Yup.string().email("Invalid email format").required("Admin email is required"),
    admin_mobile_no: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Admin mobile number is required"),
    admin_password: Yup.string().min(6, "Password must be at least 6 characters").required("Admin password is required"),
});

const baseURL = (import.meta as any).env.VITE_URL || "";

interface AdminForm {
    role_id: string;
    admin_name: string;
    admin_profile: string;
    admin_email: string;
    admin_mobile_no: string;
    admin_password: string;
}

interface RoleIdSelectOption {
    category_level1_id: number;
    category_level1_name: string;
}

const AddAdmin: React.FC = () => {
    const { catLvl2Id } = useParams<{ catLvl2Id: string }>();
    const isEditMode = !!catLvl2Id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [roleId, setroleId] = useState<
        RoleIdSelectOption[]
    >([]);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState<AdminForm>({
        role_id: "",
        admin_name: "",
        admin_profile: "",
        admin_email: "",
        admin_mobile_no: "",
        admin_password: "",
    });

    // Fetch role ID list for dropdown
    useEffect(() => {
        const fetchCategoryLevelOneList = async () => {
            try {
                const res = await axios.get(
                    `${baseURL}/api/category/get_category_level_one_list`,
                );
                const categories = res.data?.jsonData?.category_level_one_list || [];
                setroleId(categories);
                if (!isEditMode && categories.length > 0) {
                    setForm((prev) => ({
                        ...prev,
                        category_level2_level1_id:
                            categories[0].category_level1_id.toString(),
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch category level one list:", error);
                alert("Failed to load parent categories.");
            }
        };

        fetchCategoryLevelOneList();
    }, [isEditMode]);

    useEffect(() => {
        if (!isEditMode) return;

        const fetchCategoryDetails = async () => {
            try {
                setFetching(true);
                const res = await axios.get(
                    `${baseURL}/api/category/get_category_level_two/${catLvl2Id}`,
                );
                const category = res.data?.jsonData?.category_level_two_details;
                if (category) {
                    setForm({
                        role_id: category.role_id || "",
                        admin_name: category.admin_name || "",
                        admin_profile: category.admin_profile || "",
                        admin_email: category.admin_email || "",
                        admin_mobile_no: category.admin_mobile_no || "",
                        admin_password: category.admin_password || "",
                    });
                    if (category.category_level2_img) {
                        setImagePreview(`${baseURL}${category.category_level2_img}`);
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
    }, [catLvl2Id, isEditMode]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
            setForm((prev) => ({ ...prev, category_level2_img: base64 }));
            setImagePreview(base64);
            if (errors.category_level2_img) {
                setErrors((prev) => {
                    const next = { ...prev };
                    delete next.category_level2_img;
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
            const validationData =
                isEditMode && !form.category_level2_img
                    ? { ...form, category_level2_img: "existing" }
                    : form;
            await adminValidationSchema.validate(validationData, {
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
                    `${baseURL}/api/category/update_category_level_two/${catLvl2Id}`,
                    form,
                );
            } else {
                res = await axios.post(
                    `${baseURL}/api/category/add_category_level_two`,
                    form,
                );
            }
            if (res.data?.status === 200) {
                alert(
                    isEditMode
                        ? "Category updated successfully!"
                        : "Category added successfully!",
                );
                navigate("/admin/category/level-two");
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
                        ? "Edit Admin Users"
                        : "Add Admin Users"
                }
                description={
                    isEditMode ? "Edit admin user" : "Add a new Admin Users"
                }
            />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {isEditMode
                                ? "Edit Admin Users"
                                : "Add Admin Users"}
                        </h3>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/category-level-two")}
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Select Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="role_id"
                                    value={form.category_level2_level1_id}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                                >
                                    <option value="">Select Role</option>
                                    {roleId.map((category) => (
                                        <option
                                            key={category.category_level1_id}
                                            value={category.category_level1_id}
                                        >
                                            {category.category_level1_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_level2_level1_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.category_level2_level1_id}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="category_level2_name"
                                    value={form.category_level2_name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                                />
                                {errors.category_level2_name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.category_level2_name}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="admin_email"
                                    value={form.admin_email}
                                    onChange={handleChange}
                                    placeholder="Enter admin email"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                                />
                                {errors.admin_email && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.admin_email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-5">

                            <div className="w-full">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Mobile No <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="admin_mobile_no"
                                    value={form.admin_mobile_no}
                                    onChange={handleChange}
                                    placeholder="Enter admin mobile number"
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.slice(0, 10);
                                    }}
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                                />
                                {errors.admin_mobile_no && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.admin_mobile_no}
                                    </p>
                                )}
                            </div>

                            <div className="w-full relative">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="admin_password"
                                    value={form.admin_password}
                                    onChange={handleChange}
                                    placeholder="Enter admin password"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 6.75 9.75 6.75c1.772 0 3.432-.293 4.92-.807M21.75 12a10.477 10.477 0 00-1.227-2.477M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm0 0l5.25 5.25m-18-18l5.25 5.25" />
                                        </svg>
                                    )}
                                </button>
                                {errors.admin_password && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.admin_password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex-1">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Profile Pic <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#1c3c57] file:px-3 file:py-1 file:text-sm file:text-white focus:border-brand-500 focus:outline-none dark:border-gray-600 dark:text-gray-300"
                                />
                                {errors.admin_profile && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.admin_profile}
                                    </p>
                                )}
                            </div>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Admin profile preview"
                                    className="h-24 w-24 rounded-lg border border-gray-200 object-cover dark:border-gray-600"
                                />
                            )}
                        </div>

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
                                        ? "Update Admin"
                                        : "Add Admin"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/category/level-two")}
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

export default AddAdmin;
