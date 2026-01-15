// components/FilterSidebar.tsx
import React from 'react';
import { Service, FilterState } from '../../../../types/service.types';

interface FilterSidebarProps {
  filters: FilterState;
  services: Service[];
  selectedService: Service | null;
  onServiceSelect: (serviceId: string | null) => void;
  onSubCategorySelect: (subCategoryId: string | null) => void;
  onPriceFilter: (min: number, max: number) => void;
  onSort: (sortBy: FilterState['sortBy']) => void;
  onSearch: (search: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  services,
  selectedService,
  onServiceSelect,
  onSubCategorySelect,
  onPriceFilter,
  onSort,
  onSearch,
}) => {
  return (
    <div className="filter-sidebar bg-white rounded-xl shadow-lg p-6 sticky top-6">
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Services
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Services */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
        <div className="space-y-2">
          <button
            onClick={() => onServiceSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              !filters.service
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50'
            }`}
          >
            All Services
          </button>
          {services.map(service => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                filters.service === service.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedService && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            {selectedService.name} Categories
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onSubCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                !filters.subCategory
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              All {selectedService.name}
            </button>
            {selectedService.subCategories.map(subCat => (
              <button
                key={subCat.id}
                onClick={() => onSubCategorySelect(subCat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  filters.subCategory === subCat.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Min: ${filters.minPrice}</span>
            <span className="text-sm text-gray-600">Max: ${filters.maxPrice}</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              max="10000"
              value={filters.minPrice}
              onChange={(e) => onPriceFilter(Number(e.target.value), filters.maxPrice)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              min="0"
              max="10000"
              value={filters.maxPrice}
              onChange={(e) => onPriceFilter(filters.minPrice, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.maxPrice}
            onChange={(e) => onPriceFilter(filters.minPrice, Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'popular', label: 'Most Popular' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'price_low', label: 'Price: Low to High' },
            { value: 'price_high', label: 'Price: High to Low' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => onSort(option.value as FilterState['sortBy'])}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                filters.sortBy === option.value
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onServiceSelect(null);
          onSubCategorySelect(null);
          onPriceFilter(0, 5000);
          onSort('popular');
          onSearch('');
        }}
        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;