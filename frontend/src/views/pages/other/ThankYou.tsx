import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  Mail,
  Phone,
  Home,
  ArrowRight,
  Calendar,
  Clock,
  MessageSquare,
  Heart,
} from "lucide-react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--background-alt), var(--white-color), var(--background-alt))' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(0,173,181,0.2)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ backgroundColor: 'rgba(0,173,181,0.2)' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center mb-8"
        >
          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>

          {/* Confetti Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, rotate: 0 }}
                animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--gray-color)' }}
          >
            We've received your request and our team will get back to you shortly.
            We appreciate your trust in Jeevan Services!
          </motion.p>

          {/* Success Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-6 md:p-8 mb-8 border"
            style={{ backgroundColor: 'var(--background-alt)', borderColor: 'var(--gray-color)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--background-alt)' }}>
                  <Mail className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Confirmation</h3>
                <p className="text-sm text-center" style={{ color: 'var(--gray-color)' }}>
                  Check your inbox for confirmation details
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--background-alt)' }}>
                  <Clock className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Quick Response</h3>
                <p className="text-sm text-center" style={{ color: 'var(--gray-color)' }}>
                  We'll contact you within 30 minutes
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--background-alt)' }}>
                  <Calendar className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Service Scheduled</h3>
                <p className="text-sm text-center" style={{ color: 'var(--gray-color)' }}>
                  Your booking is being processed
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Contact Info Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" style={{ color: 'var(--sky-blue)' }} />
              Need Immediate Help?
            </h3>
            <p className="mb-4" style={{ color: 'var(--gray-color)' }}>
              Call us directly for urgent service requests or questions.
            </p>
            <a
              href="tel:8960628965"
              className="inline-flex items-center gap-2 font-semibold transition-colors"
              style={{ color: 'var(--sky-blue)' }}
            >
              +91 8960628965
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Support Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--sky-blue)' }} />
              Have Questions?
            </h3>
            <p className="mb-4" style={{ color: 'var(--gray-color)' }}>
              Our support team is here to assist you 24/7.
            </p>
            <a
              href="mailto:jeevancleaningservices@gmail.com"
              className="inline-flex items-center gap-2 font-semibold transition-colors"
              style={{ color: 'var(--sky-blue)' }}
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: 'var(--sky-blue)' }}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.a>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all shadow-md hover:shadow-lg"
          >
            Submit Another Request
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Appreciation Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-sm">
              Thank you for choosing Jeevan Services. We're committed to providing you with the best home service experience.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
