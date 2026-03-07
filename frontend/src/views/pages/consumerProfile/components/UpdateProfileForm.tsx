import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  X,
  Loader2,
  Hash,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

const baseURL = (import.meta as any).env.VITE_URL || "";

interface ConsumerFormData {
  consumer_full_name: string;
  consumer_email: string;
  consumer_mobile: string;
  consumer_address: string;
  consumer_gender: string;
  consumer_profile_pic: string;
  consumer_state_id: string;
  consumer_city_id: string;
  consumer_zipcode: string;
}

interface UpdateProfileFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

// Custom styles for react-select to match the form theme
const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "var(--sky-blue)" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px var(--sky-blue)" : "none",
    padding: "2px 4px",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    "&:hover": { borderColor: "var(--sky-blue)" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "var(--sky-blue)"
      : state.isFocused
        ? "rgba(0, 173, 181, 0.1)"
        : "transparent",
    color: state.isSelected ? "#fff" : "#374151",
    "&:active": { backgroundColor: "var(--sky-blue)" },
  }),
  placeholder: (base) => ({ ...base, color: "#9ca3af", fontSize: "0.875rem" }),
  singleValue: (base) => ({ ...base, fontSize: "0.875rem", color: "#374151" }),
  noOptionsMessage: (base) => ({ ...base, fontSize: "0.875rem" }),
};

const getConsumerIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.consumerId?.toString() || null;
  } catch {
    return null;
  }
};

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const consumerId = getConsumerIdFromToken();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State & City select state
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<SelectOption | null>(null);
  const [citySearchLoading, setCitySearchLoading] = useState(false);

  const [form, setForm] = useState<ConsumerFormData>({
    consumer_full_name: "",
    consumer_email: "",
    consumer_mobile: "",
    consumer_address: "",
    consumer_gender: "",
    consumer_profile_pic: "",
    consumer_state_id: "",
    consumer_city_id: "",
    consumer_zipcode: "",
  });

  // Fetch state list on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/home/get_state_list`);
        const states = res.data?.jsonData?.states || [];
        setStateOptions(
          states.map((s: { state_id: number; state_name: string }) => ({
            value: s.state_id.toString(),
            label: s.state_name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch existing consumer details
  useEffect(() => {
    if (!consumerId) {
      setFetching(false);
      return;
    }

    const fetchConsumerDetails = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/consumer/fetch_consumer_details/${consumerId}`
        );
        const details = res.data?.jsonData?.consumer_details;
        if (details) {
          setForm({
            consumer_full_name: details.consumer_full_name || "",
            consumer_email: details.consumer_email || "",
            consumer_mobile: details.consumer_mobile || "",
            consumer_address: details.consumer_address || "",
            consumer_gender: details.consumer_gender || "",
            consumer_profile_pic: "",
            consumer_state_id: details.consumer_state_id?.toString() || "",
            consumer_city_id: details.consumer_city_id?.toString() || "",
            consumer_zipcode: details.consumer_zipcode || "",
          });
          if (details.consumer_profile_pic) {
            setImagePreview(`${baseURL}${details.consumer_profile_pic}`);
          }
          // Pre-select state if it exists
          if (details.consumer_state_id) {
            const stateId = details.consumer_state_id.toString();
            const stateName = details.state_name || stateId;
            setSelectedState({ value: stateId, label: stateName });
          }
          // Pre-select city if it exists
          if (details.consumer_city_id) {
            const cityId = details.consumer_city_id.toString();
            const cityName = details.city_name || `City #${cityId}`;
            setSelectedCity({ value: cityId, label: cityName });
            setCityOptions([{ value: cityId, label: cityName }]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch consumer details:", error);
        toast.error("Failed to load profile details.");
      } finally {
        setFetching(false);
      }
    };

    fetchConsumerDetails();
  }, [consumerId]);

  // Resolve state label once stateOptions are loaded
  useEffect(() => {
    if (selectedState && stateOptions.length > 0) {
      const match = stateOptions.find((o) => o.value === selectedState.value);
      if (match && match.label !== selectedState.label) {
        setSelectedState(match);
      }
    }
  }, [stateOptions, selectedState]);

  // City search handler (debounced via input)
  const handleCitySearch = useCallback(async (inputValue: string) => {
    if (inputValue.length < 2) {
      setCityOptions([]);
      return;
    }
    try {
      setCitySearchLoading(true);
      const res = await axios.get(`${baseURL}/api/home/get_city_list_search`, {
        params: { search: inputValue },
      });
      const cities = res.data?.jsonData?.cities || [];
      setCityOptions(
        cities.map((c: { city_id: number; city_name: string }) => ({
          value: c.city_id.toString(),
          label: c.city_name,
        }))
      );
    } catch (error) {
      console.error("Failed to search cities:", error);
    } finally {
      setCitySearchLoading(false);
    }
  }, []);

  const handleStateChange = (option: SingleValue<SelectOption>) => {
    setSelectedState(option);
    setForm((prev) => ({ ...prev, consumer_state_id: option?.value || "" }));
  };

  const handleCityChange = (option: SingleValue<SelectOption>) => {
    setSelectedCity(option);
    setForm((prev) => ({ ...prev, consumer_city_id: option?.value || "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.consumer_full_name.trim()) {
      newErrors.consumer_full_name = "Full name is required";
    }
    if (!form.consumer_email.trim()) {
      newErrors.consumer_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.consumer_email)) {
      newErrors.consumer_email = "Invalid email address";
    }
    if (
      form.consumer_mobile &&
      !/^\+?[\d\s()-]{7,15}$/.test(form.consumer_mobile)
    ) {
      newErrors.consumer_mobile = "Invalid phone number";
    }
    if (form.consumer_zipcode && !/^\d{4,10}$/.test(form.consumer_zipcode)) {
      newErrors.consumer_zipcode = "Invalid zipcode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, consumer_profile_pic: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!consumerId) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${baseURL}/api/consumer/update_consumer_details/${consumerId}`,
        form
      );

      if (res.data?.status === 200) {
        toast.success("Profile updated successfully!");
        onSuccess?.();
        onClose();
      } else {
        toast.error(res.data?.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--sky-blue)" }} />
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl"
          style={{ backgroundColor: "var(--sky-blue)" }}
        >
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Update Profile
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 p-2 rounded-full text-white cursor-pointer shadow-lg hover:scale-110 transition-transform"
                style={{ backgroundColor: "var(--sky-blue)" }}
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click camera icon to change photo (max 5MB)
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <User className="w-4 h-4" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="consumer_full_name"
              value={form.consumer_full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300"
            />
            {errors.consumer_full_name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.consumer_full_name}
              </p>
            )}
          </div>

          {/* Email & Mobile Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="consumer_email"
                value={form.consumer_email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.consumer_email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.consumer_email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Phone className="w-4 h-4" />
                Mobile Number
              </label>
              <input
                type="text"
                name="consumer_mobile"
                value={form.consumer_mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.consumer_mobile && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.consumer_mobile}
                </p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4" />
              Gender
            </label>
            <select
              name="consumer_gender"
              value={form.consumer_gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <textarea
              name="consumer_address"
              value={form.consumer_address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300 resize-none"
            />
          </div>

          {/* State, City, Zipcode Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                State
              </label>
              <Select<SelectOption>
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select state"
                isClearable
                isSearchable
                styles={selectStyles}
                noOptionsMessage={() => "No states found"}
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                City
              </label>
              <Select<SelectOption>
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                onInputChange={(val) => handleCitySearch(val)}
                placeholder="Type to search city..."
                isClearable
                isSearchable
                isLoading={citySearchLoading}
                styles={selectStyles}
                noOptionsMessage={({ inputValue }) =>
                  inputValue.length < 2
                    ? "Type at least 2 characters"
                    : "No cities found"
                }
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Hash className="w-4 h-4" />
                Zipcode
              </label>
              <input
                type="text"
                name="consumer_zipcode"
                value={form.consumer_zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-700 focus:border-(--sky-blue) focus:ring-1 focus:ring-(--sky-blue) focus:outline-none dark:border-gray-600 dark:text-gray-300"
              />
              {errors.consumer_zipcode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.consumer_zipcode}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 flex items-center gap-2"
              style={{ backgroundColor: "var(--sky-blue)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Profile
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfileForm;
