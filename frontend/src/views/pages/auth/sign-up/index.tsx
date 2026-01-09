import { motion } from "framer-motion";
import {
  FaBroom,
  FaPaintRoller,
  FaTools,
  FaUserPlus,
} from "react-icons/fa";

const services = [
  { icon: FaBroom, label: "Cleaning" },
  { icon: FaPaintRoller, label: "Interior" },
  { icon: FaTools, label: "Repair" },
];

export default function HomeServicesRegister() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* LEFT – SERVICES PANEL */}
        <div className="hidden lg:flex relative flex-col justify-center bg-gradient-to-br from-indigo-600 to-indigo-500 p-12 text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Join Our Home Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 mb-10"
          >
            Create an account and book trusted professionals for your home.
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4"
              >
                <service.icon className="text-2xl" />
                <span className="font-medium">{service.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Decorative circle */}
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
        </div>

        {/* RIGHT – REGISTER FORM */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white"
            >
              <FaUserPlus />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center text-2xl font-bold text-gray-900"
            >
              Create your account
            </motion.h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Full name"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none"
              />

              <input
                type="password"
                placeholder="Confirm password"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow hover:bg-indigo-500"
              >
                <FaUserPlus />
                Create account
              </motion.button>
            </motion.form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
