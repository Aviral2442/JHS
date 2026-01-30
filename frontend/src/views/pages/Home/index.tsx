import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Shield,
  Clock,
  DollarSign,
  HeadphonesIcon
} from "lucide-react";
// import HeroSection from "./heroSection";
// import HeroSkillSection from "../../../components/website/HeroSection";
import TrustedByFamilies from "./components/Feedback";
import Hero from "./components/Hero";
// import HeroSection from "./heroSection";
import MostBookedServices from "./components/MostBookedServices";
import ServicesBentoSection from "./components/Services";

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

export default function HomeEaseLanding() {

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

      <section className="pt-10 px-4 md:px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--background-alt)' }}>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="section-divider mx-auto"></div>
            <h2 className="section-title mb-4 md:mb-6">
              How It{" "}
              <span style={{ color: 'var(--sky-blue)' }}>
                Works
              </span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Simple Steps To Get Our Services
            </p>
          </div>

          {/* Desktop Spiral Timeline - Hidden on mobile/tablet */}
          <div className="hidden xl:block relative w-full min-h-[800px]">
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
                  <stop offset="0%" stopColor="#00ADB5" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#393E46" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#00ADB5" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#222831" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00ADB5" stopOpacity="0.3" />
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
                fill="#00ADB5"
                className="animate-pulse"
              />
              <circle
                cx="400"
                cy="320"
                r="12"
                fill="#393E46"
                className="animate-pulse"
              />
              <circle
                cx="700"
                cy="380"
                r="12"
                fill="#00ADB5"
                className="animate-pulse"
              />
              <circle
                cx="1050"
                cy="400"
                r="12"
                fill="#222831"
                className="animate-pulse"
              />
              <circle
                cx="1250"
                cy="580"
                r="12"
                fill="#00ADB5"
                className="animate-pulse"
              />
            </svg>

            {/* Step 01 - Left Top */}
            <div className="absolute" style={{ left: "-1%", top: "-10%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{ bottom: "-112px", background: 'linear-gradient(to bottom, transparent, var(--sky-blue), transparent)' }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))' }}>
                    01
                  </div>
                  <h3 className="ml-4 text-xl font-bold" style={{ color: 'var(--sky-blue)' }}>
                    Fill the Form
                  </h3>
                </div>
                <p style={{ color: 'var(--gray-color)' }}>
                  Enter basic details like name, number, service and message and
                  admin items.
                </p>
              </div>
            </div>

            {/* Step 02 - Left Bottom */}
            <div className="absolute" style={{ left: "17%", top: "52%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{ top: "-112px", background: 'linear-gradient(to top, transparent, var(--gray-color), transparent)' }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(to right, var(--gray-color), rgba(57, 62, 70, 0.7))' }}>
                    02
                  </div>
                  <h3 className="ml-4 text-xl font-bold" style={{ color: 'var(--gray-color)' }}>
                    We Contact You
                  </h3>
                </div>
                <p style={{ color: 'var(--gray-color)' }}>
                  Our professional customer support team receives such a social
                  year as soon as possible.
                </p>
              </div>
            </div>

            {/* Step 03 - Center (Larger) */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{ top: "-3%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-32"
                style={{ bottom: "-128px", background: 'linear-gradient(to bottom, transparent, var(--sky-blue), transparent)' }}
              />
              <div className="card-ui rounded-2xl w-96 relative" style={{ borderWidth: '2px', borderColor: 'rgba(0, 173, 181, 0.3)' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))' }}>
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ background: 'linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))' }}>
                    03
                  </div>
                  <h3 className="ml-4 text-2xl font-bold" style={{ color: 'var(--sky-blue)' }}>
                    Confirm Booking
                  </h3>
                </div>
                <p className="text-lg" style={{ color: 'var(--gray-color)' }}>
                  Discuss your family, services, family, professional form,
                  plans, etc and confirm your booking.
                </p>
              </div>
            </div>

            {/* Step 04 - Right Top */}
            <div className="absolute" style={{ right: "13%", top: "60%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{ bottom: "200px", background: 'linear-gradient(to bottom, transparent, var(--black-color), transparent)' }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(to right, var(--black-color), rgba(34, 40, 49, 0.7))' }}>
                    04
                  </div>
                  <h3 className="ml-4 text-xl font-bold" style={{ color: 'var(--black-color)' }}>
                    Book via App
                  </h3>
                </div>
                <p style={{ color: 'var(--gray-color)' }}>
                  Download the Johann home Services mobile app to book our
                  services directly through our app.
                </p>
              </div>
            </div>

            {/* Step 05 - Right Bottom - Additional Step from UI pattern */}
            <div className="absolute" style={{ right: "-1%", top: "23%" }}>
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{ top: "200px", background: 'linear-gradient(to top, transparent, var(--sky-blue), transparent)' }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))' }}>
                    05
                  </div>
                  <h3 className="ml-4 text-xl font-bold" style={{ color: 'var(--sky-blue)' }}>
                    Enjoy Service
                  </h3>
                </div>
                <p style={{ color: 'var(--gray-color)' }}>
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
            <p style={{ color: 'var(--gray-color)' }}>
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
            <p style={{ color: 'var(--gray-color)' }}>
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
              <p className="text-lg" style={{ color: 'var(--gray-color)' }}>
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
              <p style={{ color: 'var(--gray-color)' }}>
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
                <p className="text-lg" style={{ color: 'var(--gray-color)' }}>
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
              <p style={{ color: 'var(--gray-color)' }}>
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
              <p style={{ color: 'var(--gray-color)' }}>
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
                  <p style={{ color: 'var(--gray-color)' }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--white-color)' }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ backgroundColor: 'rgba(0, 173, 181, 0.2)' }}></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" style={{ backgroundColor: 'rgba(57, 62, 70, 0.2)' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-highlight mb-4">
                Why Choose Us
              </span>
              <h2 className="section-title mb-4">
                Experience the <span style={{ color: 'var(--sky-blue)' }}>HomeEase</span>{" "}
                Difference
              </h2>
              <p className="section-subtitle mx-auto text-center">
                We're redefining home services with trust, quality, and
                convenience at every step
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="card-ui relative rounded-2xl h-full">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, rgba(0, 173, 181, 0.1), rgba(57, 62, 70, 0.05))' }}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon container with animated gradient */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" style={{ background: 'linear-gradient(to bottom right, var(--sky-blue), var(--gray-color))' }}></div>
                      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300" style={{ background: 'linear-gradient(to bottom right, var(--sky-blue), var(--gray-color))' }}>
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="card-title text-xl mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="card-desc leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative element */}
                    <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--background-alt)' }}>
                      <div className="flex items-center font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--sky-blue)' }}>
                        <span>Learn more</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)', color: 'var(--sky-blue)' }}>
                    {index + 1}
                  </div>
                </div>
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
            className="p-12 text-white"
            style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to make your home better?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Join thousands of happy homeowners who trust HomeEase
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book a Service Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
