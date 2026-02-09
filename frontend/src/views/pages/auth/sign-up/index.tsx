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
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const benefits = [
  { icon: Shield, label: "Secure Account", desc: "Your data is protected" },
  { icon: CheckCircle, label: "Instant Booking", desc: "Book services in minutes" },
  { icon: Phone, label: "24/7 Support", desc: "We're always here to help" },
  { icon: Sparkles, label: "Exclusive Deals", desc: "Get special offers" },
];


const userRegisterSchema = Yup.object().shape({
  users_name: Yup.string().required("Full name is required"),
  users_email: Yup.string().email("Invalid email").required("Email is required"),
  users_password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('users_password')], 'Passwords must match')
    .required('Confirm Password is required'),
});


const HomeServicesRegister = () => {
  const navigate = useNavigate();

  const userRegister = useFormik({
    initialValues: {
      users_name: '',
      users_email: '',
      users_password: '',
      confirm_password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/auth/user-registration`, values);
        console.log(res.data);
        setSubmitting(false);
        if (res.data?.jsonData?.status === 200) {
          console.log(res.data);
          navigate('/sign-in');
        }
    } catch (error) {      
      setSubmitting(false);
      console.error("Registration error:", error);
    }
  },
    validationSchema: userRegisterSchema,
});


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--background-alt), var(--white-color), var(--background-alt))' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border relative z-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        
        {/* LEFT – BRAND PANEL */}
        <div className="hidden lg:flex relative flex-col justify-center p-12 text-white overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--sky-blue), var(--gray-color))' }}>
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
              className="w-16 h-16 backdrop-blur rounded-2xl flex items-center justify-center mb-8"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
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
                    className="flex items-start gap-4 backdrop-blur-md rounded-xl p-4 border hover:opacity-90 transition-colors"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.label}</h4>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{benefit.desc}</p>
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
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, var(--sky-blue), var(--gray-color))' }}
              >
                <UserPlus className="w-7 h-7 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--black-color)' }}
              >
                Create your account
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: 'var(--gray-color)' }}
              >
                Get started with a few simple steps
              </motion.p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5"
              onSubmit={userRegister.handleSubmit}
            >
              <div>
                <label htmlFor="users_name" className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                  <User className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  name="users_name"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  onChange={userRegister.handleChange}
                  value={userRegister.values.users_name}
                />
                {userRegister.errors.users_name && userRegister.touched.users_name && (
                  <p className="mt-1 text-xs text-red-500">{userRegister.errors.users_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="users_email" className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                  <Mail className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="users_email"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  onChange={userRegister.handleChange}
                  value={userRegister.values.users_email}
                />
                {userRegister.errors.users_email && userRegister.touched.users_email && (
                  <p className="mt-1 text-xs text-red-500">{userRegister.errors.users_email}</p>
                )}
              </div>

              <div>
                <label htmlFor="users_password" className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                  <Lock className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  name="users_password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  onChange={userRegister.handleChange}
                  value={userRegister.values.users_password}
                />
                {userRegister.errors.users_password && userRegister.touched.users_password && (
                  <p className="mt-1 text-xs text-red-500">{userRegister.errors.users_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--gray-color)' }}>
                  <Lock className="w-4 h-4" style={{ color: 'var(--gray-color)' }} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
                  style={{ borderColor: 'var(--gray-color)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  onChange={userRegister.handleChange}
                  value={userRegister.values.confirm_password}
                />
                {userRegister.errors.confirm_password && userRegister.touched.confirm_password && (
                  <p className="mt-1 text-xs text-red-500">{userRegister.errors.confirm_password}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded"
                  style={{ accentColor: 'var(--sky-blue)' }}
                />
                <label htmlFor="terms" className="ml-2 block text-sm" style={{ color: 'var(--gray-color)' }}>
                  I agree to the{" "}
                  <Link to="/terms" className="font-semibold hover:opacity-80" style={{ color: 'var(--sky-blue)' }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-semibold hover:opacity-80" style={{ color: 'var(--sky-blue)' }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full flex justify-center items-center gap-2 rounded-xl px-6 py-3.5 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                
              >
                <UserPlus className="w-5 h-5" />
                {userRegister.isSubmitting ? "Creating Account..." : "Sign Up"}
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-sm" style={{ color: 'var(--gray-color)' }}>
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--sky-blue)' }}
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


export default HomeServicesRegister;