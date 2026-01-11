import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Clock, MessageSquare,
  ChevronRight, Star, Check, Shield,
  Truck, Home, Wrench, Droplets, Sparkles,
  Thermometer, Zap, Wind, Sun,
  Send, AlertCircle, User, Calendar, FileText
} from 'lucide-react';

// ================ TYPES ================
interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialties: string[];
  rating: number;
}

interface ServiceArea {
  id: number;
  area: string;
  zipCodes: string[];
  travelTime: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ================ COMPONENTS ================

// Animated Header Component
const ContactHeader: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20 pb-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Sparkles size={16} className="mr-2" />
            <span className="text-sm font-medium">24/7 Emergency Service Available</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Trusted
            <span className="block text-blue-300 mt-2">Home Service Experts</span>
          </h1>

          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
            Professional home services at your doorstep. From plumbing to electrical,
            we handle it all with expertise and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center">
              <Phone size={20} className="mr-2" />
              <span className="text-lg font-semibold">Call Now: (888) 555-1234</span>
            </button>
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center">
              <MessageSquare size={20} className="mr-2" />
              <span className="text-lg font-semibold">Chat Online</span>
              <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Service Icons */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { icon: <Wrench />, label: 'Plumbing' },
              { icon: <Zap />, label: 'Electrical' },
              { icon: <Thermometer />, label: 'HVAC' },
              { icon: <Droplets />, label: 'Water' },
              { icon: <Wind />, label: 'Ventilation' },
              { icon: <Sun />, label: 'Solar' }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <p className="text-center font-semibold text-gray-800">{service.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Categories Component
const ServiceCategories: React.FC = () => {
  const categories: ServiceCategory[] = [
    {
      id: 1,
      name: 'Plumbing Services',
      description: 'Emergency repairs, installations, and maintenance',
      icon: <Droplets size={32} />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Electrical Work',
      description: 'Wiring, lighting, and electrical system upgrades',
      icon: <Zap size={32} />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      name: 'HVAC Services',
      description: 'Heating, ventilation, and air conditioning',
      icon: <Thermometer size={32} />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Home Renovation',
      description: 'Complete home remodeling and upgrades',
      icon: <Home size={32} />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      name: 'Emergency Services',
      description: '24/7 emergency repair and assistance',
      icon: <Clock size={32} />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 6,
      name: 'Maintenance Plans',
      description: 'Regular maintenance and service packages',
      icon: <Shield size={32} />,
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a wide range of professional home services to keep your home safe and comfortable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>

              <div className="flex items-center text-blue-600 font-semibold">
                <span>Learn More</span>
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Interactive Contact Form
const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    'Plumbing Repair',
    'Electrical Work',
    'HVAC Services',
    'Home Renovation',
    'Emergency Repair',
    'Maintenance Check',
    'Consultation',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Schedule a Service Visit
              </h2>
              <p className="text-gray-600">
                Fill out the form below and our team will contact you within 30 minutes to schedule your service
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your request. Our team will contact you within 30 minutes
                  to confirm your service appointment.
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Wrench size={16} className="inline mr-2" />
                    Service Needed *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="inline mr-2" />
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your service needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-3" />
                      Schedule Free Consultation
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  By submitting, you agree to our terms and privacy policy. We'll contact you shortly.
                </p>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Phone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Phone Support</h4>
                      <p className="text-gray-600 mt-1">Available 24/7 for emergencies</p>
                      <a href="tel:8885551234" className="text-2xl font-bold text-gray-900 hover:text-blue-600 mt-2 block">
                        (888) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                      <Mail className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Us</h4>
                      <p className="text-gray-600 mt-1">General inquiries and quotes</p>
                      <a href="mailto:contact@homeservice.com" className="text-lg font-medium text-gray-900 hover:text-blue-600 mt-2 block">
                        contact@homeservice.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-xl mr-4">
                      <Clock className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Business Hours</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-700">Monday - Friday: 7:00 AM - 9:00 PM</p>
                        <p className="text-gray-700">Saturday: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-700">Sunday: 9:00 AM - 5:00 PM</p>
                        <p className="text-blue-600 font-semibold mt-2">Emergency: 24/7 Service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Shield className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-bold text-gray-900">Our Guarantee</h3>
                </div>

                <ul className="space-y-4">
                  {[
                    '100% Satisfaction Guaranteed',
                    'Licensed & Insured Professionals',
                    'Upfront Pricing - No Hidden Fees',
                    'Same-Day Service Available',
                    '1-Year Warranty on All Work',
                    'Clean & Professional Service'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Map Component
const LocationMap: React.FC = () => {
  const serviceAreas: ServiceArea[] = [
    {
      id: 1,
      area: 'Downtown',
      zipCodes: ['10001', '10002', '10003'],
      travelTime: '15-30 mins'
    },
    {
      id: 2,
      area: 'Uptown',
      zipCodes: ['10021', '10022', '10023'],
      travelTime: '30-45 mins'
    },
    {
      id: 3,
      area: 'Brooklyn',
      zipCodes: ['11201', '11205', '11215'],
      travelTime: '45-60 mins'
    },
    {
      id: 4,
      area: 'Queens',
      zipCodes: ['11101', '11354', '11423'],
      travelTime: '60-75 mins'
    }
  ];

  const [selectedArea, setSelectedArea] = useState<ServiceArea>(serviceAreas[0]);

  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Service Areas & Location
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We proudly serve the greater metropolitan area with quick response times
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Our Headquarters</h3>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={20} className="mr-2" />
                    <span>123 Service Avenue, New York, NY 10001</span>
                  </div>
                </div>
                <div className="bg-blue-800 px-4 py-2 rounded-lg">
                  <span className="font-bold">Main Office</span>
                </div>
              </div>

              {/* Animated Map Visualization */}
              <div className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="absolute border border-gray-700" style={{
                      left: `${(i % 5) * 20}%`,
                      top: `${Math.floor(i / 5) * 20}%`,
                      width: '20%',
                      height: '20%'
                    }} />
                  ))}
                </div>

                {/* Service Area Markers */}
                {serviceAreas.map((area, index) => {
                  const positions = [
                    { left: '30%', top: '40%' },
                    { left: '60%', top: '30%' },
                    { left: '40%', top: '70%' },
                    { left: '70%', top: '60%' }
                  ];

                  return (
                    <div
                      key={area.id}
                      className={`absolute w-8 h-8 rounded-full cursor-pointer transform transition-all duration-300 ${selectedArea.id === area.id
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-125 ring-4 ring-blue-500/50'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:scale-110'
                        }`}
                      style={positions[index]}
                      onClick={() => setSelectedArea(area)}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                        {area.area}
                      </div>
                    </div>
                  );
                })}

                {/* Center Marker (Headquarters) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <Home size={24} className="text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                      Headquarters
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-sm text-gray-400">Coverage Radius</div>
                  <div className="text-2xl font-bold">50 Miles</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-sm text-gray-400">Average Response</div>
                  <div className="text-2xl font-bold">45 Min</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas List */}
          <div>
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8">Service Areas We Cover</h3>

              <div className="space-y-6">
                {serviceAreas.map((area) => (
                  <div
                    key={area.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all ${selectedArea.id === area.id
                        ? 'bg-gradient-to-r from-blue-800 to-blue-900 border border-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700/50'
                      }`}
                    onClick={() => setSelectedArea(area)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xl font-bold">{area.area}</h4>
                      {selectedArea.id === area.id && (
                        <div className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          Selected
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.zipCodes.map((zip) => (
                        <span key={zip} className="px-3 py-1 bg-gray-700 rounded-lg text-sm">
                          {zip}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-300">
                        <Truck size={20} className="mr-2" />
                        <span>Travel Time: {area.travelTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                        <span className="font-bold">4.8</span>
                        <span className="text-gray-400 ml-1">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl">
                <h4 className="font-bold text-lg mb-3">Check Your Area</h4>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter your ZIP code"
                    className="flex-grow px-4 py-3 bg-gray-900 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-r-xl hover:from-blue-600 hover:to-cyan-600 transition-all">
                    Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Members Component
const TeamMembers: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      role: 'Lead Plumber',
      experience: '15+ Years',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
      specialties: ['Emergency Repair', 'Pipe Installation', 'Water Heater'],
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Electrical Expert',
      experience: '12+ Years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      specialties: ['Wiring', 'Lighting', 'Panel Upgrade'],
      rating: 4.8
    },
    {
      id: 3,
      name: 'Robert Chen',
      role: 'HVAC Specialist',
      experience: '18+ Years',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      specialties: ['AC Repair', 'Heating Systems', 'Duct Cleaning'],
      rating: 5.0
    },
    {
      id: 4,
      name: 'Emily Wilson',
      role: 'Service Manager',
      experience: '10+ Years',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      specialties: ['Project Management', 'Customer Service', 'Quality Control'],
      rating: 4.9
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Licensed, insured, and background-checked professionals dedicated to quality service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {member.experience}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                    <span className="font-bold">{member.rating}</span>
                  </div>
                </div>

                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all font-semibold flex items-center justify-center">
                  <MessageSquare size={18} className="mr-2" />
                  Contact Expert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FAQ Section
const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "What are your emergency service hours?",
      answer: "We provide 24/7 emergency services for urgent home repairs. Our emergency team is always on standby to handle plumbing leaks, electrical issues, HVAC breakdowns, and other critical situations that require immediate attention."
    },
    {
      question: "Do you offer free estimates?",
      answer: "Yes, we provide free, no-obligation estimates for all our services. Our expert will visit your home, assess the situation, and provide a detailed written estimate with transparent pricing before any work begins."
    },
    {
      question: "Are your technicians licensed and insured?",
      answer: "Absolutely. All our technicians are fully licensed, insured, and background-checked. We maintain up-to-date certifications for plumbing, electrical, HVAC, and other specialized trades to ensure professional and compliant service."
    },
    {
      question: "What is your warranty policy?",
      answer: "We offer a 1-year warranty on all labor and a 2-year warranty on parts for most services. Specific warranty terms may vary by service type and will be clearly outlined in your service agreement."
    },
    {
      question: "How quickly can you respond to service requests?",
      answer: "For emergency services, we aim to have a technician at your location within 60 minutes. For scheduled appointments, we offer same-day service in most cases, with flexible scheduling options to fit your timeline."
    },
    {
      question: "Do you offer maintenance plans?",
      answer: "Yes, we offer comprehensive maintenance plans that include regular inspections, priority service, discounts on repairs, and extended warranties. Plans are available for individual systems or whole-home coverage."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">
                  {item.question}
                </h3>
                <div className={`transform transition-transform ${expandedIndex === index ? 'rotate-180' : ''
                  }`}>
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              </button>

              {expandedIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Component
const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      location: 'Brooklyn, NY',
      rating: 5,
      comment: 'Emergency plumbing repair at 2 AM! The technician arrived within 45 minutes and fixed the issue professionally. Outstanding service!',
      service: 'Emergency Plumbing',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'David Thompson',
      location: 'Manhattan, NY',
      rating: 5,
      comment: 'Complete electrical rewiring of our 1920s home. The team was professional, clean, and finished ahead of schedule. Highly recommended!',
      service: 'Electrical Work',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Susan Lee',
      location: 'Queens, NY',
      rating: 5,
      comment: 'HVAC system installation was seamless. The team explained everything clearly and left our home spotless. Great value for money.',
      service: 'HVAC Installation',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join thousands of satisfied homeowners who trust us with their home service needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-blue-200">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 mr-1"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-200 mb-6 italic">"{testimonial.comment}"</p>

              <div className="pt-6 border-t border-white/20">
                <span className="px-4 py-2 bg-blue-800/50 rounded-full text-sm">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/5 p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-blue-200">Average Rating</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-blue-200">Happy Customers</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">45 min</div>
            <div className="text-blue-200">Avg. Response Time</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-2">99%</div>
            <div className="text-blue-200">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const ContactFooter: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: <Twitter />, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: <Instagram />, label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: <Youtube />, label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: <Linkedin />, label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <Home size={24} />
              </div>
              <span className="text-2xl font-bold">HomeService Pro</span>
            </div>
            <p className="text-gray-400 mb-8">
              Your trusted partner for all home service needs. Professional, reliable, and always there when you need us.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Services', 'Pricing', 'About Us', 'Careers', 'Blog', 'Press'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">123 Service Avenue, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">(888) 555-1234</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">contact@homeservice.com</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">24/7 Emergency Service</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe for maintenance tips and exclusive offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-3 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-r-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2023 HomeService Pro. All rights reserved. |
            <a href="#" className="hover:text-white mx-2">Privacy Policy</a> |
            <a href="#" className="hover:text-white mx-2">Terms of Service</a> |
            <a href="#" className="hover:text-white mx-2">Licenses</a>
          </p>
          <p className="mt-2">License #: HS123456 | Insured & Bonded</p>
        </div>
      </div>
    </footer>
  );
};

// Emergency Banner Component
const EmergencyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-pulse">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-2xl max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertCircle size={24} className="mr-3" />
            <h3 className="text-lg font-bold">Emergency Service</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
        <p className="text-sm mb-4">Need immediate assistance? We're here to help 24/7</p>
        <a
          href="tel:8885551234"
          className="block w-full py-3 bg-white text-red-600 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
        >
          <Phone size={20} className="inline mr-2" />
          Call Now: (888) 555-1234
        </a>
      </div>
    </div>
  );
};

// ================ MAIN CONTACT PAGE ================
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Header */}
      <ContactHeader />

      {/* Main Content Spacing */}
      <div className="relative -mb-16">
        {/* Service Categories */}
        <ServiceCategories />

        {/* Contact Form & Info */}
        <ContactFormSection />

        {/* Location Map */}
        <LocationMap />

        {/* Team Members */}
        <TeamMembers />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <ContactFooter />
      </div>
    </div>
  );
};

export default ContactPage;