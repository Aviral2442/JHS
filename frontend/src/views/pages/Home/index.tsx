import { useEffect, useRef, useState } from "react";
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
  Thermometer,
  Sun,
} from "lucide-react";
// import HeroSection from "./heroSection";
import HeroSkillSection from "../../../components/website/HeroSection";
import TrustedByFamilies from "./components/feedback";
import Hero from "./components/Hero";
import HeroSection from "./heroSection";
import MostBookedServices from "./components/MostBookedServices";
import ServicesBentoSection from "./components/Services";

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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

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
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      {/* <CommonHero
        title="Let’s Talk"
        highlightedText="About Your Project"
        subtitle="We’re here to help you turn your ideas into reality."
        primaryBtnText="Send Message"
        align="left"
      /> */}

      <section>
        {/* <HeroSection /> */}
        <Hero />
        {/* <HeroSkillSection /> */}
      </section>

      <section>
        <MostBookedServices />
      </section>

      {/* Services Section */}
      {/* <section className="py-16 bg-white">
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
      </section> */}
      <section>
        <ServicesBentoSection />
      </section>

      <section className="pt-10 px-4 md:px-6 relative overflow-hidden bg-[#f9fafb]">
        {/* <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" /> */}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6366F1] to-[#8B5CF6]">
                Works
              </span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
              Simple Steps To Get Our Services
            </p>
          </div>

          {/* Desktop Spiral Timeline - Hidden on mobile/tablet */}
          <div className="hidden xl:block relative w-full min-h-[900px]">
            {/* SVG Spiral Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1400 900"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="spiralGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#EC4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Main spiral path */}
              <path
                d="M 150 280 Q 250 200, 400 320 Q 520 420, 700 380 Q 850 340, 1050 400 Q 1200 460, 1250 580"
                fill="none"
                stroke="url(#spiralGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-50"
              />

              {/* Connecting dots */}
              <circle
                cx="150"
                cy="280"
                r="12"
                fill="#6366F1"
                className="animate-pulse"
              />
              <circle
                cx="400"
                cy="320"
                r="12"
                fill="#10B981"
                className="animate-pulse"
              />
              <circle
                cx="700"
                cy="380"
                r="12"
                fill="#F59E0B"
                className="animate-pulse"
              />
              <circle
                cx="1050"
                cy="400"
                r="12"
                fill="#EC4899"
                className="animate-pulse"
              />
              <circle
                cx="1250"
                cy="580"
                r="12"
                fill="#8B5CF6"
                className="animate-pulse"
              />
            </svg>

            {/* Step 01 - Left Top */}
            <div className="absolute" style={{ left: "-2%", top: "-5%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-linear-to-b from-transparent via-[#6366F1] to-transparent"
                style={{ bottom: "-112px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#6366F1] to-[#6366F1]/70 flex items-center justify-center text-white font-bold text-xl">
                    01
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-[#6366F1]">
                    I'm lovely Farm
                  </h3>
                </div>
                <p className="text-gray-600">
                  Enter basic details like name, number, service and message and
                  admin items.
                </p>
              </div>
            </div>

            {/* Step 02 - Left Bottom */}
            <div className="absolute" style={{ left: "16%", top: "52%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-linear-to-t from-transparent via-[#10B981] to-transparent"
                style={{ top: "-112px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
                    02
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-[#10B981]">
                    We Contact You
                  </h3>
                </div>
                <p className="text-gray-600">
                  Our professional customer support team receives such a social
                  year as soon as possible.
                </p>
              </div>
            </div>

            {/* Step 03 - Center (Larger) */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{ top: "2%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-linear-to-b from-transparent via-[#F59E0B] to-transparent"
                style={{ bottom: "-128px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-96 relative border-2 border-[#F59E0B]/30">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
                    03
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-[#F59E0B]">
                    Custom You Reading
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Discuss your family, services, family, professional form,
                  plans, etc and confirm your booking.
                </p>
              </div>
            </div>

            {/* Step 04 - Right Top */}
            <div className="absolute" style={{ right: "13%", top: "58%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-linear-to-b from-transparent via-[#EC4899] to-transparent"
                style={{ bottom: "200px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#EC4899] to-[#EC4899]/70 flex items-center justify-center text-white font-bold text-xl">
                    04
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-[#EC4899]">
                    Book via App
                  </h3>
                </div>
                <p className="text-gray-600">
                  Download the Johann home Services mobile app to book our
                  services directly through our app.
                </p>
              </div>
            </div>

            {/* Step 05 - Right Bottom - Additional Step from UI pattern */}
            <div className="absolute" style={{ right: "-2%", top: "27%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-linear-to-t from-transparent via-[#8B5CF6] to-transparent"
                style={{ top: "200px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#8B5CF6] to-[#8B5CF6]/70 flex items-center justify-center text-white font-bold text-xl">
                    05
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-[#8B5CF6]">
                    Enjoy Service
                  </h3>
                </div>
                <p className="text-gray-600">
                  Sit back and relax while our professionals take care of all
                  your home service needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tablet View - 2 Column Grid */}
        <div className="hidden lg:grid xl:hidden grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#6366F1] to-[#6366F1]/70 flex items-center justify-center text-white font-bold text-xl">
                01
              </div>
              <h3 className="ml-4 text-xl font-bold text-[#6366F1]">
                I'm lovely Farm
              </h3>
            </div>
            <p className="text-gray-600">
              Enter basic details like name, number, service and message and
              admin items.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
                02
              </div>
              <h3 className="ml-4 text-xl font-bold text-[#10B981]">
                We Contact You
              </h3>
            </div>
            <p className="text-gray-600">
              Our professional customer support team receives such a social year
              as soon as possible.
            </p>
          </div>

          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto relative border-2 border-[#F59E0B]/30">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Important
              </div>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
                  03
                </div>
                <h3 className="ml-4 text-2xl font-bold text-[#F59E0B]">
                  Custom You Reading
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Discuss your family, services, family, professional form, plans,
                etc and confirm your booking.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
                  02
                </div>
                <h3 className="ml-4 text-xl font-bold text-[#10B981]">
                  We Contact You
                </h3>
              </div>
              <p className="text-gray-600">
                Our professional customer support team receives such a social
                year as soon as possible.
              </p>
            </div>

            <div className="col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto relative border-2 border-[#F59E0B]/30">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
                    03
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-[#F59E0B]">
                    Custom You Reading
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Discuss your family, services, family, professional form,
                  plans, etc and confirm your booking.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#EC4899] to-[#EC4899]/70 flex items-center justify-center text-white font-bold text-xl">
                  04
                </div>
                <h3 className="ml-4 text-xl font-bold text-[#EC4899]">
                  Book via App
                </h3>
              </div>
              <p className="text-gray-600">
                Download the Johann home Services mobile app to book our
                services directly through our app.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#8B5CF6] to-[#8B5CF6]/70 flex items-center justify-center text-white font-bold text-xl">
                  05
                </div>
                <h3 className="ml-4 text-xl font-bold text-[#8B5CF6]">
                  Enjoy Service
                </h3>
              </div>
              <p className="text-gray-600">
                Sit back and relax while our professionals take care of all your
                home service needs.
              </p>
            </div>
          </div>

          {/* Mobile View - Vertical Timeline */}
          <div className="lg:hidden block space-y-8 md:space-y-12 mb-12">
            {[
              {
                number: "01",
                title: "I'm lovely Farm",
                description:
                  "Enter basic details like name, number, service and message and admin items.",
                color: "#6366F1",
              },
              {
                number: "02",
                title: "We Contact You",
                description:
                  "Our professional customer support team receives such a social year as soon as possible.",
                color: "#10B981",
              },
              {
                number: "03",
                title: "Custom You Reading",
                description:
                  "Discuss your family, services, family, professional form, plans, etc and confirm your booking.",
                color: "#F59E0B",
              },
              {
                number: "04",
                title: "Book via App",
                description:
                  "Download the Johann home Services mobile app to book our services directly through our app.",
                color: "#EC4899",
              },
              {
                number: "05",
                title: "Enjoy Service",
                description:
                  "Sit back and relax while our professionals take care of all your home service needs.",
                color: "#8B5CF6",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 4 && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 h-16 md:h-20 bg-linear-to-b from-current to-transparent"
                    style={{
                      color: step.color,
                      opacity: 0.3,
                      top: "100%",
                      marginTop: "0.75rem",
                    }}
                  />
                )}
                <div
                  className={`bg-white rounded-2xl shadow-xl p-6 ${
                    index === 2 ? "border-2 border-[#F59E0B]/30" : ""
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl`}
                      style={{
                        background: `linear-gradient(to right, ${step.color}, ${step.color}70)`,
                      }}
                    >
                      {step.number}
                    </div>
                    <h3
                      className="ml-4 text-xl font-bold"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
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

      <section className="bg-white" id="feedback">
        <TrustedByFamilies />
      </section>
      {/* Call to Action */}
      <section className="">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-indigo-600 to-blue-600  p-12 text-white"
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
