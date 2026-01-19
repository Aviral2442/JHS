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


// ================ COMPONENTS ================

// Animated Header Component
const ContactHeader: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            Trusted Home Service Professionals
          </div> */}

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Fast & Reliable  
            <span className="block text-blue-400">Home Services</span>
            When You Need Them
          </h2>

          <p className="text-lg text-gray-700 mt-6 max-w-xl">
            Book expert plumbers, electricians, cleaners & technicians in minutes. 
            We serve Lucknow with 24/7 emergency support and verified professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="tel:8960628965"
              className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl text-white text-lg font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2"
            >
              <Phone /> Call Now
            </a>

            <a
              href="#contact"
              className="px-8 py-4 border border-black/20 rounded-xl hover:bg-white/10 transition"
            >
              Book Service Online
            </a>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-6 mt-14">
            {[
              { icon: <Star className="text-yellow-400" />, label: "4.9 Rated" },
              { icon: <Truck className="text-blue-400" />, label: "Same Day Service" },
              { icon: <Shield className="text-green-400" />, label: "Verified Staff" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-200 backdrop-blur-md rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – GLASS CONTACT CARD */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

            <h3 className="text-2xl font-bold mb-6">
              Need Immediate Help?
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Phone className="text-blue-800" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm">Call Us</p>
                  <p className="text-gray-900 text-lg font-semibold">
                    +91 8960628965
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <Mail className="text-green-400" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm">Email</p>
                  <p className="text-gray-900 text-lg font-semibold">
                    jeevancleaningservices@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <MapPin className="text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm">Location</p>
                  <p className="text-gray-900 text-lg font-semibold">
                    Lucknow Sukh Complex, SN 45, Munshi Pulia, Sector 16, Indira Nagar, Lucknow, Uttar Pradesh 226016
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="block mt-10 text-center py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:scale-105 transition"
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

    // Simulate API call
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
  };

  return (
    <div className="py-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Here for You, Anytime, Anywhere
              </h2>
              <p className="text-gray-600">
                Reach out to us through the contact form. Our team will respond
                quickly to assist you with your service needs.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Request Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your request. Our team will contact you within
                  30 minutes to confirm your service appointment.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Wrench size={16} className="inline mr-2" />
                      Service Needed
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="inline mr-2" />
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your service needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-r-lg hover:from-blue-600 hover:to-cyan-600 transition-all text-white rounded-xl transform hover:-translate-y-1 shadow-xl hover:shadow-2xl disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
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

                <p className="text-center text-gray-500 text-sm">
                  By submitting, you agree to our terms and privacy policy.
                  We'll contact you shortly.
                </p>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <div className="sticky top-24">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Phone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Phone Support</h4>
                      <p className="text-gray-600 mt-1">
                        Available 24/7 for emergencies
                      </p>
                      <a
                        href="tel:8885551234"
                        className="text-2xl font-bold text-gray-900 hover:text-blue-600 mt-2 block"
                      >
                        +91 8960628965
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                      <Mail className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Us</h4>
                      <p className="text-gray-600 mt-1">
                        General inquiries and quotes
                      </p>
                      <a
                        href="mailto:contact@homeservice.com"
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 mt-2 block"
                      >
                        jeevancleaningservices@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-xl mr-4">
                      <Building className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Head Office
                      </h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-700">
                          Lucknow Sukh Complex, SN 45,
                        </p>
                        <p className="text-gray-700">
                          Munshi Pulia, Sector 16, Indira Nagar,
                        </p>
                        <p className="text-gray-700">
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
    <section className="relative bg-white overflow-hidden py-24">

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Our Service Coverage
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We provide fast, reliable home services across Lucknow and nearby areas
          </p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 shadow-2xl">
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
    <div className="min-h-screen bg-white">
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
