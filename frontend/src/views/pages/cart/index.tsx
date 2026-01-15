import React, { useState, useEffect } from 'react';
import {
  Trash2, Plus, Minus, Heart, ShoppingBag,
  Truck, Shield, RotateCcw, CreditCard,
  ArrowLeft, X, Check, AlertCircle
} from 'lucide-react';

// ================ TYPES ================
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
  inStock: boolean;
  isWishlisted: boolean;
  maxQuantity: number;
}

interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
}

// ================ MOCK DATA ================
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 30hr battery',
    price: 199.99,
    originalPrice: 249.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    inStock: true,
    isWishlisted: false,
    maxQuantity: 5
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton, sustainable fashion',
    price: 29.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Fashion',
    inStock: true,
    isWishlisted: true,
    maxQuantity: 10
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    description: 'Track heart rate, sleep, and 20+ sports modes',
    price: 159.99,
    originalPrice: 199.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    inStock: true,
    isWishlisted: false,
    maxQuantity: 3
  },
  {
    id: 4,
    name: 'Designer Coffee Mug',
    description: 'Ceramic mug with ergonomic handle and heat retention',
    price: 18.50,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
    category: 'Home',
    inStock: false,
    isWishlisted: false,
    maxQuantity: 15
  }
];

const shippingMethods: ShippingMethod[] = [
  { id: 1, name: 'Standard Shipping', description: 'Regular delivery', price: 4.99, estimatedDays: '5-7 business days' },
  { id: 2, name: 'Express Shipping', description: 'Faster delivery', price: 9.99, estimatedDays: '2-3 business days' },
  { id: 3, name: 'Next Day Delivery', description: 'Priority shipping', price: 19.99, estimatedDays: '1 business day' },
  { id: 4, name: 'Free Shipping', description: 'Free for orders over $100', price: 0, estimatedDays: '5-10 business days' }
];

const promoCodes: PromoCode[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage', minAmount: 50 },
  { code: 'SAVE20', discount: 20, type: 'percentage', minAmount: 100 },
  { code: 'FREESHIP', discount: 0, type: 'fixed' },
  { code: 'FLAT15', discount: 15, type: 'fixed' }
];

// ================ COMPONENTS ================

