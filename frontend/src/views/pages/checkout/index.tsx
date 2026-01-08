import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, CreditCard, Shield, Truck, MapPin, User, 
  Mail, Phone, ChevronRight, Check, AlertCircle, 
  Home, Briefcase, Plus, Minus, X, ArrowLeft,
  Package, Clock, Heart, Globe, Download, ShoppingBag
} from 'lucide-react';

// ================ TYPES ================
interface ShippingAddress {
  id: number;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: 'home' | 'work';
}

interface PaymentMethod {
  id: number;
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
  name: string;
  icon: string;
  lastFour?: string;
  isDefault: boolean;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
}

// ================ MOCK DATA ================
const initialAddresses: ShippingAddress[] = [
  {
    id: 1,
    fullName: 'John Doe',
    phone: '+1 (555) 123-4567',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
    type: 'home'
  },
  {
    id: 2,
    fullName: 'John Doe',
    phone: '+1 (555) 987-6543',
    street: '456 Business Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    isDefault: false,
    type: 'work'
  },
  {
    id: 3,
    fullName: 'Jane Smith',
    phone: '+1 (555) 456-7890',
    street: '789 Park Lane',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    country: 'United States',
    isDefault: false,
    type: 'home'
  }
];

const paymentMethods: PaymentMethod[] = [
  { id: 1, type: 'card', name: 'Credit/Debit Card', icon: '💳', isDefault: true },
  { id: 2, type: 'upi', name: 'UPI', icon: '📱', isDefault: false },
  { id: 3, type: 'netbanking', name: 'Net Banking', icon: '🏦', isDefault: false },
  { id: 4, type: 'wallet', name: 'Wallet', icon: '👛', isDefault: false },
  { id: 5, type: 'cod', name: 'Cash on Delivery', icon: '💰', isDefault: false }
];

const orderItems: OrderItem[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    price: 159.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
  }
];

const promoCodes: PromoCode[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage', minAmount: 50 },
  { code: 'SAVE20', discount: 20, type: 'percentage', minAmount: 100 },
  { code: 'FREESHIP', discount: 0, type: 'fixed' },
  { code: 'FLAT15', discount: 15, type: 'fixed' }
];

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 9.99,
    estimated: '5-7 business days',
    description: 'Regular shipping with tracking'
  },
  {
    id: 'express',
    name: 'Express Delivery',
    price: 19.99,
    estimated: '2-3 business days',
    description: 'Priority shipping with tracking'
  },
  {
    id: 'nextday',
    name: 'Next Day Delivery',
    price: 29.99,
    estimated: '1 business day',
    description: 'Guaranteed next-day delivery'
  }
];

// ================ COMPONENTS ================

// Address Card Component
const AddressCard: React.FC<{
  address: ShippingAddress;
  selected: boolean;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
}> = ({ address, selected, onSelect, onEdit }) => {
  return (
    <div 
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-blue-500 ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(address.id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-1 ${
            selected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          }`}>
            {selected && <Check size={14} className="text-white" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-800">{address.fullName}</h4>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                address.type === 'home' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {address.type === 'home' ? <Home size={12} /> : <Briefcase size={12} />}
                <span className="ml-1">{address.type === 'home' ? 'Home' : 'Work'}</span>
              </span>
              {address.isDefault && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  Default
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{address.street}</p>
            <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
            <p className="text-gray-600 text-sm">{address.country}</p>
            <p className="text-gray-600 text-sm mt-2">{address.phone}</p>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address.id);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

// Payment Method Card Component
const PaymentMethodCard: React.FC<{
  method: PaymentMethod;
  selected: boolean;
  onSelect: (id: number) => void;
}> = ({ method, selected, onSelect }) => {
  return (
    <div 
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(method.id)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{method.icon}</span>
          <div>
            <h4 className="font-medium text-gray-800">{method.name}</h4>
            {method.lastFour && (
              <p className="text-sm text-gray-600">Card ending in •••• {method.lastFour}</p>
            )}
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
          selected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
        }`}>
          {selected && <Check size={14} className="text-white" />}
        </div>
      </div>
    </div>
  );
};

