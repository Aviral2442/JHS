import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Tag,
  BookOpen,
  Share2,
  X,
  Sparkles,
  Home,
  Wrench,
  PaintBucket,
  Droplets,
  Hammer,
  Construction,
  Bug,
  Wind,
  Brush,
  Zap,
  ArrowRight,
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  service: string;
  tags: string[];
  featured: boolean;
}

interface Service {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
  blogCount: number;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const services: Service[] = [
    {
      id: 1,
      name: "All Services",
      icon: Home,
      color: "text-gray-600",
      blogCount: 48,
    },
    {
      id: 2,
      name: "Cleaning",
      icon: Sparkles,
      color: "text-teal-500",
      blogCount: 8,
    },
    {
      id: 3,
      name: "Interior Design",
      icon: Home,
      color: "text-purple-500",
      blogCount: 6,
    },
    {
      id: 4,
      name: "Laundry",
      icon: Droplets,
      color: "text-cyan-500",
      blogCount: 4,
    },
    {
      id: 5,
      name: "Carpenter",
      icon: Hammer,
      color: "text-amber-500",
      blogCount: 7,
    },
    {
      id: 6,
      name: "Painting",
      icon: PaintBucket,
      color: "text-red-500",
      blogCount: 5,
    },
    {
      id: 7,
      name: "Plumber",
      icon: Wrench,
      color: "text-teal-600",
      blogCount: 6,
    },
    {
      id: 8,
      name: "Electrician",
      icon: Zap,
      color: "text-yellow-500",
      blogCount: 4,
    },
    {
      id: 9,
      name: "Civil Contractor",
      icon: Construction,
      color: "text-orange-500",
      blogCount: 3,
    },
    {
      id: 10,
      name: "Renovation",
      icon: Brush,
      color: "text-green-500",
      blogCount: 5,
    },
    {
      id: 11,
      name: "Pest Control",
      icon: Bug,
      color: "text-lime-500",
      blogCount: 4,
    },
    {
      id: 12,
      name: "AC Repair",
      icon: Wind,
      color: "text-sky-500",
      blogCount: 3,
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Essential Spring Cleaning Tips for Your Home",
      excerpt:
        "Prepare your home for the new season with these professional cleaning strategies",
      content: "Full content about spring cleaning...",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "8 min",
      views: 1250,
      likes: 89,
      comments: 24,
      category: "Cleaning",
      service: "Cleaning",
      tags: ["cleaning", "seasonal", "tips"],
      featured: true,
    },
    {
      id: 2,
      title: "Modern Interior Design Trends for 2024",
      excerpt:
        "Discover the latest interior design trends transforming homes this year",
      content: "Full content about interior design...",
      author: "Michael Chen",
      date: "2024-03-10",
      readTime: "12 min",
      views: 2100,
      likes: 156,
      comments: 42,
      category: "Design",
      service: "Interior Design",
      tags: ["design", "trends", "modern"],
      featured: true,
    },
    {
      id: 3,
      title: "How to Choose the Right Paint for Every Room",
      excerpt:
        "A comprehensive guide to selecting paints based on room functionality and lighting",
      content: "Full content about painting...",
      author: "Emma Wilson",
      date: "2024-03-05",
      readTime: "10 min",
      views: 980,
      likes: 67,
      comments: 18,
      category: "Painting",
      service: "Painting",
      tags: ["painting", "diy", "colors"],
      featured: true,
    },
    {
      id: 4,
      title: "Emergency Plumbing: What You Need to Know",
      excerpt:
        "Essential information for handling plumbing emergencies before help arrives",
      content: "Full content about plumbing...",
      author: "David Brown",
      date: "2024-03-01",
      readTime: "6 min",
      views: 1500,
      likes: 92,
      comments: 31,
      category: "Maintenance",
      service: "Plumber",
      tags: ["plumbing", "emergency", "repair"],
      featured: true,
    },
    {
      id: 5,
      title: "Energy-Efficient Home Electrical Upgrades",
      excerpt:
        "Save money and reduce energy consumption with these electrical improvements",
      content: "Full content about electrical...",
      author: "James Wilson",
      date: "2024-02-28",
      readTime: "11 min",
      views: 1200,
      likes: 78,
      comments: 22,
      category: "Energy",
      service: "Electrician",
      tags: ["electrical", "energy", "savings"],
      featured: false,
    },
    {
      id: 6,
      title: "Complete Home Renovation Planning Guide",
      excerpt:
        "Step-by-step guide to planning and executing a successful home renovation",
      content: "Full content about renovation...",
      author: "Lisa Rodriguez",
      date: "2024-02-25",
      readTime: "15 min",
      views: 1800,
      likes: 124,
      comments: 38,
      category: "Renovation",
      service: "Renovation",
      tags: ["renovation", "planning", "guide"],
      featured: true,
    },
    {
      id: 7,
      title: "Natural Pest Control Methods That Work",
      excerpt:
        "Eco-friendly approaches to pest control without harmful chemicals",
      content: "Full content about pest control...",
      author: "Sarah Johnson",
      date: "2024-02-20",
      readTime: "7 min",
      views: 900,
      likes: 56,
      comments: 16,
      category: "Pest Control",
      service: "Pest Control",
      tags: ["pest-control", "eco-friendly", "natural"],
      featured: false,
    },
    {
      id: 8,
      title: "AC Maintenance Checklist for Summer",
      excerpt: "Prepare your air conditioning system for the hot months ahead",
      content: "Full content about AC repair...",
      author: "Michael Chen",
      date: "2024-02-15",
      readTime: "9 min",
      views: 1100,
      likes: 73,
      comments: 20,
      category: "Maintenance",
      service: "AC Repair",
      tags: ["ac-repair", "maintenance", "summer"],
      featured: false,
    },
    {
      id: 9,
      title: "Professional Laundry Tips for Different Fabrics",
      excerpt:
        "Expert advice on caring for various fabrics to extend their lifespan",
      content: "Full content about laundry...",
      author: "Emma Wilson",
      date: "2024-02-10",
      readTime: "8 min",
      views: 850,
      likes: 48,
      comments: 14,
      category: "Laundry",
      service: "Laundry",
      tags: ["laundry", "fabrics", "care"],
      featured: false,
    },
    {
      id: 10,
      title: "Custom Carpentry Projects for Small Spaces",
      excerpt:
        "Innovative carpentry solutions for maximizing space in compact homes",
      content: "Full content about carpentry...",
      author: "David Brown",
      date: "2024-02-05",
      readTime: "10 min",
      views: 950,
      likes: 61,
      comments: 17,
      category: "Carpentry",
      service: "Carpenter",
      tags: ["carpentry", "space-saving", "custom"],
      featured: true,
    },
    {
      id: 11,
      title: "Construction Planning: A Homeowner's Guide",
      excerpt:
        "Everything you need to know when planning a construction project",
      content: "Full content about construction...",
      author: "James Wilson",
      date: "2024-02-01",
      readTime: "13 min",
      views: 1300,
      likes: 82,
      comments: 25,
      category: "Construction",
      service: "Civil Contractor",
      tags: ["construction", "planning", "guide"],
      featured: false,
    },
    {
      id: 12,
      title: "Seasonal Home Maintenance Calendar",
      excerpt:
        "A month-by-month guide to keeping your home in perfect condition",
      content: "Full content about maintenance...",
      author: "Lisa Rodriguez",
      date: "2024-01-28",
      readTime: "14 min",
      views: 2000,
      likes: 145,
      comments: 41,
      category: "Maintenance",
      service: "All Services",
      tags: ["maintenance", "calendar", "seasonal"],
      featured: true,
    },
  ];


  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesService =
        selectedService === "all" || post.service === selectedService;
      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);

      return matchesSearch && matchesService && matchesTag;
    });
  }, [searchQuery, selectedService, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedService("all");
    setSelectedTag("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedService, selectedTag]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white-color)' }}>
      {/* Hero Section */}
      <div className="section-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="badge-highlight inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Jeevan Home Services Blog
            </div>
            <h1 className="section-title text-4xl md:text-5xl font-bold mb-6">
              Expert Insights & Home Care Tips
            </h1>
            <p className="section-subtitle text-xl max-w-3xl mx-auto">
              Discover professional advice, maintenance guides, and industry
              trends for all your home service needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-ui rounded-xl shadow-lg p-6"
            >
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--gray-color)' }} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 outline-none"
                  style={{ borderColor: 'var(--gray-color)' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-5 w-5" style={{ color: 'var(--gray-color)' }} />
                  </button>
                )}
              </div>

              {/* Filter by Service */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Filter className="h-5 w-5 mr-2" style={{ color: 'var(--gray-color)' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--black-color)' }}>
                    Filter by Service
                  </h3>
                </div>
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedService === service.name
                          ? "text-white"
                          : "hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: selectedService === service.name ? 'var(--sky-blue)' : 'transparent',
                        color: selectedService === service.name ? 'var(--white-color)' : 'var(--gray-color)'
                      }}
                    >
                      <div className="flex items-center">
                        <service.icon
                          className={`h-5 w-5 mr-3 ${service.color}`}
                        />
                        <span>{service.name}</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--gray-color)' }}>
                        {service.blogCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedService !== "all" || selectedTag) && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium" style={{ color: 'var(--black-color)' }}>
                      Active Filters
                    </span>
                    <button
                      onClick={clearFilters}
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: 'var(--sky-blue)' }}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchQuery && (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--background-alt)' }}>
                        <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                          Search: "{searchQuery}"
                        </span>
                        <button onClick={() => setSearchQuery("")}>
                          <X className="h-4 w-4" style={{ color: 'var(--sky-blue)' }} />
                        </button>
                      </div>
                    )}
                    {selectedService !== "all" && (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--background-alt)' }}>
                        <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                          Service: {selectedService}
                        </span>
                        <button onClick={() => setSelectedService("all")}>
                          <X className="h-4 w-4" style={{ color: 'var(--sky-blue)' }} />
                        </button>
                      </div>
                    )}
                    {selectedTag && (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--background-alt)' }}>
                        <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                          Tag: #{selectedTag}
                        </span>
                        <button onClick={() => setSelectedTag("")}>
                          <X className="h-4 w-4" style={{ color: 'var(--sky-blue)' }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
                  Trending Articles
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <ChevronLeft className="h-5 w-5" style={{ color: 'var(--gray-color)' }} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <ChevronRight className="h-5 w-5" style={{ color: 'var(--gray-color)' }} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {featuredPosts.slice(0, 3).map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="card-ui rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-48" style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center p-6">
                          <Tag className="h-8 w-8 mx-auto mb-3" />
                          <span className="text-sm font-medium backdrop-blur-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            {post.service}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--sky-blue)' }}>
                          {post.category}
                        </span>
                      </div>
                      <h3 className="card-title text-xl mb-3 group-hover:opacity-80 transition-colors">
                        {post.title}
                      </h3>
                      <p className="card-desc mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm" style={{ color: 'var(--gray-color)' }}>
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 group-hover:opacity-80 transition-colors" style={{ color: 'var(--gray-color)' }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Filter Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
                  All Articles
                </h2>
                <p style={{ color: 'var(--gray-color)' }}>
                  Showing {filteredPosts.length} of {blogPosts.length} posts
                  {(selectedService !== "all" || selectedTag) && (
                    <span className="ml-2" style={{ color: 'var(--sky-blue)' }}>
                      • Filtered by{" "}
                      {selectedService !== "all" && `${selectedService} `}
                      {selectedTag && `#${selectedTag}`}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-sm" style={{ color: 'var(--gray-color)' }}>
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: 'var(--gray-color)' }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: 'var(--gray-color)' }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <AnimatePresence mode="wait">
              {currentPosts.length > 0 ? (
                <motion.div
                  key={`${selectedService}-${selectedTag}-${currentPage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {currentPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="card-ui rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--gray-color)' }}>
                            {post.service}
                          </span>
                          <button className="hover:opacity-80" style={{ color: 'var(--sky-blue)' }}>
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>

                        <h3 className="card-title text-lg mb-3 group-hover:opacity-80 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="card-desc text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between text-sm" style={{ color: 'var(--gray-color)' }}>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {post.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-ui rounded-2xl shadow-lg p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--background-alt)' }}>
                    <Search className="h-10 w-10" style={{ color: 'var(--gray-color)' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--black-color)' }}>
                    No Posts Found
                  </h3>
                  <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--gray-color)' }}>
                    We couldn't find any blog posts matching your search
                    criteria. Try different filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary px-6 py-3 rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center space-x-2 mt-12"
              >
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: 'var(--gray-color)' }}
                >
                  First
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg border`}
                      style={{
                        backgroundColor: currentPage === pageNum ? 'var(--sky-blue)' : 'transparent',
                        color: currentPage === pageNum ? 'var(--white-color)' : 'var(--black-color)',
                        borderColor: currentPage === pageNum ? 'var(--sky-blue)' : 'var(--gray-color)'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: 'var(--gray-color)' }}
                >
                  Last
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
