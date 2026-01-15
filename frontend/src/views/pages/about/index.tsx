export default function AboutPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative bg-White overflow-hidden py-32 bg-white">

        <div className="relative max-w-7xl mx-auto px-6 text-center ">
          <span className="bg-gray-200 backdrop-blur-md px-5 py-2 rounded-full text-sm">
            About Jeevan Cleaning Services
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            One Platform For All
            <span className="inline-block text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">Your Home Service Needs</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
            We deliver the best cleaning and home services across India with
            trained professionals, transparent pricing and fast booking.
          </p>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-pink-500 font-semibold">
              TOP CLEANING & Home Care at Your Doorstep
            </span>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Our Vision:</h3>
                <p className="text-gray-600 mt-2">
                  We have a vision of creating a large household, park driving
                  and providing our home care needs. To our point, we can not
                  prepare with various purchases.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Our Mission:
                </h3>
                <p className="text-gray-600 mt-2">
                  Our mission is to provide free and affordable services, which
                  will offer the strong benefits and benefits we help you to
                  meet and find comfortable.
                </p>
              </div>
            </div>

            <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all text-white rounded-lg">
              Discover Services
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 h-64 rounded-xl"></div>
            <div className="bg-gray-100 h-64 rounded-xl"></div>
            <div className="bg-gray-100 h-64 rounded-xl"></div>
            <div className="bg-gray-100 h-64 rounded-xl"></div>
          </div>
        </div>
      </section>

      <section className="relative bg-white overflow-hidden py-24 ">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              We deliver the best cleaning and home services across India.
            </h2>

            <div className="space-y-4 text-gray-700">
              <p>
                Johann Chaining Avenue Solutions is a leading and prominent
                house and cleaning service provider across India. Our rapid and
                professional cleaning service was a major and attractive, low
                provider repair area ensuring, in order to serve as a
                full-service service, electrifies, provides and supports
                services.
              </p>
              <p>
                Our solution has ensured residents and quality service every
                time you look up. Home services were used to ensure that our
                customers are safe, and they are always of those people who live
                with cleansing, open washing, and a service that provides access
                to supplies for visitors. We conduct a proper with local
                services professionals based on their facilities.
              </p>
            </div>
          </div>

          <div className="bg-[#f2f4f7] backdrop-blur-xl rounded-2xl h-80"></div>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            We provide cleaning and home services at your doorstep.
          </h2>
          <p className="text-gray-600 mt-4">
            Book services easily at your preferred time. Book home Services and
            bulk services at your preferred time.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Home Service",
                desc: "Net home service professionals for repairs, cleaning, and maintenance.",
              },
              {
                title: "Glass & Deep Cleaning",
                desc: "Professional cleaning for homes and offices, having very great use activities.",
              },
              {
                title: "Bulk Services",
                desc: "Built-in office homes served in bulk for housing sections and offices.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl shadow-lg p-8 border"
              >
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-gray-600 mt-4">{s.desc}</p>
                <button className="mt-6 text-pink-500">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-10 px-4 md:px-6 relative overflow-hidden bg-white">
        {/* <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" /> */}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                Works
              </span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
              Simple Steps To Get Our Services
            </p>
          </div>

          {/* Desktop Spiral Timeline - Hidden on mobile/tablet */}
          <div className="hidden xl:block relative w-full min-h-[900px] mb-5">
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
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-gradient-to-b from-transparent via-[#6366F1] to-transparent"
                style={{ bottom: "-112px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366F1] to-[#6366F1]/70 flex items-center justify-center text-white font-bold text-xl">
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
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-gradient-to-t from-transparent via-[#10B981] to-transparent"
                style={{ top: "-112px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
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
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent"
                style={{ bottom: "-128px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-96 relative border-2 border-[#F59E0B]/30">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
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
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-gradient-to-b from-transparent via-[#EC4899] to-transparent"
                style={{ bottom: "200px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#EC4899] to-[#EC4899]/70 flex items-center justify-center text-white font-bold text-xl">
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
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-gradient-to-t from-transparent via-[#8B5CF6] to-transparent"
                style={{ top: "200px" }}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/70 flex items-center justify-center text-white font-bold text-xl">
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366F1] to-[#6366F1]/70 flex items-center justify-center text-white font-bold text-xl">
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
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
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Important
              </div>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#10B981] to-[#10B981]/70 flex items-center justify-center text-white font-bold text-xl">
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
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/70 flex items-center justify-center text-white font-bold text-2xl">
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#EC4899] to-[#EC4899]/70 flex items-center justify-center text-white font-bold text-xl">
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/70 flex items-center justify-center text-white font-bold text-xl">
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
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 h-16 md:h-20 bg-gradient-to-b from-current to-transparent"
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
    </div>
  );
}
