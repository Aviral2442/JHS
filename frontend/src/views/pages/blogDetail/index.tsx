import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaCalendar,
  FaTag,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaLink,
  FaArrowLeft,
} from "react-icons/fa";
import { HiChevronDoubleUp } from "react-icons/hi";
import Api from "../../../components/apicall";

interface BlogData {
  blog_id: number;
  blog_title: string;
  blog_title_sku: string;
  blog_short_desc: string;
  blog_long_desc: string;
  blog_thumbnail: string;
  blog_tags: string;
  blog_meta_title: string;
  blog_meta_desc: string;
  blog_meta_keyword: string;
  blog_status: number;
  blog_category_id: number;
  blog_createdAt: number;
  blog_updatedAt: number;
}

export const BlogDetailPage: React.FC = () => {
  const { blogSku } = useParams<{ blogSku: string }>();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const api = Api();

  const IMG_BASE_URL = (import.meta as any).env?.VITE_URL ?? "";

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!blogSku) {
        setError("Blog not found");
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await api.fetchBlogDetailsBySku(blogSku);
      if (res.success && res.data) {
        setBlog(res.data);
        setError(null);
      } else {
        setError("Blog not found");
      }
      setLoading(false);
    };
    fetchBlogDetail();
  }, [blogSku]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const formatDate = (unix: number) =>
    new Date(unix * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const parseTags = (tags: string): string[] => {
    if (!tags) return [];
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fallback to comma-separated
    }
    return tags.split(",").map((t) => t.trim()).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: 'var(--background-alt)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--sky-blue)' }}></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4" style={{ backgroundColor: 'var(--background-alt)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--black-color)' }}>
          {error || "Blog not found"}
        </h2>
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-3 rounded-lg text-white font-medium"
          style={{ backgroundColor: 'var(--sky-blue)' }}
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const tags = parseTags(blog.blog_tags);

  return (
    <div className="min-h-screen dark:bg-gray-900 max-w-[90%] mx-auto" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: 'var(--sky-blue)' }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <article className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 overflow-hidden" style={{ borderColor: 'var(--background-alt)' }}>
              {/* Featured Image */}
              {blog.blog_thumbnail && (
                <div className="relative h-100 md:h-125">
                  <img
                    src={`${IMG_BASE_URL}${blog.blog_thumbnail}`}
                    alt={blog.blog_title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                      {blog.blog_title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="w-4 h-4" />
                        <span>{formatDate(blog.blog_createdAt)}</span>
                        {blog.blog_updatedAt && blog.blog_updatedAt !== blog.blog_createdAt && (
                          <span className="text-sm opacity-80">
                            (Updated: {formatDate(blog.blog_updatedAt)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!blog.blog_thumbnail && (
                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--black-color)' }}>
                    {blog.blog_title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6" style={{ color: 'var(--gray-color)' }}>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-4 h-4" />
                      <span>{formatDate(blog.blog_createdAt)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="p-8">
                {/* Tags & Share Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 dark:bg-gray-900/50 rounded-xl" style={{ backgroundColor: 'var(--background-alt)' }}>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-4 py-2 dark:bg-gray-700 rounded-full text-sm"
                        style={{ backgroundColor: 'var(--background-alt)', color: 'var(--gray-color)' }}
                      >
                        <FaTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
                      Share:
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-10 h-10 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--sky-blue)' }}>
                        <FaFacebook className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--sky-blue)' }}>
                        <FaTwitter className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--sky-blue)' }}>
                        <FaLinkedin className="w-5 h-5" />
                      </button>
                      <button
                        onClick={copyLink}
                        className="w-10 h-10 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--background-alt)', color: 'var(--gray-color)' }}
                      >
                        <FaLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                {blog.blog_short_desc && (
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--gray-color)' }}>
                    {blog.blog_short_desc}
                  </p>
                )}

                {/* Article Body */}
                <div
                  ref={contentRef}
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.blog_long_desc || "" }}
                />
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
          style={{ backgroundColor: 'var(--sky-blue)' }}
          aria-label="Back to top"
        >
          <HiChevronDoubleUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default BlogDetailPage;
