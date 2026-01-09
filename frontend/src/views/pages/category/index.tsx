import React, { useState, useMemo, useEffect } from 'react';
import {
    Search, Filter, ChevronRight, Star, Clock,
    Shield, Users, Sparkles, Zap, Droplets,
    Home, Wrench, Thermometer, Wind, Sun, Leaf,
    PaintBucket, Hammer, Settings, Plug, Bath,
    Fan, Trash2, Coffee, Couch, Tv, Microwave,
    Refrigerator, Sprout, Lock, Phone, MessageSquare,
    MapPin, Award, CheckCircle, ArrowRight,
    ChevronLeft, ChevronDown, Grid, List
} from 'lucide-react';

// ================ TYPES ================
interface ServiceCategory {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    serviceCount: number;
    popular: boolean;
    tags: string[];
}

interface ServiceItem {
    id: number;
    name: string;
    description: string;
    priceRange: string;
    duration: string;
    rating: number;
    reviews: number;
    popular: boolean;
    categoryId: number;
    categoryName: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
    image?: string;
}

interface ServiceSection {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    categories: ServiceCategory[];
    services: ServiceItem[];
}

// ================ MOCK DATA ================
const serviceSections: ServiceSection[] = [
    {
        id: 1,
        title: "Home Maintenance & Repair",
        description: "Complete home repair and maintenance services to keep your home in perfect condition",
        icon: <Home size={32} />,
        color: "from-blue-500 to-cyan-500",
        categories: [
            {
                id: 101,
                name: "Plumbing Services",
                description: "Fix leaks, install fixtures, and handle all plumbing needs",
                icon: <Droplets size={24} />,
                color: "from-blue-500 to-blue-600",
                serviceCount: 12,
                popular: true,
                tags: ["Emergency", "Installation", "Repair"]
            },
            {
                id: 102,
                name: "Electrical Work",
                description: "Wiring, lighting, and electrical system services",
                icon: <Zap size={24} />,
                color: "from-yellow-500 to-orange-500",
                serviceCount: 8,
                popular: true,
                tags: ["Safety", "Installation", "Upgrade"]
            },
            {
                id: 103,
                name: "Carpentry & Woodwork",
                description: "Custom furniture, repairs, and wood installations",
                icon: <Hammer size={24} />,
                color: "from-amber-600 to-amber-700",
                serviceCount: 6,
                popular: false,
                tags: ["Custom", "Repair", "Installation"]
            },
            {
                id: 104,
                name: "Painting & Decorating",
                description: "Interior and exterior painting services",
                icon: <PaintBucket size={24} />,
                color: "from-purple-500 to-pink-500",
                serviceCount: 5,
                popular: true,
                tags: ["Interior", "Exterior", "Commercial"]
            },
            {
                id: 105,
                name: "HVAC Services",
                description: "Heating, ventilation, and air conditioning",
                icon: <Thermometer size={24} />,
                color: "from-red-500 to-pink-500",
                serviceCount: 7,
                popular: true,
                tags: ["AC", "Heating", "Maintenance"]
            },
            {
                id: 106,
                name: "Appliance Repair",
                description: "Fix and maintain home appliances",
                icon: <Settings size={24} />,
                color: "from-gray-600 to-gray-700",
                serviceCount: 10,
                popular: false,
                tags: ["Kitchen", "Laundry", "Repair"]
            }
        ],
        services: [
            {
                id: 1001,
                name: "Emergency Leak Repair",
                description: "Immediate response to water leaks and pipe bursts",
                priceRange: "$120 - $350",
                duration: "2-4 hours",
                rating: 4.9,
                reviews: 245,
                popular: true,
                categoryId: 101,
                categoryName: "Plumbing Services",
                icon: <Droplets size={20} />,
                color: "from-blue-500 to-blue-600",
                features: ["Same-day service", "24/7 emergency", "Water damage prevention"],
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
            },
            {
                id: 1002,
                name: "Light Fixture Installation",
                description: "Professional installation of all types of lighting",
                priceRange: "$80 - $250",
                duration: "1-2 hours",
                rating: 4.8,
                reviews: 189,
                popular: true,
                categoryId: 102,
                categoryName: "Electrical Work",
                icon: <Zap size={20} />,
                color: "from-yellow-500 to-orange-500",
                features: ["LED compatible", "Safety certified", "Warranty included"],
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop"
            }
        ]
    },
    {
        id: 2,
        title: "Cleaning & Sanitation",
        description: "Professional cleaning services for homes and offices",
        icon: <Sparkles size={32} />,
        color: "from-green-500 to-emerald-500",
        categories: [
            {
                id: 201,
                name: "Deep Cleaning",
                description: "Thorough cleaning of entire homes",
                icon: <Trash2 size={24} />,
                color: "from-green-500 to-green-600",
                serviceCount: 8,
                popular: true,
                tags: ["Spring", "Move-in", "Move-out"]
            },
            {
                id: 202,
                name: "Carpet Cleaning",
                description: "Professional carpet and rug cleaning",
                icon: <Couch size={24} />,
                color: "from-teal-500 to-teal-600",
                serviceCount: 5,
                popular: true,
                tags: ["Steam", "Stain", "Odor"]
            },
            {
                id: 203,
                name: "Window Cleaning",
                description: "Interior and exterior window cleaning",
                icon: <Sun size={24} />,
                color: "from-cyan-500 to-blue-500",
                serviceCount: 4,
                popular: false,
                tags: ["Interior", "Exterior", "High-rise"]
            },
            {
                id: 204,
                name: "Kitchen Deep Clean",
                description: "Specialized kitchen cleaning services",
                icon: <Microwave size={24} />,
                color: "from-orange-500 to-red-500",
                serviceCount: 6,
                popular: true,
                tags: ["Appliance", "Degreasing", "Sanitization"]
            },
            {
                id: 205,
                name: "Bathroom Sanitization",
                description: "Complete bathroom cleaning and disinfection",
                icon: <Bath size={24} />,
                color: "from-blue-400 to-cyan-400",
                serviceCount: 5,
                popular: false,
                tags: ["Mold", "Grout", "Disinfect"]
            },
            {
                id: 206,
                name: "Post-Construction Clean",
                description: "Cleaning after renovation or construction",
                icon: <Hammer size={24} />,
                color: "from-gray-500 to-gray-600",
                serviceCount: 3,
                popular: false,
                tags: ["Construction", "Renovation", "Dust"]
            }
        ],
        services: [
            {
                id: 2001,
                name: "Complete Home Deep Clean",
                description: "Thorough cleaning of every room including hidden areas",
                priceRange: "$200 - $500",
                duration: "4-6 hours",
                rating: 4.9,
                reviews: 312,
                popular: true,
                categoryId: 201,
                categoryName: "Deep Cleaning",
                icon: <Sparkles size={20} />,
                color: "from-green-500 to-emerald-500",
                features: ["Eco-friendly products", "Move-in/out", "Spring cleaning"],
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop"
            }
        ]
    },
    {
        id: 3,
        title: "Home Improvement",
        description: "Upgrade and enhance your living space",
        icon: <Wrench size={32} />,
        color: "from-purple-500 to-pink-500",
        categories: [
            {
                id: 301,
                name: "Kitchen Remodeling",
                description: "Complete kitchen renovation and upgrades",
                icon: <Refrigerator size={24} />,
                color: "from-red-500 to-pink-500",
                serviceCount: 10,
                popular: true,
                tags: ["Cabinets", "Countertops", "Appliances"]
            },
            {
                id: 302,
                name: "Bathroom Renovation",
                description: "Bathroom remodeling and fixture upgrades",
                icon: <Bath size={24} />,
                color: "from-blue-400 to-cyan-400",
                serviceCount: 8,
                popular: true,
                tags: ["Tiles", "Fixtures", "Plumbing"]
            },
            {
                id: 303,
                name: "Flooring Installation",
                description: "Hardwood, tile, and carpet installation",
                icon: <Home size={24} />,
                color: "from-amber-600 to-amber-700",
                serviceCount: 7,
                popular: false,
                tags: ["Hardwood", "Tile", "Carpet"]
            },
            {
                id: 304,
                name: "Smart Home Setup",
                description: "Installation of smart home devices and systems",
                icon: <Plug size={24} />,
                color: "from-indigo-500 to-purple-500",
                serviceCount: 6,
                popular: true,
                tags: ["Automation", "Security", "Voice"]
            },
            {
                id: 305,
                name: "Energy Efficiency",
                description: "Home energy upgrades and insulation",
                icon: <Leaf size={24} />,
                color: "from-green-500 to-emerald-500",
                serviceCount: 5,
                popular: false,
                tags: ["Insulation", "Windows", "Solar"]
            },
            {
                id: 306,
                name: "Outdoor Living",
                description: "Patio, deck, and outdoor space improvements",
                icon: <Sun size={24} />,
                color: "from-yellow-500 to-orange-500",
                serviceCount: 6,
                popular: true,
                tags: ["Deck", "Patio", "Landscaping"]
            }
        ],
        services: []
    },
    {
        id: 4,
        title: "Appliance Services",
        description: "Installation, repair, and maintenance of home appliances",
        icon: <Settings size={32} />,
        color: "from-orange-500 to-red-500",
        categories: [
            {
                id: 401,
                name: "Refrigerator Repair",
                description: "Fix cooling issues and maintenance",
                icon: <Refrigerator size={24} />,
                color: "from-blue-400 to-cyan-400",
                serviceCount: 7,
                popular: true,
                tags: ["Cooling", "Freezer", "Maintenance"]
            },
            {
                id: 402,
                name: "Washing Machine",
                description: "Washer and dryer repair services",
                icon: <Settings size={24} />,
                color: "from-gray-600 to-gray-700",
                serviceCount: 6,
                popular: false,
                tags: ["Drum", "Motor", "Drainage"]
            },
            {
                id: 403,
                name: "Oven & Stove",
                description: "Cooktop and oven repair services",
                icon: <Microwave size={24} />,
                color: "from-red-500 to-pink-500",
                serviceCount: 5,
                popular: true,
                tags: ["Heating", "Gas", "Electric"]
            },
            {
                id: 404,
                name: "AC Unit Service",
                description: "Air conditioner maintenance and repair",
                icon: <Wind size={24} />,
                color: "from-cyan-500 to-blue-500",
                serviceCount: 8,
                popular: true,
                tags: ["Cooling", "Maintenance", "Repair"]
            },
            {
                id: 405,
                name: "Dishwasher Repair",
                description: "Dishwasher installation and fixing",
                icon: <Droplets size={24} />,
                color: "from-blue-500 to-blue-600",
                serviceCount: 4,
                popular: false,
                tags: ["Drainage", "Spray", "Heating"]
            },
            {
                id: 406,
                name: "Small Appliances",
                description: "Coffee makers, microwaves, and more",
                icon: <Coffee size={24} />,
                color: "from-brown-500 to-amber-500",
                serviceCount: 6,
                popular: false,
                tags: ["Kitchen", "Repair", "Maintenance"]
            }
        ],
        services: []
    },
    {
        id: 5,
        title: "Safety & Security",
        description: "Home security systems and safety installations",
        icon: <Shield size={32} />,
        color: "from-indigo-500 to-purple-500",
        categories: [
            {
                id: 501,
                name: "Security Systems",
                description: "Alarm systems and monitoring",
                icon: <Lock size={24} />,
                color: "from-indigo-500 to-purple-500",
                serviceCount: 8,
                popular: true,
                tags: ["Alarm", "Monitoring", "Installation"]
            },
            {
                id: 502,
                name: "Camera Installation",
                description: "CCTV and security camera setup",
                icon: <Tv size={24} />,
                color: "from-gray-600 to-gray-700",
                serviceCount: 6,
                popular: true,
                tags: ["CCTV", "Wireless", "Monitoring"]
            },
            {
                id: 503,
                name: "Smart Locks",
                description: "Electronic and smart lock installation",
                icon: <Lock size={24} />,
                color: "from-blue-500 to-cyan-500",
                serviceCount: 5,
                popular: false,
                tags: ["Electronic", "Access", "Smart"]
            },
            {
                id: 504,
                name: "Fire Safety",
                description: "Smoke detectors and fire extinguishers",
                icon: <Sparkles size={24} />,
                color: "from-red-500 to-orange-500",
                serviceCount: 4,
                popular: true,
                tags: ["Smoke", "Fire", "Safety"]
            },
            {
                id: 505,
                name: "Lighting Security",
                description: "Motion sensor and security lighting",
                icon: <Zap size={24} />,
                color: "from-yellow-500 to-orange-500",
                serviceCount: 5,
                popular: false,
                tags: ["Motion", "Outdoor", "LED"]
            },
            {
                id: 506,
                name: "Safe Installation",
                description: "Home safe installation and setup",
                icon: <Shield size={24} />,
                color: "from-gray-700 to-gray-800",
                serviceCount: 3,
                popular: false,
                tags: ["Vault", "Wall", "Floor"]
            }
        ],
        services: []
    },
    {
        id: 6,
        title: "Green Living",
        description: "Eco-friendly and sustainable home solutions",
        icon: <Leaf size={32} />,
        color: "from-emerald-500 to-green-500",
        categories: [
            {
                id: 601,
                name: "Solar Panel Installation",
                description: "Renewable energy solutions for homes",
                icon: <Sun size={24} />,
                color: "from-yellow-500 to-orange-500",
                serviceCount: 7,
                popular: true,
                tags: ["Renewable", "Energy", "Installation"]
            },
            {
                id: 602,
                name: "Water Conservation",
                description: "Water-saving fixtures and systems",
                icon: <Droplets size={24} />,
                color: "from-blue-500 to-cyan-500",
                serviceCount: 6,
                popular: false,
                tags: ["Low-flow", "Rainwater", "Efficient"]
            },
            {
                id: 603,
                name: "Energy Audit",
                description: "Home energy efficiency assessment",
                icon: <Zap size={24} />,
                color: "from-green-500 to-emerald-500",
                serviceCount: 4,
                popular: true,
                tags: ["Assessment", "Efficiency", "Report"]
            },
            {
                id: 604,
                name: "Smart Thermostats",
                description: "Energy-efficient climate control",
                icon: <Thermometer size={24} />,
                color: "from-red-500 to-pink-500",
                serviceCount: 5,
                popular: false,
                tags: ["Smart", "Energy", "Climate"]
            },
            {
                id: 605,
                name: "Green Cleaning",
                description: "Eco-friendly cleaning products and services",
                icon: <Sparkles size={24} />,
                color: "from-green-400 to-emerald-400",
                serviceCount: 6,
                popular: true,
                tags: ["Eco", "Non-toxic", "Sustainable"]
            },
            {
                id: 606,
                name: "Indoor Air Quality",
                description: "Air purification and ventilation systems",
                icon: <Wind size={24} />,
                color: "from-cyan-500 to-blue-500",
                serviceCount: 5,
                popular: false,
                tags: ["Purification", "Ventilation", "Filters"]
            }
        ],
        services: []
    }
];

