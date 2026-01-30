import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const services = [
  {
    title: "Haircut for men",
    image:
      "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.87,
    reviews: "470K",
    price: "₹259",
  },
  {
    title: "Intense cleaning (2 bathrooms)",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    rating: 4.8,
    reviews: "4.2M",
    price: "₹1,038",
  },
  {
    title: "Tap repair",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    reviews: "117K",
    price: "₹139",
  },
  {
    title: "Roll-on waxing (Full arms, legs & underarms)",
    image:
      "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.88,
    reviews: "77K",
    price: "₹749",
  },
  {
    title: "Automatic top load machine check-up",
    image:
      "https://images.unsplash.com/photo-1716637644831-e046c73be197?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.77,
    reviews: "351K",
    price: "₹199",
  },
  {
    title: "Automatic top load machine check-up",
    image:
      "https://images.unsplash.com/photo-1716637644831-e046c73be197?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.77,
    reviews: "351K",
    price: "₹199",
  },
  {
    title: "Automatic top load machine check-up",
    image:
      "https://images.unsplash.com/photo-1716637644831-e046c73be197?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.77,
    reviews: "351K",
    price: "₹199",
  },
  {
    title: "Automatic top load machine check-up",
    image:
      "https://images.unsplash.com/photo-1716637644831-e046c73be197?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.77,
    reviews: "351K",
    price: "₹199",
  },
];

export default function MostBookedServices() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="section-wrapper" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="section-divider"></div>
            <h2 className="section-title">
              Most booked services
            </h2>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border transition-colors"
              style={{ borderColor: 'var(--gray-color)' }}
            >
              <ChevronLeft size={18} style={{ color: 'var(--gray-color)' }} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border transition-colors"
              style={{ borderColor: 'var(--gray-color)' }}
            >
              <ChevronRight size={18} style={{ color: 'var(--gray-color)' }} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {services.map((item, i) => (
              <div
                key={i}
                className="min-w-[220px] max-w-[220px] cursor-pointer"
              >
                {/* Image */}
                <div className="rounded-2xl overflow-hidden mb-3 aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="card-title text-sm mb-1 line-clamp-2">
                  {item.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center text-xs gap-1 mb-1" style={{ color: 'var(--gray-color)' }}>
                  <Star size={12} className="fill-current" style={{ color: 'var(--sky-blue)' }} />
                  <span>
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold" style={{ color: 'var(--sky-blue)' }}>
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile arrows */}
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
