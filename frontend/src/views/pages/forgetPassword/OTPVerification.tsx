// src/components/OTPVerification.tsx
import React, { useState, useRef, useEffect } from 'react';

interface OTPVerificationProps {
  method: 'email' | 'mobile' | null;
  destination: string;
  countryCode?: string;
  onVerify: () => void;
  onResendOTP: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  method,
  destination,
  countryCode,
  onVerify,
  onResendOTP,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0 && isResendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isResendDisabled]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedData.forEach((char, idx) => {
        if (index + idx < 6) {
          newOtp[index + idx] = char;
        }
      });
      setOtp(newOtp);
      
      // Focus next empty input
      const nextIndex = newOtp.findIndex((val, idx) => idx >= index && val === '');
      if (nextIndex !== -1 && nextIndex < 6) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        inputRefs.current[5]?.blur();
      }
      return;
    }

    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all fields are filled
      if (newOtp.every(digit => digit !== '') && index === 5) {
        handleSubmit();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      // In a real app, verify OTP with backend here
      console.log('Verifying OTP:', otpString);
      onVerify();
    }
  };

  const handleResend = () => {
    onResendOTP();
    setTimer(30);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          {method === 'email' ? (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <p className="text-gray-600">
          Enter the 6-digit code sent to
          <br />
          <span className="font-semibold text-gray-800">
            {method === 'mobile' && countryCode ? `${countryCode} ` : ''}
            {destination}
          </span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="space-y-4">
        <div className="flex justify-center space-x-2 md:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={otp.join('').length !== 6}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5
              ${otp.join('').length === 6
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            Verify OTP
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Timer and Resend */}
      <div className="text-center">
        {isResendDisabled ? (
          <p className="text-gray-500">
            Resend code in <span className="font-semibold">{timer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Resend OTP
          </button>
        )}
      </div>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800 font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Method Selection
      </button>
    </div>
  );
};

export default OTPVerification;