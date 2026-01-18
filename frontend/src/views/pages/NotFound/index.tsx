import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  RefreshCw,
  Globe,
  Mail
} from 'lucide-react';

interface NotFoundProps {
  errorCode?: number;
  errorMessage?: string;
  showContact?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  errorCode = 404, 
  errorMessage = "Page not found",
  showContact = true 
}) => {
  const [showParticles, setShowParticles] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle mouse move for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Suggested pages for redirection
  const suggestedPages = [
    { name: 'Home', path: '/', description: 'Back to homepage' },
    { name: 'Documentation', path: '/docs', description: 'View documentation' },
    { name: 'Blog', path: '/blog', description: 'Read latest articles' },
    { name: 'Contact', path: '/contact', description: 'Get in touch' },
  ];

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden relative">
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -inset-[10px] opacity-50"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 opacity-20" />
        
        {/* Animated floating elements */}
        {showParticles && (
          <>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                x: [0, -15, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-3/4 right-1/3 w-3 h-3 bg-purple-500 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/4 left-1/3 w-4 h-0.5 bg-pink-500"
            />
          </>
        )}
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Error code with animation */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="inline-block relative"
            >
              <div className="relative">
                <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  {errorCode}
                </h1>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-8 -right-8"
                >
                  <AlertCircle className="w-16 h-16 text-yellow-500 opacity-50" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Error message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {errorMessage}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry - let's get you back on track.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 max-w-xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                >
                  Search
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Suggested pages */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedPages.map((page, index) => (
                <motion.div
                  key={page.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                >
                  <Link
                    to={page.path}
                    className="block p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {page.name}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-blue-500 transform rotate-180" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {page.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </motion.button>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium shadow-lg"
              >
                <Home className="w-5 h-5" />
                Homepage
              </motion.button>
            </Link>
          </motion.div>

          {/* Contact section */}
          {showContact && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold">
                  Need further assistance?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you find what you're looking for.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'mailto:support@example.com'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 font-medium"
              >
                Contact Support
                <Globe className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              © {new Date().getFullYear()} Your Company. All rights reserved.
              <span className="mx-2">•</span>
              <button 
                onClick={() => setShowParticles(!showParticles)}
                className="hover:text-blue-500 transition-colors"
              >
                {showParticles ? 'Hide' : 'Show'} effects
              </button>
            </p>
          </motion.div>
        </div>
      </main>

      {/* Error details - hidden by default, can be toggled */}
      <motion.div 
        initial={false}
        animate={{ height: isHovered ? 'auto' : 0 }}
        className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-4">
          <h4 className="font-medium mb-2">Error Details</h4>
          <div className="text-xs font-mono space-y-1">
            <p>Status: {errorCode}</p>
            <p>Path: {window.location.pathname}</p>
            <p>Time: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;