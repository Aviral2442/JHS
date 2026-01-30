import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  LogIn, 
  Sparkles,
  Shield,
  Truck,
  Star,
  Wrench,
  Home
} from "lucide-react";
import { Link } from "react-router";

const features = [
  { icon: Star, label: "4.9 Rated", color: "text-yellow-500" },
  { icon: Truck, label: "Same Day", color: "text-blue-500" },
  { icon: Shield, label: "Verified", color: "text-green-500" },
  { icon: Wrench, label: "Expert Service", color: "text-purple-500" },
];

export default function HomeServicesLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--background-alt), var(--white-color), var(--background-alt))' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border relative z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        
        {/* LEFT – BRAND PANEL */}
        <div className="hidden lg:flex relative flex-col justify-center p-12 text-white overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--gray-color), var(--sky-blue))' }}>
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 backdrop-blur rounded-2xl flex items-center justify-center mb-8"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Home className="w-8 h-8" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-4 leading-tight"
            >
              Welcome Back to
              <span className="block text-cyan-200">Jeevan Services</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 mb-10 text-lg leading-relaxed"
            >
              Fast & reliable home services when you need them. Sign in to manage your bookings and track service requests.
            </motion.p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-2 backdrop-blur-md rounded-xl p-4 border hover:opacity-90 transition-colors"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--white-color)' }} />
                    <span className="font-medium text-sm">{feature.label}</span>
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
              <span>Trusted by 10,000+ happy customers in Lucknow</span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT – LOGIN FORM */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, var(--gray-color), var(--sky-blue))' }}
              >
                <LogIn className="w-7 h-7 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--black-color)' }}
              >
                Sign in to your account
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: 'var(--gray-color)' }}
              >
                Enter your credentials to access your dashboard
              </motion.p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                  <Mail className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                    <Lock className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: 'var(--sky-blue)' }}
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  style={{ accentColor: 'var(--sky-blue)' }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: 'var(--gray-color)' }}>
                  Remember me for 30 days
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full flex justify-center items-center gap-2 rounded-xl px-6 py-3.5 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <LogIn className="w-5 h-5" />
                Sign in
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-sm" style={{ color: 'var(--gray-color)' }}>
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--sky-blue)' }}
                >
                  Create an account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
