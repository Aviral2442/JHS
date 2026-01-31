import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  Home, 
  Users,
  Lightbulb,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Phone,
  ChevronDown,
  Zap,
  Ruler,
  Target,
  ThumbsUp,
  FileText,
  ShieldCheck,
  Layers
} from 'lucide-react';

const ComprehensiveInteriorLanding: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'residential-design',
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
      id: 'residential-design',
      title: 'Residential Interior Design',
      icon: <Home className="w-8 h-8" />,
      description: 'Complete home interior design including living rooms, bedrooms, and kitchens',
      priceRange: '$2,500 - $8,000',
      duration: '4-8 weeks',
      features: ['Space Planning', '3D Visualization', 'Color Schemes', 'Furniture Selection', 'Lighting Design', 'Custom Details'],
      popular: true,
      color: 'blue'
    },
    {
      id: 'commercial-design',
      title: 'Commercial Interior Design',
      icon: <Layers className="w-8 h-8" />,
      description: 'Professional office and retail space design for optimal functionality',
      priceRange: '$5,000 - $20,000',
      duration: '6-12 weeks',
      features: ['Brand Integration', 'Workflow Optimization', 'Reception Design', 'Meeting Rooms', 'Ergonomic Layout'],
      popular: false,
      color: 'green'
    },
    {
      id: 'renovation-design',
      title: 'Renovation & Remodeling',
      icon: <Ruler className="w-8 h-8" />,
      description: 'Transform existing spaces with complete renovation design services',
      priceRange: '$3,500 - $15,000',
      duration: '8-16 weeks',
      features: ['Structural Planning', 'Material Selection', 'Contractor Coordination', 'Budget Management', 'Timeline Planning'],
      popular: true,
      color: 'purple'
    },
    {
      id: 'consultation',
      title: 'Design Consultation',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'Expert advice and guidance for your interior design projects',
      priceRange: '$500 - $2,000',
      duration: '1-2 weeks',
      features: ['Color Consultation', 'Layout Advice', 'Style Direction', 'Budget Planning', 'Product Recommendations'],
      popular: true,
      color: 'teal'
    }
  ];

  // Gallery images
  const galleryImages = [
    { id: 1, title: 'Modern Living Room', category: 'residential-design', description: 'Contemporary living space' },
    { id: 2, title: 'Executive Office', category: 'commercial-design', description: 'Professional workspace design' },
    { id: 3, title: 'Kitchen Remodel', category: 'renovation-design', description: 'Complete kitchen transformation' },
    { id: 4, title: 'Bedroom Suite', category: 'residential-design', description: 'Luxury bedroom design' },
    { id: 5, title: 'Retail Space', category: 'commercial-design', description: 'Modern retail interior' },
    { id: 6, title: 'Color Scheme', category: 'consultation', description: 'Professional color selection' }
  ];

  // Filtered gallery
  const filteredGallery = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Statistics
  const statistics = [
    { number: '500+', label: 'Projects Completed', icon: <Home className="w-6 h-6" /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { number: '50+', label: 'Professional Designers', icon: <Users className="w-6 h-6" /> },
    { number: '15+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> }
  ];

  // Design products
  const designProducts = [
    {
      id: 1,
      name: 'Premium Design Package',
      category: 'Service',
      price: '$4,999',
      rating: 4.9,
      features: ['Complete Room Design', '3D Renderings', 'Shopping List'],
      bestSeller: true
    },
    {
      id: 2,
      name: 'Color Consultation Kit',
      category: 'Consultation',
      price: '$799',
      rating: 4.8,
      features: ['Color Palette', 'Sample Boards', 'Expert Advice'],
      bestSeller: true
    },
    {
      id: 3,
      name: 'Virtual Design Session',
      category: 'Online',
      price: '$299',
      rating: 4.7,
      features: ['1-Hour Session', 'Design Plan', 'Follow-up Support'],
      bestSeller: false
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'What is included in an interior design service?',
      answer: 'Our full-service interior design includes initial consultation, space planning, 3D visualizations, color schemes, furniture and fixture selection, custom design elements, and project management through completion.'
    },
    {
      question: 'How long does a typical interior design project take?',
      answer: 'Project timelines vary based on scope. A single room typically takes 4-6 weeks, while a full home or commercial space can take 8-16 weeks from concept to completion.'
    },
    {
      question: 'Do you work with my existing furniture?',
      answer: 'Absolutely! We can incorporate your existing pieces into the new design or help you source new items that complement your style and budget.'
    },
    {
      question: 'What is your design process?',
      answer: 'We start with a consultation to understand your needs, create design concepts, refine based on your feedback, develop detailed plans, and oversee implementation to ensure your vision comes to life.'
    }
  ];

  // Why choose us points
  const whyChooseUs = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Licensed Designers',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Custom Solutions',
      description: 'Tailored designs that reflect your unique style'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Turnaround',
      description: 'Efficient process without compromising quality'
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: 'Budget Friendly',
      description: 'Beautiful designs that fit your budget'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'residential-design',
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
    <div className="min-h-screen">
      {/* Hero Section with Enquiry Form */}
      <section className="relative overflow-hidden max-w-[90%] mx-auto">
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
                <span className="text-sm font-medium">Award-Winning Interior Designers</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your
                <span className="block mt-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Living Space</span>
              </h1>
              
              <p className="text-xl mb-8 max-w-2xl opacity-95">
                Create stunning interiors that reflect your personality. 
                Our expert designers bring your vision to life with innovative concepts.
              </p>
            
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm opacity-80">Client Reviews</div>
                </div>
                <div className="h-12 w-px bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Projects Done</div>
                </div>
                <div className="h-12 w-px bg-white/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-80">Years Exp</div>
                </div>
              </div>
            </div>
            
            {/* Enquiry Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--black-color)' }}>Request a Call Back</h2>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,173,181,0.2)' }}>
                    <CheckCircle className="w-10 h-10" style={{ color: 'var(--sky-blue)' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--black-color)' }}>Thank You!</h3>
                  <p style={{ color: 'var(--gray-color)' }}>We'll contact you within 2 hours with your design consultation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>Phone Number*</label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>Service Type*</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="">Select a service</option>
                        {serviceCategories.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>Preferred Date*</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-color)' }}>Project Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Tell us about your space, style preferences, budget..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg disabled:opacity-70 flex items-center justify-center"
                    style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing Your Request...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Get Free Consultation
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm" style={{ color: 'var(--gray-color)' }}>
                    By submitting, you agree to our terms. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white ">
        <div className="max-w-[90%] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--black-color)' }}>
              Why Choose Our Design Team
            </h2>
            <p className="text-xl" style={{ color: 'var(--gray-color)' }}>
              Experience excellence in interior design with our professional approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,173,181,0.2)', color: 'var(--sky-blue)' }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--black-color)' }}>{item.title}</h3>
                <p style={{ color: 'var(--gray-color)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--background-alt)' }}>
        <div className="max-w-[90%] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--black-color)' }}>
              Our Design Services
            </h2>
            <p className="text-xl" style={{ color: 'var(--gray-color)' }}>
              Comprehensive interior design solutions for every space
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${service.popular ? 'border-blue-500' : 'border-transparent'} transition-all duration-300 hover:shadow-xl`}
              >
                {service.popular && (
                  <div className="text-white text-center py-2 px-4 text-sm font-semibold" style={{ backgroundColor: 'var(--sky-blue)' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(0,173,181,0.2)', color: 'var(--sky-blue)' }}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>{service.title}</h3>
                      <p style={{ color: 'var(--gray-color)' }}>{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: 'var(--sky-blue)' }} />
                          <span style={{ color: 'var(--gray-color)' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-sm" style={{ color: 'var(--gray-color)' }}>Starting from</div>
                      <div className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>{service.priceRange}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm" style={{ color: 'var(--gray-color)' }}>Timeline</div>
                      <div className="text-lg font-semibold" style={{ color: 'var(--black-color)' }}>{service.duration}</div>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-4" style={{ backgroundColor: 'var(--background-alt)' }}>
                  <button 
                    className="w-full text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--sky-blue)' }}
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
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}>
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
        <div className="max-w-[90%] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--black-color)' }}>
                Our Design Portfolio
              </h2>
              <p style={{ color: 'var(--gray-color)' }}>Explore our latest interior transformations</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                style={activeCategory === 'all' ? { backgroundColor: 'var(--sky-blue)' } : {}}
              >
                All
              </button>
              {serviceCategories.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveCategory(service.id)}
                  className={`px-4 py-2 rounded-full capitalize ${activeCategory === service.id ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  style={activeCategory === service.id ? { backgroundColor: 'var(--sky-blue)' } : {}}
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
                className={`rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 hover:scale-105`}
                style={{ 
                  backgroundColor: index % 3 === 0 ? 'rgba(0,173,181,0.1)' : 
                                   index % 3 === 1 ? 'rgba(16,185,129,0.1)' : 
                                   'rgba(139,92,246,0.1)'
                }}
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
                <h3 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
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
                <div className="aspect-video rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(0,173,181,0.2), rgba(0,173,181,0.4))' }}>
                  <div className="text-center">
                    <Palette className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--sky-blue)' }} />
                    <div className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
                      Professional Design
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4" style={{ color: 'var(--black-color)' }}>Design Details</h4>
                  <p className="mb-6" style={{ color: 'var(--gray-color)' }}>
                    Our experienced designers create custom solutions that blend functionality 
                    with aesthetics, ensuring every space reflects your unique style and needs.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--background-alt)' }}>
                      <div className="text-sm" style={{ color: 'var(--gray-color)' }}>Project Duration</div>
                      <div className="text-xl font-bold" style={{ color: 'var(--black-color)' }}>6-10 weeks</div>
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--background-alt)' }}>
                      <div className="text-sm" style={{ color: 'var(--gray-color)' }}>Design Team</div>
                      <div className="text-xl font-bold" style={{ color: 'var(--black-color)' }}>2-3 designers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--background-alt)' }}>
        <div className="max-w-[90%] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--black-color)' }}>
              Design Service Packages
            </h2>
            <p className="text-xl" style={{ color: 'var(--gray-color)' }}>
              Choose the perfect package for your interior design needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`p-8`} style={{ background: product.bestSeller ? 'linear-gradient(to right, rgba(0,173,181,0.1), rgba(0,173,181,0.2))' : 'var(--background-alt)' }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--black-color)' }}>
                      {product.name.split(' ')[0]}
                    </div>
                    <div style={{ color: 'var(--gray-color)' }}>{product.category}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--black-color)' }}>{product.name}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm" style={{ color: 'var(--gray-color)' }}>{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--sky-blue)' }}>{product.price}</div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm" style={{ color: 'var(--gray-color)' }}>
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: 'var(--sky-blue)' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center" style={{ backgroundColor: 'var(--sky-blue)' }}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[90%] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--black-color)' }}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center transition duration-300"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  >
                    <span className="text-lg font-semibold" style={{ color: 'var(--black-color)' }}>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`} style={{ color: 'var(--gray-color)' }} />
                  </button>
                  
                  {activeFAQ === index && (
                    <div className="px-6 pb-6">
                      <p style={{ color: 'var(--gray-color)' }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Get a free design consultation. Let's bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: 'var(--white-color)', color: 'var(--sky-blue)' }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation Now
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

export default ComprehensiveInteriorLanding;