// Credit Card Form Component
const CreditCardForm: React.FC<{
  onSubmit: (cardData: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardName,
      expiry,
      cvv,
      saveCard
    });
  };

  return (
    <div className="mt-8 p-6 border border-blue-200 rounded-xl bg-blue-50">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-medium text-gray-800">Add Credit/Debit Card</h4>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className="relative">
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                placeholder="123"
                maxLength={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
            Save this card for future purchases
          </label>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
};

// Delivery Options Component
const DeliveryOptions: React.FC<{
  selectedOption: string;
  onSelectOption: (option: string) => void;
}> = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Delivery Options</h3>
      <div className="space-y-4">
        {shippingOptions.map((option) => (
          <div 
            key={option.id}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectOption(option.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-800">{option.name}</h4>
                  {option.id === 'express' && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Clock size={14} className="mr-1" />
                  Estimated: {option.estimated}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${option.price.toFixed(2)}
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ml-4 mt-2 ${
                  selectedOption === option.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {selectedOption === option.id && <Check size={14} className="text-white" />}
                </div>
              </div>
            </div>
          </div>
        ))}
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md"
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

// Order Summary Component
const OrderSummary: React.FC<{
  summary: OrderSummary;
  items: OrderItem[];
  onEditCart: () => void;
}> = ({ summary, items, onEditCart }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h3>
      
      {/* Order Items Preview */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-700">Items ({summary.itemCount})</h4>
          <button 
            onClick={onEditCart}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit Cart
          </button>
        </div>
        
        <div className="space-y-3">
          {items.slice(0, isExpanded ? items.length : 2).map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <h5 className="font-medium text-gray-800 text-sm">{item.name}</h5>
                <p className="text-gray-600 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          {items.length > 2 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium w-full text-center py-2"
            >
              {isExpanded ? 'Show Less' : `Show ${items.length - 2} more items`}
            </button>
          )}
        </div>
      </div>
      
      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`}
          </span>
        </div>
        
        {summary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${summary.discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${summary.tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Including ${summary.tax.toFixed(2)} in taxes</p>
        </div>
      </div>
      
      {/* Order Protection */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <Shield className="text-blue-600 mt-0.5 mr-3" size={20} />
          <div>
            <h5 className="font-medium text-gray-800">Order Protection</h5>
            <p className="text-sm text-gray-600 mt-1">
              Your purchase is protected by our 30-day return policy and secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================ RAZORPAY INTEGRATION ================
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script dynamically
const loadRazorpayScript = (callback: () => void) => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = callback;
  script.onerror = () => {
    console.error('Failed to load Razorpay script');
  };
  document.body.appendChild(script);
};

// Mock function to create order on backend
const createRazorpayOrder = async (amount: number, currency: string = 'USD') => {
  // In real application, this would be an API call to your backend
  // For demo purposes, we'll generate a mock order ID
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `order_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount * 100, // Convert to paise/cents
        currency,
        status: 'created'
      });
    }, 1000);
  });
};

