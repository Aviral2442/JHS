import { useState } from "react";

type Feature = {
  title: string;
  description: string;
  image: string;
  gradient: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop";

const featuresLeft: Feature[] = [
  {
    title: "LEARN FROM TOP 1% EXPERTS",
    description: "Gain knowledge from industry leaders and certified educators.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop",
    gradient: "from-emerald-700 to-emerald-400",
  },
  {
    title: "PRACTICAL LEARNING",
    description: "Projects, labs, simulations to tackle real-world challenges.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=900&auto=format&fit=crop",
    gradient: "from-blue-800 to-cyan-500",
  },
  {
    title: "RECOGNIZED CERTIFICATIONS",
    description: "Certs to boost your resume & job prospects.",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=900&auto=format&fit=crop",
    gradient: "from-rose-800 to-purple-700",
  },
  {
    title: "PERSONALIZED LEARNING PATHS",
    description: "Tailored to your goals, pace, and skill level.",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=900&auto=format&fit=crop",
    gradient: "from-orange-600 to-yellow-500",
  },
];

const featuresRight: Feature[] = [
  {
    title: "AFFORDABLE AND ACCESSIBLE",
    description: "High-quality education that fits your pocket.",
    image:
      "https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=900&auto=format&fit=crop",
    gradient: "from-orange-600 to-red-500",
  },
  {
    title: "24/7 LEARNING SUPPORT",
    description: "24/7 access to mentors and a helpful peer community.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
    gradient: "from-red-800 to-fuchsia-700",
  },
  {
    title: "FLEXIBLE CLASS SCHEDULES",
    description: "Learn anytime, anywhere with zero pressure.",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=900&auto=format&fit=crop",
    gradient: "from-indigo-700 to-cyan-500",
  },
  {
    title: "CUTTING-EDGE CURRICULUM",
    description: "Latest tech trends with hands-on learning.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop",
    gradient: "from-emerald-800 to-teal-400",
  },
];

export default function HeroSkillSection() {
  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE);

  const FeatureCard = ({ feature }: { feature: Feature }) => {
    const isActive = activeImage === feature.image;

    return (
      <div
        onMouseEnter={() => setActiveImage(feature.image)}
        className={`card-ui cursor-pointer text-white
        bg-gradient-to-r ${feature.gradient}
        ${isActive ? "scale-[1.05] ring-4" : ""}`}
        style={isActive ? { borderColor: 'var(--sky-blue)' } : {}}
      >
        <h3 className="font-bold text-sm uppercase mb-2">
          {feature.title}
        </h3>
        <p className="text-sm opacity-90">{feature.description}</p>
      </div>
    );
  };

  return (
    <section className="section-wrapper" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          {featuresLeft.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>

        {/* IPHONE */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[560px] rounded-[40px] bg-black border-[10px] border-black shadow-2xl">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-800 rounded-full z-10" />
            <img
              src={activeImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-[30px]
              transition-opacity duration-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {featuresRight.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
