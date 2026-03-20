import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Share2,
  X,
} from "lucide-react";
import Api from "../../../components/apicall";

interface BlogPost {
  blog_id: number;
  blog_title: string;
  blog_short_desc: string;
  blog_thumbnail: string;
  blog_createdAt: number;
  blog_status: number;
  category_level1_name?: string;
}

interface CategoryLevel {
  category_level1_id: number;
  category_level1_name: string;
  category_level1_img: string;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryLevel[]>([]);
  const postsPerPage = 9;

  const api = Api();

  const IMG_BASE_URL = (import.meta as any).env?.VITE_URL ?? "";

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await api.fetchCategoryLevelOneList({ status: "1" });
      if (result.success) {
        setCategoryList(result.data || []);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const params: Record<string, string | number> = {
        page: currentPage,
        limit: postsPerPage,
      };
      if (searchQuery) params.search = searchQuery;
      if (selectedCategoryId) params.category_level1_id = selectedCategoryId;
      const result = await api.fetchBlogForWebsiteList(params);
      console.log(result);
      if (result.success) {
        setBlogPosts(result.data || []);
        setTotalCount(result.pagination?.total || 0);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, [currentPage, searchQuery, selectedCategoryId]);

  const totalPages = Math.ceil(totalCount / postsPerPage);

  const formatDate = (unix: number) =>
    new Date(unix * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedTag("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategoryId, selectedTag]);

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
                  {/* All option */}
                  <button
                    onClick={() => { setSelectedCategoryId(null); setCurrentPage(1); }}
                    className="w-full flex items-center p-3 rounded-lg transition-all text-left"
                    style={{
                      backgroundColor: selectedCategoryId === null ? 'var(--sky-blue)' : 'transparent',
                      color: selectedCategoryId === null ? 'var(--white-color)' : 'var(--gray-color)'
                    }}
                  >
                    <span className="text-sm font-medium">All Services</span>
                  </button>
                  {categoryList.map((cat) => (
                    <button
                      key={cat.category_level1_id}
                      onClick={() => { setSelectedCategoryId(cat.category_level1_id); setCurrentPage(1); }}
                      className="w-full flex items-center justify-between p-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: selectedCategoryId === cat.category_level1_id ? 'var(--sky-blue)' : 'transparent',
                        color: selectedCategoryId === cat.category_level1_id ? 'var(--white-color)' : 'var(--gray-color)'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {cat.category_level1_img && (
                          <img
                            src={`${IMG_BASE_URL}${cat.category_level1_img}`}
                            alt={cat.category_level1_name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <span className="text-sm text-left">{cat.category_level1_name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategoryId !== null || selectedTag) && (
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
                    {selectedCategoryId !== null && (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--background-alt)' }}>
                        <span className="text-sm" style={{ color: 'var(--gray-color)' }}>
                          {categoryList.find(c => c.category_level1_id === selectedCategoryId)?.category_level1_name}
                        </span>
                        <button onClick={() => setSelectedCategoryId(null)}>
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
            {/* <motion.div
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
                    key={post.blog_id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="card-ui rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-48" style={{ background: 'linear-gradient(to right, var(--sky-blue), var(--gray-color))' }}>
                      {post.blog_thumbnail ? (
                        <img
                          src={`${IMG_BASE_URL}/${post.blog_thumbnail}`}
                          alt={post.blog_title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-6">
                            <Tag className="h-8 w-8 mx-auto mb-3" />
                            <span className="text-sm font-medium backdrop-blur-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                              Blog
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="card-title text-xl mb-3 group-hover:opacity-80 transition-colors line-clamp-2">
                        {post.blog_title}
                      </h3>
                      <p className="card-desc mb-4 line-clamp-2">{post.blog_short_desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm" style={{ color: 'var(--gray-color)' }}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.blog_createdAt)}
                        </div>
                        <ArrowRight className="h-5 w-5 group-hover:opacity-80 transition-colors" style={{ color: 'var(--gray-color)' }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            {/* Filter Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
                  All Articles
                </h2>
                <p style={{ color: 'var(--gray-color)' }}>
                  Showing {blogPosts.length} of {totalCount} posts
                  {selectedCategoryId !== null && (
                    <span className="ml-2" style={{ color: 'var(--sky-blue)' }}>
                      • {categoryList.find(c => c.category_level1_id === selectedCategoryId)?.category_level1_name}
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
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--sky-blue)' }}></div>
                </div>
              ) : blogPosts.length > 0 ? (
                <motion.div
                  key={`${selectedCategoryId}-${currentPage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {blogPosts.map((post) => (
                    <motion.div
                      key={post.blog_id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="card-ui rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                    >
                      {post.blog_thumbnail && (
                        <div className="h-44 overflow-hidden">
                          <img
                            src={`${IMG_BASE_URL}${post.blog_thumbnail}`}
                            alt={post.blog_title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded"
                          />
                        </div>
                      )}
                      <div className="p-0 pt-2">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--gray-color)' }}>
                            Blog
                          </span>
                          <button className="hover:opacity-80" style={{ color: 'var(--sky-blue)' }}>
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>

                        <h3 className="card-title text-lg mb-3 group-hover:opacity-80 transition-colors line-clamp-2">
                          {post.blog_title}
                        </h3>

                        <p className="card-desc text-sm mb-4 line-clamp-3">
                          {post.blog_short_desc}
                        </p>

                        <div className="border-t pt-4">
                          <div className="flex items-center text-sm" style={{ color: 'var(--gray-color)' }}>
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.blog_createdAt)}
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
            {totalCount > postsPerPage && (
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
