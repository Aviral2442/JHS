import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  Sparkles,
  Home,
  Droplets,
  Hammer,
  PaintBucket,
  Wrench,
  Zap,
  Construction,
  Brush,
  Bug,
  Wind,

} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Cleaning",
    icon: Sparkles,
    description: "Professional home cleaning with eco-friendly products",
  },
  {
    id: 2,
    name: "Interior Design",
    icon: Home,
    description: "Transform your space with expert interior design",
  },
  {
    id: 3,
    name: "Laundry",
    icon: Droplets,
    description: "Professional laundry and dry cleaning services",
  },
  {
    id: 4,
    name: "Carpenter",
    icon: Hammer,
    description: "Custom furniture and woodwork solutions",
  },
  {
    id: 5,
    name: "Painting",
    icon: PaintBucket,
    description: "Interior and exterior painting services",
  },
  {
    id: 6,
    name: "Plumber",
    icon: Wrench,
    description: "24/7 emergency plumbing services",
  },
  {
    id: 7,
    name: "Electrician",
    icon: Zap,
    description: "Electrical repairs and installations",
  },
  {
    id: 8,
    name: "Civil Contractor",
    icon: Construction,
    description: "Construction and renovation projects",
  },
  {
    id: 9,
    name: "Renovation",
    icon: Brush,
    description: "Complete home renovation services",
  },
  {
    id: 10,
    name: "Pest Control",
    icon: Bug,
    description: "Safe and effective pest elimination",
  },
  {
    id: 11,
    name: "AC Repair",
    icon: Wind,
    description: "AC installation and repair services",
  },
];

const Header: React.FC = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-indigo-600">
                HomeEase
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 py-4"
                    >
                      <div className="grid grid-cols-3 gap-4 px-4">
                        {services.map((service) => (
                          <motion.a
                            key={service.id}
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <service.icon className="h-8 w-8 text-indigo-500 mb-2" />
                            <span className="text-sm font-medium text-gray-700">
                              {service.name}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[["About", "/about"], ["Cart", "/cart"], ["Checkout", "/checkout"], ["Contact", "/contact"]].map((item) => (
                <Link
                  key={item[0]}
                  to={item[1]}
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  {item[0]}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200"
              >
                <div className="py-4 space-y-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Services
                  </a>
                  {["How it Works", "Pricing", "About", "Contact"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        {item}
                      </a>
                    )
                  )}
                  <div className="px-4 space-y-2 pt-4 border-t">
                    <button className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg">
                      Login
                    </button>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Header;
