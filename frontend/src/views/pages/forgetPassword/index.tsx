// src/components/ForgotPasswordFlow.tsx
import React, { useState } from 'react';
import MethodSelection from './MethodSelection';
import OTPVerification from './OTPVerification';
import NewPassword from './NewPassword';

export type RecoveryMethod = 'email' | 'mobile' | null;
export type FlowStep = 'method-selection' | 'otp-verification' | 'new-password';

interface UserInfo {
    method: RecoveryMethod;
    email?: string;
    mobile?: string;
    countryCode?: string;
}

const ForgotPasswordFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<FlowStep>('method-selection');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const handleMethodSelect = (method: RecoveryMethod, value: string, countryCode?: string) => {
        const info: UserInfo = { method };
        if (method === 'email') {
            info.email = value;
        } else if (method === 'mobile') {
            info.mobile = value;
            info.countryCode = countryCode;
        }
        setUserInfo(info);
        setCurrentStep('otp-verification');
    };

    const handleOTPVerify = () => {
        setCurrentStep('new-password');
    };

    const handleResendOTP = () => {
        // In a real app, this would trigger a new OTP
        console.log('Resending OTP to:', userInfo);
        alert(`OTP resent to ${userInfo?.method === 'email' ? userInfo.email : userInfo?.mobile}`);
    };

    const handlePasswordReset = (newPassword: string) => {
        // In a real app, this would send the new password to your backend
        console.log('Password reset for:', userInfo, 'New password:', newPassword);
        alert('Password reset successful! You can now login with your new password.');

        // Reset flow after success
        setTimeout(() => {
            setCurrentStep('method-selection');
            setUserInfo(null);
        }, 2000);
    };

    const handleBack = () => {
        if (currentStep === 'otp-verification') {
            setCurrentStep('method-selection');
        } else if (currentStep === 'new-password') {
            setCurrentStep('otp-verification');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            {currentStep === 'method-selection' && 'Reset Password'}
                            {currentStep === 'otp-verification' && 'Verify OTP'}
                            {currentStep === 'new-password' && 'Set New Password'}
                        </h2>
                        <p className="text-gray-600">
                            {currentStep === 'method-selection' && 'Select how you want to reset your password'}
                            {currentStep === 'otp-verification' && `Enter the OTP sent to ${userInfo?.method === 'email' ? userInfo.email : userInfo?.countryCode + userInfo?.mobile}`}
                            {currentStep === 'new-password' && 'Create a strong new password'}
                        </p>
                    </div>

                    {currentStep === 'method-selection' && (
                        <MethodSelection onMethodSelect={handleMethodSelect} />
                    )}

                    {currentStep === 'otp-verification' && userInfo && (
                        <OTPVerification
                            method={userInfo.method}
                            destination={userInfo.method === 'email' ? userInfo.email! : userInfo.mobile!}
                            countryCode={userInfo.countryCode}
                            onVerify={handleOTPVerify}
                            onResendOTP={handleResendOTP}
                            onBack={handleBack}
                        />
                    )}

                    {currentStep === 'new-password' && (
                        <NewPassword
                            onPasswordReset={handlePasswordReset}
                            onBack={handleBack}
                        />
                    )}

                    {/* Progress Indicator */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-4">
                            {['method-selection', 'otp-verification', 'new-password'].map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep === step
                                                    ? 'bg-blue-600 text-white'
                                                    : step === 'new-password' && currentStep === 'new-password'
                                                        ? 'bg-green-500 text-white'
                                                        : ['otp-verification', 'new-password'].includes(currentStep) &&
                                                            ['method-selection', 'otp-verification'].includes(step)
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <span className="text-xs mt-2 text-gray-600 capitalize">
                                            {step.split('-').join(' ')}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <div className={`h-1 w-12 ${index === 0 && currentStep !== 'method-selection' ? 'bg-green-500' : 'bg-gray-200'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordFlow;