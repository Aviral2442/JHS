import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaSearch, FaShoppingCart, FaCloud, FaRobot, FaChevronDown, FaChevronUp, FaCheckCircle, FaQuestionCircle, FaSmile } from "react-icons/fa";

const services = [
    {
        name: "Web Development",
        icon: <FaLaptopCode className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "What technologies do you use?", a: "We use React, Laravel, Node.js and modern stacks." },
            { q: "Do you provide SEO optimization?", a: "Yes, we follow SEO best practices in development." }
        ]
    },
    {
        name: "Mobile App Development",
        icon: <FaMobileAlt className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Do you build Android & iOS apps?", a: "Yes, we build cross-platform and native apps." },
            { q: "What frameworks do you use?", a: "React Native, Flutter, and Swift/Kotlin." }
        ]
    },
    {
        name: "UI/UX Design",
        icon: <FaPaintBrush className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Do you provide prototypes?", a: "Yes, we create Figma and interactive prototypes." }
        ]
    },
    {
        name: "Digital Marketing",
        icon: <FaBullhorn className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Do you run ads?", a: "Yes, Google & Meta ads campaigns." }
        ]
    },
    {
        name: "SEO Services",
        icon: <FaSearch className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "How long for results?", a: "Typically 3-6 months for noticeable growth." }
        ]
    },
    {
        name: "E-commerce Solutions",
        icon: <FaShoppingCart className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Which platforms do you support?", a: "Shopify, WooCommerce, custom solutions." }
        ]
    },
    {
        name: "Cloud Services",
        icon: <FaCloud className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Do you provide deployment?", a: "Yes, AWS, DigitalOcean, VPS setups." }
        ]
    },
    {
        name: "AI Integration",
        icon: <FaRobot className="text-2xl text-indigo-600" />,
        faqs: [
            { q: "Do you integrate AI?", a: "Yes, GPT APIs, automation & analytics." }
        ]
    }
];

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="w-full text-left flex justify-between items-center group"
                onClick={() => setOpen(!open)}
            >
                <span className="font-medium text-lg flex items-center gap-2">
                    <FaQuestionCircle className="text-indigo-400 group-hover:scale-110 transition-transform" />
                    {q}
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-2 text-gray-600 flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const [activeService, setActiveService] = useState(services[0]);
    const [search, setSearch] = useState("");

    // Filtered FAQs for the active service
    const filteredFaqs = activeService.faqs.filter(
        (faq) =>
            faq.q.toLowerCase().includes(search.toLowerCase()) ||
            faq.a.toLowerCase().includes(search.toLowerCase())
    );

    // If search is active, show all matching FAQs across all services
    const globalResults =
        search.trim() !== ""
            ? services
                .map((service) => ({
                    ...service,
                    faqs: service.faqs.filter(
                        (faq) =>
                            faq.q.toLowerCase().includes(search.toLowerCase()) ||
                            faq.a.toLowerCase().includes(search.toLowerCase())
                    ),
                }))
                .filter((service) => service.faqs.length > 0)
            : [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO */}
            <section className="text-center py-16 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-4"
                >
                    Frequently Asked Questions
                </motion.h1>
                <p className="max-w-2xl mx-auto">
                    Explore answers categorized by our services. Get clarity before you start your project.
                </p>
            </section>

            {/* SERVICES TABS & SEARCH */}
            <section className="max-w-7xl mx-auto px-4 py-10">

                <div className="flex-1 flex justify-center mb-8">
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search FAQs..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                        />
                        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        {services.map((service) => (
                            <button
                                key={service.name}
                                onClick={() => setActiveService(service)}
                                className={`p-4 rounded-xl shadow text-sm md:text-base flex flex-col items-center gap-2 transition ${activeService.name === service.name
                                    ? "bg-indigo-600 text-white scale-105"
                                    : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                <span>{service.icon}</span>
                                <span>{service.name}</span>
                            </button>
                        ))}
                    </div>
                    {/* <div className="flex-1 flex justify-end">
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search FAQs..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                            />
                            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div> */}
                </div>

                {/* SEARCH RESULTS or SERVICE FAQ LIST */}
                {search.trim() !== "" ? (
                    <motion.div
                        key={search}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaSearch className="text-2xl text-indigo-600" />
                            <h2 className="text-2xl font-semibold">Search Results</h2>
                        </div>
                        {globalResults.length === 0 && (
                            <div className="text-gray-500">No FAQs found for "{search}".</div>
                        )}
                        {globalResults.map(service => (
                            <div key={service.name} className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{service.icon}</span>
                                    <span className="font-semibold">{service.name}</span>
                                </div>
                                {service.faqs.map((faq, idx) => (
                                    <FAQItem key={idx} q={faq.q} a={faq.a} />
                                ))}
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key={activeService.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{activeService.icon}</span>
                            <h2 className="text-2xl font-semibold">{activeService.name} FAQs</h2>
                        </div>
                        {filteredFaqs.length === 0 && (
                            <div className="text-gray-500">No FAQs found for this service.</div>
                        )}
                        {filteredFaqs.map((faq, index) => (
                            <FAQItem key={index} q={faq.q} a={faq.a} />
                        ))}
                    </motion.div>
                )}
                {/* HOW IT WORKS SECTION - Animated Steps */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: <FaQuestionCircle className="text-indigo-500 text-3xl" />, title: "Ask", desc: "Choose your service and ask your questions." },
                            { icon: <FaCheckCircle className="text-green-500 text-3xl" />, title: "Get Answers", desc: "Get instant, expert answers from our team." },
                            { icon: <FaLaptopCode className="text-indigo-500 text-3xl" />, title: "Start Project", desc: "Begin your project with confidence." },
                            { icon: <FaSmile className="text-yellow-500 text-3xl" />, title: "Enjoy Results", desc: "See your vision come to life!" },
                        ].map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6 }}
                                className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
                            >
                                <div className="mb-3 animate-bounce-slow">{step.icon}</div>
                                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </section>

            {/* EXTRA SECTION - CTA */}
            <section className="bg-indigo-600 text-white text-center py-16 px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="mb-6">Our team is here to help you 24/7.</p>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium shadow hover:bg-gray-100">
                        Contact Us
                    </button>
                </motion.div>
            </section>

            {/* TESTIMONIAL SECTION */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-10">What Clients Say</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-2xl shadow"
                        >
                            <p className="text-gray-600 mb-4">
                                "Amazing service! Highly recommend their team."
                            </p>
                            <h4 className="font-semibold">Client {item}</h4>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQPage;