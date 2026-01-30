import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Cloud, 
  Shield, 
  Code, 
  Palette, 
  BarChart, 
  Smartphone,
  ChevronRight,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

// Service interface for TypeScript
interface Service {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const HeroSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // Services data
  const services: Service[] = [
    {
      id: 0,
      name: "AI Solutions",
      description: "Intelligent automation and machine learning solutions to transform your business processes.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: ["Predictive Analytics", "Natural Language Processing", "Automated Workflows"]
    },
    {
      id: 1,
      name: "Cloud Services",
      description: "Scalable cloud infrastructure and migration services for modern enterprises.",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: ["Infrastructure as a Service", "Cloud Migration", "Hybrid Cloud Solutions"]
    },
    {
      id: 2,
      name: "Cyber Security",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      features: ["Threat Detection", "Data Encryption", "Security Audits"]
    },
    {
      id: 3,
      name: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      icon: <Code className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      features: ["React/Next.js", "Responsive Design", "Progressive Web Apps"]
    },
    {
      id: 4,
      name: "UI/UX Design",
      description: "User-centered design that creates intuitive and engaging digital experiences.",
      icon: <Palette className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      features: ["User Research", "Prototyping", "Design Systems"]
    },
    {
      id: 5,
      name: "Data Analytics",
      description: "Transform raw data into actionable insights with advanced analytics and visualization.",
      icon: <BarChart className="w-8 h-8" />,
      color: "from-indigo-500 to-blue-500",
      features: ["Business Intelligence", "Real-time Dashboards", "Data Visualization"]
    },
    {
      id: 6,
      name: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-cyan-500 to-teal-500",
      features: ["iOS & Android", "Cross-platform", "App Store Optimization"]
    },
    {
      id: 7,
      name: "Performance Boost",
      description: "Optimize your applications for maximum speed, efficiency, and user satisfaction.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500",
      features: ["Speed Optimization", "Code Optimization", "Performance Monitoring"]
    }
  ];

  // Auto rotate active service
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  // Handle service selection
  const handleServiceSelect = (id: number) => {
    setActiveService(id);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white px-4 py-12 md:py-20">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side - Main content */}
          <div className={`flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Innovative Digital Solutions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business With
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Cutting-Edge Services
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              We provide a complete suite of digital services to elevate your brand, 
              optimize operations, and accelerate growth in today's competitive landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-gray-800 rounded-xl font-semibold text-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 border border-gray-700">
                View Case Studies
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold"
                  >
                    {i === 4 ? '+9' : `U${i}`}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-lg">Trusted by 500+ Companies</p>
                <p className="text-gray-400">Join industry leaders who trust our services</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Services showcase */}
          <div className="flex-1 w-full lg:w-auto">
            <div className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
              
              {/* Service icons grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${activeService === index 
                      ? `bg-gradient-to-br ${service.color} scale-110 shadow-2xl` 
                      : 'bg-gray-900/70 hover:bg-gray-800/80'}`}
                  >
                    <div className={`mb-2 ${activeService === index ? 'text-white' : 'text-gray-300'}`}>
                      {service.icon}
                    </div>
                    <span className="text-xs font-medium text-center">{service.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Active service details */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${services[activeService].color} mr-4`}>
                    {services[activeService].icon}
                  </div>
                  <h3 className="text-2xl font-bold">{services[activeService].name}</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {services[activeService].description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {services[activeService].features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--sky-blue)' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg font-semibold flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-700/50 group">
                  Learn More About {services[activeService].name}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
              
              {/* Service indicator */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceSelect(index)}
                      className={`w-3 h-3 rounded-full transition-all ${activeService === index 
                        ? `bg-gradient-to-r ${services[activeService].color} w-8` 
                        : 'bg-gray-700 hover:bg-gray-600'}`}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "99%", label: "Client Satisfaction" },
            { value: "500+", label: "Projects Completed" },
            { value: "24/7", label: "Support Available" },
            { value: "2x", label: "Average Growth" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;