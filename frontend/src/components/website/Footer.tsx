import { motion } from "framer-motion";
import {
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Home,
  Wrench,
  PaintBucket,
  Droplets,
  Hammer,
  Construction,
  Bug,
  Wind,
  Brush,
  Zap,
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

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-2xl font-bold mb-4">HomeEase</h3>
              <p className="text-gray-400">
                Making home services simple, reliable, and accessible for
                everyone.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Press", "Partners"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} HomeEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
