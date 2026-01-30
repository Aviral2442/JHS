"use client";

import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sprout,
  TreePine,
  Droplets,
  Sun,
  Flower2,
  Package,
  Settings,
  LeafIcon,
  DropletsIcon,
} from "lucide-react";

interface Subcard {
  title: string;
  icon: React.ReactNode;
  image: string;
  hasNoCode: boolean;
  description: string;
  tags: string[];
}

interface Feature {
  id: number;
  category: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  highlight: boolean;
  tabs: string[];
  subcards: Subcard[];
}

const features = [
  {
    id: 1,
    category: "Shop Plants",
    title: "Indoor Plants",
    desc: "Transform your living space with our curated collection of low-maintenance indoor plants.",
    icon: <LeafIcon className="w-6 h-6 " />,
    color: "bg-green-600",
    badge: "BESTSELLER",
    highlight: true,
    tabs: ["Popular", "Low Light", "Air Purifying", "Pet Friendly"],
    subcards: [
      {
        title: "Snake Plant",
        icon: <Leaf className="w-5 h-5" />,
        image:
          "https://plus.unsplash.com/premium_photo-1661407472404-7413bd7568f9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        hasNoCode: false,
        description: "Perfect for beginners",
        tags: ["Popular", "Low Light", "Air Purifying"],
      },
      {
        title: "Monstera Deliciosa",
        icon: <Leaf className="w-5 h-5" />,
        image:
          "https://thursd.com/storage/media/59733/heart-shaped--leaves-of-plants-square-feature-image.webp",
        hasNoCode: false,
        description: "Tropical beauty",
        tags: ["Popular"],
      },
      {
        title: "Peace Lily",
        icon: <Flower2 className="w-5 h-5" />,
        image:
          "https://ngb.org/wp-content/uploads/2021/02/heart-leaf-philodendron-canva-1024x1024.png",
        hasNoCode: false,
        description: "Air purifying",
        tags: ["Air Purifying", "Low Light"],
      },
      {
        title: "Pothos",
        icon: <Leaf className="w-5 h-5" />,
        image: "https://m.media-amazon.com/images/I/81lwCKlKamL.jpg",
        hasNoCode: false,
        description: "Easy to grow",
        tags: ["Popular", "Pet Friendly"],
      },
      {
        title: "ZZ Plant",
        icon: <Sprout className="w-5 h-5" />,
        image:
          "https://img.freepik.com/premium-photo/group-plants-that-are-labeled-plant-square-container_1078211-318551.jpg",
        hasNoCode: false,
        description: "Drought tolerant",
        tags: ["Low Light"],
      },
      {
        title: "ZZ Plant",
        icon: <Sprout className="w-5 h-5" />,
        image:
          "https://img.freepik.com/premium-photo/group-plants-that-are-labeled-plant-square-container_1078211-318551.jpg",
        hasNoCode: false,
        description: "Drought tolerant",
        tags: ["Popular"],
      },
      {
        title: "ZZ Plant",
        icon: <Sprout className="w-5 h-5" />,
        image:
          "https://img.freepik.com/premium-photo/group-plants-that-are-labeled-plant-square-container_1078211-318551.jpg",
        hasNoCode: false,
        description: "Drought tolerant",
        tags: ["Pet Friendly"],
      },
      {
        title: "ZZ Plant",
        icon: <Sprout className="w-5 h-5" />,
        image:
          "https://img.freepik.com/premium-photo/group-plants-that-are-labeled-plant-square-container_1078211-318551.jpg",
        hasNoCode: false,
        description: "Drought tolerant",
        tags: ["Popular", "Low Light"],
      },
    ],
  },
  {
    id: 2,
    category: "Shop Plants",
    title: "Outdoor Plants",
    desc: "Beautify your garden with weather-resistant outdoor plants and flowering varieties.",
    icon: <Sun className="w-6 h-6 text-white" />,
    color: "bg-amber-600",
    badge: "NEW ARRIVALS",
    highlight: false,
    tabs: ["Flowering", "Shrubs", "Climbers", "Seasonal"],
    subcards: [
      {
        title: "Rose Bushes",
        icon: <Flower2 className="w-5 h-5" />,
        image:
          "https://plus.unsplash.com/premium_photo-1661407472404-7413bd7568f9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        hasNoCode: false,
        description: "Classic beauty",
        tags: ["Flowering", "Seasonal"],
      },
      {
        title: "Bougainvillea",
        icon: <Flower2 className="w-5 h-5" />,
        image:
          "https://plus.unsplash.com/premium_photo-1678382342637-55835400891b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        hasNoCode: false,
        description: "Vibrant colors",
        tags: ["Flowering"],
      },
      {
        title: "Hibiscus",
        icon: <Flower2 className="w-5 h-5" />,
        image:
          "https://images.unsplash.com/photo-1730042315892-d2eddfdf62c2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        hasNoCode: false,
        description: "Tropical flowers",
        tags: ["Flowering", "Seasonal"],
      },
      {
        title: "Money Plant",
        icon: <Leaf className="w-5 h-5" />,
        image:
          "https://cdn.pixabay.com/photo/2012/04/14/16/53/flowers-34592_1280.png",
        hasNoCode: false,
        description: "Good luck charm",
        tags: ["Shrubs"],
      },
    ],
  },
  {
    id: 3,
    category: "Shop Plants",
    title: "Fruit Trees",
    desc: "Grow your own organic fruits with our premium fruit tree saplings.",
    icon: <TreePine className="w-6 h-6 text-white" />,
    color: "bg-emerald-600",
    badge: "ORGANIC",
    highlight: false,
    tabs: ["Citrus", "Tropical", "Berries", "Stone Fruits"],
    subcards: [
      {
        title: "Lemon Tree",
        icon: <TreePine className="w-5 h-5" />,
        image:
          "https://www.creativefabrica.com/wp-content/uploads/2023/02/13/Beautiful-Fruit-Tree-In-An-Inviting-Garden-61043375-1.png",
        hasNoCode: false,
        description: "Fresh citrus",
        tags: ["Citrus"],
      },
      {
        title: "Mango Tree",
        icon: <TreePine className="w-5 h-5" />,
        image:
          "http://cdn.shopify.com/s/files/1/0646/1305/6767/products/Clementine-mandarin-tree1.jpg?v=1684453698",
        hasNoCode: false,
        description: "King of fruits",
        tags: ["Tropical"],
      },
      {
        title: "Guava Tree",
        icon: <TreePine className="w-5 h-5" />,
        image:
          "https://static.vecteezy.com/system/resources/previews/022/984/257/non_2x/big-apple-tree-free-illustration-free-png.png",
        hasNoCode: false,
        description: "Rich in Vitamin C",
        tags: ["Tropical", "Berries"],
      },
      {
        title: "Dwarf Plant",
        icon: <Sprout className="w-5 h-5" />,
        image:
          "https://balconygardenweb.b-cdn.net/wp-content/uploads/2021/06/dwarf-orange-tree.jpg",
        hasNoCode: false,
        description: "Fast growing",
        tags: ["Stone Fruits"],
      },
    ],
  },
  {
    id: 4,
    category: "Gardening Tools",
    title: "Essential Tools",
    desc: "Complete your gardening toolkit with our professional-grade tools and equipment.",
    icon: <Settings className="w-6 h-6 text-white" />,
    color: "bg-slate-700",
    badge: "PREMIUM",
    highlight: false,
    tabs: ["Hand Tools", "Power Tools", "Watering", "Accessories"],
    subcards: [
      {
        title: "Pruning Shears",
        icon: <Settings className="w-5 h-5" />,
        image: "https://www.kebtek.com/upload/2021-01-27/20210127182911761.jpg",
        hasNoCode: false,
        description: "Professional grade",
        tags: ["Hand Tools"],
      },
      {
        title: "Garden Trowel Set",
        icon: <Settings className="w-5 h-5" />,
        image:
          "https://static.wixstatic.com/media/51b1fa_5aae52c7f25945b5b87648dd36177af1~mv2.jpg",
        hasNoCode: false,
        description: "Durable steel",
        tags: ["Hand Tools"],
      },
      {
        title: "Watering Can",
        icon: <Droplets className="w-5 h-5" />,
        image:
          "https://static.wixstatic.com/media/51b1fa_5aae52c7f25945b5b87648dd36177af1~mv2.jpg",
        hasNoCode: false,
        description: "2L capacity",
        tags: ["Watering"],
      },
      {
        title: "Garden Gloves",
        icon: <Settings className="w-5 h-5" />,
        image:
          "https://www.whiteflowerfarm.com/mas_assets/cache/image/9/b/b/0/39856.Jpg",
        hasNoCode: false,
        description: "Comfortable grip",
        tags: ["Accessories"],
      },
    ],
  },
  {
    id: 5,
    category: "Plant Care",
    title: "Fertilizers & Soil",
    desc: "Nourish your plants with organic fertilizers and premium potting mixes.",
    icon: <DropletsIcon className="w-6 h-6" />,
    color: "bg-brown-600",
    badge: "ORGANIC",
    highlight: false,
    tabs: ["Organic", "Chemical", "Soil Mix", "Pest Control"],
    subcards: [
      {
        title: "Organic Compost",
        icon: <Leaf className="w-5 h-5" />,
        image:
          "https://tse4.mm.bing.net/th/id/OIP.9j_gt1QQpUBXskrC93GgfgHaGP?pid=Api&P=0&h=180",
        hasNoCode: false,
        description: "100% natural",
        tags: ["Organic"],
      },
      {
        title: "Potting Mix",
        icon: <Package className="w-5 h-5" />,
        image: "https://m.media-amazon.com/images/I/81BRM3b7qTL._AC_.jpg",
        hasNoCode: false,
        description: "Well-draining",
        tags: ["Soil Mix"],
      },
    ],
  },
];

