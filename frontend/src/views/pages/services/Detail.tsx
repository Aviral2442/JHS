import React from "react";
import { Star, Clock } from "lucide-react";

const relatedServices = [
  {
    id: 1,
    title: "Kitchen Deep Cleaning",
    price: 99,
    duration: "2 hrs",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: 2,
    title: "Bathroom Cleaning",
    price: 79,
    duration: "1.5 hrs",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    title: "Sofa Cleaning",
    price: 89,
    duration: "2 hrs",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
  },
  {
    id: 4,
    title: "Full Home Cleaning",
    price: 249,
    duration: "5 hrs",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
  },
];

const ServiceDetail: React.FC = () => {
  return (
    <section className="py-10" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* MAIN DETAIL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-white">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
              alt="Deep Cleaning"
              className="w-full h-[420px] object-cover"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full">
                Popular
              </span>
              <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                Featured
              </span>
            </div>

            <span className="absolute top-4 right-4 bg-white text-xs px-3 py-1 rounded-full shadow">
              Cleaning
            </span>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,173,181,0.2)', color: 'var(--sky-blue)' }}>
                Cleaning
              </span>
              <span style={{ color: 'var(--gray-color)' }}>•</span>
              <span style={{ color: 'var(--gray-color)' }}>Deep Cleaning</span>
            </div>

            <h1 className="text-2xl font-semibold mb-2">
              Deep Cleaning Package
            </h1>

            <p style={{ color: 'var(--gray-color)' }} className="mb-4">
              Complete deep cleaning for 2-bedroom apartments
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <Star size={18} style={{ color: 'var(--gray-color)' }} />
              </div>
              <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                <strong>4.9</strong> (256 reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--gray-color)' }}>
              <Clock size={18} />
              <span>4 hours</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">$199</p>
              <button className="text-white px-8 py-3 rounded-xl" style={{ backgroundColor: 'var(--sky-blue)' }}>
                Add to Cart
              </button>
            </div>

            <hr className="my-6" />

            <p className="leading-relaxed" style={{ color: 'var(--gray-color)' }}>
              Our Deep Cleaning Package covers bedrooms, bathrooms, kitchen,
              living areas, furniture, floors, windows, and hard-to-reach spots.
            </p>
          </div>
        </div>

        {/* RELATED SERVICES */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Similar Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />

                <div className="p-4">
                  <h3 className="font-semibold mb-1">
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                      {service.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--gray-color)' }}>
                    <Clock size={14} />
                    {service.duration}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold">${service.price}</span>
                    <button className="text-sm font-medium" style={{ color: 'var(--sky-blue)' }}>
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceDetail;
