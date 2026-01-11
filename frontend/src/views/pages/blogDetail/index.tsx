// pages/BlogDetailPage.tsx
import React, { useRef, useState } from 'react';
import { BlogPost, Comment, RelatedPost } from '../blogDetail/blog';
import { CommentSection } from '../blogDetail/CommentSection';
import { RelatedPosts } from '../blogDetail/RelatedPosts';
import {
    FaCalendar,
    FaClock,
    FaTag,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaLink,
    FaHeart,
} from 'react-icons/fa';
import { HiChevronDoubleUp } from 'react-icons/hi';

// Mock data
const mockBlogPost: BlogPost = {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript and Micro-Frontends',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to build enterprise-grade React applications using TypeScript, micro-frontends, and modern architecture patterns.',
    content: `
    <h2 id="introduction">Introduction</h2>
    <p>In today's fast-paced digital landscape, building scalable and maintainable React applications is crucial for business success. This comprehensive guide will walk you through modern practices and architectures that ensure your React applications can grow with your business.</p>
    
    <h3 id="why-scalability">Why Scalability Matters</h3>
    <p>Scalability isn't just about handling more users - it's about maintaining development velocity, ensuring team collaboration efficiency, and future-proofing your codebase.</p>
    
    <h2 id="typescript-benefits">TypeScript Benefits</h2>
    <p>TypeScript provides static typing that catches errors at compile time, improves developer experience with intelligent code completion, and serves as living documentation for your codebase.</p>
    
    <pre><code class="language-typescript">
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function getUser(id: string): Promise&lt;User&gt; {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}
    </code></pre>
    
    <h3 id="type-safety">Type Safety in Practice</h3>
    <p>Implementing proper type safety reduces runtime errors by up to 85% according to recent studies. Here's how to leverage TypeScript effectively:</p>
    
    <h2 id="micro-frontends">Micro-Frontends Architecture</h2>
    <p>Micro-frontends allow large teams to work independently on different parts of the application, deploy features independently, and use different technologies where appropriate.</p>
    
    <h3 id="implementation">Implementation Strategies</h3>
    <p>There are several approaches to implementing micro-frontends, each with its own trade-offs:</p>
    
    <h4 id="module-federation">Module Federation</h4>
    <p>Webpack 5's Module Federation is currently the most popular approach, allowing runtime sharing of modules between independently built applications.</p>
    
    <h2 id="performance-optimization">Performance Optimization</h2>
    <p>Performance is a critical aspect of scalability. Implement code splitting, lazy loading, and proper bundle optimization to ensure fast load times.</p>
    
    <h3 id="lazy-loading">Lazy Loading Components</h3>
    <p>React's lazy loading capabilities allow you to split your code at the component level, loading only what's needed for the current view.</p>
    
    <h2 id="testing-strategies">Testing Strategies</h2>
    <p>A comprehensive testing strategy is essential for maintaining code quality in large applications. Implement unit tests, integration tests, and end-to-end tests.</p>
  `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    // categories: ['React', 'TypeScript', 'Architecture'],
    tags: ['Frontend', 'Scalability', 'Microservices', 'Performance'],
    author: {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        bio: 'Senior Frontend Architect with 10+ years of experience building scalable web applications. Passionate about developer experience and clean code.',
        role: 'Lead Architect',
        socialLinks: {
            twitter: 'https://twitter.com/alexjohnson',
            linkedin: 'https://linkedin.com/in/alexjohnson',
            github: 'https://github.com/alexjohnson',
        },
    },
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    readTime: 8,
    views: 12542,
    likes: 842,
    commentsCount: 42,
    isFeatured: true,
    isBookmarked: false,
};

