import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Check,
  Shield,
  Truck,
  Wrench,
  Send,
  User,
  FileText,
  Building,
} from "lucide-react";
import axios from "axios";

// ================ COMPONENTS ================

// Animated Header Component
const ContactHeader: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--white-color)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            Trusted Home Service Professionals
          </div> */}

          <h2 className="section-title text-4xl md:text-6xl leading-tight">
            Fast & Reliable
            <span className="block" style={{ color: "var(--sky-blue)" }}>
              Home Services
            </span>
            When You Need Them
          </h2>

          <p
            className="text-lg mt-6 max-w-xl"
            style={{ color: "var(--gray-color)" }}
          >
            Book expert plumbers, electricians, cleaners & technicians in
            minutes. We serve Lucknow with 24/7 emergency support and verified
            professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="tel:8960628965"
              className="btn-primary px-8 py-4 rounded-xl text-lg flex items-center gap-2"
            >
              <Phone /> Call Now
            </a>

            <a href="#contact" className="btn-outline px-8 py-4 rounded-xl">
              Book Service Online
            </a>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-6 mt-14">
            {[
              {
                icon: <Star style={{ color: "var(--sky-blue)" }} />,
                label: "4.9 Rated",
              },
              {
                icon: <Truck style={{ color: "var(--sky-blue)" }} />,
                label: "Same Day Service",
              },
              {
                icon: <Shield style={{ color: "var(--sky-blue)" }} />,
                label: "Verified Staff",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="backdrop-blur-md rounded-xl p-4 text-center"
                style={{ backgroundColor: "var(--background-alt)" }}
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-sm" style={{ color: "var(--gray-color)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – GLASS CONTACT CARD */}
        <div className="relative">
          <div className="card-ui rounded-3xl p-10">
            <h3 className="card-title text-2xl mb-6">Need Immediate Help?</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(0, 173, 181, 0.2)" }}
                >
                  <Phone style={{ color: "var(--sky-blue)" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "var(--gray-color)" }}>
                    Call Us
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "var(--black-color)" }}
                  >
                    +91 8960628965
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(0, 173, 181, 0.2)" }}
                >
                  <Mail style={{ color: "var(--sky-blue)" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "var(--gray-color)" }}>
                    Email
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "var(--black-color)" }}
                  >
                    jeevancleaningservices@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(0, 173, 181, 0.2)" }}
                >
                  <MapPin style={{ color: "var(--sky-blue)" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "var(--gray-color)" }}>
                    Location
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "var(--black-color)" }}
                  >
                    Lucknow Sukh Complex, SN 45, Munshi Pulia, Sector 16, Indira
                    Nagar, Lucknow, Uttar Pradesh 226016
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-primary block mt-10 text-center py-4 rounded-xl"
            >
              Request a Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Interactive Contact Form
