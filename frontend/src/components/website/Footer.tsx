import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Facebook, Instagram, Youtube } from "react-feather";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const ContactFooter: React.FC = () => {
  const socialLinks = [
    {
      icon: <Facebook />,
      label: "Facebook",
      color: "hover:bg-blue-600",
      link: "https://m.facebook.com/JeevanCleaningServices/",
    },
    {
      icon: <FaSquareXTwitter />,
      label: "Twitter",
      color: "hover:bg-sky-500",
      link: "https://x.com/CleaningJe77044",
    },
    {
      icon: <Instagram />,
      label: "Instagram",
      color: "hover:bg-pink-600",
      link: "https://www.instagram.com/jeevan_home_services/",
    },
    {
      icon: <Youtube />,
      label: "YouTube",
      color: "hover:bg-red-600",
      link: "https://youtube.com/@jeevancleaningservices?si=-YF3rNPExtqs8FmA",
    },
    // { icon: <Linkedin />, label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className=" w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img src="/images/logo.png" alt="" />
              </div>
              <span className="text-2xl font-bold">G.ONE Home</span>
            </div>
            <p className="text-gray-400 mb-8">
              A one stop platform which provide hassle-free services at
              effective cost with the help of our experts. A promise of world
              class customer service solution where everyone can earn even
              customer- lifetime.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.link}
                  target="_blank"
                  className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                ["Cleaning", "/services"],
                // ["Laundary", "/pricing"],
                ["Interior", "/about"],
                ["Furniture", "/blog"],
                ["Carpenter", "/blog"],
                ["Painting", "/blog"],
                // ["Pest Control", "/blog"],
                ["Plumber", "/blog"],
                ["Electrician", "/blog"],
              ].map((link) => (
                <li key={link[0]}>
                  <Link
                    to={link[1]}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
                ["FAQs", "/faqs"],
                ["Services", "/services"],
                ["Careers", "/careers"],
                ["Blog", "/blog"],
                ["Categories", "/category"],
              ].map((link) => (
                <li key={link[0]}>
                  <Link
                    to={link[1]}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {link[0]}
                  </Link>
                </li>
              ))}
            </ul>
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
                className="grow px-4 py-3 border-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-r-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-gray-800 text-gray-500  flex flex-col md:flex-row items-center justify-center gap-4 md:justify-around text-center">
          <div className="flex items-center mb-3 md:mb-0">
            <MapPin size={20} className="text-gray-400 mr-1" />
            <span className="text-gray-500 hover:text-gray-700 text-sm">
              Sukh Complex, SN 45, Munshi Pulia, Sector 16, Indira Nagar,
              Lucknow, Uttar Pradesh 226016
            </span>
          </div>
          <div className="flex items-center mb-3 md:mb-0">
            <Phone size={20} className="text-gray-400 mr-1" />
            <span className="text-gray-500 hover:text-gray-700 text-sm">
              +91 8960628965
            </span>
          </div>
          <div className="flex items-center mb-3 md:mb-0">
            <Mail size={20} className="text-gray-400 mr-1" />
            <span className="text-gray-500 hover:text-gray-700 text-sm">
              jeevancleaningservices@gmail.com
            </span>
          </div>
        </div>

        <div className="mt-5 pt-8 border-t border-gray-800 text-center text-gray-500">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
            <span>© 2024 JeevanHomeServices. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link to="/terms" className="hover:text-gray-700 mx-2">
                Terms &amp; Conditions
              </Link>
              <Link to="/privacy" className="hover:text-gray-700 mx-2">
                Privacy Policy
              </Link>
              <Link to="/policies/hub" className="hover:text-gray-700 mx-2">
                Disclaimer
              </Link>
              <Link
                to="/returns"
                className="hover:text-gray-700 mx-2"
              >
                Refund Policy
              </Link>
              <Link to="/cookies" className="hover:text-gray-700 mx-2">
                Cookies
              </Link>
              <Link to="#" className="hover:text-gray-700 mx-2">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