const mockComments: Comment[] = [
    {
        id: '1',
        author: {
            name: 'Sarah Miller',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            role: 'Senior Developer',
        },
        content: 'Great article! The section on Module Federation was particularly helpful. We\'ve been struggling with micro-frontend implementations and this cleared up a lot of confusion.',
        createdAt: new Date('2024-01-16'),
        likes: 24,
        isLiked: true,
        replies: [
            {
                id: '2',
                author: {
                    name: 'Alex Johnson',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    role: 'admin',
                },
                content: 'Thanks Sarah! Module Federation can be tricky at first, but once you get the hang of it, it\'s incredibly powerful. Let me know if you have any specific questions!',
                createdAt: new Date('2024-01-16'),
                likes: 8,
            },
        ],
    },
    {
        id: '3',
        author: {
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        content: 'Excellent write-up. Would love to see more content about state management strategies in micro-frontend architectures.',
        createdAt: new Date('2024-01-17'),
        likes: 12,
    },
];

const mockRelatedPosts: RelatedPost[] = [
    {
        id: '2',
        title: 'Advanced TypeScript Patterns for React Developers',
        slug: 'advanced-typescript-patterns',
        excerpt: 'Discover powerful TypeScript patterns that will make your React code more type-safe and maintainable.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        readTime: 6,
        publishedAt: new Date('2024-01-10'),
        author: {
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
    },
    {
        id: '3',
        title: 'Mastering React Performance Optimization',
        slug: 'react-performance-optimization',
        excerpt: 'Learn advanced techniques to optimize your React applications for maximum performance.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        readTime: 10,
        publishedAt: new Date('2024-01-05'),
        author: {
            name: 'David Wilson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
    },
    {
        id: '4',
        title: 'State Management in Modern React Applications',
        slug: 'state-management-react',
        excerpt: 'Comparing different state management solutions and when to use each in your React projects.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        readTime: 7,
        publishedAt: new Date('2024-01-01'),
        author: {
            name: 'Lisa Brown',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
    },
];

export const BlogDetailPage: React.FC = () => {
    const [isBookmarked, setIsBookmarked] = useState(mockBlogPost.isBookmarked || false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Handle scroll to show/hide back to top button
    React.useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFontSizeChange = (size: string) => {
        document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
        document.documentElement.classList.add(
            size === 'small' ? 'text-sm' :
                size === 'large' ? 'text-lg' : 'text-base'
        );
    };

    // const handleThemeToggle = () => {
    //     document.documentElement.classList.toggle('dark');
    // };

    // const handleBookmarkToggle = () => {
    //     setIsBookmarked(!isBookmarked);
    // };

    const handleLikeToggle = () => {
        // Handle like functionality
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        // Show toast notification
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 max-w-[90%] mx-auto">
            {/* Back Navigation */}
            {/* <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <FaChevronLeft className="w-4 h-4" />
                            <span className="font-medium">Back to Blog</span>
                        </button>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FaLink className="w-4 h-4" />
                                <span className="hidden sm:inline font-medium">Copy Link</span>
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </nav> */}

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Table of Contents - Left Sidebar */}
                    {/* <div className="lg:col-span-2">
                        <TableOfContents contentRef={contentRef} />
                    </div> */}

                    {/* Main Content */}
                    <div className="lg:col-span-12">
                        {/* Article Header */}
                        <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Featured Image */}
                            <div className="relative h-[400px] md:h-[500px]">
                                <img
                                    src={mockBlogPost.featuredImage}
                                    alt={mockBlogPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    {/* <div className="flex flex-wrap gap-2 mb-4">
                                        {mockBlogPost.categories.map((category) => (
                                            <span
                                                key={category}
                                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div> */}
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                        {mockBlogPost.title}
                                    </h1>

                                    {/* Meta Information */}
                                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={mockBlogPost.author.avatar}
                                                alt={mockBlogPost.author.name}
                                                className="w-10 h-10 rounded-full border-2 border-white"
                                            />
                                            <div>
                                                <div className="font-semibold">{mockBlogPost.author.name}</div>
                                                <div className="text-sm opacity-80">{mockBlogPost.author.role}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="w-4 h-4" />
                                            <span>{mockBlogPost.publishedAt.toLocaleDateString()}</span>
                                            {mockBlogPost.updatedAt && (
                                                <span className="text-sm opacity-80">
                                                    (Updated: {mockBlogPost.updatedAt.toLocaleDateString()})
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <FaClock className="w-4 h-4" />
                                            <span>{mockBlogPost.readTime} min read</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="p-8">
                                {/* Stats Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                    <div className="flex items-center gap-6">
                                        {/* <button
                                            onClick={handleBookmarkToggle}
                                            className={`flex items-center gap-2 ${isBookmarked
                                                    ? 'text-yellow-600 dark:text-yellow-400'
                                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                        >
                                            <FaBookmark className="w-5 h-5" />
                                            <span className="font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
                                        </button> */}

                                        {/* <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                            <FaEye className="w-5 h-5" />
                                            <span className="font-medium">{mockBlogPost.views.toLocaleString()}</span>
                                        </button> */}

                                        <button
                                            onClick={handleLikeToggle}
                                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                        >
                                            <FaHeart className="w-5 h-5" />
                                            <span className="font-medium">{mockBlogPost.likes}</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
                                        <div className="flex items-center gap-2">
                                            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
                                                <FaFacebook className="w-5 h-5" />
                                            </button>
                                            <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600">
                                                <FaTwitter className="w-5 h-5" />
                                            </button>
                                            <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800">
                                                <FaLinkedin className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={copyLink}
                                                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                                            >
                                                <FaLink className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {mockBlogPost.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            <FaTag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Article Body */}
                                <div
                                    ref={contentRef}
                                    className="prose prose-lg dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                                />

                                {/* Author Card */}
                                {/* <div className="mt-12">
                  <AuthorCard author={mockBlogPost.author} />
                </div> */}
                            </div>
                        </article>

                        {/* Comments Section */}
                        <div className="mt-8">
                            <CommentSection comments={mockComments} />
                        </div>

                        {/* Related Posts */}
                        <div className="mt-8">
                            <RelatedPosts posts={mockRelatedPosts} />
                        </div>
                    </div>

                    {/* Right Sidebar - Blog Actions */}
                    {/* <div className="lg:col-span-2">
            <BlogActions
              onFontSizeChange={handleFontSizeChange}
              onThemeToggle={handleThemeToggle}
              isBookmarked={isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
              likes={mockBlogPost.likes}
              onLikeToggle={handleLikeToggle}
              views={mockBlogPost.views}
            />
          </div> */}
                </div>
            </div>

            {/* Back to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
                    aria-label="Back to top"
                >
                    <HiChevronDoubleUp className="w-6 h-6" />
                </button>
            )}

            {/* Progress Bar */}
            {/* <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left transform scale-x-0 transition-transform duration-200 z-50" 
           style={{ transform: `scaleX(${typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0})` }} /> */}
        </div>
    );
};

export default BlogDetailPage;