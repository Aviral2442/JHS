import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  User,
  MessageSquare,
  Home,
  Navigation,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'info'>('form');

  const contactInfo: ContactInfo[] = [
    {
      id: 1,
      title: 'Visit Our Office',
      description: 'Stop by for a face-to-face consultation',
      icon: MapPin,
      details: ['123 Home Service Lane', 'San Francisco, CA 94107', 'United States']
    },
    {
      id: 2,
      title: 'Call Us',
      description: 'Available during business hours',
      icon: Phone,
      details: ['Main: (555) 123-4567', 'Support: (555) 987-6543', 'Emergency: (555) 911-0000']
    },
    {
      id: 3,
      title: 'Email Us',
      description: 'We respond within 24 hours',
      icon: Mail,
      details: ['support@homeease.com', 'sales@homeease.com', 'emergency@homeease.com']
    },
    {
      id: 4,
      title: 'Business Hours',
      description: 'Our availability to serve you',
      icon: Clock,
      details: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM']
    }
  ];

  const branches = [
    {
      id: 1,
      city: 'San Francisco',
      address: '123 Home Service Lane, SF 94107',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 8AM-8PM'
    },
    {
      id: 2,
      city: 'New York',
      address: '456 Service Avenue, NY 10001',
      phone: '(555) 234-5678',
      hours: 'Mon-Fri: 9AM-9PM'
    },
    {
      id: 3,
      city: 'Chicago',
      address: '789 Maintenance Blvd, CH 60601',
      phone: '(555) 345-6789',
      hours: 'Mon-Fri: 8AM-7PM'
    },
    {
      id: 4,
      city: 'Los Angeles',
      address: '101 Renovation St, LA 90001',
      phone: '(555) 456-7890',
      hours: 'Mon-Fri: 7AM-8PM'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions about our services? We're here to help and would love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-white p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'form'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Send Message
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'info'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact Info
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="space-y-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-8">
                <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                  <Send className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline h-4 w-4 mr-1" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-1" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                      placeholder="Tell us about your home service needs..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold transition-all ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Information Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <info.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {info.details.map((detail, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Map and Branches */}
          <div className="space-y-12">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Navigation className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Find Our Locations</h2>
                    <p className="text-gray-600">Visit one of our branches nationwide</p>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
                {/* Simplified Map Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full opacity-30"></div>
                    
                    {/* City Markers */}
                    {[
                      { left: '20%', top: '30%', city: 'SF' },
                      { left: '70%', top: '40%', city: 'NY' },
                      { left: '40%', top: '60%', city: 'CH' },
                      { left: '10%', top: '70%', city: 'LA' }
                    ].map((marker, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                        style={{ left: marker.left, top: marker.top }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <MapPin className="h-6 w-6 text-red-500" />
                        <span className="absolute -top-6 text-xs font-semibold bg-gray-900 text-white px-2 py-1 rounded">
                          {marker.city}
                        </span>
                      </motion.div>
                    ))}

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line
                        x1="20%"
                        y1="30%"
                        x2="70%"
                        y2="40%"
                        stroke="#4F46E5"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="70%"
                        y1="40%"
                        x2="40%"
                        y2="60%"
                        stroke="#4F46E5"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="40%"
                        y1="60%"
                        x2="10%"
                        y2="70%"
                        stroke="#4F46E5"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">Branch Location</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">Service Area</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <p className="text-sm text-gray-600 text-center">
                  Hover over markers to see branch details • Click to get directions
                </p>
              </div>
            </motion.div>

            {/* Branches List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-8">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Branches</h2>
                  <p className="text-gray-600">Find a HomeEase branch near you</p>
                </div>
              </div>

              <div className="space-y-6">
                {branches.map((branch) => (
                  <motion.div
                    key={branch.id}
                    whileHover={{ x: 5 }}
                    className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group cursor-pointer"
                  >
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
                      <MapPin className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{branch.city}</h3>
                          <p className="text-sm text-gray-600">{branch.address}</p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                          {branch.hours}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-700">
                        <Phone className="h-4 w-4 mr-2" />
                        {branch.phone}
                        <button className="ml-auto text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center">
                          Get Directions
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <p className="text-blue-100 mb-6">
                Follow us on social media for updates, tips, and special offers.
              </p>
              
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
                  { icon: Twitter, label: 'Twitter', color: 'bg-sky-500' },
                  { icon: Instagram, label: 'Instagram', color: 'bg-pink-600' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-700' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    whileHover={{ y: -3 }}
                    className={`${social.color} p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center justify-center flex-1`}
                  >
                    <social.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Common questions about our services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: 'How quickly can I get a service booked?',
                answer: 'Most services can be booked within 2 hours. Emergency services are available 24/7.'
              },
              {
                question: 'Are your professionals background checked?',
                answer: 'Yes, all our professionals undergo thorough background checks and verification.'
              },
              {
                question: 'What areas do you service?',
                answer: 'We currently service major metropolitan areas across the United States.'
              },
              {
                question: 'Do you offer emergency services?',
                answer: 'Yes, emergency plumbing, electrical, and AC services are available 24/7.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}