// ================ MAIN CHECKOUT COMPONENT ================
const CheckoutPage: React.FC = () => {
  // State
  const [step, setStep] = useState<number>(1);
  const [addresses, setAddresses] = useState<ShippingAddress[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<number>(1);
  const [deliveryOption, setDeliveryOption] = useState<string>('express');
  const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
  const [showCardForm, setShowCardForm] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  
  // Razorpay script loaded state
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  
  // New Address Form State
  const [newAddress, setNewAddress] = useState<Partial<ShippingAddress>>({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    type: 'home',
    isDefault: false
  });

  // User Details
  const [userDetails, setUserDetails] = useState({
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  // Order Summary State
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 419.96,
    shipping: 19.99,
    discount: 20.00,
    tax: 33.60,
    total: 453.55,
    itemCount: 4
  });

  // Load Razorpay script on component mount
  useEffect(() => {
    if (!razorpayLoaded) {
      loadRazorpayScript(() => {
        setRazorpayLoaded(true);
        console.log('Razorpay script loaded');
      });
    }
  }, [razorpayLoaded]);

  // Update shipping cost when delivery option changes
  useEffect(() => {
    const selectedShipping = shippingOptions.find(opt => opt.id === deliveryOption);
    if (selectedShipping) {
      setOrderSummary(prev => ({
        ...prev,
        shipping: selectedShipping.price,
        total: prev.subtotal + selectedShipping.price - prev.discount + prev.tax
      }));
    }
  }, [deliveryOption]);

  // Handle Step Navigation
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle Address Selection
  const handleSelectAddress = (id: number) => {
    setSelectedAddress(id);
  };

  // Handle Add New Address
  const handleAddAddress = () => {
    if (newAddress.fullName && newAddress.street && newAddress.city) {
      const newId = Math.max(...addresses.map(a => a.id)) + 1;
      const addressToAdd: ShippingAddress = {
        id: newId,
        fullName: newAddress.fullName!,
        phone: newAddress.phone!,
        street: newAddress.street!,
        city: newAddress.city!,
        state: newAddress.state!,
        zipCode: newAddress.zipCode!,
        country: newAddress.country!,
        type: newAddress.type!,
        isDefault: newAddress.isDefault!
      };
      
      // If setting as default, update all other addresses
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addressToAdd.isDefault ? false : addr.isDefault
      }));
      
      setAddresses([...updatedAddresses, addressToAdd]);
      if (newAddress.isDefault) {
        setSelectedAddress(newId);
      }
      setShowNewAddressForm(false);
      setNewAddress({
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        type: 'home',
        isDefault: false
      });
    }
  };

  // Handle Promo Code Application
  const handleApplyPromo = (code: string) => {
    const promo = promoCodes.find(p => p.code === code);
    if (promo) {
      setAppliedPromo(promo);
      
      // Calculate discount
      let discount = 0;
      if (promo.type === 'percentage') {
        discount = (orderSummary.subtotal * promo.discount) / 100;
      } else {
        discount = promo.discount;
      }
      
      setOrderSummary(prev => ({
        ...prev,
        discount,
        total: prev.subtotal + prev.shipping - discount + prev.tax
      }));
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setOrderSummary(prev => ({
      ...prev,
      discount: 0,
      total: prev.subtotal + prev.shipping + prev.tax
    }));
  };

  // Handle Payment with Razorpay
  const handlePayment = async () => {
    setIsProcessing(true);
    
    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please try again in a moment.');
      setIsProcessing(false);
      return;
    }

    try {
      // Create order on backend
      const orderData: any = await createRazorpayOrder(orderSummary.total, 'USD');
      
      const selectedAddressData = addresses.find(a => a.id === selectedAddress);
      
      // Razorpay options
      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopCart Store',
        description: 'Complete your purchase',
        image: 'https://your-logo-url.com/logo.png',
        order_id: orderData.id,
        handler: function (response: any) {
          // Handle successful payment
          console.log('Payment successful:', response);
          
          // Verify payment on backend (in real app)
          // Then mark payment as complete
          setPaymentComplete(true);
          setIsProcessing(false);
          nextStep();
        },
        prefill: {
          name: selectedAddressData?.fullName || 'Customer',
          email: userDetails.email,
          contact: selectedAddressData?.phone || userDetails.phone
        },
        notes: {
          address: selectedAddressData?.street || ''
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            alert('Payment was cancelled.');
          }
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      nextStep();
    }, 1500);
  };

  // Handle Edit Cart
  const handleEditCart = () => {
    alert('Redirecting to cart page...');
    // In a real app, you would navigate to the cart page
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Shipping Address Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
                <button 
                  onClick={() => setShowNewAddressForm(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus size={18} className="mr-1" />
                  Add New Address
                </button>
              </div>
              
              {/* New Address Form */}
              {showNewAddressForm && (
                <div className="mb-6 p-4 border border-blue-200 rounded-xl bg-blue-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Add New Address</h4>
                    <button 
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New York"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="NY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10001"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setNewAddress({...newAddress, type: 'home'})}
                          className={`flex items-center px-4 py-2 rounded-lg border ${
                            newAddress.type === 'home' 
                              ? 'bg-green-100 text-green-800 border-green-300' 
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          <Home size={16} className="mr-2" />
                          Home
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewAddress({...newAddress, type: 'work'})}
                          className={`flex items-center px-4 py-2 rounded-lg border ${
                            newAddress.type === 'work' 
                              ? 'bg-blue-100 text-blue-800 border-blue-300' 
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          <Briefcase size={16} className="mr-2" />
                          Work
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="setDefault"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="setDefault" className="ml-2 text-sm text-gray-700">
                        Set as default address
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddAddress}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              )}
              
              {/* Address List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(address => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    selected={selectedAddress === address.id}
                    onSelect={handleSelectAddress}
                    onEdit={() => {
                      // Handle edit address
                      console.log('Edit address:', address.id);
                    }}
                  />
                ))}
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-400 mr-2" />
                      <input
                        type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-400 mr-2" />
                      <input
                        type="tel"
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Delivery Options */}
            <DeliveryOptions
              selectedOption={deliveryOption}
              onSelectOption={setDeliveryOption}
            />
            
            {/* Promo Code Section */}
            <PromoCodeInput
              onApplyPromo={handleApplyPromo}
              appliedCode={appliedPromo || undefined}
              onRemovePromo={handleRemovePromo}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h3>
              
              <div className="space-y-4 mb-8">
                {paymentMethods.map(method => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    selected={selectedPayment === method.id}
                    onSelect={setSelectedPayment}
                  />
                ))}
              </div>
              
              {/* Credit Card Form (shown when card is selected) */}
              {selectedPayment === 1 && !showCardForm && (
                <div className="text-center">
                  <button 
                    onClick={() => setShowCardForm(true)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Plus size={18} className="mr-1" />
                    Add New Card
                  </button>
                </div>
              )}
              
              {showCardForm && (
                <CreditCardForm
                  onSubmit={(cardData) => {
                    console.log('Card data:', cardData);
                    setShowCardForm(false);
                  }}
                  onCancel={() => setShowCardForm(false)}
                />
              )}
              
              {/* Security Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center text-gray-600">
                  <Lock size={18} className="mr-3 text-green-500" />
                  <span className="text-sm">Your payment details are secured with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
            
            {/* Order Review */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Review</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Shipping Address</span>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {addresses.find(a => a.id === selectedAddress)?.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addresses.find(a => a.id === selectedAddress)?.street}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Delivery Method</span>
                  <span className="font-medium text-gray-800">
                    {shippingOptions.find(o => o.id === deliveryOption)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-800">
                    {paymentMethods.find(p => p.id === selectedPayment)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Payment Processing */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                {paymentComplete ? (
                  <Check size={40} className="text-green-500" />
                ) : (
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {paymentComplete ? 'Payment Successful!' : 'Processing Payment...'}
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {paymentComplete 
                  ? 'Your payment has been processed successfully. Your order is being prepared for shipment.' 
                  : 'Please wait while we process your payment. Do not refresh or close this page.'}
              </p>
              
              {!paymentComplete && (
                <div className="space-y-2 max-w-xs mx-auto">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">Verifying payment details...</p>
                </div>
              )}
            </div>
            
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">ORD-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium">{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <p className="font-medium text-green-600">Paid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            {/* Order Confirmation */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Check size={40} className="text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h3>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for your purchase! Your order has been confirmed and will be shipped soon.
              </p>
              
              <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-bold">ORD-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-green-600">${orderSummary.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-bold">{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    // Generate invoice download
                    const invoiceContent = `
                      Invoice for Order ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}
                      Date: ${new Date().toLocaleDateString()}
                      Total: $${orderSummary.total.toFixed(2)}
                      Thank you for your purchase!
                    `;
                    const blob = new Blob([invoiceContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'invoice.txt';
                    a.click();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <Download size={18} className="inline mr-2" />
                  Download Invoice
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => alert('Order tracking would be implemented here')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Track Order
                </button>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package size={24} className="text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Order Processing</h4>
                  <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Truck size={24} className="text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Shipment</h4>
                  <p className="text-sm text-gray-600">Your order will be shipped within 24 hours</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <Home size={24} className="text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Delivery</h4>
                  <p className="text-sm text-gray-600">Estimated delivery in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-2">Complete your purchase securely</p>
            </div>
            <div className="flex items-center">
              <Lock size={24} className="text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              {['Shipping', 'Payment', 'Review', 'Confirmation'].map((label, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step > index + 1 
                        ? 'bg-green-500 text-white' 
                        : step === index + 1
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step > index + 1 ? <Check size={20} /> : index + 1}
                    </div>
                    <span className={`ml-2 font-medium hidden sm:inline ${
                      step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 h-1 mx-4">
                      <div className={`h-full rounded-full transition-all duration-500 ${
                        step > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Forms */}
          <div className="lg:w-2/3">
            <div className="transition-all duration-500">
              {renderStepContent()}
            </div>
            
            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button 
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </button>
                )}
                
                <div className="flex-grow"></div>
                
                {step === 1 && (
                  <button 
                    onClick={nextStep}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    Continue to Payment
                    <ChevronRight size={18} className="ml-2" />
                  </button>
                )}
                
                {step === 2 && (
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing || !razorpayLoaded}
                    className={`flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md ${
                      isProcessing || !razorpayLoaded ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : !razorpayLoaded ? (
                      'Loading Payment...'
                    ) : (
                      <>
                        Pay ${orderSummary.total.toFixed(2)}
                        <ChevronRight size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                )}
                
                {step === 3 && paymentComplete && (
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={`flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md ${
                      isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ChevronRight size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          {step < 4 && (
            <div className="lg:w-1/3">
              <OrderSummary
                summary={orderSummary}
                items={orderItems}
                onEditCart={handleEditCart}
              />
              
              {/* Security Badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600">SSL</div>
                  <div className="text-xs text-gray-600 mt-1">Secure</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">256-bit</div>
                  <div className="text-xs text-gray-600 mt-1">Encryption</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">PCI</div>
                  <div className="text-xs text-gray-600 mt-1">Compliant</div>
                </div>
              </div>
              
              {/* Need Help Section */}
              <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h4 className="font-medium text-gray-800 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                    <Globe size={16} className="mr-2" />
                    FAQ & Support
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                    <Phone size={16} className="mr-2" />
                    Contact Customer Service
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                    <Shield size={16} className="mr-2" />
                    Privacy & Security
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Loading Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-800">
                {step === 2 ? 'Processing Payment' : 'Placing Order'}
              </h3>
              <p className="text-gray-600 mt-2">Please wait while we complete your request...</p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="#" className="text-blue-600 hover:underline mx-2">Privacy Policy</a> | 
            <a href="#" className="text-blue-600 hover:underline mx-2">Terms of Service</a>
          </p>
          <p className="mt-2">
            Payment processed securely via 
            <span className="font-bold text-gray-700 ml-1">Razorpay</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CheckoutPage;