// ================ COMPONENTS ================

// Header Component
const ServiceHeader: React.FC = () => {
    const stats = [
        { value: "500+", label: "Services Available" },
        { value: "4.9", label: "Average Rating" },
        { value: "24/7", label: "Emergency Service" },
        { value: "50+", label: "Expert Technicians" }
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-16 pb-24">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/5 animate-pulse"
                        style={{
                            width: Math.random() * 80 + 20 + 'px',
                            height: Math.random() * 80 + 20 + 'px',
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
                        <span className="text-sm font-medium">One-stop solution for all home services</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Find the Perfect
                        <span className="block text-blue-300 mt-2">Home Service</span>
                    </h1>

                    <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
                        Browse through hundreds of professional services. From quick fixes to major renovations,
                        we connect you with trusted experts.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-blue-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Search and Filter Component
const SearchFilters: React.FC<{
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}> = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    viewMode,
    onViewModeChange
}) => {
        const categories = ['All Services', 'Popular', 'Emergency', 'Installation', 'Repair', 'Maintenance'];

        return (
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search services, categories, or keywords..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onViewModeChange('grid')}
                                className={`p-3 rounded-lg ${viewMode === 'grid'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => onViewModeChange('list')}
                                className={`p-3 rounded-lg ${viewMode === 'list'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <List size={20} />
                            </button>
                        </div>

                        {/* Filter Button */}
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                            <Filter size={20} className="mr-2" />
                            Filters
                        </button>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

// Service Section Card Component
const ServiceSectionCard: React.FC<{
    section: ServiceSection;
    isExpanded: boolean;
    onToggle: () => void;
    onServiceSelect: (service: ServiceItem) => void;
}> = ({ section, isExpanded, onToggle, onServiceSelect }) => {
    return (
        <div id={`section-${section.id}`} className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Section Header */}
            <button
                onClick={onToggle}
                className="w-full p-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition-colors group"
            >
                <div className="flex items-start md:items-center">
                    <div className={`bg-gradient-to-br ${section.color} w-16 h-16 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                        <div className="text-white">
                            {section.icon}
                        </div>
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                        <p className="text-gray-600">{section.description}</p>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                    <span className="text-gray-500 mr-3">
                        {section.categories.length} categories • {section.services.length} services
                    </span>
                    <ChevronDown className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={24} />
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-8 pb-8">
                    {/* Categories Grid */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Service Categories</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`bg-gradient-to-br ${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                            <div className="text-white">
                                                {category.icon}
                                            </div>
                                        </div>
                                        {category.popular && (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                                Popular
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h4>
                                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {category.tags.map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{category.serviceCount} services</span>
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                            Explore
                                            <ChevronRight size={16} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services List (if available) */}
                    {section.services.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Services</h3>
                            <div className="space-y-4">
                                {section.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                        onClick={() => onServiceSelect(service)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            {service.image && (
                                                <div className="md:w-32 md:h-24 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6">
                                                    <img
                                                        src={service.image}
                                                        alt={service.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <div className={`bg-gradient-to-br ${service.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                                                        <div className="text-white">
                                                            {service.icon}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-gray-900">{service.name}</h4>
                                                    {service.popular && (
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                                            Popular
                                                        </span>
                                                    )}
                                                    <div className="flex items-center ml-auto">
                                                        <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                                                        <span className="font-bold">{service.rating}</span>
                                                        <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mb-4">{service.description}</p>

                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex flex-wrap gap-4">
                                                        <div className="flex items-center text-gray-700">
                                                            <Clock size={16} className="mr-2 text-gray-400" />
                                                            <span className="text-sm">{service.duration}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-700">
                                                            <span className="text-lg font-bold text-blue-600">{service.priceRange}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {service.features.map((feature, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Quick Navigation Sidebar
const QuickNavigation: React.FC<{
    sections: ServiceSection[];
    activeSection: number;
    onSectionClick: (id: number) => void;
}> = ({ sections, activeSection, onSectionClick }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`hidden lg:block sticky top-24 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {!collapsed && <h3 className="font-bold text-gray-900">Quick Jump</h3>}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <ChevronLeft className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                <nav className="p-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(section.id)}
                            className={`w-full mb-2 p-3 rounded-xl transition-all text-left ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className={`bg-gradient-to-br ${section.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <div className="text-white">
                                        {section.icon}
                                    </div>
                                </div>
                                {!collapsed && (
                                    <div className="ml-3">
                                        <div className="font-medium text-gray-900 text-sm">{section.title}</div>
                                        <div className="text-xs text-gray-500">
                                            {section.categories.length} categories
                                        </div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

// Service Inquiry Modal
const ServiceInquiryModal: React.FC<{
    service: ServiceItem | null;
    isOpen: boolean;
    onClose: () => void;
}> = ({ service, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen || !service) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    message: ''
                });
            }, 3000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" onClick={onClose} />

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-6 pt-6 pb-6 sm:p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Inquire About Service</h3>
                                <p className="text-gray-600 mt-1">{service.name}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h4>
                                <p className="text-gray-600">
                                    We'll contact you within 30 minutes to schedule your service.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service
                                    </label>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className={`bg-gradient-to-br ${service.color} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                                                <div className="text-white">
                                                    {service.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{service.name}</div>
                                                <div className="text-sm text-gray-600">{service.priceRange}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Smith"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Details
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Please describe your specific needs..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                            Sending Request...
                                        </>
                                    ) : (
                                        <>
                                            <MessageSquare size={20} className="mr-3" />
                                            Send Service Inquiry
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Category Grid View Component
const CategoryGridView: React.FC<{
    categories: ServiceCategory[];
    onCategoryClick: (category: ServiceCategory) => void;
}> = ({ categories, onCategoryClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
                <div
                    key={category.id}
                    onClick={() => onCategoryClick(category)}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`bg-gradient-to-br ${category.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
                                <div className="text-white">
                                    {category.icon}
                                </div>
                            </div>
                            {category.popular && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
                        <p className="text-gray-600 mb-6">{category.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {category.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                {category.serviceCount} services available
                            </div>
                            <div className="text-blue-600 group-hover:text-blue-800 font-semibold flex items-center">
                                Explore
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Main Component
const ServiceCategoriesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Services');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1]));
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(1);

    // Flatten all categories for search
    const allCategories = useMemo(() => {
        return serviceSections.flatMap(section => section.categories);
    }, []);

    // Flatten all services for search
    const allServices = useMemo(() => {
        return serviceSections.flatMap(section => section.services);
    }, []);

    // Filter categories based on search and selected filter
    const filteredCategories = useMemo(() => {
        let filtered = allCategories;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply category filter
        if (selectedCategory !== 'All Services') {
            if (selectedCategory === 'Popular') {
                filtered = filtered.filter(cat => cat.popular);
            } else {
                filtered = filtered.filter(cat =>
                    cat.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
                );
            }
        }

        return filtered;
    }, [searchQuery, selectedCategory, allCategories]);

    // Handle section toggle
    const toggleSection = (sectionId: number) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    // Handle service selection
    const handleServiceSelect = (service: ServiceItem) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    // Handle category click
    const handleCategoryClick = (category: ServiceCategory) => {
        // Find the parent section
        const parentSection = serviceSections.find(section =>
            section.categories.some(cat => cat.id === category.id)
        );

        if (parentSection) {
            // Expand the parent section
            if (!expandedSections.has(parentSection.id)) {
                setExpandedSections(new Set([...expandedSections, parentSection.id]));
            }

            // Scroll to the section
            document.getElementById(`section-${parentSection.id}`)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    // Handle section navigation
    const handleSectionClick = (sectionId: number) => {
        setActiveSection(sectionId);
        if (!expandedSections.has(sectionId)) {
            setExpandedSections(new Set([...expandedSections, sectionId]));
        }
        document.getElementById(`section-${sectionId}`)?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <ServiceHeader />

            {/* Search and Filters */}
            <SearchFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Quick Navigation Sidebar */}
                    <QuickNavigation
                        sections={serviceSections}
                        activeSection={activeSection}
                        onSectionClick={handleSectionClick}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Results Summary */}
                        {(searchQuery || selectedCategory !== 'All Services') && (
                            <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Search Results
                                </h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-gray-600">
                                        Found <span className="font-bold">{filteredCategories.length}</span> categories
                                        {searchQuery && (
                                            <> for "<span className="font-bold">{searchQuery}</span>"</>
                                        )}
                                    </span>
                                    {(searchQuery || selectedCategory !== 'All Services') && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedCategory('All Services');
                                            }}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Grid View for Search Results */}
                        {viewMode === 'grid' && (searchQuery || selectedCategory !== 'All Services') ? (
                            <CategoryGridView
                                categories={filteredCategories}
                                onCategoryClick={handleCategoryClick}
                            />
                        ) : (
                            /* Section-based View */
                            <div>
                                {serviceSections.map((section) => (
                                    <ServiceSectionCard
                                        key={section.id}
                                        section={section}
                                        isExpanded={expandedSections.has(section.id)}
                                        onToggle={() => toggleSection(section.id)}
                                        onServiceSelect={handleServiceSelect}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
                    <div className="max-w-2xl mx-auto">
                        <Shield size={48} className="mx-auto mb-6" />
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Can't Find What You're Looking For?
                        </h3>
                        <p className="text-blue-100 mb-8">
                            Our team can help you with custom service requests and specialized solutions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-semibold flex items-center justify-center">
                                <Phone size={20} className="mr-2" />
                                Call for Custom Quote
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold flex items-center justify-center">
                                <MessageSquare size={20} className="mr-2" />
                                Chat with Expert
                            </button>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-6 text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="text-blue-600" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Certified Professionals</h4>
                        <p className="text-gray-600">All services provided by licensed and verified experts</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="text-green-600" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Service Guarantee</h4>
                        <p className="text-gray-600">100% satisfaction guarantee on all services</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="text-purple-600" size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
                        <p className="text-gray-600">Same-day service available for most requests</p>
                    </div>
                </div>
            </div>

            {/* Service Inquiry Modal */}
            <ServiceInquiryModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedService(null);
                }}
            />
        </div>
    );
};

export default ServiceCategoriesPage;