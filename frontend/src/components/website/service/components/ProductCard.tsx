// components/ProductCard.tsx
import React from 'react';
import { Product } from '../../../../types/service.types';
import { services } from '../mockData';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const service = services.find(s => s.id === product.serviceId);
  const subCategory = service?.subCategories.find(sc => sc.id === product.subCategoryId);
  const navigate = useNavigate();

  return (
    <div className="card-ui overflow-hidden">
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
            <span className="badge-highlight" style={{ backgroundColor: '#fbbf24' }}>
              Popular
            </span>
          )}
          {product.featured && (
            <span className="badge-highlight">
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
          <span className="text-xs font-medium text-primary px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0, 173, 181, 0.1)' }}>
            {service?.name}
          </span>
          {subCategory && (
            <span className="text-xs text-gray">
              • {subCategory.name}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="card-title text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="card-desc text-sm mb-4 line-clamp-2">
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
          <div className="flex items-center gap-1 text-gray">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{product.duration}</span>
          </div>
          <div className="text-2xl font-bold text-dark">
            ${product.price}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/service-detail`)}
          className="btn-primary w-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Go Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;