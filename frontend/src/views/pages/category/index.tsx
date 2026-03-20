"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LeafIcon,
  Loader2,
} from "lucide-react";
import Api from "../../../components/apicall";

const baseURL = (import.meta as any).env?.VITE_URL ?? "";

interface CategoryLevelOne {
  category_level1_id: number;
  category_level1_name: string;
  category_level1_img: string;
}

interface CategoryLevelTwo {
  category_level2_id: number;
  category_level2_name: string;
  category_level2_img: string;
}

interface CategoryLevelThree {
  category_level3_id: number;
  category_level3_name: string;
  category_level3_img: string;
}

const STACK_TOP_OFFSET = 130; // px
const STACK_SPACING = 20; // px
const STACK_OVERLAP_PX = 30; // px overlap so next card barely peeks through
const STACK_SCALE_DIFFERENCE = 0.05; // max scale reduction
const STACK_SHRINK_DISTANCE = 220; // px scroll range for scaling

const FeatureCard = ({ item }: { item: CategoryLevelOne }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [tabs, setTabs] = useState<CategoryLevelTwo[]>([]);
  const [subcards, setSubcards] = useState<CategoryLevelThree[]>([]);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [loadingSubcards, setLoadingSubcards] = useState(false);
  const api = Api();

  // Fetch Level 2 categories (tabs) for this Level 1
  useEffect(() => {
    const fetchTabs = async () => {
      setLoadingTabs(true);
      console.log("Fetching Level 2 categories for Level 1 ID:", item.category_level1_id);
      const result = await api.fetchCategoryLevelTwoListByLevelOneId(item.category_level1_id);
      console.log("Fetched Level 2 categories:", result);
      if (result.success) {
        setTabs(result.data || []);
      }
      setLoadingTabs(false);
    };
    fetchTabs();
  }, [item.category_level1_id]);

  // Fetch Level 3 categories (subcards) when tab changes
  useEffect(() => {
    if (tabs.length === 0) return;
    const selectedTab = tabs[activeTab];
    if (!selectedTab) return;

    const fetchSubcards = async () => {
      setLoadingSubcards(true);
      const result = await api.fetchCategoryLevelThreeListByLevelTwoId(selectedTab.category_level2_id);
      if (result.success) {
        setSubcards(result.data || []);
      }
      setLoadingSubcards(false);
    };
    fetchSubcards();
  }, [activeTab, tabs]);

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

  const needsScroll = subcards.length > 4;

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

    if (subcards.length > 4) {
      checkScroll();
      if (container) {
        container.addEventListener("scroll", checkScroll);
        setTimeout(checkScroll, 100);
        return () => container.removeEventListener("scroll", checkScroll);
      }
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [subcards.length, activeTab]);

  return (
    <div
      className={`
            relative w-full flex flex-col p-6 transition-all duration-300
             shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border border-slate-200
            bg-white
        `}
    >
      {/* Card Header */}
      <div className="flex justify-start items-center gap-5 mb-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-white"
        >
          <LeafIcon className="w-6 h-6" />
        </div>

        <h3
          className="text-3xl font-bold"
          style={{ color: 'var(--sky-blue)' }}
        >
          {item.category_level1_name}
        </h3>
      </div>

      {/* Tab Navigation */}
      {loadingTabs ? (
        <div className="flex items-center gap-2 py-4" style={{ color: 'var(--gray-color)' }}>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading categories...</span>
        </div>
      ) : tabs.length === 0 ? (
        <p className="text-sm py-4" style={{ color: 'var(--gray-color)' }}>No subcategories available.</p>
      ) : (
        <>
          <div className="border-b mb-4" style={{ borderColor: 'var(--background-alt)' }}>
            <nav className="flex gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => (
                <button
                  key={tab.category_level2_id}
                  onClick={() => setActiveTab(index)}
                  className="pb-3 px-2 text-sm font-semibold whitespace-nowrap transition-colors relative"
                  style={{ color: activeTab === index ? 'var(--sky-blue)' : 'var(--gray-color)' }}
                >
                  {tab.category_level2_name}
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
              {loadingSubcards ? (
                <div className="w-full flex items-center justify-center gap-2 py-8" style={{ color: 'var(--gray-color)' }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading items...</span>
                </div>
              ) : subcards.length === 0 ? (
                <div className="w-full text-center text-sm py-8" style={{ color: 'var(--gray-color)' }}>
                  No items available in this category.
                </div>
              ) : (
                subcards.map((subcard) => (
                  <div
                    key={subcard.category_level3_id}
                    className="rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer border relative group max-w-50 shrink-0 snap-start"
                    style={{ backgroundColor: 'var(--background-alt)', borderColor: 'var(--background-alt)' }}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <img
                        src={subcard.category_level3_img ? `${baseURL}${subcard.category_level3_img}` : ""}
                        alt={subcard.category_level3_name}
                        className="w-40 h-40 object-contain"
                      />
                      <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--gray-color)' }}>
                        {subcard.category_level3_name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StackedFeatureCard = ({ item, index }: { item: CategoryLevelOne; index: number }) => {
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
  const [categories, setCategories] = useState<CategoryLevelOne[]>([]);
  const [loading, setLoading] = useState(true);
  const api = Api();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const result = await api.fetchCategoryLevelOneList({ status: "1" });
      if (result.success) {
        setCategories(result.data || []);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20" style={{ color: 'var(--gray-color)' }}>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--gray-color)' }}>
            No categories available.
          </div>
        ) : (
          /* Stacked feature area */
          <div
            className="relative w-full max-w-[90%] mx-auto px-4 md:px-8"
            style={{ height: `${categories.length * 80}vh` }}
          >
            {categories.map((item, index) => (
              <StackedFeatureCard
                key={item.category_level1_id}
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
