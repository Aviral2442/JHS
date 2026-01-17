import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  UserPlus, 
  User,
  Sparkles,
  Shield,
  CheckCircle,
  Phone,
} from "lucide-react";
import { Link } from "react-router";

const benefits = [
  { icon: Shield, label: "Secure Account", desc: "Your data is protected" },
  { icon: CheckCircle, label: "Instant Booking", desc: "Book services in minutes" },
  { icon: Phone, label: "24/7 Support", desc: "We're always here to help" },
  { icon: Sparkles, label: "Exclusive Deals", desc: "Get special offers" },
];

export default function HomeServicesRegister() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10">
        
        {/* LEFT – BRAND PANEL */}
        <div className="hidden lg:flex relative flex-col justify-center bg-linear-to-br from-cyan-600 via-blue-500 to-blue-600 p-12 text-white overflow-hidden">
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-10 w-40 h-40 border-2 border-white rounded-full" />
            <div className="absolute bottom-10 left-20 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-28 h-28 border-2 border-white rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-8"
            >
              <UserPlus className="w-8 h-8" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-4 leading-tight"
            >
              Join Jeevan Services
              <span className="block text-cyan-200">Create Your Account</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 mb-10 text-lg leading-relaxed"
            >
              Sign up today and get access to fast, reliable home services. Book plumbers, electricians, cleaners & more with just a few clicks.
            </motion.p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.label}</h4>
                      <p className="text-white/80 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-2 text-white/80 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join 10,000+ customers enjoying premium home services</span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT – REGISTER FORM */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              >
                <UserPlus className="w-7 h-7 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Create your account
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                Get started with a few simple steps
              </motion.p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-5 h-5" />
                Create account
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
