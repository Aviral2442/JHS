// components/ProductCard.tsx
import React from 'react';
import { Product } from '../../../../types/service.types';
import { services } from '../mockData';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const service = services.find(s => s.id === product.serviceId);
  const subCategory = service?.subCategories.find(sc => sc.id === product.subCategoryId);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.popular && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
              Popular
            </span>
          )}
          {product.featured && (
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
            {service?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Service & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {service?.name}
          </span>
          {subCategory && (
            <span className="text-xs text-gray-500">
              • {subCategory.name}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'fill-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Duration & Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{product.duration}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${product.price}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onAddToCart}
          className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;