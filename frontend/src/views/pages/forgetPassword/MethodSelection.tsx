// src/components/MethodSelection.tsx
import React, { useState } from 'react';

interface MethodSelectionProps {
  onMethodSelect: (method: 'email' | 'mobile', value: string, countryCode?: string) => void;
}

const countryCodes = [
  { code: '+1', name: 'US', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
];

const MethodSelection: React.FC<MethodSelectionProps> = ({ onMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<{ email?: string; mobile?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMethod === 'email') {
      if (!validateEmail(email)) {
        setErrors({ email: 'Please enter a valid email address' });
        return;
      }
      onMethodSelect('email', email);
    } else {
      if (!validateMobile(mobile)) {
        setErrors({ mobile: 'Please enter a valid 10-digit mobile number' });
        return;
      }
      onMethodSelect('mobile', mobile, countryCode);
    }
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Method Selection Tabs */}
      <div className="flex border-b" style={{ borderColor: 'var(--background-alt)' }}>
        <button
          type="button"
          className="flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors"
          style={selectedMethod === 'email'
            ? { color: 'var(--sky-blue)', borderBottom: '2px solid var(--sky-blue)' }
            : { color: 'var(--gray-color)' }}
          onClick={() => setSelectedMethod('email')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email</span>
          </div>
        </button>
        <button
          type="button"
          className="flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors"
          style={selectedMethod === 'mobile'
            ? { color: 'var(--sky-blue)', borderBottom: '2px solid var(--sky-blue)' }
            : { color: 'var(--gray-color)' }}
          onClick={() => setSelectedMethod('mobile')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Mobile</span>
          </div>
        </button>
      </div>

      {/* Email Input */}
      {selectedMethod === 'email' && (
        <div className="space-y-2 animate-fadeIn">
          <label className="block text-sm font-medium" style={{ color: 'var(--gray-color)' }}>
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--gray-color)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
              className="block w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors"
              style={{ borderColor: errors.email ? '#ef4444' : 'var(--gray-color)' }}
              placeholder="you@example.com"
              required
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      )}

      {/* Mobile Input */}
      {selectedMethod === 'mobile' && (
        <div className="space-y-2 animate-fadeIn">
          <label className="block text-sm font-medium" style={{ color: 'var(--gray-color)' }}>
            Mobile Number
          </label>
          <div className="flex space-x-3">
            <div className="relative flex-shrink-0">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="block w-full py-3 pl-3 pr-8 border rounded-lg focus:ring-2 focus:border-transparent appearance-none bg-white"
                style={{ borderColor: 'var(--gray-color)' }}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--gray-color)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setMobile(value);
                  if (errors.mobile) setErrors({});
                }}
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors"
                style={{ borderColor: errors.mobile ? '#ef4444' : 'var(--gray-color)' }}
                placeholder="123 456 7890"
                required
              />
              {errors.mobile && (
                <p className="text-sm text-red-600 mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
        style={{ backgroundColor: 'var(--sky-blue)', color: 'var(--white-color)' }}
      >
        Send Verification Code
      </button>

      <p className="text-sm text-center" style={{ color: 'var(--gray-color)' }}>
        We'll send a verification code to {selectedMethod === 'email' ? 'your email' : 'your mobile number'}
      </p>
    </form>
  );
};

export default MethodSelection;