// src/components/NewPassword.tsx
import React, { useState } from 'react';

interface NewPasswordProps {
  onPasswordReset: (password: string) => void;
  onBack: () => void;
}

const NewPassword: React.FC<NewPasswordProps> = ({ onPasswordReset, onBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
    if (!/\d/.test(password)) errors.push('one number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('one special character');
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrors({ 
        password: `Password must contain: ${passwordErrors.join(', ')}` 
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setErrors({});
    onPasswordReset(password);
  };

  const passwordStrength = () => {
    if (!password) return { score: 0, label: '', color: 'bg-gray-200' };
    
    const errors = validatePassword(password);
    const score = 5 - errors.length;
    
    if (score <= 1) return { score: 1, label: 'Very Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 2, label: 'Weak', color: 'bg-orange-500' };
    if (score === 3) return { score: 3, label: 'Fair', color: 'bg-yellow-500' };
    if (score === 4) return { score: 4, label: 'Good', color: 'bg-blue-500' };
    return { score: 5, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: 'var(--gray-color)' }}>
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({});
            }}
            className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent pr-10"
            style={{ borderColor: errors.password ? '#ef4444' : 'var(--gray-color)' }}
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--gray-color)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--gray-color)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--gray-color)' }}>Password Strength:</span>
              <span className="text-sm font-medium" style={{ color: strength.score >= 4 ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
                {strength.label}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background-alt)' }}>
              <div 
                className="h-full transition-all duration-300"
                style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.score >= 4 ? 'var(--sky-blue)' : 'var(--gray-color)' }}
              />
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: 'var(--gray-color)' }}>
          Confirm New Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors({});
          }}
          className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
          style={{ borderColor: errors.confirmPassword ? '#ef4444' : 'var(--gray-color)' }}
          placeholder="Confirm new password"
          required
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background-alt)' }}>
        <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--gray-color)' }}>Password Requirements:</h4>
        <ul className="text-sm space-y-1" style={{ color: 'var(--gray-color)' }}>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: password.length >= 8 ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={password.length >= 8 ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            At least 8 characters
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: /[a-z]/.test(password) ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={/[a-z]/.test(password) ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            One lowercase letter
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: /[A-Z]/.test(password) ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={/[A-Z]/.test(password) ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            One uppercase letter
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: /\d/.test(password) ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={/\d/.test(password) ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            One number
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: /[!@#$%^&*]/.test(password) ? 'var(--sky-blue)' : 'var(--gray-color)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={/[!@#$%^&*]/.test(password) ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            One special character (!@#$%^&*)
          </li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 transition-colors"
          style={{ borderColor: 'var(--gray-color)', color: 'var(--gray-color)' }}
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--sky-blue)', color: 'var(--white-color)' }}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default NewPassword;