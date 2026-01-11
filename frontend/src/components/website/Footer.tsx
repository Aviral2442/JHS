import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Home,
} from "react-feather";

const ContactFooter: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", color: "hover:bg-blue-600" },
    { icon: <Twitter />, label: "Twitter", color: "hover:bg-sky-500" },
    { icon: <Instagram />, label: "Instagram", color: "hover:bg-pink-600" },
    { icon: <Youtube />, label: "YouTube", color: "hover:bg-red-600" },
    { icon: <Linkedin />, label: "LinkedIn", color: "hover:bg-blue-700" },
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
              Your trusted partner for all home service needs. Professional,
              reliable, and always there when you need us.
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
              {[
                "Services",
                "Pricing",
                "About Us",
                "Careers",
                "Blog",
                "Press",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
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
                <span className="text-gray-300">
                  Lucknow Sukh Complex, SN 45, Munshi Pulia, Sector 16, Indira Nagar, Lucknow, Uttar Pradesh 226016
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">+91 8960628965</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-300">jeevancleaningservices@gmail.com</span>
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
          <p>
            © 2024 JeevanHomeServices. All rights reserved. |
            <a href="#" className="hover:text-white mx-2">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white mx-2">
              Terms of Service
            </a>{" "}
            |
            <a href="#" className="hover:text-white mx-2">
              Licenses
            </a>
          </p>
          <p className="mt-2">License #: HS123456 | Insured & Bonded</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
