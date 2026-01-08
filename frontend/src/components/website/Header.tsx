import React from "react";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 shadow-md">
        <div className="max-w-[90%] mx-auto py-4">
          <nav className="flex justify-between items-center">
            <img src="/images/logo.png" alt="JHS Logo" className="w-14" />
            <ul className="flex gap-5">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
            <div className="flex gap-5">
              <Link
                to="/sign-in"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
