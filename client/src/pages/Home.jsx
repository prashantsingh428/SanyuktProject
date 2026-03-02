import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../api';
import {
    Menu, X, ChevronRight, ChevronDown, Star,
    TrendingUp, Users, Award, Shield, Sun,
    Cloud, Droplets, Sparkles, Leaf, Heart,
    Phone, Mail, MapPin, Facebook, Instagram,
    Youtube, Twitter, ArrowRight, Play, Check,
    Clock, Calendar, Gift, CreditCard, Package,
    Zap, Smartphone, Wifi, Radio, BatteryCharging,
    CircleUser, Hash, Wallet, Search, Filter,
    ShoppingCart, Heart as HeartIcon, Eye, Grid3x3, List, SlidersHorizontal, Truck, RotateCcw, Shield as ShieldIcon, Plus
} from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageErrors, setImageErrors] = useState({});

    // Mobile recharge form state
    const [mobileNumber, setMobileNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [amount, setAmount] = useState('');
    const [showPlanPopup, setShowPlanPopup] = useState(false);
    const [showMockPaymentPopup, setShowMockPaymentPopup] = useState(false);
    const [mockOrderDetails, setMockOrderDetails] = useState(null);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [searchAmount, setSearchAmount] = useState('');
    const [planTab, setPlanTab] = useState('Daily');

    // E-commerce state
    const [viewMode, setViewMode] = useState('grid');
    const [wishlist, setWishlist] = useState([]);
    const [showQuickView, setShowQuickView] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCartNotification, setShowCartNotification] = useState(false);
    const [addedToCartProduct, setAddedToCartProduct] = useState('');

    // Hero slides data
    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
            title: "Welcome to Sanyukt Parivaar & Rich Life Company",
            subtitle: "A Trusted & Fast-Growing Multi-Level Marketing Company",
            description: "Sanyukt Parivaar & Rich Life Company is a people-driven direct selling organization committed to empowering individuals with sustainable income opportunities."
        },
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
            title: "Build Your Financial Freedom",
            subtitle: "Join India's Fastest Growing MLM Company",
            description: "Experience the power of network marketing with our proven business model."
        },
        {
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
            title: "Quality Products, Unlimited Potential",
            subtitle: "Skin Care • Hair Care • Wellness Products",
            description: "Our range of high-quality, daily-use products ensures repeat business."
        }
    ];

    // About section image
    const aboutImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";

    // Team images
    const teamImages = [
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
    ];

    // Category images
    const skinCareImage = "https://images.pexels.com/photos/6621360/pexels-photo-6621360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop";
    const hairCareImage = "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop";

    // Product Images from Pexels
    const productImages = [
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        "https://images.pexels.com/photos/5946066/pexels-photo-5946066.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        "https://images.pexels.com/photos/6955177/pexels-photo-6955177.jpeg",
        "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
    ];

    // Business opportunity image
    const businessImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";

    // Training image
    const trainingImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";

    // Mobile operators list with inline SVG logos (no external URL needed)
    const AIRTEL_LOGO = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><text x='100' y='52' font-family='Arial,sans-serif' font-size='36' font-weight='900' fill='%23ED1C24' text-anchor='middle'>airtel</text></svg>`;
    const JIO_LOGO = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><text x='100' y='55' font-family='Arial,sans-serif' font-size='44' font-weight='900' fill='%230066CC' text-anchor='middle'>Jio</text></svg>`;
    const VI_LOGO = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><text x='90' y='55' font-family='Arial,sans-serif' font-size='44' font-weight='900' fill='%23E11D48' text-anchor='middle'>Vi</text><text x='148' y='55' font-family='Arial,sans-serif' font-size='20' font-weight='700' fill='%23FBBF24' text-anchor='middle'>!</text></svg>`;
    const BSNL_LOGO = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><text x='100' y='52' font-family='Arial,sans-serif' font-size='32' font-weight='900' fill='%23FF6600' text-anchor='middle'>BSNL</text></svg>`;

    const operators = [
        {
            id: 'airtel',
            name: 'Airtel',
            logo: AIRTEL_LOGO,
            tagline: '5G Ready',
            bgColor: 'bg-red-50'
        },
        {
            id: 'jio',
            name: 'Jio',
            logo: JIO_LOGO,
            tagline: 'True 5G',
            bgColor: 'bg-blue-50'
        },
        {
            id: 'vi',
            name: 'Vi',
            logo: VI_LOGO,
            tagline: 'Best Value',
            bgColor: 'bg-purple-50'
        },
        {
            id: 'bsnl',
            name: 'BSNL',
            logo: BSNL_LOGO,
            tagline: 'Pan-India',
            bgColor: 'bg-orange-50'
        }
    ];

    // Recharge plans
    const plans = [
        { amount: 10, data: '0.1GB', validity: '1 Day', talktime: '₹7.65', description: 'Daily Data Pack', benefits: '0.1GB/day • Local/STD calls @2.5p/sec' },
        { amount: 19, data: '1GB', validity: '1 Day', talktime: '₹16.65', description: 'Daily Data Pack', benefits: '1GB/day • Unlimited calls • 100 SMS/day' },
        { amount: 29, data: '1GB', validity: '1 Day', talktime: '₹26.65', description: 'Daily Pack', benefits: '1GB data • Unlimited calls • 100 SMS' },
        { amount: 48, data: '3GB', validity: '1 Day', talktime: '₹45.65', description: 'Daily Pack', benefits: '3GB • Unlimited calls • 100 SMS' },
        { amount: 79, data: '1GB', validity: '28 Days', talktime: '₹76.65', description: 'Monthly Data Pack', benefits: '1GB • Unlimited calls • 300 SMS', popular: true },
        { amount: 99, data: '1GB', validity: '28 Days', talktime: '₹96.65', description: 'Monthly Data Pack', benefits: '1GB/day • Unlimited calls • 100 SMS/day', popular: true },
        { amount: 149, data: '2GB', validity: '28 Days', talktime: '₹146.65', description: 'Monthly Pack', benefits: '2GB/day • Unlimited calls • 100 SMS/day' },
        { amount: 199, data: '3GB', validity: '28 Days', talktime: '₹196.65', description: 'Monthly Pack', benefits: '3GB/day • Unlimited calls • 100 SMS/day', popular: true },
        { amount: 299, data: '6GB', validity: '56 Days', talktime: '₹296.65', description: 'Smart Pack', benefits: '6GB • Unlimited calls • 3000 SMS', popular: true },
        { amount: 399, data: '12GB', validity: '84 Days', talktime: '₹396.65', description: 'Smart Pack', benefits: '12GB • Unlimited calls • 3600 SMS', popular: true },
        { amount: 499, data: '24GB', validity: '84 Days', talktime: '₹496.65', description: 'Premium Pack', benefits: '24GB • Unlimited calls • 3600 SMS • Zee5', popular: true },
        { amount: 599, data: '36GB', validity: '84 Days', talktime: '₹596.65', description: 'Premium Pack', benefits: '36GB • Unlimited calls • 3600 SMS • Sony LIV' },
        { amount: 699, data: '48GB', validity: '84 Days', talktime: '₹696.65', description: 'Premium Pack', benefits: '48GB • Unlimited calls • 3600 SMS • Amazon Prime' },
        { amount: 799, data: '75GB', validity: '84 Days', talktime: '₹796.65', description: 'Premium Pack', benefits: '75GB • Unlimited calls • 3600 SMS • All Apps' },
        { amount: 999, data: '120GB', validity: '84 Days', talktime: '₹996.65', description: 'Ultimate Pack', benefits: '120GB • Unlimited calls • 3600 SMS • All Apps' }
    ];

    // Products data (keeping original order as featured)
    const products = [
        {
            name: "Herbal Sunscreen Lotion",
            category: "Skin Care",
            mrp: "₹450",
            dp: "₹400",
            bv: "100",
            slug: "herbal-sunscreen-lotion",
            image: productImages[0],
            fallbackIcon: "🧴",
            altText: "Herbal Sunscreen Lotion",
            rating: 4.8,
            reviews: 124,
            discount: "11%"
        },
        {
            name: "Papaya Soap",
            category: "Skin Care",
            mrp: "₹120",
            dp: "₹100",
            bv: "25",
            slug: "papaya-soap",
            image: productImages[1],
            fallbackIcon: "🧼",
            altText: "Papaya Soap",
            rating: 4.5,
            reviews: 89,
            discount: "17%"
        },
        {
            name: "Herbal Hair Oil",
            category: "Hair Care",
            mrp: "₹350",
            dp: "₹300",
            bv: "75",
            slug: "herbal-hair-oil",
            image: productImages[2],
            fallbackIcon: "🧴",
            altText: "Herbal Hair Oil",
            rating: 4.7,
            reviews: 156,
            discount: "14%"
        },
        {
            name: "Hair Shampoo",
            category: "Hair Care",
            mrp: "₹280",
            dp: "₹240",
            bv: "60",
            slug: "hair-shampoo",
            image: productImages[3],
            fallbackIcon: "🧴",
            altText: "Hair Shampoo",
            rating: 4.6,
            reviews: 112,
            discount: "14%"
        }
    ];

    const whyChoosePoints = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Ethical Business Model",
            text: "A transparent, legal, and sustainable direct selling platform trusted by thousands.",
            color: "bg-green-50 text-[#0A7A2F]",
            shadow: "hover:shadow-green-500/10"
        },
        {
            icon: <Package className="w-6 h-6" />,
            title: "Premium Products",
            text: "High-quality lifestyle and wellness products designed for repeat satisfaction.",
            color: "bg-orange-50 text-[#F7931E]",
            shadow: "hover:shadow-orange-500/10"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Financial Freedom",
            text: "Unlock unlimited earning potential through a proven, reward-driven compensation plan.",
            color: "bg-blue-50 text-blue-600",
            shadow: "hover:shadow-blue-500/10"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Professional Training",
            text: "Continuous mentorship and leadership development to build your business skills.",
            color: "bg-purple-50 text-purple-600",
            shadow: "hover:shadow-purple-500/10"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Family Ecosystem",
            text: "A strong 'Parivaar' support system providing guidance at every single step.",
            color: "bg-red-50 text-red-600",
            shadow: "hover:shadow-red-500/10"
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Sustainable Vision",
            text: "A long-term commitment to community prosperity and personal development.",
            color: "bg-emerald-50 text-emerald-600",
            shadow: "hover:shadow-emerald-500/10"
        }
    ];

    const businessHighlights = [
        "Low investment, high growth potential",
        "Work from anywhere",
        "Earn part-time or full-time"
    ];

    const supportItems = [
        "Product knowledge training",
        "Business & leadership development",
        "Online and offline seminars"
    ];

    const newsItems = [
        { date: "15 Mar 2025", title: "New Product Launch: Herbal Sunscreen Lotion", slug: "new-product-launch", category: "Product" },
        { date: "10 Mar 2025", title: "National Seminar in Mumbai on April 5-6", slug: "national-seminar", category: "Event" },
        { date: "05 Mar 2025", title: "Sanyukt Parivaar crosses 10,000 distributors", slug: "crosses-10000", category: "Achievement" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        // Preload images
        const imageUrls = [
            ...heroSlides.map(s => s.image),
            aboutImage,
            ...teamImages,
            skinCareImage,
            hairCareImage,
            ...productImages,
            businessImage,
            trainingImage
        ];

        let loadedCount = 0;
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === imageUrls.length) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === imageUrls.length) {
                    setImagesLoaded(true);
                }
            };
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Filter plans based on search amount
    useEffect(() => {
        if (searchAmount) {
            const searchValue = parseInt(searchAmount);
            if (!isNaN(searchValue)) {
                const filtered = plans.filter(plan =>
                    plan.amount >= searchValue - 20 && plan.amount <= searchValue + 100
                ).sort((a, b) => a.amount - b.amount);
                setFilteredPlans(filtered);
            } else {
                setFilteredPlans(plans);
            }
        } else {
            setFilteredPlans(plans);
        }
    }, [searchAmount]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleRecharge = async (e) => {
        e.preventDefault();
        if (mobileNumber && operator && amount) {
            const loadScript = (src) => {
                return new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = src;
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });
            };

            try {
                const toastId = toast.loading("Initiating secure payment...");

                // 1. Create Order on backend
                const { data: orderData } = await api.post('/recharge/create-order', {
                    amount: Number(amount),
                    type: 'mobile',
                    operator,
                    rechargeNumber: mobileNumber
                });

                if (!orderData.success) {
                    toast.error("Failed to initiate order", { id: toastId });
                    return;
                }

                toast.dismiss(toastId);

                // Check if backend returned a mocked order
                if (orderData.order.id && orderData.order.id.startsWith('order_mock_')) {
                    // Open our custom simulated payment modal
                    setMockOrderDetails({
                        orderId: orderData.order.id,
                        transactionId: orderData.transactionId,
                        amount: orderData.order.amount / 100 // Convert paise back to rupees
                    });
                    setShowMockPaymentPopup(true);
                    return;
                }

                // 2. Open Razorpay Checkout Widget
                const options = {
                    key: "rzp_test_your_key_here", // Replace with your actual frontend Razorpay Key ID
                    amount: orderData.order.amount,
                    currency: "INR",
                    name: "Sanyukt Parivaar",
                    description: `MOBILE Recharge for ${mobileNumber}`,
                    image: "https://your-logo-url.com/logo.png",
                    order_id: orderData.order.id,
                    handler: async function (response) {
                        try {
                            const verifyToast = toast.loading("Verifying payment...");

                            // 3. Verify Payment
                            const { data: verifyData } = await api.post('/recharge/verify-payment', {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                transactionId: orderData.transactionId
                            });

                            if (verifyData.success) {
                                toast.success("Recharge successful!", { id: verifyToast });
                                setMobileNumber('');
                                setOperator('');
                                setAmount('');
                                setSearchAmount('');
                                setShowPlanPopup(false);
                            } else {
                                toast.error("Payment verification failed", { id: verifyToast });
                            }
                        } catch (err) {
                            console.error(err);
                            toast.error("Error verifying payment");
                        }
                    },
                    prefill: {
                        name: "Sanyukt Member",
                        email: "info@sanyuktparivaar.com",
                        contact: "+91 96281 45157"
                    },
                    theme: {
                        color: "#0A7A2F"
                    }
                };

                const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!isLoaded) {
                    toast.error("Razorpay SDK failed to load. Are you online?");
                    return;
                }

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    toast.error(`Payment Failed: ${response.error.description}`);
                });
                rzp1.open();

            } catch (error) {
                console.error("Recharge Error:", error);
                toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
            }
        } else {
            toast.error('Please fill all fields');
        }
    };

    const handleMockPayment = async (method) => {
        setShowMockPaymentPopup(false);
        const verifyToast = toast.loading(`Processing ${method} payment...`);

        try {
            // Simulate successful payment verify
            const { data: verifyData } = await api.post('/recharge/verify-payment', {
                razorpay_order_id: mockOrderDetails.orderId,
                razorpay_payment_id: `pay_mock_${method}_${Date.now()}`,
                razorpay_signature: "mock_signature",
                transactionId: mockOrderDetails.transactionId
            });

            if (verifyData.success) {
                toast.success(`Recharge successful! paid via ${method}`, { id: verifyToast });
                setMobileNumber('');
                setOperator('');
                setAmount('');
                setSearchAmount('');
                setShowPlanPopup(false);
            } else {
                toast.error("Payment verification failed", { id: verifyToast });
            }
        } catch (error) {
            console.error(error);
            toast.error("Mock payment failed", { id: verifyToast });
        }
    };

    const selectPlan = (planAmount) => {
        setAmount(planAmount);
        setSearchAmount(planAmount.toString());
        setShowPlanPopup(false);
    };

    const openPlanPopup = () => {
        setShowPlanPopup(true);
        if (amount) {
            setSearchAmount(amount);
        }
    };

    const handleImageError = (productName) => {
        setImageErrors(prev => ({ ...prev, [productName]: true }));
    };

    const toggleWishlist = (productName) => {
        setWishlist(prev =>
            prev.includes(productName)
                ? prev.filter(p => p !== productName)
                : [...prev, productName]
        );
    };

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        setAddedToCartProduct(product.name);
        setShowCartNotification(true);
        setTimeout(() => setShowCartNotification(false), 3000);
    };

    const calculateDiscount = (mrp, dp) => {
        const mrpValue = parseInt(mrp.replace('₹', ''));
        const dpValue = parseInt(dp.replace('₹', ''));
        const discount = ((mrpValue - dpValue) / mrpValue * 100).toFixed(0);
        return discount;
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-3 h-3 fill-current text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-3 h-3 text-gray-300" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
            }
        }
        return stars;
    };

    if (!imagesLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAF5]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#0A7A2F] border-t-[#F7931E] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#0A7A2F] font-medium">Loading Sanyukt Parivaar...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* HERO SECTION */}
            <section className="relative h-[600px] md:h-[750px] overflow-hidden bg-[#0A1A0F]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A0F]/90 via-[#0A1A0F]/60 to-transparent z-10"></div>
                        <img
                            src={heroSlides[currentSlide].image}
                            alt={`Slide ${currentSlide + 1}`}
                            className="w-full h-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="container mx-auto px-6">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="max-w-3xl"
                                >
                                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white tracking-tight">
                                        {heroSlides[currentSlide].title}
                                    </h1>
                                    <h2 className="text-xl md:text-2xl text-[#F7931E] font-semibold mb-6">
                                        {heroSlides[currentSlide].subtitle}
                                    </h2>
                                    <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl font-light">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleNavigation('/register')}
                                            className="px-8 py-4 bg-[#F7931E] text-white font-bold rounded-full hover:bg-[#e07d0b] transition-all shadow-xl shadow-orange-900/20 flex items-center space-x-3 text-base"
                                        >
                                            <span>Join Our Family</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleNavigation('/contact')}
                                            className="px-8 py-4 border-2 border-white/30 backdrop-blur-md text-white font-bold rounded-full hover:bg-white hover:text-[#0A7A2F] transition-all text-base"
                                        >
                                            Contact Us
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-[#F7931E]' : 'bg-white/30 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </section>

            {/* ABOUT US SECTION */}
            <section className="py-12 md:py-16 bg-[#F8FAF5]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0A7A2F] inline-block relative pb-3">
                            Who We Are
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#F7931E]"></span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div className="space-y-3 text-gray-700 leading-relaxed order-2 md:order-1">
                            <h3 className="text-lg md:text-xl font-semibold text-[#2F7A32] mb-3">
                                Sanyukt Parivaar & Rich Life Company
                            </h3>
                            <p className="text-sm">
                                We are a direct Selling company founded by business professionals. At Ishaavia Global Marketing, we create dynamic entrepreneurs through the promotion of high quality wellness products, personal care products, Home care products.
                            </p>
                            <p className="text-sm">
                                Sanyukt Parivaar & Rich Life Company was founded with a clear vision  to create financial independence through ethical direct selling. We believe in growing together.
                            </p>
                            <div className="flex items-center space-x-4 pt-3">
                                <div className="flex -space-x-2">
                                    {teamImages.map((img, idx) => (
                                        <img key={idx} src={img} alt="Team" className="w-8 h-8 rounded-full border-2 border-white" />
                                    ))}
                                </div>
                                <div className="text-xs">
                                    <span className="font-bold text-[#0A7A2F]">5000+</span>
                                    <span className="text-gray-600 ml-1">Happy Families</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative order-1 md:order-2">
                            <img src={aboutImage} alt="About Us" className="rounded-lg shadow-xl w-full h-[300px] md:h-[350px] object-cover" />
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Shield className="w-5 h-5 text-[#0A7A2F]" />
                                </div>
                                <div className="flex flex-col pr-2">
                                    <span className="text-xl font-black text-[#0A7A2F] leading-none">100%</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Certified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Why Choose Us Section - REDESIGNED PROFESSIONAL UI */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#F7931E] font-bold text-sm tracking-widest uppercase mb-3 block"
                        >
                            The Sanyukt Advantage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-[#0A7A2F] mb-6 leading-tight"
                        >
                            Why Choose Sanyukt Parivaar?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 text-lg leading-relaxed"
                        >
                            Empowering individuals through a unified vision of entrepreneurship,
                            ethical commerce, and lifelong community growth.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyChoosePoints.map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={`group p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-500 ${point.shadow}`}
                            >
                                <div className={`w-14 h-14 ${point.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-current/5`}>
                                    {point.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0A7A2F] transition-colors">
                                    {point.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {point.text}
                                </p>
                                <div className="mt-6 flex items-center text-[#0A7A2F] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span>Learn More</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTS SECTION - WITHOUT SORTING OPTIONS */}
            < section className="py-16 bg-gradient-to-b from-[#F8FAF5] to-white" >
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="text-[#F7931E] font-semibold text-sm tracking-wider uppercase mb-2 block">
                            Shop Our Collection
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0A7A2F] mb-4">
                            Popular Products
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our range of high-quality, natural products loved by thousands
                        </p>
                    </div>

                    {/* Products Display - No Filters or Sorting */}
                    <div className="flex flex-col">
                        {/* View Toggle and Results Count */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{products.length}</span> products
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-[#0A7A2F] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-[#0A7A2F] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        <motion.div
                            layout
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
                                    : 'space-y-6'
                            }
                        >
                            <AnimatePresence>
                                {products.map((product, index) => {
                                    const discount = calculateDiscount(product.mrp, product.dp);
                                    const isInWishlist = wishlist.includes(product.name);

                                    return viewMode === 'grid' ? (
                                        // Grid View
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            whileHover={{ y: -10 }}
                                            key={product.slug}
                                            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500"
                                        >
                                            {/* Product Image Container */}
                                            <div className="relative h-72 overflow-hidden bg-gray-50 flex items-center justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

                                                {!imageErrors[product.name] ? (
                                                    <motion.img
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.6 }}
                                                        src={product.image}
                                                        alt={product.altText}
                                                        className="w-full h-full object-cover"
                                                        onError={() => handleImageError(product.name)}
                                                    />
                                                ) : (
                                                    <div className="text-8xl grayscale group-hover:grayscale-0 transition-all duration-500">
                                                        {product.fallbackIcon}
                                                    </div>
                                                )}

                                                {/* Badges */}
                                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                    {parseInt(discount) >= 10 && (
                                                        <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-red-500/20">
                                                            Save {discount}%
                                                        </span>
                                                    )}
                                                    <span className="bg-[#0A7A2F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20">
                                                        {product.category}
                                                    </span>
                                                </div>

                                                {/* Add to Cart Button (Top Right) */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }}
                                                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all bg-white/80 backdrop-blur-md text-[#0A7A2F] hover:bg-[#0A7A2F] hover:text-white group-hover:scale-110`}
                                                    title="Add to Cart"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Product Details */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-1 mb-3">
                                                    {renderStars(product.rating)}
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                        {product.reviews} Reviews
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0A7A2F] transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <div className="flex items-end gap-3 mb-6">
                                                    <span className="text-2xl font-black text-[#0A7A2F] leading-none">{product.dp}</span>
                                                    <span className="text-sm text-gray-300 line-through mb-1">MRP {product.mrp}</span>
                                                    <div className="ml-auto bg-orange-50 px-2 py-1 rounded-md">
                                                        <span className="text-[10px] font-bold text-[#F7931E]">BV {product.bv}</span>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {/* Buy Now Logic */ }}
                                                    className="w-full bg-[#F7931E] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#e07d0b] transition-all shadow-xl shadow-gray-200 group-hover:shadow-orange-900/10"
                                                >
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Buy Now
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        // List View
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            key={product.slug}
                                            className="group bg-white rounded-3xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all duration-500"
                                        >
                                            <div className="w-full sm:w-48 h-48 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
                                                {!imageErrors[product.name] ? (
                                                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                                                ) : (
                                                    <span className="text-6xl">{product.fallbackIcon}</span>
                                                )}
                                                <div className="absolute top-2 left-2 bg-[#F7931E] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                                                    {product.category}
                                                </div>
                                            </div>

                                            <div className="flex-1 py-2 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        {renderStars(product.rating)}
                                                        <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
                                                    </div>
                                                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{product.name}</h3>
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <span className="text-3xl font-black text-[#0A7A2F]">{product.dp}</span>
                                                        <span className="text-sm text-gray-300 line-through">MRP {product.mrp}</span>
                                                        <span className="text-xs font-bold text-[#F7931E] bg-orange-50 px-2 py-1 rounded-lg">BV {product.bv}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free Delivery</span>
                                                        <span className="flex items-center gap-1"><ShieldIcon className="w-3 h-3" /> 1 Year Warranty</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 mt-6">
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => {/* Buy Now Logic */ }}
                                                        className="flex-1 bg-[#F7931E] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#e07d0b] transition-all"
                                                    >
                                                        <ShoppingCart className="w-4 h-4" /> Buy Now
                                                    </motion.button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart(product);
                                                        }}
                                                        className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all bg-white border-gray-100 text-[#0A7A2F] hover:bg-[#0A7A2F] hover:text-white hover:border-[#0A7A2F]`}
                                                        title="Add to Cart"
                                                    >
                                                        <Plus className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Quick View Modal */}
                {
                    showQuickView && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-[#0A7A2F]">Quick View</h3>
                                        <button
                                            onClick={() => setShowQuickView(null)}
                                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                                            {!imageErrors[showQuickView.name] ? (
                                                <img
                                                    src={showQuickView.image}
                                                    alt={showQuickView.altText}
                                                    className="w-full h-64 object-contain"
                                                />
                                            ) : (
                                                <div className="w-full h-64 flex items-center justify-center">
                                                    <span className="text-8xl">{showQuickView.fallbackIcon}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-800 mb-2">{showQuickView.name}</h4>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-3xl font-bold text-[#0A7A2F]">{showQuickView.dp}</span>
                                                <span className="text-lg text-gray-400 line-through">{showQuickView.mrp}</span>
                                                <span className="text-sm font-semibold text-[#F7931E]">BV: {showQuickView.bv}</span>
                                            </div>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(showQuickView.rating)}
                                                </div>
                                                <span className="text-sm text-gray-500">({showQuickView.reviews} reviews)</span>
                                            </div>

                                            <p className="text-gray-600 mb-6">
                                                Experience the natural goodness of our {showQuickView.name.toLowerCase()}. Made with pure herbal ingredients for best results.
                                            </p>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Check className="w-4 h-4 text-[#0A7A2F]" />
                                                    100% Natural Ingredients
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Check className="w-4 h-4 text-[#0A7A2F]" />
                                                    Dermatologically Tested
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Check className="w-4 h-4 text-[#0A7A2F]" />
                                                    No Harmful Chemicals
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    addToCart(showQuickView);
                                                    setShowQuickView(null);
                                                }}
                                                className="w-full bg-[#F7931E] text-white py-3 rounded-xl hover:bg-[#e07d0b] transition-colors flex items-center justify-center gap-2 font-semibold"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Cart Notification */}
                {
                    showCartNotification && (
                        <div className="fixed bottom-4 right-4 z-50 animate-fadeInUp">
                            <div className="bg-[#0A7A2F] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                                <Check className="w-5 h-5" />
                                <span>{addedToCartProduct} added to cart!</span>
                            </div>
                        </div>
                    )
                }
            </section >

            {/* Business Opportunity Section */}
            < section className="py-12 md:py-16 bg-gradient-to-r from-[#0A7A2F] to-[#2F7A32] text-white" >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-3">
                            <h2 className="text-xl md:text-2xl font-bold">
                                A Powerful Business Opportunity
                            </h2>
                            <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                                Sanyukt Parivaar & Rich Life Company offers a proven MLM business plan that allows individuals to earn through product sales, team building, and leadership development.
                            </p>
                            <div className="space-y-1">
                                {businessHighlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Check className="w-3 h-3 text-[#F7931E] flex-shrink-0" />
                                        <span className="text-xs">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleNavigation('/opportunity')}
                                className="inline-block px-4 py-2 bg-[#F7931E] text-white text-xs font-semibold rounded-lg hover:bg-[#e07d0b] transform hover:-translate-y-1 transition-all"
                            >
                                View Opportunities
                            </button>
                        </div>
                        <div className="relative">
                            <img src={businessImage} alt="Business Opportunity" className="rounded-lg shadow-2xl w-full h-48 md:h-64 object-cover" />
                            <div className="absolute -top-2 -right-2 bg-[#F7931E] p-3 rounded-lg shadow-xl">
                                <div className="text-base font-bold">Unlimited</div>
                                <div className="text-xs">Income Potential</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Mid CTA Strip */}
            < section className="py-8 bg-[#F7931E]" >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <h3 className="text-base md:text-lg font-bold text-white text-center md:text-left">
                            We Are One of the Fastest Growing Direct Selling Companies
                        </h3>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className="px-4 py-2 bg-white text-[#F7931E] font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all shadow-md whitespace-nowrap text-xs"
                        >
                            CONTACT NOW
                        </button>
                    </div>
                </div>
            </section >

            {/* Training & Support Section */}
            < section className="py-12 md:py-16 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-3 order-2 md:order-1">
                            <h2 className="text-xl md:text-2xl font-bold text-[#0A7A2F] relative inline-block pb-1">
                                Training & Support System
                                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#F7931E]"></span>
                            </h2>
                            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                                We believe success comes with knowledge and guidance. That's why we provide structured training programs and continuous mentorship.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {supportItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-[#F7931E] rounded-full"></div>
                                        <span className="text-xs text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleNavigation('/training')}
                                className="inline-block text-[#0A7A2F] text-xs font-medium hover:text-[#F7931E] transition-colors"
                            >
                                Learn More <ArrowRight className="w-3 h-3 inline ml-1" />
                            </button>
                        </div>
                        <div className="relative order-1 md:order-2">
                            <img src={trainingImage} alt="Training" className="rounded-lg shadow-xl w-full h-48 md:h-64 object-cover" />
                            <div className="absolute -bottom-3 -left-3 bg-white p-3 rounded-lg shadow-md">
                                <div className="flex items-center space-x-2">
                                    <Play className="w-5 h-5 text-[#F7931E]" />
                                    <div>
                                        <div className="font-bold text-xs">Leadership Programs</div>
                                        <div className="text-xs text-gray-600">Top 10 in India</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Latest News & Updates */}
            < section className="py-12 md:py-16 bg-[#F8FAF5]" >
                <div className="container mx-auto px-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center text-[#0A7A2F] mb-2">
                        Latest News & Updates
                    </h2>
                    <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-xs">
                        Stay updated with the latest company announcements and success stories.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                        {newsItems.map((news, index) => (
                            <div key={index} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold px-1.5 py-0.5 bg-[#F7931E] text-white rounded-full">
                                            {news.category}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {news.date}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2 text-xs">{news.title}</h4>
                                    <button
                                        onClick={() => handleNavigation(`/news/${news.slug}`)}
                                        className="text-[#0A7A2F] text-xs font-medium hover:text-[#F7931E] transition-colors inline-flex items-center"
                                    >
                                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CONTACT SECTION */}
            < section className="py-16 bg-white" >
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="text-[#F7931E] font-semibold text-sm tracking-wider uppercase mb-2 block">Get In Touch</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A7A2F] mb-3">Contact Us</h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-sm">Have questions about joining our family or our products? We're here to help you every step of the way.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* LEFT — Contact info cards */}
                        <div className="space-y-5">
                            {/* Info cards */}
                            {[
                                {
                                    icon: Phone,
                                    title: 'Call Us',
                                    lines: ['+91 96281 45157'],
                                    sub: 'Mon–Sat, 9 AM – 7 PM',
                                    color: 'bg-green-50 text-[#0A7A2F]',
                                },
                                {
                                    icon: Mail,
                                    title: 'Email Us',
                                    lines: ['info@sanyuktparivaar.com'],
                                    sub: 'We reply within 24 hours',
                                    color: 'bg-orange-50 text-[#F7931E]',
                                },
                                {
                                    icon: MapPin,
                                    title: 'Visit Us',
                                    lines: ['123, Green Park Colony, Sector 5,', 'New Delhi – 110001, India'],
                                    sub: 'Head Office',
                                    color: 'bg-blue-50 text-blue-600',
                                },
                                {
                                    icon: Clock,
                                    title: 'Business Hours',
                                    lines: ['Monday – Saturday: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 4:00 PM'],
                                    sub: 'IST (Indian Standard Time)',
                                    color: 'bg-purple-50 text-purple-600',
                                },
                            ].map(({ icon: Icon, title, lines, sub, color }, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 bg-[#F8FAF5] rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 mb-1">{title}</div>
                                        {lines.map((l, j) => <div key={j} className="text-sm text-gray-700">{l}</div>)}
                                        <div className="text-xs text-gray-400 mt-1">{sub}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Social links */}
                            <div className="p-5 bg-[#0A7A2F] rounded-2xl">
                                <div className="text-white font-bold mb-3">Follow Us</div>
                                <div className="flex gap-3">
                                    {[
                                        { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                                        { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                                        { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
                                        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                                    ].map(({ icon: Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all"
                                            title={label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Quick Contact Form */}
                        <div className="bg-[#F8FAF5] rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Send a Message</h3>
                            <p className="text-gray-400 text-sm mb-6">Fill in your details and we'll get back to you.</p>

                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 mb-1 block">First Name</label>
                                        <input type="text" placeholder="Ravi" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Last Name</label>
                                        <input type="text" placeholder="Sharma" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                                    <input type="email" placeholder="ravi@example.com" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Enquiry Type</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition text-gray-700">
                                        <option>Product Enquiry</option>
                                        <option>Business Opportunity</option>
                                        <option>Recharge Support</option>
                                        <option>Franchise / Distributor</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Message</label>
                                    <textarea rows={4} placeholder="Write your message here..." className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-[#0A7A2F] outline-none transition resize-none" />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#0A7A2F] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#086326] transition-all"
                                >
                                    <Mail className="w-4 h-4" />
                                    Send Message
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </section >

            {/* Final Trust Section */}
            < section className="py-12 md:py-16 bg-[#E8F5E9]" >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#0A7A2F]">
                        Together We Grow, Together We Prosper
                    </h2>
                    <p className="text-sm mb-4 max-w-2xl mx-auto text-gray-600">
                        At Sanyukt Parivaar & Rich Life Company, we don't just build income — we build people, confidence, and a better future.
                    </p>
                    <button
                        onClick={() => handleNavigation('/register')}
                        className="inline-block px-4 py-2 bg-[#F7931E] text-white font-semibold rounded-lg hover:bg-[#e07d0b] transform hover:-translate-y-1 transition-all shadow-md text-sm"
                    >
                        Join Sanyukt Parivaar Today
                    </button>
                </div>
            </section >

        </div >
    );
};

export default HomePage;