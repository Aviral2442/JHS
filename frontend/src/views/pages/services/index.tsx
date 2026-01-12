import React, { useState, useEffect, useRef } from 'react';

type Service = {
  id: number;
  name: string;
  category: 'cleaning' | 'maintenance' | 'home-improvement' | 'professional';
  icon: string;
  description: string;
  popular: boolean;
  price: number;
  rating: number;
  reviews: number;
  deliveryTime: string;
  image: string;
};

const AllServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Cleaning Servers', category: 'cleaning', icon: '🧹', description: 'Professional server room cleaning and maintenance', popular: true, price: 299, rating: 4.8, reviews: 42, deliveryTime: '2-4 hours', image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop' },
    { id: 2, name: 'Laundry Service', category: 'cleaning', icon: '👕', description: 'Premium laundry and dry cleaning services', popular: false, price: 49, rating: 4.5, reviews: 36, deliveryTime: '24 hours', image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w-400&h=300&fit=crop' },
    { id: 3, name: 'Internal Maintenance', category: 'maintenance', icon: '🔧', description: 'Internal systems maintenance and repair', popular: true, price: 199, rating: 4.9, reviews: 58, deliveryTime: 'Same day', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop' },
    { id: 4, name: 'New Furniture', category: 'home-improvement', icon: '🛋️', description: 'Custom furniture design and installation', popular: false, price: 899, rating: 4.7, reviews: 24, deliveryTime: '3-5 days', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
    { id: 5, name: 'Carpenter Service', category: 'home-improvement', icon: '🪚', description: 'Professional carpentry and woodwork', popular: true, price: 399, rating: 4.8, reviews: 67, deliveryTime: '2-3 days', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 6, name: 'Tails Fitting', category: 'maintenance', icon: '🔩', description: 'Precision fitting and installation services', popular: false, price: 149, rating: 4.4, reviews: 19, deliveryTime: '1-2 days', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop' },
    { id: 7, name: 'Painting Service', category: 'home-improvement', icon: '🎨', description: 'Interior and exterior painting services', popular: true, price: 599, rating: 4.9, reviews: 89, deliveryTime: '2-4 days', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop' },
    { id: 8, name: 'Pest Control', category: 'maintenance', icon: '🐛', description: 'Complete pest control solutions', popular: false, price: 179, rating: 4.6, reviews: 45, deliveryTime: '24 hours', image: 'https://images.unsplash.com/photo-1533324268742-60b233802eef?w=400&h=300&fit=crop' },
    { id: 9, name: 'Plumber Service', category: 'professional', icon: '🚰', description: 'Plumbing and pipework services', popular: true, price: 129, rating: 4.7, reviews: 92, deliveryTime: 'Same day', image: 'https://images.unsplash.com/photo-1621967299229-c6e7085a7c2a?w=400&h=300&fit=crop' },
    { id: 10, name: 'Electrician Service', category: 'professional', icon: '🔌', description: 'Electrical installation and repair', popular: true, price: 149, rating: 4.8, reviews: 78, deliveryTime: 'Same day', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop' },
    { id: 11, name: 'Civil Contractors', category: 'professional', icon: '🏗️', description: 'Civil construction and contracting', popular: false, price: 2499, rating: 4.9, reviews: 34, deliveryTime: '7-14 days', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop' },
  ]);

  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [mobileSheetOpen, setMobileSheetOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'cleaning', name: 'Cleaning', count: services.filter(s => s.category === 'cleaning').length },
    { id: 'maintenance', name: 'Maintenance', count: services.filter(s => s.category === 'maintenance').length },
    { id: 'home-improvement', name: 'Home Improvement', count: services.filter(s => s.category === 'home-improvement').length },
    { id: 'professional', name: 'Professional', count: services.filter(s => s.category === 'professional').length },
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'popular', name: 'Most Popular' },
  ];

  // Filter and sort services
  useEffect(() => {
    let result = [...services];
    
    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(service => service.category === selectedCategory);
    }
    
    // Search filter
    if (searchTerm) {
      result = result.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Price range filter
    result = result.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured - popular services first
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating);
    }
    
    setFilteredServices(result);
  }, [selectedCategory, searchTerm, sortBy, priceRange, services]);

  // Close bottom sheet when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        setMobileSheetOpen(false);
      }
    };

    if (mobileSheetOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileSheetOpen]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    
    // Open bottom sheet on mobile
    if (window.innerWidth < 768) {
      setMobileSheetOpen(true);
    }
  };

  const handleBookService = () => {
    if (selectedService) {
      alert(`Booking service: ${selectedService.name}\nPrice: $${selectedService.price}`);
      setMobileSheetOpen(false);
    }
  };

  const ProductCard: React.FC<{ service: Service }> = ({ service }) => (
    <div
      onClick={() => handleServiceClick(service)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-300 group"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {service.popular && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            ${service.price}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-2xl mb-2">{service.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(service.rating))}
                {'☆'.repeat(5 - Math.floor(service.rating))}
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">{service.rating}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">({service.reviews} reviews)</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {service.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {service.deliveryTime}
          </div>
        </div>

        <button className="w-full py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center group">
          <span>View Details</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  const FiltersSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Sort By</h4>
        <div className="space-y-2">
          {sortOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                sortBy === option.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {option.name}
              {sortBy === option.id && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setSelectedCategory('all');
          setPriceRange([0, 3000]);
          setSortBy('featured');
          setSearchTerm('');
        }}
        className="w-full mt-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">All Services Marketplace</h1>
              <p className="text-blue-100">Browse and book professional services with confidence</p>
            </div>
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search services (e.g., plumber, cleaning, carpenter)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96 pl-10 pr-4 py-3 border-0 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="text-xl font-bold text-gray-900">{services.length}</div>
            <div className="text-gray-600 text-sm">Total Services</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="text-xl font-bold text-green-600">
              {services.filter(s => s.popular).length}
            </div>
            <div className="text-gray-600 text-sm">Popular Services</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="text-xl font-bold text-purple-600">
              {categories.length - 1}
            </div>
            <div className="text-gray-600 text-sm">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="text-xl font-bold text-yellow-600">
              {Math.round(services.reduce((acc, s) => acc + s.rating, 0) / services.length * 10) / 10}
            </div>
            <div className="text-gray-600 text-sm">Avg. Rating</div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-3 bg-white border border-gray-300 rounded-xl font-medium flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters & Sort
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block md:w-1/4">
            <FiltersSidebar />
          </div>

          {/* Mobile Filters - Collapsible */}
          {showFilters && (
            <div className="md:hidden mb-6">
              <FiltersSidebar />
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Services' : categories.find(c => c.id === selectedCategory)?.name}
                  <span className="text-gray-500 font-normal ml-2">
                    ({filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'})
                  </span>
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 text-sm mt-1">
                    Search results for: <span className="font-semibold">"{searchTerm}"</span>
                  </p>
                )}
              </div>
              <div className="mt-2 sm:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setPriceRange([0, 3000]);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ProductCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Sheet */}
      {mobileSheetOpen && selectedService && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" />
          
          {/* Bottom Sheet */}
          <div
            ref={sheetRef}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden transition-transform duration-300 max-h-[90vh] flex flex-col"
            style={{ transform: mobileSheetOpen ? 'translateY(0)' : 'translateY(100%)' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={() => setMobileSheetOpen(false)}>
              <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
            </div>

            {/* Sheet Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Service Image */}
              <div className="relative h-48">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {selectedService.popular && (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Header Info */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{selectedService.icon}</div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedService.name}</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                          {selectedService.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">${selectedService.price}</div>
                    <div className="flex items-center justify-end mt-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(selectedService.rating))}
                        {'☆'.repeat(5 - Math.floor(selectedService.rating))}
                      </div>
                      <span className="ml-2 text-sm font-semibold">({selectedService.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Delivery Time</div>
                    <div className="font-semibold flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {selectedService.deliveryTime}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Service Type</div>
                    <div className="font-semibold">{selectedService.category}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">What's Included</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Professional Service
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Quality Assurance
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 Customer Support
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setMobileSheetOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={handleBookService}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Modal */}
      {selectedService && !mobileSheetOpen && typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 overflow-y-auto max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="text-5xl">{selectedService.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedService.name}</h2>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        {selectedService.category}
                      </span>
                      {selectedService.popular && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Popular Choice
                        </span>
                      )}
                      <div className="flex items-center text-yellow-500">
                        {'★'.repeat(Math.floor(selectedService.rating))}
                        <span className="ml-2 text-gray-700 font-semibold">{selectedService.rating}</span>
                        <span className="ml-1 text-gray-500">({selectedService.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Description</h3>
                    <p className="text-gray-600 mb-6">{selectedService.description}</p>
                    
                    <div className="bg-blue-50 rounded-xl p-5">
                      <h4 className="font-semibold text-blue-800 mb-3">What's Included</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-blue-700">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Professional Service
                        </li>
                        <li className="flex items-center text-blue-700">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Quality Assurance
                        </li>
                        <li className="flex items-center text-blue-700">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Timely Completion
                        </li>
                        <li className="flex items-center text-blue-700">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          24/7 Customer Support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-5 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Service Details</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="text-gray-600">Price</div>
                          <div className="text-3xl font-bold text-blue-600">${selectedService.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-600">Delivery Time</div>
                          <div className="font-semibold">{selectedService.deliveryTime}</div>
                        </div>
                      </div>
                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-600">Service Category:</span>
                        <span className="font-medium">{selectedService.category}</span>
                      </div>
                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-600">Availability:</span>
                        <span className="font-medium text-green-600">Available Now</span>
                      </div>
                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-2">★★★★★</span>
                          <span className="font-medium">{selectedService.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reviews:</span>
                        <span className="font-medium">{selectedService.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleBookService}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
                    >
                      Book This Service - ${selectedService.price}
                    </button>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      View Other Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServicesPage;