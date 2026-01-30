import React, { useState } from "react";
// import "@/app.css"

const services = [
  { title: "Women's Salon & Spa", icon: "💆‍♀️" },
  { title: "Men's Salon & Massage", icon: "💇‍♂️" },
  { title: "Cleaning", icon: "🧹" },
  { title: "Electrician, Plumber & Carpenter", icon: "🛠️" },
  { title: "AC & Appliance Repair", icon: "❄️" },
  { title: "Native Water Purifier", icon: "🚰", sale: true },
  { title: "Native Smart Locks", icon: "🔐", sale: true },
];

const BentoImage = ({
  image,
  hoverImage,
}: {
  image: string;
  hoverImage: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl group h-full w-full">
    {/* Base Image */}
    <img
      src={image}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:-translate-x-full"
    />

    {/* Hover Image */}
    <img
      src={hoverImage}
      className="absolute inset-0 h-full w-full object-cover translate-x-full transition-transform duration-500 group-hover:translate-x-0"
    />
  </div>
);

export default function HeroSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="bg-white py-14">
        <h1 className="text-3xl md:text-4xl capitalize font-extrabold main-heading text-center pb-10 mb-6">
          Professional Cleaning Services for Every Need
        </h1>
        <div className="max-w-[90%] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden min-h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium" style={{ color: 'var(--gray-color)' }}>
                  What are you looking for?
                </p>
                <button
                  className="font-semibold transition-all main-heading hover:opacity-80"
                  onClick={() => setShowForm((prev) => !prev)}
                >
                  {showForm ? "Category" : "Enquiry"}
                </button>
              </div>

              <div
                className={`absolute left-6 right-6 top-20 transition-all duration-500 ${
                  showForm
                    ? "opacity-0 invisible -translate-x-full"
                    : "opacity-100 visible translate-x-0"
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {services.map((item) => (
                    <div
                      key={item.title}
                      className="relative border rounded-xl p-4 text-center hover:shadow-md transition cursor-pointer"
                    >
                      {item.sale && (
                        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Sale
                        </span>
                      )}
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="text-sm font-medium" style={{ color: 'var(--gray-color)' }}>
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`absolute left-6 right-6 top-18 transition-all duration-500 bg-white ${
                  showForm
                    ? "opacity-100 visible translate-x-0"
                    : "opacity-0 invisible translate-x-full"
                }`}
              >
                <form
                  className="space-y-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>
                      Consumer Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': 'var(--sky-blue)' } as React.CSSProperties}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': 'var(--sky-blue)' } as React.CSSProperties}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>
                      Choose a Service
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': 'var(--sky-blue)' } as React.CSSProperties}>
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-color)' }}>
                      Message
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': 'var(--sky-blue)' } as React.CSSProperties}
                      rows={3}
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white py-2 rounded-lg transition"
                    style={{ backgroundColor: 'var(--sky-blue)' }}
                  >
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="flex gap-10 mt-8">
            <div>
              <p className="text-lg font-semibold">⭐ 4.8</p>
              <p className="text-sm text-gray-500">Service Rating*</p>
            </div>
            <div>
              <p className="text-lg font-semibold">12M+</p>
              <p className="text-sm text-gray-500">Customers Globally*</p>
            </div>
          </div> */}
          </div>

          {/* RIGHT – BENTO GRID */}
          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[510px]">
            {/* Large */}
            <div className="row-span-2">
              <BentoImage
                image="https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                hoverImage="https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>

            <BentoImage
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              hoverImage="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="row-span-2">
              <BentoImage
                image="https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                hoverImage="https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>

            <BentoImage
              image="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              hoverImage="https://images.unsplash.com/photo-1716637644831-e046c73be197?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            {/* <BentoImage
            image="https://images.unsplash.com/photo-1581579185169-1c90f41f8a80"
            hoverImage="https://images.unsplash.com/photo-1581092919535-7146c56a60f3"
          /> */}

            {/* <BentoImage
            image="https://images.unsplash.com/photo-1581092160562-40aa08e78837"
            hoverImage="https://images.unsplash.com/photo-1607863680198-23d4b2565df0"
          /> */}
          </div>
        </div>
      </section>


    </>
  );
}
