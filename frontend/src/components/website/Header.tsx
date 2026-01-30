import React, { useRef, useEffect, useState } from "react";
import {
  User,
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  Wrench,
  Droplets,
  Zap,
  Thermometer,
  Sparkles,
  Shield,
  Leaf,
  Settings,
  PaintBucket,
  Hammer,
  Fan,
  Lock,
  Tv,
  Refrigerator,
  Microwave,
  Bath,
  ArrowRight,
  Star,
  AlertCircle,
  Wind,
  Sun,
} from "lucide-react";
import { FaCouch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import SearchOverlay from "../../components/website/SearchOverlay";

// ================ TYPES ================
interface ServiceCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  subcategories: string[];
  popular: boolean;
}

interface Service {
  id: number;
  name: string;
  icon: React.ReactNode;
  categories: ServiceCategory[];
}

// ================ MOCK DATA ================
const services: Service[] = [
  {
    id: 1,
    name: "Plumbing",
    icon: <Droplets size={20} />,
    categories: [
      {
        id: 101,
        name: "Emergency Repairs",
        icon: <AlertCircle size={16} />,
        color: "text-red-600 bg-red-50",
        description: "24/7 emergency plumbing services",
        subcategories: [
          "Leak Repair",
          "Pipe Burst",
          "Clogged Drain",
          "Water Heater",
        ],
        popular: true,
      },
      {
        id: 102,
        name: "Installation",
        icon: <Settings size={16} />,
        color: "text-blue-600 bg-blue-50",
        description: "Professional fixture installation",
        subcategories: ["Toilets", "Sinks", "Showers", "Pipes"],
        popular: true,
      },
      {
        id: 103,
        name: "Maintenance",
        icon: <Wrench size={16} />,
        color: "text-green-600 bg-green-50",
        description: "Regular maintenance services",
        subcategories: [
          "Drain Cleaning",
          "Pipe Inspection",
          "Water Pressure",
          "Valve Repair",
        ],
        popular: false,
      },
      {
        id: 104,
        name: "Water Systems",
        icon: <Droplets size={16} />,
        color: "text-cyan-600 bg-cyan-50",
        description: "Water treatment and systems",
        subcategories: [
          "Water Filters",
          "Softener",
          "Pump Systems",
          "Tank Installation",
        ],
        popular: false,
      },
    ],
  },
  {
    id: 2,
    name: "Electrical",
    icon: <Zap size={20} />,
    categories: [
      {
        id: 201,
        name: "Wiring & Lighting",
        icon: <Zap size={16} />,
        color: "text-yellow-600 bg-yellow-50",
        description: "Complete electrical wiring solutions",
        subcategories: [
          "Light Installation",
          "Switch Repair",
          "Panel Upgrade",
          "Circuit Breaker",
        ],
        popular: true,
      },
      {
        id: 202,
        name: "Safety Inspection",
        icon: <Shield size={16} />,
        color: "text-orange-600 bg-orange-50",
        description: "Electrical safety and compliance",
        subcategories: [
          "Home Inspection",
          "Code Compliance",
          "Safety Audit",
          "Certification",
        ],
        popular: true,
      },
      {
        id: 203,
        name: "Smart Home",
        icon: <Tv size={16} />,
        color: "text-purple-600 bg-purple-50",
        description: "Home automation solutions",
        subcategories: [
          "Smart Lighting",
          "Security Systems",
          "Voice Control",
          "Home Theater",
        ],
        popular: false,
      },
    ],
  },
  {
    id: 3,
    name: "HVAC",
    icon: <Thermometer size={20} />,
    categories: [
      {
        id: 301,
        name: "AC Services",
        icon: <Fan size={16} />,
        color: "text-blue-600 bg-blue-50",
        description: "Air conditioning repair & maintenance",
        subcategories: [
          "AC Repair",
          "Maintenance",
          "Installation",
          "Refrigerant",
        ],
        popular: true,
      },
      {
        id: 302,
        name: "Heating",
        icon: <Thermometer size={16} />,
        color: "text-red-600 bg-red-50",
        description: "Heating system services",
        subcategories: [
          "Furnace Repair",
          "Boiler Service",
          "Heat Pump",
          "Radiator",
        ],
        popular: true,
      },
      {
        id: 303,
        name: "Ventilation",
        icon: <Wind size={16} />,
        color: "text-gray-600 bg-gray-50",
        description: "Air quality and ventilation",
        subcategories: [
          "Duct Cleaning",
          "Air Purification",
          "Vent Repair",
          "Humidity Control",
        ],
        popular: false,
      },
    ],
  },
  {
    id: 4,
    name: "Cleaning",
    icon: <Sparkles size={20} />,
    categories: [
      {
        id: 401,
        name: "Deep Cleaning",
        icon: <Sparkles size={16} />,
        color: "text-green-600 bg-green-50",
        description: "Comprehensive cleaning services",
        subcategories: [
          "Move-in/out",
          "Spring Cleaning",
          "Post-construction",
          "Office Cleaning",
        ],
        popular: true,
      },
      {
        id: 402,
        name: "Specialized",
        icon: <FaCouch size={16} />,
        color: "text-teal-600 bg-teal-50",
        description: "Specialized cleaning solutions",
        subcategories: [
          "Carpet Cleaning",
          "Window Cleaning",
          "Upholstery",
          "Mattress",
        ],
        popular: false,
      },
    ],
  },
  {
    id: 5,
    name: "Renovation",
    icon: <Hammer size={20} />,
    categories: [
      {
        id: 501,
        name: "Kitchen",
        icon: <Microwave size={16} />,
        color: "text-amber-600 bg-amber-50",
        description: "Kitchen remodeling and upgrades",
        subcategories: [
          "Cabinet Installation",
          "Countertops",
          "Backsplash",
          "Appliances",
        ],
        popular: true,
      },
      {
        id: 502,
        name: "Bathroom",
        icon: <Bath size={16} />,
        color: "text-cyan-600 bg-cyan-50",
        description: "Bathroom renovation services",
        subcategories: [
          "Tile Work",
          "Plumbing",
          "Vanity Installation",
          "Shower Enclosure",
        ],
        popular: true,
      },
      {
        id: 503,
        name: "Painting",
        icon: <PaintBucket size={16} />,
        color: "text-purple-600 bg-purple-50",
        description: "Interior and exterior painting",
        subcategories: ["Wall Painting", "Ceiling", "Trim Work", "Exterior"],
        popular: false,
      },
    ],
  },
  {
    id: 6,
    name: "Appliance",
    icon: <Settings size={20} />,
    categories: [
      {
        id: 601,
        name: "Kitchen Appliances",
        icon: <Refrigerator size={16} />,
        color: "text-gray-600 bg-gray-50",
        description: "Repair and installation",
        subcategories: [
          "Refrigerator",
          "Oven/Stove",
          "Dishwasher",
          "Microwave",
        ],
        popular: true,
      },
      {
        id: 602,
        name: "Laundry",
        icon: <Settings size={16} />,
        color: "text-blue-600 bg-blue-50",
        description: "Washer and dryer services",
        subcategories: [
          "Washing Machine",
          "Dryer",
          "Washer-Dryer Combo",
          "Vent Cleaning",
        ],
        popular: false,
      },
    ],
  },
  {
    id: 7,
    name: "Security",
    icon: <Shield size={20} />,
    categories: [
      {
        id: 701,
        name: "Security Systems",
        icon: <Lock size={16} />,
        color: "text-indigo-600 bg-indigo-50",
        description: "Home security installation",
        subcategories: [
          "Alarm Systems",
          "CCTV Cameras",
          "Smart Locks",
          "Monitoring",
        ],
        popular: true,
      },
    ],
  },
  {
    id: 8,
    name: "Eco Services",
    icon: <Leaf size={20} />,
    categories: [
      {
        id: 801,
        name: "Solar Power",
        icon: <Sun size={16} />,
        color: "text-yellow-600 bg-yellow-50",
        description: "Solar panel installation",
        subcategories: [
          "Solar Panels",
          "Battery Storage",
          "Inverter Installation",
          "Maintenance",
        ],
        popular: true,
      },
    ],
  },
];

const mainMenuItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Consumer Profile", href: "/consumer-profile" },
  { name: "Contact", href: "/contact" },
];

// ================ COMPONENTS ================

// Top Bar Component
const TopBar: React.FC = () => {

  return (
    <div className="bg-[#00ADB5] text-white text-sm py-2 hidden md:block" style={{ background: "linear-gradient(to bottom right, var(--sky-blue), var(--gray-color))"}}>
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone size={14} className="mr-2" />
              <span>24/7 Support: +91 8960628965</span>
            </div>
            <div className="flex items-center">
              <Mail size={14} className="mr-2" />
              <span>jeevancleaningservices@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-blue-200 transition-colors">
              Track Order
            </button>
            <span className="text-white/30">|</span>
            <button className="hover:text-blue-200 transition-colors">
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Header Component
const MainHeader: React.FC<{
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onServiceHover: (service: Service | null) => void;
  onSearchOpen: () => void;
}> = ({
  isMobileMenuOpen,
  onMobileMenuToggle,
  onServiceHover,
  onSearchOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/images/logo.png" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-gray-900">
                  G.ONE Home
                </div>
                {/* <div className="text-xs text-gray-500 -mt-1">Professional Services</div> */}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainMenuItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                  onMouseEnter={() => item && onServiceHover(null)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Section - Search & Auth */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Search size={22} className="text-gray-700" />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-lg hover:bg-gray-100 hidden md:block"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => navigate("/sign-in")}
                className="px-4 flex justify-center items-center py-2 rounded-lg btn-color transition-all shadow-sm"
              >
                <User size={18} className="mr-1" />
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Service Slider Component
// const ServiceSlider: React.FC<{
//   services: Service[];
//   activeService: Service | null;
//   onServiceHover: (service: Service) => void;
//   onServiceLeave: () => void;
// }> = ({ services, activeService, onServiceHover, onServiceLeave }) => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   const scroll = (direction: "left" | "right") => {
//     if (sliderRef.current) {
//       const scrollAmount = 200;
//       const newPosition =
//         direction === "left"
//           ? scrollPosition - scrollAmount
//           : scrollPosition + scrollAmount;

//       sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
//       setScrollPosition(newPosition);
//     }
//   };

//   const checkScrollButtons = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (slider) {
//       slider.addEventListener("scroll", checkScrollButtons);
//       return () => slider.removeEventListener("scroll", checkScrollButtons);
//     }
//   }, []);

//   return (
//     <div className="relative bg-linear-to-r from-gray-50 to-white border-t border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative py-3">
//           {/* Left Arrow */}
//           {showLeftArrow && (
//             <button
//               onClick={() => scroll("left")}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-50"
//             >
//               <ChevronRight className="rotate-180" size={20} />
//             </button>
//           )}

//           {/* Service Slider */}
//           <div
//             ref={sliderRef}
//             className="flex space-x-1 overflow-x-auto scrollbar-hide"
//             style={{ scrollBehavior: "smooth" }}
//             onScroll={checkScrollButtons}
//           >
//             {services.map((service) => (
//               <button
//                 key={service.id}
//                 onMouseEnter={() => onServiceHover(service)}
//                 onMouseLeave={onServiceLeave}
//                 className={`flex-shrink-0 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
//                   activeService?.id === service.id
//                     ? "bg-blue-50 text-blue-600 border border-blue-200"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 <div
//                   className={`p-1.5 rounded-md ${
//                     activeService?.id === service.id
//                       ? "bg-blue-100"
//                       : "bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`${
//                       activeService?.id === service.id
//                         ? "text-blue-600"
//                         : "text-gray-600"
//                     }`}
//                   >
//                     {service.icon}
//                   </div>
//                 </div>
//                 <span className="font-medium text-sm whitespace-nowrap">
//                   {service.name}
//                 </span>
//                 <ChevronDown
//                   size={14}
//                   className={`transition-transform ${
//                     activeService?.id === service.id ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Right Arrow */}
//           {showRightArrow && (
//             <button
//               onClick={() => scroll("right")}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-50"
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// Mega Menu Component
const MegaMenu: React.FC<{
  service: Service | null;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ service, isVisible, onMouseEnter, onMouseLeave }) => {
  if (!isVisible || !service) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-5 duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top: "136px" }} // Height of both headers
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Service Overview */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-blue-600">{service.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {service.name} Services
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Professional {service.name.toLowerCase()} solutions
                </p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-2xl font-bold text-gray-900">$79</div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              </div>
              <button className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center justify-center">
                Book Now
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Middle Columns - Categories */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.categories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="flex items-start space-x-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${category.color.split(" ")[1]}`}
                  >
                    <div className={category.color.split(" ")[0]}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {category.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                  {category.popular && (
                    <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      Popular
                    </span>
                  )}
                </div>

                <div className="space-y-2 ml-12">
                  {category.subcategories.map((subcategory, idx) => (
                    <div key={idx} className="flex items-center group/item">
                      <ChevronRight
                        size={12}
                        className="text-gray-400 mr-2 group-hover/item:text-blue-600"
                      />
                      <span className="text-gray-600 hover:text-blue-600 text-sm">
                        {subcategory}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Featured Services */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">
                Most Popular Services
              </h4>
              <div className="space-y-4">
                {service.categories
                  .filter((cat) => cat.popular)
                  .slice(0, 3)
                  .map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`p-2 rounded-md ${
                          category.color.split(" ")[1]
                        } mr-3`}
                      >
                        <div className={category.color.split(" ")[0]}>
                          {category.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Starting from $99
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield size={14} className="mr-2 text-green-600" />
                  <span>All services include 1-year warranty</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Star
                    size={14}
                    className="mr-2 text-yellow-600"
                    fill="currentColor"
                  />
                  <span>4.9 average customer rating</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Clock size={14} className="mr-2 text-blue-600" />
                  <span>Same-day service available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<{
  isOpen: boolean;
  services: Service[];
  activeService: Service | null;
  onServiceSelect: (service: Service) => void;
  onOpenSearch?: () => void;
}> = ({ isOpen, services, onServiceSelect, onOpenSearch }) => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 top-32 bg-white overflow-y-auto md:hidden">
      <div className="px-4 py-6">
        {/* Search in Mobile */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search services..."
            onFocus={() => onOpenSearch && onOpenSearch()}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Menu Items */}
        <div className="space-y-1 mb-6">
          {mainMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Services in Mobile */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-bold text-gray-900 mb-4 px-4">All Services</h3>
          <div className="space-y-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() =>
                    setExpandedService(
                      expandedService === service.id ? null : service.id
                    )
                  }
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-md mr-3">
                      {service.icon}
                    </div>
                    <span className="font-medium text-gray-900">
                      {service.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${
                      expandedService === service.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedService === service.id && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {service.categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onServiceSelect(service)}
                          className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100"
                        >
                          <div className="flex items-center mb-2">
                            <div
                              className={`p-1 rounded ${
                                category.color.split(" ")[1]
                              } mr-2`}
                            >
                              <div className={category.color.split(" ")[0]}>
                                {category.icon}
                              </div>
                            </div>
                            <span className="font-medium text-sm">
                              {category.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {category.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auth Buttons in Mobile */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Login
            </button>
            <button className="py-3 px-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Header Component
const MegaMenuHeader: React.FC = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeoutRef = useRef<number | undefined>(undefined);
  const leaveTimeoutRef = useRef<number | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceHover = (service: Service | null) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveService(service);
      if (service) {
        setIsMegaMenuVisible(true);
      }
    }, 150);
  };

  const handleServiceLeave = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuVisible(false);
      setTimeout(() => {
        if (!isMegaMenuVisible) {
          setActiveService(null);
        }
      }, 200);
    }, 200);
  };

  const handleMegaMenuEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleMegaMenuLeave = () => {
    handleServiceLeave();
  };

  const handleServiceSelect = (service: Service) => {
    setActiveService(service);
    setIsMobileMenuOpen(false);
    // Navigate to service page would go here
  };

  return (
    <>
      {/* Fixed Header Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Main Header */}
        <MainHeader
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onServiceHover={handleServiceHover}
          onSearchOpen={() => setIsSearchOpen(true)}
        />

        {/* Service Slider */}
        {/* <ServiceSlider
          services={services}
          activeService={activeService}
          onServiceHover={handleServiceHover}
          onServiceLeave={handleServiceLeave}
        /> */}

        {/* Mega Menu */}
        <MegaMenu
          service={activeService}
          isVisible={isMegaMenuVisible}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        />
      </div>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 top-32"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        services={services}
        activeService={activeService}
        onServiceSelect={handleServiceSelect}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default MegaMenuHeader;