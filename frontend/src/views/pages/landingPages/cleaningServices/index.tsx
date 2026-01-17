import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  Home, 
  Bath, 
  Users,
  Droplets,
  Scissors,
  Brush,
  Award,
  Heart,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Play,
  Search,
  Filter,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronDown,
  Zap,
  Truck,
  Wind,
  Thermometer,
  Layers,
  Target,
  ThumbsUp,
  FileText,
  ShieldCheck
} from 'lucide-react';

const ComprehensiveCleaningLanding: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'general-cleaning',
    date: '',
    frequency: 'one-time',
    squareFeet: '',
    bedrooms: '',
    bathrooms: '',
    message: ''
  });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Service categories
  const serviceCategories = [
    {
      id: 'general-cleaning',
      title: 'General House Cleaning',
      icon: <Home className="w-8 h-8" />,
      description: 'Complete home cleaning including dusting, vacuuming, mopping and sanitization',
      priceRange: '$120 - $280',
      duration: '2-4 hours',
      features: ['Living Areas', 'Bedrooms', 'Kitchen', 'Bathrooms', 'Dusting', 'Vacuuming', 'Mopping'],
      popular: true,
      color: 'blue'
    },
    {
      id: 'deep-cleaning',
      title: 'Deep Cleaning',
      icon: <Sparkles className="w-8 h-8" />,
      description: 'Intensive cleaning targeting hard-to-reach areas and built-up grime',
      priceRange: '$250 - $500',
      duration: '4-6 hours',
      features: ['Inside Appliances', 'Behind Furniture', 'Window Sills', 'Baseboards', 'Grout Cleaning', 'Cabinet Interiors'],
      popular: true,
      color: 'green'
    },
    {
      id: 'move-cleaning',
      title: 'Move In/Out Cleaning',
      icon: <Truck className="w-8 h-8" />,
      description: 'Thorough cleaning for moving preparation or post-move cleanup',
      priceRange: '$300 - $600',
      duration: '4-8 hours',
      features: ['Empty Home Cleaning', 'Appliance Interior', 'Cabinets & Drawers', 'Light Fixtures', 'Window Cleaning'],
      popular: false,
      color: 'purple'
    },
    {
      id: 'eco-cleaning',
      title: 'Eco-Friendly Cleaning',
      icon: <Droplets className="w-8 h-8" />,
      description: 'Green cleaning using environmentally safe, non-toxic products',
      priceRange: '$140 - $350',
      duration: '2-5 hours',
      features: ['Non-Toxic Products', 'Allergen Reduction', 'Chemical-Free', 'Sustainable Methods', 'Pet-Safe'],
      popular: true,
      color: 'teal'
    }
  ];

  // Gallery images
  const galleryImages = [
    { id: 1, title: 'Kitchen Deep Clean', category: 'deep-cleaning', description: 'Complete kitchen sanitation' },
    { id: 2, title: 'Bathroom Disinfection', category: 'general-cleaning', description: 'Professional bathroom cleaning' },
    { id: 3, title: 'Living Room Refresh', category: 'general-cleaning', description: 'Complete living area cleaning' },
    { id: 4, title: 'Eco-Friendly Clean', category: 'eco-cleaning', description: 'Green cleaning process' },
    { id: 5, title: 'Move-Out Service', category: 'move-cleaning', description: 'Empty home cleaning' },
    { id: 6, title: 'Window Cleaning', category: 'deep-cleaning', description: 'Interior window cleaning' }
  ];

  // Filtered gallery
  const filteredGallery = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Statistics
  const statistics = [
    { number: '15,000+', label: 'Homes Cleaned', icon: <Home className="w-6 h-6" /> },
    { number: '99%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6" /> },
    { number: '250+', label: 'Trained Professionals', icon: <Users className="w-6 h-6" /> },
    { number: '24/7', label: 'Customer Support', icon: <Clock className="w-6 h-6" /> }
  ];

  // Cleaning products
  const cleaningProducts = [
    {
      id: 1,
      name: 'Professional Steam Cleaner',
      category: 'Equipment',
      price: '$299.99',
      rating: 4.8,
      features: ['300°F Steam', '15 Attachments', '2-Year Warranty'],
      bestSeller: true
    },
    {
      id: 2,
      name: 'Eco-Friendly Cleaning Kit',
      category: 'Supplies',
      price: '$89.99',
      rating: 4.9,
      features: ['10 Natural Products', 'Reusable Bottles'],
      bestSeller: true
    },
    {
      id: 3,
      name: 'Microfiber Master Set',
      category: 'Accessories',
      price: '$49.99',
      rating: 4.7,
      features: ['24-Piece Set', 'Color Coded'],
      bestSeller: false
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'What cleaning products do you use?',
      answer: 'We use hospital-grade disinfectants and eco-friendly products. All our products are non-toxic, biodegradable, and safe for children and pets.'
    },
    {
      question: 'Are your cleaners background-checked?',
      answer: 'Yes, every cleaner undergoes thorough background checks, reference verification, and completes our intensive training program.'
    },
    {
      question: 'How do you determine pricing?',
      answer: 'Pricing is based on square footage, number of rooms, cleaning type, and frequency. We provide transparent quotes with no hidden fees.'
    },
    {
      question: 'What if I\'m not satisfied with the cleaning?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll return within 24 hours to re-clean the areas of concern at no additional cost.'
    }
  ];

  // Why choose us points
  const whyChooseUs = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Insured & Bonded',
      description: 'Full insurance coverage for your peace of mind'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Customized Cleaning',
      description: 'Tailored services to meet your specific needs'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Same-Day Service',
      description: 'Emergency cleaning available within hours'
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: 'Satisfaction Guarantee',
      description: '100% satisfaction or we re-clean for free'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'general-cleaning',
          date: '',
          frequency: 'one-time',
          squareFeet: '',
          bedrooms: '',
          bathrooms: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  // Set initial date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: formattedDate }));
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Hero Section with Enquiry Form */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Trusted & Insured Professionals</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Professional Home Cleaning
                <span className="block text-blue-200 mt-2">Made Simple & Effective</span>
              </h1>
              
              <p className="text-xl mb-8 max-w-2xl opacity-95">
                Experience spotless cleaning with our certified professionals. 
                We use eco-friendly products and advanced techniques to transform your space.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-lg">100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-lg">Same-Day Service Available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-lg">Customized Cleaning Plans</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm opacity-80">Google Reviews</div>
                </div>
                <div className="h-12 w-px bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15K+</div>
                  <div className="text-sm opacity-80">Homes Cleaned</div>
                </div>
                <div className="h-12 w-px bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
              </div>
            </div>
            
            {/* Enquiry Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Get Your Free Quote</h2>
                <p className="text-gray-600 mt-2">Complete cleaning in as little as 24 hours</p>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We'll contact you within 2 hours with your personalized quote.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type*</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="">Select a service</option>
                      {serviceCategories.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="">Select</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="">Select</option>
                        <option value="1">1 Bathroom</option>
                        <option value="2">2 Bathrooms</option>
                        <option value="3">3+ Bathrooms</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Frequency*</label>
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="one-time">One-time</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date*</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Special requests, pets, allergies, or specific areas to focus on..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-70 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing Your Quote...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Get Your Free Quote
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-gray-500">
                    By submitting, you agree to our terms. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Homeowners Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our professional cleaning approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Cleaning Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive cleaning solutions for every need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${service.popular ? 'border-blue-500' : 'border-transparent'} transition-all duration-300 hover:shadow-xl`}
              >
                {service.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4
                      ${service.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                      ${service.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                      ${service.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                      ${service.color === 'teal' ? 'bg-teal-100 text-teal-600' : ''}
                    `}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-2xl font-bold text-gray-900">{service.priceRange}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="text-lg font-semibold text-gray-900">{service.duration}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-8 py-4">
                  <button 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: service.id }));
                      document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book This Service
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Cleaning Gallery
              </h2>
              <p className="text-gray-600">See the transformation in action</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All
              </button>
              {serviceCategories.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveCategory(service.id)}
                  className={`px-4 py-2 rounded-full capitalize ${activeCategory === service.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {service.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {filteredGallery.map((image, index) => (
              <div 
                key={image.id} 
                className={`rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 hover:scale-105
                  ${index % 3 === 0 ? 'bg-blue-50' : ''}
                  ${index % 3 === 1 ? 'bg-green-50' : ''}
                  ${index % 3 === 2 ? 'bg-purple-50' : ''}
                `}
                onClick={() => setCurrentImageIndex(index)}
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 opacity-20 mb-2">
                        {index + 1}
                      </div>
                      <div className="text-gray-900 font-semibold">{image.title}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <div className="font-semibold">{image.title}</div>
                      <div className="text-sm opacity-90">{image.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Gallery Item */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Featured: {filteredGallery[currentImageIndex]?.title}
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={prevImage}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-blue-900">
                      Professional Results
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Service Details</h4>
                  <p className="text-gray-700 mb-6">
                    Our certified professionals follow a detailed 72-point checklist to ensure every 
                    surface is thoroughly cleaned, disinfected, and polished to perfection.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Time Required</div>
                      <div className="text-xl font-bold text-gray-900">3-5 hours</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Team Size</div>
                      <div className="text-xl font-bold text-gray-900">2 professionals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Cleaning Products
            </h2>
            <p className="text-xl text-gray-600">
              Shop our curated selection of cleaning supplies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cleaningProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`p-8 ${product.bestSeller ? 'bg-gradient-to-r from-blue-50 to-blue-100' : 'bg-gray-50'}`}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {product.name.split(' ')[0]}
                    </div>
                    <div className="text-gray-600">{product.category}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition duration-300"
                    onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  >
                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for a Spotless Home?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Get your first cleaning at 15% off. No contracts, cancel anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Cleaning Now
              </button>
              <a 
                href="tel:+18005551234"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComprehensiveCleaningLanding;