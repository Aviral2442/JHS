import { useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  Star,
  Shield,
  Clock,
  DollarSign,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
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
import CommonHero from "../../../components/website/Hero";

// Service data
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

const features = [
  {
    id: 1,
    title: "Verified Professionals",
    icon: Shield,
    description: "All experts are background-checked and certified",
  },
  {
    id: 2,
    title: "Transparent Pricing",
    icon: DollarSign,
    description: "No hidden fees, upfront pricing",
  },
  {
    id: 3,
    title: "24/7 Support",
    icon: HeadphonesIcon,
    description: "Round-the-clock customer support",
  },
  {
    id: 4,
    title: "Fast Booking",
    icon: Clock,
    description: "Book services in under 2 minutes",
  },
];

const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "$49",
    period: "/month",
    features: ["Basic Cleaning", "Minor Repairs", "Email Support"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    id: 2,
    name: "Standard",
    price: "$99",
    period: "/month",
    features: [
      "Deep Cleaning",
      "All Basic Services",
      "Priority Support",
      "Monthly Maintenance",
    ],
    buttonText: "Most Popular",
    popular: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "$199",
    period: "/month",
    features: [
      "All Services",
      "24/7 Priority Support",
      "Dedicated Manager",
      "Monthly Inspection",
    ],
    buttonText: "Go Premium",
    popular: false,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "HomeEase made my kitchen renovation stress-free. The professionals were punctual and did an excellent job!",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "The AC repair service was quick and efficient. Saved me from a hot weekend!",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Interior Designer",
    content:
      "I recommend HomeEase to all my clients. Reliable, professional, and affordable.",
    rating: 5,
    avatar: "EW",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Property Manager",
    content:
      "Perfect for regular maintenance across multiple properties. Excellent service every time.",
    rating: 5,
    avatar: "DB",
  },
];

export default function HomeEaseLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.1,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <CommonHero
        title="Let’s Talk"
        highlightedText="About Your Project"
        subtitle="We’re here to help you turn your ideas into reality."
        primaryBtnText="Send Message"
        align="left"
      />
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Professional Home Services at Your{" "}
                <span className="text-indigo-600">Doorstep</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                From cleaning to renovation, we connect you with trusted
                experts. Experience hassle-free home maintenance with just a few
                clicks.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Book a Service
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  View Services
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-8 h-96">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {services.slice(0, 4).map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <service.icon className="h-8 w-8 text-indigo-500 mb-2" />
                      <h3 className="font-medium text-gray-900">
                        {service.name}
                      </h3>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">500+</p>
                      <p className="text-sm text-gray-600">Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="mt-4 text-gray-600">
              Comprehensive home services for every need
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              >
                <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-gray-600">
              Simple steps to get your home service booked
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Service",
                description:
                  "Browse our wide range of home services and select what you need.",
              },
              {
                step: "2",
                title: "Book Online",
                description:
                  "Pick a time that works for you and book instantly online.",
              },
              {
                step: "3",
                title: "Get Professional Help",
                description:
                  "Our verified experts arrive on time and deliver quality work.",
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: parseInt(step.step) * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="absolute -top-4 left-8 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose HomeEase
            </h2>
            <p className="mt-4 text-gray-600">
              We're committed to making home services simple and reliable
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: plan.id * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 border-2 ${plan.popular
                    ? "border-indigo-600 shadow-xl relative bg-white"
                    : "border-gray-200 shadow-sm bg-white"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-medium ${plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                  {plan.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-gray-600">
              Join thousands of satisfied homeowners
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start mb-6">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="font-semibold text-indigo-600">
                        {testimonials[activeTestimonial].avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg italic">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === activeTestimonial
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to make your home better?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of happy homeowners who trust HomeEase
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book a Service Now
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
