import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, ArrowLeft, Clock, RefreshCw } from 'lucide-react';
import api from '../api';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const { email, mobile } = location.state || {};

    useEffect(() => {
        if (!email && !mobile) {
            navigate('/register');
        }
    }, [email, mobile, navigate]);

    // Timer for resend OTP
    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto focus next input
        if (element.value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const pastedOtp = pastedData.split('');
            const newOtp = [...otp];
            pastedOtp.forEach((value, index) => {
                if (index < 6) newOtp[index] = value;
            });
            setOtp(newOtp);

            // Focus last filled input
            const lastIndex = Math.min(pastedOtp.length, 5);
            document.getElementById(`otp-${lastIndex}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/verify-otp', {
                email,
                otp: otpString
            });

            setSuccess('OTP verified successfully! Redirecting to login...');

            // Clear OTP from storage
            localStorage.removeItem('registrationEmail');
            localStorage.removeItem('registrationMobile');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
            // Clear OTP inputs
            setOtp(['', '', '', '', '', '']);
            document.getElementById('otp-0').focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        setResendLoading(true);
        setError('');

        try {
            await api.post('/resend-otp', { email });
            setSuccess('New OTP sent successfully!');
            setTimer(60);
            setCanResend(false);
            // Clear OTP inputs
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    if (!email && !mobile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/register')}
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Registration</span>
                </button>

                {/* Main OTP Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header with Green Gradient */}
                    <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Mail className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Verify Your Email
                        </h2>
                        <p className="text-green-100 mt-2 text-sm md:text-base">
                            We've sent a verification code to
                        </p>
                        <p className="text-white font-semibold mt-1">
                            {email || mobile}
                        </p>
                    </div>

                    {/* OTP Form */}
                    <div className="p-6 md:p-8">
                        {/* Success Message */}
                        {success && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                {success}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* OTP Input Fields */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-700 mb-4">
                                    Enter 6-Digit OTP
                                </label>
                                <div className="flex gap-2 justify-between">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={data}
                                            onChange={(e) => handleChange(e.target, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300"
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Timer and Resend */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span className="text-sm">
                                        {canResend ? 'You can resend now' : `Resend in ${timer}s`}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={!canResend || resendLoading}
                                    className={`flex items-center text-sm font-semibold transition-all duration-300 ${canResend && !resendLoading
                                        ? 'text-green-600 hover:text-green-700 hover:underline'
                                        : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <RefreshCw className={`h-4 w-4 mr-1 ${resendLoading ? 'animate-spin' : ''}`} />
                                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                                </button>
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-900'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Verifying...
                                    </div>
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>

                            {/* Help Text */}
                            <p className="text-center text-sm text-gray-500 mt-6">
                                Didn't receive the code? Check your spam folder or{' '}
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={!canResend || resendLoading}
                                    className="text-green-600 hover:underline font-semibold disabled:text-gray-400 disabled:no-underline"
                                >
                                    click here to resend
                                </button>
                            </p>

                            {/* Contact Support */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-500">
                                    Need help?{' '}
                                    <a href="mailto:support@example.com" className="text-green-600 hover:underline font-semibold">
                                        Contact Support
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 For your security, this OTP will expire in 5 minutes
                    </p>
                </div>
            </div>

        </div>
    );
};

export default VerifyOTP;