const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const baseURL = import.meta.env.VITE_BACK_URL || "http://localhost:5000";

  const serviceOptions = [
    "Plumbing Repair",
    "Electrical Work",
    "HVAC Services",
    "Home Renovation",
    "Emergency Repair",
    "Maintenance Check",
    "Consultation",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      wcf_name: formData.name,
      wcf_email: formData.email,
      wcf_phone: formData.phone,
      wcf_subject: formData.service,
      wcf_message: formData.message,
    };

    await axios
      .post(`${baseURL}/api/home/add_contact_us`, payload)
      .then((result) => {
        if (result.data.status === 200) {
          console.log("Contact form submitted successfully");
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
              name: "",
              email: "",
              phone: "",
              service: "",
              message: "",
            });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Error submitting contact form:", err);
      });
  };

  return (
    <div
      className="section-wrapper"
      style={{ backgroundColor: "var(--background-alt)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <div className="mb-10">
              <h2 className="section-title text-3xl md:text-4xl mb-4">
                Here for You, Anytime, Anywhere
              </h2>
              <p style={{ color: "var(--gray-color)" }}>
                Reach out to us through the contact form. Our team will respond
                quickly to assist you with your service needs.
              </p>
            </div>

            {isSubmitted ? (
              <div
                className="card-ui rounded-2xl p-8 text-center"
                style={{
                  borderWidth: "1px",
                  borderColor: "rgba(0, 173, 181, 0.3)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "rgba(0, 173, 181, 0.2)" }}
                >
                  <Check size={40} style={{ color: "var(--sky-blue)" }} />
                </div>
                <h3 className="card-title text-2xl mb-3">Request Submitted!</h3>
                <p className="mb-6" style={{ color: "var(--gray-color)" }}>
                  Thank you for your request. Our team will contact you within
                  30 minutes to confirm your service appointment.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-semibold"
                  style={{ color: "var(--sky-blue)" }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--gray-color)" }}
                    >
                      <User size={16} className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        borderColor: "var(--gray-color)",
                        backgroundColor: "var(--white-color)",
                      }}
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--gray-color)" }}
                    >
                      <Mail size={16} className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        borderColor: "var(--gray-color)",
                        backgroundColor: "var(--white-color)",
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--gray-color)" }}
                    >
                      <Phone size={16} className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        borderColor: "var(--gray-color)",
                        backgroundColor: "var(--white-color)",
                      }}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--gray-color)" }}
                    >
                      <Wrench size={16} className="inline mr-2" />
                      Service Needed
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{
                        borderColor: "var(--gray-color)",
                        backgroundColor: "var(--white-color)",
                      }}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--gray-color)" }}
                  >
                    <FileText size={16} className="inline mr-2" />
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                      borderColor: "var(--gray-color)",
                      backgroundColor: "var(--white-color)",
                    }}
                    placeholder="Please describe your service needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 rounded-xl transform hover:-translate-y-1 shadow-xl hover:shadow-2xl disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-3" />
                      Submit
                    </>
                  )}
                </button>

                <p
                  className="text-center text-sm"
                  style={{ color: "var(--gray-color)" }}
                >
                  By submitting, you agree to our terms and privacy policy.
                  We'll contact you shortly.
                </p>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <div className="sticky top-24">
              <div className="card-ui rounded-2xl p-8 mb-8">
                <h3 className="card-title text-2xl mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ backgroundColor: "var(--background-alt)" }}
                    >
                      <Phone style={{ color: "var(--sky-blue)" }} size={24} />
                    </div>
                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: "var(--black-color)" }}
                      >
                        Phone Support
                      </h4>
                      <p
                        className="mt-1"
                        style={{ color: "var(--gray-color)" }}
                      >
                        Available 24/7 for emergencies
                      </p>
                      <a
                        href="tel:8885551234"
                        className="text-2xl font-bold mt-2 block hover:opacity-80"
                        style={{ color: "var(--black-color)" }}
                      >
                        +91 8960628965
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ backgroundColor: "var(--background-alt)" }}
                    >
                      <Mail style={{ color: "var(--sky-blue)" }} size={24} />
                    </div>
                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: "var(--black-color)" }}
                      >
                        Email Us
                      </h4>
                      <p
                        className="mt-1"
                        style={{ color: "var(--gray-color)" }}
                      >
                        General inquiries and quotes
                      </p>
                      <a
                        href="mailto:contact@homeservice.com"
                        className="text-lg font-medium mt-2 block hover:opacity-80"
                        style={{ color: "var(--black-color)" }}
                      >
                        jeevancleaningservices@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ backgroundColor: "var(--background-alt)" }}
                    >
                      <Building
                        style={{ color: "var(--sky-blue)" }}
                        size={24}
                      />
                    </div>
                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: "var(--black-color)" }}
                      >
                        Head Office
                      </h4>
                      <div className="mt-2 space-y-1">
                        <p style={{ color: "var(--gray-color)" }}>
                          Lucknow Sukh Complex, SN 45,
                        </p>
                        <p style={{ color: "var(--gray-color)" }}>
                          Munshi Pulia, Sector 16, Indira Nagar,
                        </p>
                        <p style={{ color: "var(--gray-color)" }}>
                          Lucknow, Uttar Pradesh 226016
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Card */}
              {/* <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Shield className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Guarantee
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    "100% Satisfaction Guaranteed",
                    "Licensed & Insured Professionals",
                    "Upfront Pricing - No Hidden Fees",
                    "Same-Day Service Available",
                    "1-Year Warranty on All Work",
                    "Clean & Professional Service",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Map Component
const LocationMap: React.FC = () => {
  return (
    <section className="section-wrapper relative overflow-hidden py-24">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold">
            Our Service Coverage
          </h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            We provide fast, reliable home services across Lucknow and nearby
            areas
          </p>
        </div>

        {/* Glass Card */}
        <div className="card-ui rounded-3xl p-4 md:p-6 shadow-2xl">
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6764.947135035159!2d80.995199!3d26.886113!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995938108ae189%3A0x5e9d35bc7ae00695!2sJeevan%20Cleaning%20Services%20-%20Quality%20Cleaning%20Service%2C%20House%20Cleaning%20Services%20%26%20Cleaning%20Services%20in%20Lucknow!5e1!3m2!1sen!2sin!4v1768152993441!5m2!1sen!2sin"
              className="w-full h-[400px] rounded-2xl"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ================ MAIN CONTACT PAGE ================
const ContactPage: React.FC = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--white-color)" }}
    >
      {/* Header */}
      <ContactHeader />

      {/* Main Content Spacing */}
      <div className="relative">
        {/* Contact Form & Info */}
        <ContactFormSection />

        {/* Location Map */}
        <LocationMap />
      </div>
    </div>
  );
};

export default ContactPage;
