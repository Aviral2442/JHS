import React from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
  FaDribbble,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5B3FA3] text-white rounded-2xl p-10 md:p-14">
      {/* CTA SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">
            Start your 30-day free trial
          </h2>
          <p className="text-white/80">
            Join over 4,000+ startups already growing with Untitled.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white text-[#5B3FA3] rounded-lg font-medium hover:bg-gray-100 transition">
            Learn more
          </button>
          <button className="px-5 py-2.5 bg-[#7C5CDB] rounded-lg font-medium hover:bg-[#6a4fc7] transition">
            Get started
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/20 my-10" />

      {/* LINKS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
        {/* BRAND */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5B3FA3] font-bold">
              U
            </div>
            <span className="font-semibold text-lg">Untitled UI</span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Design amazing digital experiences that create more happy in the
            world.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Overview</li>
            <li>Features</li>
            <li className="flex items-center gap-2">
              Solutions
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                New
              </span>
            </li>
            <li>Tutorials</li>
            <li>Pricing</li>
            <li>Releases</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>About us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>News</li>
            <li>Media kit</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Blog</li>
            <li>Newsletter</li>
            <li>Events</li>
            <li>Help centre</li>
            <li>Tutorials</li>
            <li>Support</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold mb-3">Social</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>GitHub</li>
            <li>AngelList</li>
            <li>Dribbble</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Licenses</li>
            <li>Settings</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/70 text-sm">
          © 2077 Untitled UI. All rights reserved.
        </p>

        <div className="flex gap-4 text-white/80">
          <FaXTwitter className="cursor-pointer hover:text-white" />
          <FaLinkedinIn className="cursor-pointer hover:text-white" />
          <FaFacebookF className="cursor-pointer hover:text-white" />
          <FaGithub className="cursor-pointer hover:text-white" />
          <FaDribbble className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
