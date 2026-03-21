const testimonials = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "Ritwik Sinha",
  city: "Kanpur",
  rating: 5,
  message:
    "The ambulance arrived quickly, and the staff handled everything calmly during the emergency.",
  avatar: "https://i.pravatar.cc/100?img=12",
}));

const StarRating = () => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09L5.82 11.545.94 6.91l6.09-.885L10 .5l2.97 5.525 6.09.885-4.88 4.636 1.697 6.545z" />
      </svg>
    ))}
  </div>
);

const Card = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between mb-4">
      <span className="text-emerald-400 text-3xl">“</span>
      <StarRating />
    </div>
    <p className="text-sm mb-6" style={{ color: 'var(--gray-color)' }}>
      The ambulance arrived quickly, and the staff handled everything calmly during the emergency.
    </p>
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/100?img=12"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold">Ritwik Sinha</p>
        <p className="text-xs" style={{ color: 'var(--gray-color)' }}>Kanpur</p>
      </div>
    </div>
  </div>
);

const Column = ({
  direction,
}: {
  direction: "up" | "down";
}) => (
  <div className="overflow-hidden h-[520px]">
    <div
      className={`flex flex-col gap-6 ${
        direction === "up"
          ? "animate-scroll-up"
          : "animate-scroll-down"
      } pause-on-hover`}
    >
      {[...testimonials, ...testimonials].map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  </div>
);

export default function TrustedByFamilies() {
  return (
    <section className="pt-20" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-divider mx-auto"></div>
          <h2 className="section-title mb-4">
            What Our Customers Say
          </h2>
          <p className="section-subtitle mx-auto text-center">
            See how HomeEase is making emergency services
          </p>
        </div>

        {/* Animated Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column direction="up" />
          <Column direction="down" />
          <Column direction="up" />
        </div>
      </div>
    </section>
  );
}
