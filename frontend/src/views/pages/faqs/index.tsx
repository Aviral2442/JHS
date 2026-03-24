import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
    {
        name: "Web Development",
        faqs: [
            { q: "What technologies do you use?", a: "We use React, Laravel, Node.js and modern stacks." },
            { q: "Do you provide SEO optimization?", a: "Yes, we follow SEO best practices in development." }
        ]
    },
    {
        name: "Mobile App Development",
        faqs: [
            { q: "Do you build Android & iOS apps?", a: "Yes, we build cross-platform and native apps." },
            { q: "What frameworks do you use?", a: "React Native, Flutter, and Swift/Kotlin." }
        ]
    },
    {
        name: "UI/UX Design",
        faqs: [
            { q: "Do you provide prototypes?", a: "Yes, we create Figma and interactive prototypes." }
        ]
    },
    {
        name: "Digital Marketing",
        faqs: [
            { q: "Do you run ads?", a: "Yes, Google & Meta ads campaigns." }
        ]
    },
    {
        name: "SEO Services",
        faqs: [
            { q: "How long for results?", a: "Typically 3-6 months for noticeable growth." }
        ]
    },
    {
        name: "E-commerce Solutions",
        faqs: [
            { q: "Which platforms do you support?", a: "Shopify, WooCommerce, custom solutions." }
        ]
    },
    {
        name: "Cloud Services",
        faqs: [
            { q: "Do you provide deployment?", a: "Yes, AWS, DigitalOcean, VPS setups." }
        ]
    },
    {
        name: "AI Integration",
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
                className="w-full text-left flex justify-between items-center"
                onClick={() => setOpen(!open)}
            >
                <span className="font-medium text-lg">{q}</span>
                <span>{open ? "-" : "+"}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-2 text-gray-600">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const [activeService, setActiveService] = useState(services[0]);

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

            {/* SERVICES TABS */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {services.map((service) => (
                        <button
                            key={service.name}
                            onClick={() => setActiveService(service)}
                            className={`p-4 rounded-xl shadow text-sm md:text-base transition ${activeService.name === service.name
                                ? "bg-indigo-600 text-white"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>

                {/* FAQ LIST */}
                <motion.div
                    key={activeService.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow p-6"
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        {activeService.name} FAQs
                    </h2>

                    {activeService.faqs.map((faq, index) => (
                        <FAQItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </motion.div>
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