// Cart Item Component
const CartItemCard: React.FC<{
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}> = ({ item, onUpdateQuantity, onRemove, onToggleWishlist }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  const increment = () => {
    if (item.quantity < item.maxQuantity) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const decrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-100 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100'}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {!item.inStock && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Out of Stock
              </div>
            )}
            {item.originalPrice && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Save ${(item.originalPrice - item.price).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {item.category}
                </span>
                {item.inStock ? (
                  <span className="flex items-center text-xs text-green-600">
                    <Check size={12} className="mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-xs text-red-600">
                    <AlertCircle size={12} className="mr-1" /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden md:block text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </div>
              {item.originalPrice && (
                <div className="text-gray-500 line-through">
                  ${item.originalPrice.toFixed(2)}
                </div>
              )}
              <div className="text-gray-600 mt-2">
                Total: <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Mobile Price */}
          <div className="md:hidden mt-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>
                {item.originalPrice && (
                  <div className="text-gray-500 line-through text-sm">
                    ${item.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>
              <div className="text-lg font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrement}
                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={increment}
                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={item.quantity >= item.maxQuantity}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(item.id)}
                className={`p-2 rounded-full ${item.isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'} transition-all`}
              >
                <Heart size={20} fill={item.isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Promo Code Component
const PromoCodeInput: React.FC<{
  onApplyPromo: (code: string) => void;
  appliedCode?: PromoCode;
  onRemovePromo: () => void;
}> = ({ onApplyPromo, appliedCode, onRemovePromo }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }

    const foundCode = promoCodes.find(p => p.code === code.toUpperCase());
    if (foundCode) {
      onApplyPromo(code.toUpperCase());
      setError('');
      setCode('');
    } else {
      setError('Invalid promo code');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Promo Code</h3>

      {appliedCode ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
          <div>
            <div className="flex items-center text-green-700">
              <Check size={18} className="mr-2" />
              <span className="font-medium">Code applied: {appliedCode.code}</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              {appliedCode.type === 'percentage'
                ? `${appliedCode.discount}% discount applied`
                : `$${appliedCode.discount} discount applied`}
            </p>
          </div>
          <button
            onClick={onRemovePromo}
            className="text-red-500 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Available promo codes:</p>
            <div className="flex flex-wrap gap-2">
              {promoCodes.map(promo => (
                <span
                  key={promo.code}
                  className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full border border-gray-200"
                >
                  {promo.code}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Cart Summary Component
const CartSummary: React.FC<{
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  itemCount: number;
}> = ({ subtotal, shipping, discount, tax, total, onCheckout, itemCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Including ${tax.toFixed(2)} in taxes</p>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full mt-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <CreditCard size={20} className="mr-2" />
        Proceed to Checkout
      </button>

      <div className="mt-8 space-y-4">
        <div className="flex items-center text-gray-600">
          <Truck size={18} className="mr-3" />
          <span className="text-sm">Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Shield size={18} className="mr-3" />
          <span className="text-sm">Secure SSL encrypted payment</span>
        </div>
        <div className="flex items-center text-gray-600">
          <RotateCcw size={18} className="mr-3" />
          <span className="text-sm">30-day return policy</span>
        </div>
      </div>
    </div>
  );
};

// ================ MAIN COMPONENT ================
const index: React.FC = () => {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [selectedShipping, setSelectedShipping] = useState<number>(1);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingMethod = shippingMethods.find(m => m.id === selectedShipping) || shippingMethods[0];
  const shipping = subtotal >= 100 && shippingMethod.id === 4 ? 0 : shippingMethod.price;

  const discount = appliedPromo
    ? appliedPromo.type === 'percentage'
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0;

  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = Math.max(0, subtotal + shipping - discount + tax);

  // Handlers
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      setIsLoading(false);
      setCartItems([]);
    }, 1500);
  };

  const applyPromoCode = (code: string) => {
    const promo = promoCodes.find(p => p.code === code);
    if (promo) {
      setAppliedPromo(promo);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Effects
  useEffect(() => {
    // Auto-select free shipping if eligible
    if (subtotal >= 100) {
      setSelectedShipping(4);
    }
  }, [subtotal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Shopping Cart</h1>
              <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
            </div>
            <div className="flex items-center">
              <ShoppingBag size={28} className="text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">{cartItems.length} items</span>
            </div>
          </div>

          {/* Progress Bar */}
          {/* <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                <span className="ml-2 font-medium text-blue-600">Cart</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-300">
                <div className="h-full w-1/3 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">2</div>
                <span className="ml-2 font-medium text-gray-500">Information</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">3</div>
                <span className="ml-2 font-medium text-gray-500">Payment</span>
              </div>
            </div>
          </div> */}
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            {/* Cart Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Cart Items <span className="text-blue-600">({cartItems.length})</span>
              </h2>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Clear Cart
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                </p>
                <button
                  onClick={() => setCartItems(initialCartItems)}
                  className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md flex items-center mx-auto"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )}

            {/* Promo Code Section */}
            {cartItems.length > 0 && (
              <div className="mt-12">
                <PromoCodeInput
                  onApplyPromo={applyPromoCode}
                  appliedCode={appliedPromo || undefined}
                  onRemovePromo={removePromoCode}
                />
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-1/3">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                tax={tax}
                total={total}
                onCheckout={handleCheckout}
                itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              />

              {/* Security Badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600 mt-1">Secure</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">SSL</div>
                  <div className="text-xs text-gray-600 mt-1">Encrypted</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">30</div>
                  <div className="text-xs text-gray-600 mt-1">Day Returns</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-800">Processing Order</h3>
              <p className="text-gray-600 mt-2">Please wait while we complete your purchase...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default index;