const STACK_TOP_OFFSET = 130; // px
const STACK_SPACING = 20; // px
const STACK_OVERLAP_PX = 30; // px overlap so next card barely peeks through
const STACK_SCALE_DIFFERENCE = 0.05; // max scale reduction
const STACK_SHRINK_DISTANCE = 220; // px scroll range for scaling

const FeatureCard = ({ item }: { item: Feature }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Handle scroll
  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Filter subcards for the active tab and determine whether scrolling is needed
  const filteredSubcards = item.subcards.filter((sc) =>
    sc.tags ? sc.tags.includes(item.tabs[activeTab]) : true
  );
  const needsScroll = filteredSubcards.length > 4; 

  // Update scroll state on mount and scroll based on filtered items. Also reset scroll when tab changes
  React.useEffect(() => {
    const container = scrollContainerRef.current;

    // reset scroll to start when tab changes
    if (container) {
      try {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } catch (e) {
        container.scrollLeft = 0;
      }
    }

    if (filteredSubcards.length > 4) {
      checkScroll();
      if (container) {
        container.addEventListener("scroll", checkScroll);
        // Check scroll on mount after a brief delay
        setTimeout(checkScroll, 100);
        return () => container.removeEventListener("scroll", checkScroll);
      }
    } else {
      // no scrolling needed; reset indicators
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [filteredSubcards.length, activeTab]);

  return (
    <div
      className={`
            relative w-full flex flex-col p-6 transition-all duration-300
             shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border border-slate-200
            ${item.highlight ? "bg-white" : "bg-white"}
        `}
    >
      {/* Card Header */}
      <div className="flex justify-start items-center gap-5 mb-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            item.highlight ? "bg-white" : item.color
          }`}
        >
          {item.icon}
        </div>

        {/* <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {item.category}
                </span> */}
        <h3
          className="text-3xl font-bold"
          style={{ color: item.highlight ? 'var(--sky-blue)' : 'var(--black-color)' }}
        >
          {item.title}
        </h3>
      </div>

      {/* Title Section */}
      <div className="mb-4">
        {/* <div className="flex items-center gap-3 mb-2">

                    {item.badge && (
                        <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded uppercase tracking-wide">
                            {item.badge}
                        </span>
                    )}
                </div> */}

        <p className="text-base leading-relaxed" style={{ color: 'var(--gray-color)' }}>{item.desc}</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b mb-4" style={{ borderColor: 'var(--background-alt)' }}>
        <nav className="flex gap-8 overflow-x-auto scrollbar-hide">
          {item.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="pb-3 px-2 text-sm font-semibold whitespace-nowrap transition-colors relative"
              style={{ color: activeTab === index ? 'var(--sky-blue)' : 'var(--gray-color)' }}
            >
              {tab}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t" style={{ backgroundColor: 'var(--sky-blue)' }} />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Subcards Grid with Scroll */}
      <div className="relative mb-6 flex-1">
        {/* Left Arrow */}
        {needsScroll && canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: 'var(--gray-color)' }} />
          </button>
        )}

        {/* Right Arrow */}
        {needsScroll && canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" style={{ color: 'var(--gray-color)' }} />
          </button>
        )}

        {/* Subcards Container */}
        <div
          ref={scrollContainerRef}
          className={`
                        ${
                          needsScroll
                            ? "flex gap-6 overflow-x-auto"
                            : "grid grid-cols-2 lg:grid-cols-6 gap-6"
                        }
                        ${
                          needsScroll
                            ? "scroll-smooth snap-x snap-mandatory"
                            : ""
                        }
                    `}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {filteredSubcards.length === 0 ? (
            <div className="w-full text-center text-sm py-8" style={{ color: 'var(--gray-color)' }}>
              No items available in this category.
            </div>
          ) : (
            filteredSubcards.map((subcard, index) => (
              <div
                key={index}
                className="rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer border relative group max-w-50 shrink-0 snap-start"
                style={{ backgroundColor: 'var(--background-alt)', borderColor: 'var(--background-alt)' }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <img
                    src={subcard.image}
                    alt={subcard.title}
                    className="w-40 h-40 object-contain"
                  />
                  <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--gray-color)' }}>
                    {subcard.title}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StackedFeatureCard = ({ item, index }: { item: Feature; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const targetTop = STACK_TOP_OFFSET + index * STACK_SPACING;
      const delta = targetTop - rect.top;
      const progress = Math.min(1, Math.max(0, delta / STACK_SHRINK_DISTANCE));
      const newScale = 1 - STACK_SCALE_DIFFERENCE * progress;
      setScale(Number(newScale.toFixed(3)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full transition-transform duration-150 will-change-transform"
      style={{
        top: `${STACK_TOP_OFFSET + index * STACK_SPACING}px`,
        zIndex: index + 1,
        marginTop: index === 0 ? 0 : `-${STACK_OVERLAP_PX}px`,
        paddingTop: index === 0 ? 0 : `${STACK_SPACING}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
      }}
    >
      <FeatureCard item={item} />
    </div>
  );
};

export default function RazorpayStackSection() {
  return (
    <section className="relative w-full bg-white">
      {/* subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Page Header */}
        <div className="text-center px-4 pt-20 pb-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: 'var(--black-color)' }}>
            Plant Haven — Explore Our Collections
          </h2>
          <p className="max-w-2xl text-lg" style={{ color: 'var(--gray-color)' }}>
            Discover indoor and outdoor plants, tools, and care products curated
            for every gardener. Scroll to preview featured categories and top
            picks.
          </p>
        </div>

        {/* Stacked feature area — tall container to allow scrolling stack effect */}
        <div
          className="relative w-full max-w-[90%] mx-auto px-4 md:px-8"
          style={{ height: `400vh` }}
        >
          {features.map((item, index) => (
            <StackedFeatureCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
