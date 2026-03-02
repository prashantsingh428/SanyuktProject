import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronDown, User, Lock, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import api from '../api';

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successData, setSuccessData] = useState(null); // { email, role }
    const [countdown, setCountdown] = useState(3);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log('Login attempt:', formData);

            const response = await api.post('/login', {
                email: formData.email,
                password: formData.password
            });

            console.log('Login response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                const userRole = response.data.user?.role || 'user';
                setSuccessData({ email: formData.email, role: userRole });

                // Countdown then navigate
                let count = 3;
                const timer = setInterval(() => {
                    count -= 1;
                    setCountdown(count);
                    if (count === 0) {
                        clearInterval(timer);
                        navigate(userRole === 'admin' ? '/admin' : '/');
                    }
                }, 1000);
            }

        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                // Server responded with error
                setError(error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
                // Request made but no response
                setError('No response from server. Please try again.');
            } else {
                // Something else happened
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 relative overflow-hidden">

            {/* ===== SUCCESS POPUP MODAL ===== */}
            {successData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[3px]">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden border border-gray-100"
                        style={{ animation: 'slideUp 0.32s cubic-bezier(0.34,1.4,0.64,1)' }}
                    >
                        {/* Thin top green accent */}
                        <div className="h-1 bg-[#0A7A2F] w-full" />

                        <div className="px-8 pt-8 pb-7 text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                    <CheckCircle className="w-7 h-7 text-[#0A7A2F]" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-[22px] font-bold text-gray-900 mb-1">Signed in successfully</h2>
                            <p className="text-gray-400 text-sm mb-6">Welcome back to Sanyukt Parivaar</p>

                            {/* Account info card */}
                            <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between mb-6 text-left">
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Signed in as</p>
                                    <p className="text-gray-800 font-semibold text-sm truncate">{successData.email}</p>
                                </div>
                                <span className={`ml-3 flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${successData.role === 'admin'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-green-100 text-[#0A7A2F]'
                                    }`}>
                                    {successData.role === 'admin' ? 'Admin' : 'Member'}
                                </span>
                            </div>

                            {/* Redirect info + progress */}
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                <span>Redirecting to {successData.role === 'admin' ? 'Admin Panel' : 'Dashboard'}</span>
                                <span className="font-bold text-[#0A7A2F] tabular-nums">{countdown}s</span>
                            </div>
                            <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#0A7A2F] rounded-full"
                                    style={{ width: `${((3 - countdown) / 3) * 100}%`, transition: 'width 1s linear' }}
                                />
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes slideUp {
                            from { opacity: 0; transform: translateY(20px) scale(0.96); }
                            to   { opacity: 1; transform: translateY(0)    scale(1);    }
                        }
                    `}</style>
                </div>
            )}


            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-8 items-center min-h-[80vh]">
                    {/* Left Side - Welcome Message */}
                    <div className="flex-1 text-center lg:text-left animate-slide-right">
                        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-600 text-base max-w-md mx-auto lg:mx-0">
                            Sign in to access your account and manage your business
                        </p>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto lg:mx-0">
                                {error}
                            </div>
                        )}

                        {/* Role Info */}
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto lg:mx-0">
                            <p className="text-xs text-green-700">
                                <span className="font-bold">Note:</span> Admin users will be redirected to Admin Panel
                            </p>
                        </div>

                        {/* Decorative Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <p className="text-xl font-bold text-green-600">10K+</p>
                                <p className="text-sm text-gray-600">Active Users</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <p className="text-xl font-bold text-green-600">50+</p>
                                <p className="text-sm text-gray-600">Countries</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="flex-1 max-w-md w-full animate-slide-left">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                            {/* Header - Solid Green */}
                            <div className="bg-green-700 px-6 md:px-8 py-6 text-center">
                                <h2 className="text-xl md:text-2xl font-bold text-white animate-slide-in">
                                    User Login
                                </h2>
                                <div className="flex items-center justify-center space-x-2 text-green-100 mt-2">
                                    <Home className="h-4 w-4" />
                                    <Link to="/" className="text-sm hover:underline">Home</Link>
                                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                                    <span className="text-sm font-semibold">User Login</span>
                                </div>
                            </div>

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                <div className="space-y-6">
                                    {/* Email Input */}
                                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email address"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-300"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember Me and Forgot Password */}
                                    <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 text-green-600 rounded focus:ring-green-500 transition-transform duration-200 group-hover:scale-110"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                                                Remember me
                                            </span>
                                        </label>

                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-green-600 hover:text-green-800 hover:underline transition-all duration-300 hover:scale-105"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>

                                    {/* Sign In Button */}
                                    <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full group relative px-8 py-4 bg-green-700 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-green-800 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                        >
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>SIGNING IN...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>SIGN IN</span>
                                                        <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Register Link */}
                                    <div className="text-center pt-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                                        <p className="text-gray-600 text-sm">
                                            Don't have an account?{' '}
                                            <Link
                                                to="/register"
                                                className="text-green-600 hover:text-green-800 font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
                                            >
                                                Register Now
                                            </Link>
                                        </p>
                                    </div>

                                    {/* Demo Credentials */}
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 text-center">
                                            <span className="font-bold text-green-600">Demo Credentials:</span><br />
                                            <span className="font-medium">User:</span> user@example.com / password123<br />
                                            <span className="font-medium">Admin:</span> admin@example.com / admin123
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserLogin;