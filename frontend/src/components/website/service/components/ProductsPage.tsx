// components/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { Service, SubCategory, Product, FilterState, CartItem } from '../../../../types/service.types';
import { services, products as mockProducts } from '../mockData';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import ServiceTabs from './ServiceTabs';
import CartSidebar from './CartSidebar';

const ITEMS_PER_PAGE = 8;

const ProductsPage: React.FC = () => {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    service: null,
    subCategory: null,
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'popular',
    search: '',
  });

  // Filter products based on filters
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by service
    if (filters.service) {
      filtered = filtered.filter(product => product.serviceId === filters.service);
    }

    // Filter by subcategory
    if (filters.subCategory) {
      filtered = filtered.filter(product => product.subCategoryId === filters.subCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, allProducts]);

  // Get current page products
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFilters(prev => ({
      ...prev,
      service: serviceId,
      subCategory: null, // Reset subcategory when service changes
    }));
  };

  // Handle subcategory filter
  const handleSubCategorySelect = (subCategoryId: string | null) => {
    setFilters(prev => ({
      ...prev,
      subCategory: subCategoryId,
    }));
  };

  // Handle price filter
  const handlePriceFilter = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  // Handle sort
  const handleSort = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
    }));
  };

  // Handle search
  const handleSearch = (search: string) => {
    setFilters(prev => ({
      ...prev,
      search,
    }));
  };

  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: Date.now().toString(), product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Get subcategories for selected service
  const selectedServiceData = selectedService 
    ? services.find(s => s.id === selectedService)
    : null;

  return (
    <div className="min-h-screen bg-gray-50  max-w-[90%] mx-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Professional Services Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and book professional services for your home or office needs
          </p>
        </div>

        {/* Service Tabs */}
        <div className="mb-8">
          <ServiceTabs
            services={services}
            selectedService={selectedService}
            onSelectService={handleServiceSelect}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <FilterSidebar
              filters={filters}
              services={services}
              selectedService={selectedServiceData}
              onServiceSelect={handleServiceSelect}
              onSubCategorySelect={handleSubCategorySelect}
              onPriceFilter={handlePriceFilter}
              onSort={handleSort}
              onSearch={handleSearch}
            />
          </div>

          {/* Main Content - Products */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Available Services
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} services found
                  {filters.subCategory && ' in this category'}
                </p>
              </div>
              
              {/* Mobile Filter Toggle (Optional) */}
              <button
                className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  // Implement mobile filter drawer
                  const sidebar = document.querySelector('.filter-sidebar');
                  sidebar?.classList.toggle('hidden');
                }}
              >
                Filters
              </button>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first, last, and pages around current
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default ProductsPage;