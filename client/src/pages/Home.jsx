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
            description: "Sanyukt Parivaar & Rich Life Company is a people-driven direct selling organization committed to empowering individuals with sustainable income opportunities. Through our transparent MLM business model and high-quality products, we help ordinary people build extraordinary futures."
        },
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
            title: "Welcome to Sanyukt Parivaar & Rich Life Company",
            subtitle: "A Trusted & Fast-Growing Multi-Level Marketing Company",
            description: "Sanyukt Parivaar & Rich Life Company is a people-driven direct selling organization committed to empowering individuals with sustainable income opportunities. Through our transparent MLM business model and high-quality products, we help ordinary people build extraordinary futures."
        },
        {
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
            title: "Welcome to Sanyukt Parivaar & Rich Life Company",
            subtitle: "A Trusted & Fast-Growing Multi-Level Marketing Company",
            description: "Sanyukt Parivaar & Rich Life Company is a people-driven direct selling organization committed to empowering individuals with sustainable income opportunities. Through our transparent MLM business model and high-quality products, we help ordinary people build extraordinary futures."
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
        },
        {
            name: "Combo & Value Packs",
            category: "Combo Offer",
            mrp: "₹1200",
            dp: "₹999",
            bv: "250",
            slug: "combo-value-packs",
            image: "data:image/jpeg;base64,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",
            fallbackIcon: "🎁",
            altText: "Combo & Value Packs",
            rating: 5.0,
            reviews: 45,
            discount: "17%"
        },
    ];

    const whyChoosePoints = [
        { icon: <Shield className="w-5 h-5" />, text: "Transparent & legal MLM business model" },
        { icon: <Package className="w-5 h-5" />, text: "High-quality, daily-use products" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "Unlimited income potential" },
        { icon: <Users className="w-5 h-5" />, text: "Regular training & leadership programs" },
        { icon: <Heart className="w-5 h-5" />, text: "Strong support system" },
        { icon: <Award className="w-5 h-5" />, text: "Long-term vision with stable growth" }
    ];

    const businessHighlights = [
        "Low investment, high growth potential",
        "Work from anywhere",
        "Earn part-time or full-time",
        "Build a stable and scalable income"
    ];

    const supportItems = [
        "Product knowledge training",
        "Business & leadership development",
        "Online and offline seminars",
        "Marketing & growth strategies"
    ];

    const newsItems = [
        {
            date: "15 Mar 2025", title: "New Product Launch: Herbal Sunscreen Lotion",
            slug: "new-product-launch", category: "Product", readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80",
            author: "Priya Sharma", authorAvatar: "P", timeAgo: "2 hours ago"
        },
        {
            date: "10 Mar 2025", title: "National Seminar in Mumbai on April 5-6",
            slug: "national-seminar", category: "Event", readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
            author: "Rajesh Kumar", authorAvatar: "R", timeAgo: "5 hours ago"
        },
        {
            date: "05 Mar 2025", title: "Sanyukt Parivaar crosses 10,000 distributors",
            slug: "crosses-10000", category: "Achievement", readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
            author: "Anjali Singh", authorAvatar: "A", timeAgo: "1 day ago"
        }
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

    const carouselRef = React.useRef(null);
    const scroll = (direction) => {
        const container = carouselRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * 0.8;
            const targetScroll = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
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
                                    className="max-w-4xl mx-auto text-center"
                                >
                                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white tracking-tight">
                                        {heroSlides[currentSlide].title}
                                    </h1>
                                    <h2 className="text-xl md:text-2xl text-[#F7931E] font-semibold mb-6">
                                        {heroSlides[currentSlide].subtitle}
                                    </h2>
                                    <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
                                        {heroSlides[currentSlide].description}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleNavigation('/register')}
                                            className="px-8 py-4 bg-[#F7931E] text-white font-bold rounded-full hover:bg-[#e07d0b] transition-all shadow-xl shadow-orange-900/20 flex items-center space-x-3 text-base"
                                        >
                                            <span>Join Now</span>
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
                                Sanyukt Parivaar & Rich Life Company was founded with a clear vision — to create financial independence through ethical direct selling. We believe in growing together as one family, where every member gets equal opportunity, proper training, and long-term support.
                            </p>
                            <p className="text-sm">
                                Our company focuses on personal development, leadership growth, and community success while promoting reliable lifestyle, wellness, and personal care products.
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


            {/* Why Choose Us Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0A7A2F] mb-2">
                        Why Choose Sanyukt Parivaar?
                    </h2>
                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-xs md:text-sm">
                        Discover what makes us the preferred choice for thousands of entrepreneurs
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {whyChoosePoints.map((point, index) => (
                            <div
                                key={index}
                                className="group p-3 bg-[#F8FAF5] rounded-lg hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-8 h-8 bg-[#0A7A2F] rounded-lg flex items-center justify-center text-white mb-2 group-hover:bg-[#F7931E] transition-colors">
                                    {point.icon}
                                </div>
                                <p className="text-gray-700 text-xs">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTS SECTION - SLIDING CAROUSEL */}
            <section className="py-20 bg-gradient-to-b from-[#F8FAF5] to-white relative overflow-hidden" >
                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-[#F7931E] font-bold text-sm tracking-widest uppercase mb-3 block">
                                Discover Quality
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#0A7A2F] mb-4">
                                Featured Products
                            </h2>
                            <p className="text-gray-500 text-lg">
                                Our best-selling products are trusted by customers and partners for their quality and effectiveness.
                            </p>
                        </div>

                        {/* Custom Navigation */}
                        <div className="flex gap-3 mb-2">
                            <button
                                onClick={() => scroll('left')}
                                className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0A7A2F] hover:text-[#0A7A2F] hover:bg-green-50 transition-all duration-300"
                            >
                                <ChevronDown className="w-6 h-6 rotate-90" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-14 h-14 rounded-full bg-[#0A7A2F] flex items-center justify-center text-white shadow-xl shadow-green-900/20 hover:bg-[#086326] hover:scale-105 transition-all duration-300"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Products Carousel */}
                    <div
                        ref={carouselRef}
                        className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => {
                            const discount = calculateDiscount(product.mrp, product.dp);

                            return (
                                <div
                                    key={product.slug}
                                    className="min-w-[280px] md:min-w-[340px] snap-center"
                                >
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group relative"
                                    >
                                        {/* Product Image Container */}
                                        <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

                                            {!imageErrors[product.name] ? (
                                                <motion.img
                                                    whileHover={{ scale: 1.15 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    src={product.image}
                                                    alt={product.altText}
                                                    className="w-full h-full object-cover"
                                                    onError={() => handleImageError(product.name)}
                                                />
                                            ) : (
                                                <div className="text-9xl grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                                                    {product.fallbackIcon}
                                                </div>
                                            )}

                                            {/* Top Utility Buttons */}
                                            <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                                                {parseInt(discount) > 0 && (
                                                    <span className="bg-red-500 text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">
                                                        -{discount}%
                                                    </span>
                                                )}
                                                <span className="bg-[#0A7A2F] text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20">
                                                    {product.category}
                                                </span>
                                            </div>

                                            {/* Action Float Area */}
                                            <div className="absolute bottom-6 right-6 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }}
                                                    className="w-16 h-16 rounded-full bg-white text-[#0A7A2F] shadow-2xl flex items-center justify-center hover:bg-[#0A7A2F] hover:text-white transition-colors"
                                                >
                                                    <ShoppingCart className="w-7 h-7" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-1.5 mb-3">
                                                {renderStars(product.rating)}
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">
                                                    {product.reviews} Reviews
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-[#0A7A2F] transition-colors">
                                                {product.name}
                                            </h3>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-black text-[#0A7A2F]">
                                                        {product.dp}
                                                    </span>
                                                    <span className="text-gray-400 text-xs line-through font-medium">
                                                        MRP {product.mrp}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="bg-orange-50 text-[#F7931E] px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-orange-100">
                                                        BV {product.bv}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleNavigation('/checkout')}
                                                    className="w-full py-4 bg-[#F7931E] text-white font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn shadow-lg shadow-orange-100"
                                                >
                                                    <span>Instant Buy</span>
                                                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-40 -right-20 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-50 z-0"></div>
                <div className="absolute bottom-40 -left-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>

                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </section>


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

            {/* Business Opportunity Section */}
            <section className="py-12 md:py-16 bg-gradient-to-r from-[#0A7A2F] to-[#2F7A32] text-white" >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-3">
                            <h2 className="text-xl md:text-2xl font-bold">
                                A Powerful Business Opportunity
                            </h2>
                            <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                                Sanyukt Parivaar & Rich Life Company offers a proven MLM business plan that allows individuals to earn through product sales, team building, and leadership development. Whether you are a student, professional, homemaker, or entrepreneur — this opportunity is open to all.
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
            </section>

            {/* Mid CTA Strip */}
            <section className="py-8 bg-[#F7931E]" >
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
            </section>

            {/* Training & Support Section */}
            <section className="py-12 md:py-16 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-3 order-2 md:order-1">
                            <h2 className="text-xl md:text-2xl font-bold text-[#0A7A2F] relative inline-block pb-1">
                                Training & Support System
                                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#F7931E]"></span>
                            </h2>
                            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                                We believe success comes with knowledge and guidance. That’s why we provide structured training programs, online resources, offline seminars, and continuous mentorship to help every partner grow confidently.
                            </p>
                            <h3 className="text-sm font-bold text-[#0A7A2F] mt-4 mb-2">Support Includes</h3>
                            <div className="grid grid-cols-1 gap-2">
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
            </section>

            {/* Latest News & Updates */}
            <section className="py-16 md:py-24 bg-[#F8FAF5]" >
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0A7A2F] mb-3">
                        Latest News & Updates
                    </h2>
                    <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-sm">
                        Stay updated with the latest company announcements, seminar schedules, product launches, and success stories from our growing Sanyukt Parivaar family.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {newsItems.map((news, index) => (
                            <div key={index} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer" onClick={() => handleNavigation(`/news/${news.slug}`)}>
                                {/* Cover Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Category + Read Time */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-extrabold tracking-widest text-[#F7931E] uppercase">
                                            {news.category}
                                        </span>
                                        <span className="text-gray-300 text-xs">•</span>
                                        <span className="text-xs text-gray-400">{news.readTime}</span>
                                    </div>
                                    {/* Title */}
                                    <h4 className="font-bold text-gray-900 text-lg mb-5 leading-snug group-hover:text-[#0A7A2F] transition-colors duration-300 line-clamp-2">
                                        {news.title}
                                    </h4>
                                    {/* Author Row */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#0A7A2F] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {news.authorAvatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#F7931E] leading-none">{news.author}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{news.timeAgo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-16 bg-white" >
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
                                    lines: ['Sanyukt Parivaar & Rich Life Company,  Near Main Business Hub, India'],
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
            </section>

            {/* Final Trust Section */}
            <section className="py-12 md:py-16 bg-[#E8F5E9]" >
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
            </section>

        </div>
    );
};

export default HomePage;