import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../../../components/common/PageMeta";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const baseURL = (import.meta as any).env.VITE_URL || "";
const libraries: "places"[] = ["places"];

interface BookingForm {
  booking_service_type: string;
  booking_category_l3: string;
  booking_category_l2: string;
  booking_consumer_id: string;
  booking_address: string;
  booking_city_name: string;
  booking_state_name: string;
  booking_pincode: string;
  booking_lat: string;
  booking_long: string;
  booking_assigned_vendor_id: string;
  booking_schedule_time: string;
}

const initialForm: BookingForm = {
  booking_service_type: "",
  booking_category_l3: "",
  booking_category_l2: "",
  booking_consumer_id: "",
  booking_address: "",
  booking_city_name: "",
  booking_state_name: "",
  booking_pincode: "",
  booking_lat: "",
  booking_long: "",
  booking_assigned_vendor_id: "",
  booking_schedule_time: "",
};

const AddBooking: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const isEditMode = !!bookingId;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [form, setForm] = useState<BookingForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingConsumer, setLoadingConsumer] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingVendor, setLoadingVendor] = useState(false);
  const autocompleteRef = useRef<any>(null);
  const [categoryLevel1List, setCategoryLevel1List] = useState<
    { category_level1_id: number; category_level1_name: string }[]
  >([]);
  const [categoryLevel2List, setCategoryLevel2List] = useState<
    { category_level2_id: number; category_level2_name: string }[]
  >([]);
  const [categoryLevel3List, setCategoryLevel3List] = useState<
    { category_level3_id: number; category_level3_name: string }[]
  >([]);

  // Fetch Category Level 1 list on mount
  useEffect(() => {
    const fetchCategoryLevel1List = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/category/get_category_level_one_list`,
        );
        if (res.data?.status === 200) {
          setCategoryLevel1List(
            res.data.jsonData.category_level_one_list || [],
          );
        }
      } catch (err) {
        console.error("Failed to fetch category level 1 list:", err);
      }
    };
    fetchCategoryLevel1List();
  }, []);

  // Fetch Category Level 2 list when Level 1 changes
  useEffect(() => {
    if (!form.booking_service_type) {
      setCategoryLevel2List([]);
      setCategoryLevel3List([]);
      return;
    }
    const fetchCategoryLevel2List = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/category/get_category_level_two_list_by_cat_lvl1_id/${form.booking_service_type}`,
        );
        if (res.data?.status === 200) {
          setCategoryLevel2List(
            res.data.jsonData.category_level_two_list || [],
          );
        }
      } catch (err) {
        console.error("Failed to fetch category level 2 list:", err);
      }
    };
    fetchCategoryLevel2List();
  }, [form.booking_service_type]);

  // Fetch Category Level 3 list when Level 2 changes
  useEffect(() => {
    if (!form.booking_category_l2) {
      setCategoryLevel3List([]);
      return;
    }
    const fetchCategoryLevel3List = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/category/get_category_level_three_list_by_cat_lvl2_id/${form.booking_category_l2}`,
        );
        if (res.data?.status === 200) {
          setCategoryLevel3List(
            res.data.jsonData.category_level_three_list || [],
          );
        }
      } catch (err) {
        console.error("Failed to fetch category level 3 list:", err);
      }
    };
    fetchCategoryLevel3List();
  }, [form.booking_category_l2]);

  // Fetch existing booking data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchBooking = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${baseURL}/api/booking/fetch_booking_details/${bookingId}`,
        );
        const data = res.data;
        console.log("Fetch Booking Details Response:", data);
        if (data?.jsonData?.booking_details) {
          const b = data.jsonData.booking_details;
          setForm({
            booking_service_type: b.booking_service_type?.toString() || "",
            booking_category_l3: b.booking_category_l3?.toString() || "",
            booking_category_l2: b.booking_category_l2?.toString() || "",
            booking_consumer_id: b.booking_consumer_id?.toString() || "",
            booking_address: b.booking_address || "",
            booking_city_name: b.booking_city_name || "",
            booking_state_name: b.booking_state_name || "",
            booking_pincode: b.booking_pincode || "",
            booking_lat: b.booking_lat || "",
            booking_long: b.booking_long || "",
            booking_assigned_vendor_id:
              b.booking_assigned_vendor_id?.toString() || "",
            booking_schedule_time: b.booking_schedule_time?.toString() || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchBooking();
  }, [isEditMode, bookingId]);

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
    if (!form.booking_service_type)
      newErrors.booking_service_type = "Service type is required.";
    if (!form.booking_consumer_id)
      newErrors.booking_consumer_id = "Consumer ID is required.";
    if (!form.booking_address.trim())
      newErrors.booking_address = "Address is required.";
    if (!form.booking_city_name.trim())
      newErrors.booking_city_name = "City is required.";
    if (!form.booking_state_name.trim())
      newErrors.booking_state_name = "State is required.";
    if (!form.booking_pincode.trim())
      newErrors.booking_pincode = "Pincode is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}/api/booking/add_booking_details`,
        form,
      );
      if (res.data?.status === 200) {
        navigate("/admin/booking");
      } else {
        alert(res.data?.message || "Failed to add booking.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update Address Section
  const handleUpdateAddress = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.booking_address.trim())
      newErrors.booking_address = "Address is required.";
    if (!form.booking_city_name.trim())
      newErrors.booking_city_name = "City is required.";
    if (!form.booking_state_name.trim())
      newErrors.booking_state_name = "State is required.";
    if (!form.booking_pincode.trim())
      newErrors.booking_pincode = "Pincode is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      setLoadingAddress(true);
      const res = await axios.put(
        `${baseURL}/api/booking/update_booking_address/${bookingId}`,
        {
          booking_address: form.booking_address,
          booking_city_name: form.booking_city_name,
          booking_state_name: form.booking_state_name,
          booking_pincode: form.booking_pincode,
          booking_lat: form.booking_lat,
          booking_long: form.booking_long,
        },
      );
      if (res.data?.status === 200) {
        alert("Address updated successfully!");
      } else {
        alert(res.data?.message || "Failed to update address.");
      }
    } catch (err) {
      console.error("Update address error:", err);
      alert("Failed to update address. Please try again.");
    } finally {
      setLoadingAddress(false);
    }
  };

  // Update Category Section
  const handleUpdateCategory = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.booking_service_type)
      newErrors.booking_service_type = "Service type is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      setLoadingCategory(true);
      const res = await axios.put(
        `${baseURL}/api/booking/update_booking_category/${bookingId}`,
        {
          booking_service_type: form.booking_service_type,
          booking_category_l2: form.booking_category_l2,
          booking_category_l3: form.booking_category_l3,
        },
      );
      if (res.data?.status === 200) {
        alert("Category updated successfully!");
      } else {
        alert(res.data?.message || "Failed to update category.");
      }
    } catch (err) {
      console.error("Update category error:", err);
      alert("Failed to update category. Please try again.");
    } finally {
      setLoadingCategory(false);
    }
  };

  // Update Consumer Section
  const handleUpdateConsumer = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.booking_consumer_id)
      newErrors.booking_consumer_id = "Consumer ID is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      setLoadingConsumer(true);
      const res = await axios.patch(
        `${baseURL}/api/booking/update_booking_consumer/${bookingId}`,
        {
          consumerId: form.booking_consumer_id,
        },
      );
      if (res.data?.status === 200) {
        alert("Consumer updated successfully!");
      } else {
        alert(res.data?.message || "Failed to update consumer.");
      }
    } catch (err) {
      console.error("Update consumer error:", err);
      alert("Failed to update consumer. Please try again.");
    } finally {
      setLoadingConsumer(false);
    }
  };

  // Update Schedule Section
  const handleUpdateSchedule = async () => {
    if (!form.booking_schedule_time) {
      setErrors((prev) => ({
        ...prev,
        booking_schedule_time: "Schedule time is required.",
      }));
      return;
    }

    try {
      setLoadingSchedule(true);
      const res = await axios.patch(
        `${baseURL}/api/booking/update_booking_schedule/${bookingId}`,
        {
          booking_schedule_time: form.booking_schedule_time,
        },
      );
      if (res.data?.status === 200) {
        alert("Schedule updated successfully!");
      } else {
        alert(res.data?.message || "Failed to update schedule.");
      }
    } catch (err) {
      console.error("Update schedule error:", err);
      alert("Failed to update schedule. Please try again.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  // Update Vendor Section
  const handleUpdateVendor = async () => {
    if (!form.booking_assigned_vendor_id) {
      setErrors((prev) => ({
        ...prev,
        booking_assigned_vendor_id: "Vendor ID is required.",
      }));
      return;
    }

    try {
      setLoadingVendor(true);
      const res = await axios.patch(
        `${baseURL}/api/booking/update_booking_vendor/${bookingId}`,
        {
          vendorId: form.booking_assigned_vendor_id,
        },
      );
      if (res.data?.status === 200) {
        alert("Vendor updated successfully!");
      } else {
        alert(res.data?.message || "Failed to update vendor.");
      }
    } catch (err) {
      console.error("Update vendor error:", err);
      alert("Failed to update vendor. Please try again.");
    } finally {
      setLoadingVendor(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Extract address components
  const extractAddress = (place: google.maps.places.PlaceResult) => {
    const components = place.address_components || [];

    console.log("Extracting address components:", components);

    let city = "";
    let state = "";
    let pincode = "";

    // console.log("Hero",components)

    components.forEach((component) => {
      const types = component.types;
      if (types.includes("locality")) {
        city = component.long_name;
      }

      if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }

      if (types.includes("postal_code")) {
        pincode = component.long_name;
      }
    });

    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();

    console.log("Extracted Address:", {
      formatted_address: place.formatted_address,
      city,
      state,
      pincode,
      lat,
      lng,
    });

    setForm((prev) => ({
      ...prev,
      booking_address: place.formatted_address || "",
      booking_city_name: city,
      booking_state_name: state,
      booking_pincode: pincode,
      booking_lat: lat ? String(lat) : "",
      booking_long: lng ? String(lng) : "",
    }));
  };

  // When user selects from autocomplete
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;
    extractAddress(place);
  };

  // Handle category select change with cascading reset
  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "booking_service_type") {
      setForm((prev) => ({
        ...prev,
        booking_service_type: value,
        booking_category_l2: "",
        booking_category_l3: "",
      }));
    } else if (name === "booking_category_l2") {
      setForm((prev) => ({
        ...prev,
        booking_category_l2: value,
        booking_category_l3: "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <PageMeta
        title={isEditMode ? "Edit Booking | Admin" : "Add Booking | Admin"}
        description={isEditMode ? "Edit booking details" : "Add a new booking"}
      />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Booking" : "Add Booking"}
          </h3>
          <button
            onClick={() => navigate("/admin/booking")}
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        {isEditMode ? (
          <div className="p-5 lg:p-6 space-y-6">
            {/* Category Information Section */}
            <fieldset className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <legend className="text-base font-semibold text-gray-900 dark:text-white">
                  Category Information
                </legend>
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  disabled={loadingCategory}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
                >
                  {loadingCategory ? "Saving..." : "Save Category"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField
                  label="Service Type (Category L1) *"
                  name="booking_service_type"
                  value={form.booking_service_type}
                  onChange={handleCategoryChange}
                  error={errors.booking_service_type}
                  options={categoryLevel1List.map((c) => ({
                    value: String(c.category_level1_id),
                    label: c.category_level1_name,
                  }))}
                  placeholder="Select Service Type"
                />
                <SelectField
                  label="Category Level 2"
                  name="booking_category_l2"
                  value={form.booking_category_l2}
                  onChange={handleCategoryChange}
                  error={errors.booking_category_l2}
                  options={categoryLevel2List.map((c) => ({
                    value: String(c.category_level2_id),
                    label: c.category_level2_name,
                  }))}
                  placeholder="Select Category L2"
                  disabled={!form.booking_service_type}
                />
                <SelectField
                  label="Category Level 3"
                  name="booking_category_l3"
                  value={form.booking_category_l3}
                  onChange={handleCategoryChange}
                  error={errors.booking_category_l3}
                  options={categoryLevel3List.map((c) => ({
                    value: String(c.category_level3_id),
                    label: c.category_level3_name,
                  }))}
                  placeholder="Select Category L3"
                  disabled={!form.booking_category_l2}
                />
              </div>
            </fieldset>

            {/* Consumer Information Section */}
            <fieldset className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <legend className="text-base font-semibold text-gray-900 dark:text-white">
                  Consumer Information
                </legend>
                <button
                  type="button"
                  onClick={handleUpdateConsumer}
                  disabled={loadingConsumer}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
                >
                  {loadingConsumer ? "Saving..." : "Save Consumer"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Consumer ID *"
                  name="booking_consumer_id"
                  value={form.booking_consumer_id}
                  onChange={handleChange}
                  error={errors.booking_consumer_id}
                />
              </div>
            </fieldset>

            {/* Vendor Information Section */}
            <fieldset className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <legend className="text-base font-semibold text-gray-900 dark:text-white">
                  Vendor Information
                </legend>
                <button
                  type="button"
                  onClick={handleUpdateVendor}
                  disabled={loadingVendor}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
                >
                  {loadingVendor ? "Saving..." : "Save Vendor"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Assigned Vendor ID"
                  name="booking_assigned_vendor_id"
                  value={form.booking_assigned_vendor_id}
                  onChange={handleChange}
                  error={errors.booking_assigned_vendor_id}
                />
              </div>
            </fieldset>

            {/* Schedule Information Section */}
            <fieldset className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <legend className="text-base font-semibold text-gray-900 dark:text-white">
                  Schedule Information
                </legend>
                <button
                  type="button"
                  onClick={handleUpdateSchedule}
                  disabled={loadingSchedule}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
                >
                  {loadingSchedule ? "Saving..." : "Save Schedule"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Schedule Time (Unix)"
                  type="datetime-local"
                  name="booking_schedule_time"
                  value={form.booking_schedule_time}
                  onChange={handleChange}
                  error={errors.booking_schedule_time}
                />
              </div>
            </fieldset>

            {/* Address Information Section */}
            <fieldset className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <legend className="text-base font-semibold text-gray-900 dark:text-white">
                  Address Information
                </legend>
                <button
                  type="button"
                  onClick={handleUpdateAddress}
                  disabled={loadingAddress}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
                >
                  {loadingAddress ? "Saving..." : "Save Address"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  {isLoaded ? (
                    <Autocomplete
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <InputField
                        label="Address *"
                        name="booking_address"
                        value={form.booking_address}
                        onChange={handleChange}
                        error={errors.booking_address}
                      />
                    </Autocomplete>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address *
                      </label>
                      <textarea
                        name="booking_address"
                        value={form.booking_address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
                      />
                      {errors.booking_address && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.booking_address}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <InputField
                  label="City *"
                  name="booking_city_name"
                  value={form.booking_city_name}
                  onChange={handleChange}
                  error={errors.booking_city_name}
                />
                <InputField
                  label="State *"
                  name="booking_state_name"
                  value={form.booking_state_name}
                  onChange={handleChange}
                  error={errors.booking_state_name}
                />
                <InputField
                  label="Pincode *"
                  name="booking_pincode"
                  value={form.booking_pincode}
                  onChange={handleChange}
                  error={errors.booking_pincode}
                />
              </div>
            </fieldset>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/admin/booking")}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Back to List
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 lg:p-6 space-y-8">
            {/* Service Information */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Service Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField
                  label="Service Type (Category L1) *"
                  name="booking_service_type"
                  value={form.booking_service_type}
                  onChange={handleCategoryChange}
                  error={errors.booking_service_type}
                  options={categoryLevel1List.map((c) => ({
                    value: String(c.category_level1_id),
                    label: c.category_level1_name,
                  }))}
                  placeholder="Select Service Type"
                />
                <SelectField
                  label="Category Level 2"
                  name="booking_category_l2"
                  value={form.booking_category_l2}
                  onChange={handleCategoryChange}
                  error={errors.booking_category_l2}
                  options={categoryLevel2List.map((c) => ({
                    value: String(c.category_level2_id),
                    label: c.category_level2_name,
                  }))}
                  placeholder="Select Category L2"
                  disabled={!form.booking_service_type}
                />
                <SelectField
                  label="Category Level 3"
                  name="booking_category_l3"
                  value={form.booking_category_l3}
                  onChange={handleCategoryChange}
                  error={errors.booking_category_l3}
                  options={categoryLevel3List.map((c) => ({
                    value: String(c.category_level3_id),
                    label: c.category_level3_name,
                  }))}
                  placeholder="Select Category L3"
                  disabled={!form.booking_category_l2}
                />
                <InputField
                  label="Consumer ID *"
                  name="booking_consumer_id"
                  value={form.booking_consumer_id}
                  onChange={handleChange}
                  error={errors.booking_consumer_id}
                />
                <InputField
                  label="Assigned Vendor ID"
                  name="booking_assigned_vendor_id"
                  value={form.booking_assigned_vendor_id}
                  onChange={handleChange}
                  error={errors.booking_assigned_vendor_id}
                />
                <InputField
                  label="Schedule Time (Unix)"
                  name="booking_schedule_time"
                  value={form.booking_schedule_time}
                  onChange={handleChange}
                  error={errors.booking_schedule_time}
                />
              </div>
            </fieldset>

            {/* Address Information */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Address Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  {isLoaded ? (
                    <Autocomplete
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <InputField
                        label="Address *"
                        name="booking_address"
                        value={form.booking_address}
                        onChange={handleChange}
                        error={errors.booking_address}
                      />
                    </Autocomplete>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address *
                      </label>
                      <textarea
                        name="booking_address"
                        value={form.booking_address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
                      />
                      {errors.booking_address && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.booking_address}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <InputField
                  label="City *"
                  name="booking_city_name"
                  value={form.booking_city_name}
                  onChange={handleChange}
                  error={errors.booking_city_name}
                />
                <InputField
                  label="State *"
                  name="booking_state_name"
                  value={form.booking_state_name}
                  onChange={handleChange}
                  error={errors.booking_state_name}
                />
                <InputField
                  label="Pincode *"
                  name="booking_pincode"
                  value={form.booking_pincode}
                  onChange={handleChange}
                  error={errors.booking_pincode}
                />
              </div>
            </fieldset>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/admin/booking")}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Saving..." : "Add Booking"}
              </button>
            </div>
          </form>
        )}
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
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
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

/* ---- Reusable Select Field ---- */
const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}> = ({ label, name, value, onChange, options, error, placeholder = "Select...", disabled = false }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
        dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default AddBooking;
