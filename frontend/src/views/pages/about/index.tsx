export default function AboutPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-32"
        style={{ backgroundColor: "var(--white-color)" }}
      >
        <div className="relative max-w-7xl mx-auto px-6 text-center ">
          <span className="badge-highlight">
            About Jeevan Cleaning Services
          </span>

          <h1 className="section-title text-5xl md:text-6xl mt-6">
            One Platform For All
            <span className="inline-block" style={{ color: "var(--sky-blue)" }}>
              Your Home Service Needs
            </span>
          </h1>

          <p className="section-subtitle mt-6 max-w-3xl mx-auto">
            We deliver the best cleaning and home services across India with
            trained professionals, transparent pricing and fast booking.
          </p>
        </div>
      </section>

      <section
        className="section-wrapper"
        style={{ backgroundColor: "var(--background-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span
              className="font-semibold"
              style={{ color: "var(--sky-blue)" }}
            >
              TOP CLEANING & Home Care at Your Doorstep
            </span>

            <div className="space-y-4">
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--black-color)" }}
                >
                  Our Vision:
                </h3>
                <p className="mt-2" style={{ color: "var(--gray-color)" }}>
                  We have a vision of creating a large household, park driving
                  and providing our home care needs. To our point, we can not
                  prepare with various purchases.
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--black-color)" }}
                >
                  Our Mission:
                </h3>
                <p className="mt-2" style={{ color: "var(--gray-color)" }}>
                  Our mission is to provide free and affordable services, which
                  will offer the strong benefits and benefits we help you to
                  meet and find comfortable.
                </p>
              </div>
            </div>

            <button className="btn-primary">Discover Services</button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div
              className="h-64 rounded-xl"
              style={{ backgroundColor: "var(--background-alt)" }}
            ></div>
            <div
              className="h-64 rounded-xl"
              style={{ backgroundColor: "var(--background-alt)" }}
            ></div>
            <div
              className="h-64 rounded-xl"
              style={{ backgroundColor: "var(--background-alt)" }}
            ></div>
            <div
              className="h-64 rounded-xl"
              style={{ backgroundColor: "var(--background-alt)" }}
            ></div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: "var(--white-color)" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-title text-4xl mb-6">
              We deliver the best cleaning and home services across India.
            </h2>

            <div className="space-y-4" style={{ color: "var(--gray-color)" }}>
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

          <div
            className="backdrop-blur-xl rounded-2xl h-80"
            style={{ backgroundColor: "var(--background-alt)" }}
          ></div>
        </div>
      </section>

      <section
        className="section-wrapper"
        style={{ backgroundColor: "var(--background-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="section-title text-4xl">
            We provide cleaning and home services at your doorstep.
          </h2>
          <p className="section-subtitle mt-4">
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
              <div key={s.title} className="card-ui">
                <h3 className="card-title text-xl">{s.title}</h3>
                <p className="card-desc mt-4">{s.desc}</p>
                <button className="mt-6" style={{ color: "var(--sky-blue)" }}>
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-10 md:py-10 px-4 md:px-6 relative overflow-hidden"
        style={{ backgroundColor: "var(--white-color)" }}
      >
        <style>{`
        @keyframes wave-flow {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes card-fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wave-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: wave-flow 3s ease-in-out infinite;
        }

        .wave-path-1 {
          animation-delay: 0s;
        }

        .wave-path-2 {
          animation-delay: 0.6s;
        }

        .wave-path-3 {
          animation-delay: 1.2s;
        }

        .wave-path-4 {
          animation-delay: 1.8s;
        }

        .pulse-dot {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .pulse-dot-1 {
          animation-delay: 0s;
        }

        .pulse-dot-2 {
          animation-delay: 0.6s;
        }

        .pulse-dot-3 {
          animation-delay: 1.2s;
        }

        .pulse-dot-4 {
          animation-delay: 1.8s;
        }

        .pulse-dot-5 {
          animation-delay: 2.4s;
        }

        .animated-card {
          animation: card-fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animated-card-1 {
          animation-delay: 0.2s;
        }

        .animated-card-2 {
          animation-delay: 0.4s;
        }

        .animated-card-3 {
          animation-delay: 0.6s;
        }

        .animated-card-4 {
          animation-delay: 0.8s;
        }

        .animated-card-5 {
          animation-delay: 1s;
        }
      `}</style>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
              How It <span style={{ color: "var(--sky-blue)" }}>Works</span>
            </h2>
            <p className="section-subtitle text-lg md:text-xl lg:text-2xl">
              Simple Steps To Get Our Services
            </p>
          </div>

          {/* Desktop Spiral Timeline - Hidden on mobile/tablet */}
          <div className="hidden xl:block relative w-full min-h-[900px] mb-5">
            {/* SVG Spiral Path with Wave Animation */}
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

                <linearGradient
                  id="waveGradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#00ADB5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#393E46" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00ADB5" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Static background path */}
              <path
                d="M 150 280 Q 250 200, 400 320 Q 520 420, 700 380 Q 850 340, 1050 400 Q 1200 460, 1250 580"
                fill="none"
                stroke="url(#spiralGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-50"
              />

              {/* Animated wave paths */}
              <path
                d="M 150 280 Q 250 200, 400 320"
                fill="none"
                stroke="url(#waveGradient1)"
                strokeWidth="8"
                strokeLinecap="round"
                className="wave-path wave-path-1"
              />
              <path
                d="M 400 320 Q 520 420, 700 380"
                fill="none"
                stroke="url(#waveGradient1)"
                strokeWidth="8"
                strokeLinecap="round"
                className="wave-path wave-path-2"
              />
              <path
                d="M 700 380 Q 850 340, 1050 400"
                fill="none"
                stroke="url(#waveGradient1)"
                strokeWidth="8"
                strokeLinecap="round"
                className="wave-path wave-path-3"
              />
              <path
                d="M 1050 400 Q 1200 460, 1250 580"
                fill="none"
                stroke="url(#waveGradient1)"
                strokeWidth="8"
                strokeLinecap="round"
                className="wave-path wave-path-4"
              />

              {/* Animated connecting dots */}
              <circle
                cx="150"
                cy="280"
                r="12"
                fill="#00ADB5"
                className="pulse-dot pulse-dot-1"
              />
              <circle
                cx="400"
                cy="320"
                r="12"
                fill="#393E46"
                className="pulse-dot pulse-dot-2"
              />
              <circle
                cx="700"
                cy="380"
                r="12"
                fill="#00ADB5"
                className="pulse-dot pulse-dot-3"
              />
              <circle
                cx="1050"
                cy="400"
                r="12"
                fill="#222831"
                className="pulse-dot pulse-dot-4"
              />
              <circle
                cx="1250"
                cy="580"
                r="12"
                fill="#00ADB5"
                className="pulse-dot pulse-dot-5"
              />
            </svg>

            {/* Step 01 - Left Top */}
            <div
              className="absolute animated-card animated-card-1"
              style={{ left: "-2%", top: "-5%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{
                  bottom: "-112px",
                  background:
                    "linear-gradient(to bottom, transparent, var(--sky-blue), transparent)",
                }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                    }}
                  >
                    01
                  </div>
                  <h3
                    className="ml-4 text-xl font-bold"
                    style={{ color: "var(--sky-blue)" }}
                  >
                    Fill the Form
                  </h3>
                </div>
                <p style={{ color: "var(--gray-color)" }}>
                  Enter basic details like name, number, service and message and
                  admin items.
                </p>
              </div>
            </div>

            {/* Step 02 - Left Bottom */}
            <div
              className="absolute animated-card animated-card-2"
              style={{ left: "16%", top: "52%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{
                  top: "-112px",
                  background:
                    "linear-gradient(to top, transparent, var(--gray-color), transparent)",
                }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--gray-color), rgba(57, 62, 70, 0.7))",
                    }}
                  >
                    02
                  </div>
                  <h3
                    className="ml-4 text-xl font-bold"
                    style={{ color: "var(--gray-color)" }}
                  >
                    We Contact You
                  </h3>
                </div>
                <p style={{ color: "var(--gray-color)" }}>
                  Our professional customer support team receives such a social
                  year as soon as possible.
                </p>
              </div>
            </div>

            {/* Step 03 - Center (Larger) */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 animated-card animated-card-3"
              style={{ top: "2%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-32"
                style={{
                  bottom: "-128px",
                  background:
                    "linear-gradient(to bottom, transparent, var(--sky-blue), transparent)",
                }}
              />
              <div
                className="card-ui rounded-2xl w-96 relative"
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(0, 173, 181, 0.3)",
                }}
              >
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                  }}
                >
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                    }}
                  >
                    03
                  </div>
                  <h3
                    className="ml-4 text-2xl font-bold"
                    style={{ color: "var(--sky-blue)" }}
                  >
                    Confirm Booking
                  </h3>
                </div>
                <p className="text-lg" style={{ color: "var(--gray-color)" }}>
                  Discuss your family, services, family, professional form,
                  plans, etc and confirm your booking.
                </p>
              </div>
            </div>

            {/* Step 04 - Right Top */}
            <div
              className="absolute animated-card animated-card-4"
              style={{ right: "13%", top: "58%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{
                  bottom: "200px",
                  background:
                    "linear-gradient(to bottom, transparent, var(--black-color), transparent)",
                }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--black-color), rgba(34, 40, 49, 0.7))",
                    }}
                  >
                    04
                  </div>
                  <h3
                    className="ml-4 text-xl font-bold"
                    style={{ color: "var(--black-color)" }}
                  >
                    Book via App
                  </h3>
                </div>
                <p style={{ color: "var(--gray-color)" }}>
                  Download the Johann home Services mobile app to book our
                  services directly through our app.
                </p>
              </div>
            </div>

            {/* Step 05 - Right Bottom */}
            <div
              className="absolute animated-card animated-card-5"
              style={{ right: "-2%", top: "27%" }}
            >
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-28"
                style={{
                  top: "200px",
                  background:
                    "linear-gradient(to top, transparent, var(--sky-blue), transparent)",
                }}
              />
              <div className="card-ui rounded-2xl w-80">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                    }}
                  >
                    05
                  </div>
                  <h3
                    className="ml-4 text-xl font-bold"
                    style={{ color: "var(--sky-blue)" }}
                  >
                    Enjoy Service
                  </h3>
                </div>
                <p style={{ color: "var(--gray-color)" }}>
                  Sit back and relax while our professionals take care of all
                  your home service needs.
                </p>
              </div>
            </div>
          </div>

          {/* Tablet View - 2 Column Grid */}
          <div className="hidden lg:grid xl:hidden grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="card-ui rounded-2xl animated-card animated-card-1">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                  }}
                >
                  01
                </div>
                <h3
                  className="ml-4 text-xl font-bold"
                  style={{ color: "var(--sky-blue)" }}
                >
                  Fill the Form
                </h3>
              </div>
              <p style={{ color: "var(--gray-color)" }}>
                Enter basic details like name, number, service and message and
                admin items.
              </p>
            </div>

            <div className="card-ui rounded-2xl animated-card animated-card-2">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(to right, var(--gray-color), rgba(57, 62, 70, 0.7))",
                  }}
                >
                  02
                </div>
                <h3
                  className="ml-4 text-xl font-bold"
                  style={{ color: "var(--gray-color)" }}
                >
                  We Contact You
                </h3>
              </div>
              <p style={{ color: "var(--gray-color)" }}>
                Our professional customer support team receives such a social
                year as soon as possible.
              </p>
            </div>

            <div className="col-span-2 animated-card animated-card-3">
              <div
                className="card-ui rounded-2xl max-w-2xl mx-auto relative"
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(0, 173, 181, 0.3)",
                }}
              >
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                  }}
                >
                  Most Important
                </div>
                <div className="flex items-center mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                    }}
                  >
                    03
                  </div>
                  <h3
                    className="ml-4 text-2xl font-bold"
                    style={{ color: "var(--sky-blue)" }}
                  >
                    Confirm Booking
                  </h3>
                </div>
                <p className="text-lg" style={{ color: "var(--gray-color)" }}>
                  Discuss your family, services, family, professional form,
                  plans, etc and confirm your booking.
                </p>
              </div>
            </div>

            <div className="card-ui rounded-2xl animated-card animated-card-4">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(to right, var(--black-color), rgba(34, 40, 49, 0.7))",
                  }}
                >
                  04
                </div>
                <h3
                  className="ml-4 text-xl font-bold"
                  style={{ color: "var(--black-color)" }}
                >
                  Book via App
                </h3>
              </div>
              <p style={{ color: "var(--gray-color)" }}>
                Download the Johann home Services mobile app to book our
                services directly through our app.
              </p>
            </div>

            <div className="card-ui rounded-2xl animated-card animated-card-5">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                  }}
                >
                  05
                </div>
                <h3
                  className="ml-4 text-xl font-bold"
                  style={{ color: "var(--sky-blue)" }}
                >
                  Enjoy Service
                </h3>
              </div>
              <p style={{ color: "var(--gray-color)" }}>
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
                title: "Fill the Form",
                description:
                  "Enter basic details like name, number, service and message and admin items.",
                color: "var(--sky-blue)",
              },
              {
                number: "02",
                title: "We Contact You",
                description:
                  "Our professional customer support team receives such a social year as soon as possible.",
                color: "var(--gray-color)",
              },
              {
                number: "03",
                title: "Confirm Booking",
                description:
                  "Discuss your family, services, family, professional form, plans, etc and confirm your booking.",
                color: "var(--sky-blue)",
                highlight: true,
              },
              {
                number: "04",
                title: "Book via App",
                description:
                  "Download the Johann home Services mobile app to book our services directly through our app.",
                color: "var(--black-color)",
              },
              {
                number: "05",
                title: "Enjoy Service",
                description:
                  "Sit back and relax while our professionals take care of all your home service needs.",
                color: "var(--sky-blue)",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative animated-card animated-card-${index + 1}`}
              >
                {index < 4 && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 h-16 md:h-20"
                    style={{
                      background: `linear-gradient(to bottom, ${step.color}, transparent)`,
                      opacity: 0.3,
                      top: "100%",
                      marginTop: "0.75rem",
                    }}
                  />
                )}
                <div
                  className="card-ui rounded-2xl"
                  style={
                    step.highlight
                      ? {
                          borderWidth: "2px",
                          borderColor: "rgba(0, 173, 181, 0.3)",
                        }
                      : {}
                  }
                >
                  {step.highlight && (
                    <div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                      style={{
                        background:
                          "linear-gradient(to right, var(--sky-blue), rgba(0, 173, 181, 0.7))",
                      }}
                    >
                      Most Important
                    </div>
                  )}
                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
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
                  <p style={{ color: "var(--gray-color)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
