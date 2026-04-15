import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { addressData } from '../data/addressData';
import { registerUser } from '../services/api/auth';
import { ButtonLoader } from '../components/Loader';
import toast from 'react-hot-toast';

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sponsorId: '',
        sponsorName: '',
        userName: '',
        fatherName: '',
        position: '',
        gender: '',
        mobile: '',
        email: '',
        shippingAddress: '',
        state: '',
        district: '',
        city: '',
        password: '',
        assemblyArea: '',
        block: '',
        villageCouncil: '',
        village: '',
        packageType: 'none',
    });

    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profileImage] = useState(null);

    const referralSponsorId = useMemo(() => String(searchParams.get('ref') || '').trim().toUpperCase(), [searchParams]);
    const referralPosition = useMemo(() => {
        const rawPosition = String(searchParams.get('pos') || '').trim().toLowerCase();
        if (rawPosition === 'left') return 'Left';
        if (rawPosition === 'right') return 'Right';
        return '';
    }, [searchParams]);

    const sponsorLocked = Boolean(referralSponsorId);
    const positionLocked = Boolean(referralPosition);

    const states = Object.keys(addressData).sort();

    const getDistrictsForState = (state) => {
        try {
            if (!state) return [];
            const stateData = addressData[state];
            return stateData ? Object.keys(stateData) : [];
        } catch (fetchError) {
            console.error('Error getting districts:', fetchError);
            return [];
        }
    };

    const districts = getDistrictsForState(formData.state);

    useEffect(() => {
        if (!referralSponsorId && !referralPosition) return;

        setFormData((prev) => ({
            ...prev,
            sponsorId: referralSponsorId || prev.sponsorId,
            position: referralPosition || prev.position,
        }));
    }, [referralPosition, referralSponsorId]);

    useEffect(() => {
        const fetchSponsorName = async () => {
            if (formData.sponsorId.length >= 3) {
                try {
                    const res = await api.get(`/sponsor/${formData.sponsorId}`);
                    if (res.data.name) {
                        setFormData((prev) => ({ ...prev, sponsorName: res.data.name }));
                    }
                } catch {
                    setFormData((prev) => ({ ...prev, sponsorName: '' }));
                }
            } else {
                setFormData((prev) => ({ ...prev, sponsorName: '' }));
            }
        };

        const timeoutId = setTimeout(fetchSponsorName, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.sponsorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'sponsorId' && sponsorLocked) return;
        if (name === 'position' && positionLocked) return;

        if (name === 'state') {
            setFormData((prev) => ({
                ...prev,
                state: value,
                district: '',
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!agreed) {
            setError('Please accept the terms and conditions');
            return false;
        }

        const requiredFields = [
            { field: 'sponsorId', message: 'Sponsor Id' },
            { field: 'userName', message: 'Name' },
            { field: 'fatherName', message: 'Father Name' },
            { field: 'position', message: 'Position' },
            { field: 'gender', message: 'Gender' },
            { field: 'mobile', message: 'Mobile Number' },
            { field: 'email', message: 'Email' },
            { field: 'password', message: 'Password' },
            { field: 'shippingAddress', message: 'Shipping Address' },
            { field: 'state', message: 'State' },
            { field: 'district', message: 'District' },
            { field: 'assemblyArea', message: 'Assembly' },
            { field: 'block', message: 'Block' },
            { field: 'villageCouncil', message: 'Village Council' },
            { field: 'village', message: 'Village' }
        ];

        for (const item of requiredFields) {
            if (!formData[item.field] || formData[item.field].trim() === '') {
                setError(`Please enter ${item.message}`);
                return false;
            }
        }

        /* Plan validation removed as per user request to allow None/Free option */

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return false;
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be at least 8 characters and contain at least one letter, one number, and one special symbol (@$!%*?&)');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const isPaidPlan = formData.packageType !== 'none';
            let paymentDetails = {};

            if (isPaidPlan) {
                const resScript = await loadRazorpay();
                if (!resScript) {
                    setError('Razorpay SDK failed to load. Please check your internet connection.');
                    setLoading(false);
                    return;
                }

                // 1. Create order on backend
                const planPrices = { '599': 599, '1299': 1299, '2699': 2699 };
                const amount = planPrices[formData.packageType];

                const { data: orderData } = await api.post('/orders/razorpay-order', {
                    amount,
                    isPackage: true,
                    packageType: formData.packageType
                });

                if (!orderData || !orderData.id) {
                    throw new Error('Failed to create payment order');
                }

                const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
                
                // 2. Open Razorpay
                const options = {
                    key: razorpayKeyId,
                    amount: orderData.amount,
                    currency: "INR",
                    name: "Sanyukt Parivaar",
                    description: `Package Registration - ${formData.packageType}`,
                    order_id: orderData.id,
                    handler: async (response) => {
                        try {
                            const payload = { 
                                ...formData,
                                paymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                                paymentMethod: 'razorpay'
                            };
                            await completeRegistration(payload);
                        } catch (err) {
                            setError(err.message || 'Payment verification failed');
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: formData.userName,
                        email: formData.email,
                        contact: formData.mobile
                    },
                    theme: { color: "#C8A96A" },
                    modal: {
                        ondismiss: () => {
                            setLoading(false);
                            setError('Payment cancelled by user');
                        }
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                return; // Wait for handler
            }

            // If free plan, just register
            await completeRegistration(formData);

        } catch (submitError) {
            setError(submitError.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    const completeRegistration = async (payload) => {
        try {
            if (profileImage) payload.profileImage = profileImage;
            const data = await registerUser(payload);

            if (data) {
                setSuccess('Registration successful! Redirecting to verification...');
                localStorage.setItem('registrationEmail', formData.email);
                localStorage.setItem('registrationMobile', formData.mobile);

                setTimeout(() => {
                    navigate('/verify-otp', {
                        state: {
                            email: formData.email,
                            mobile: formData.mobile
                        }
                    });
                }, 1500);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="bg-[#0D0D0D] font-sans text-[#F5E6C8] selection:bg-[#C8A96A]/30 py-6 md:py-10 px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C8A96A]/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-4xl mx-auto luxury-box z-10 relative mt-4">
                <div className="bg-[#121212] py-6 md:py-8 px-8 text-center border-b border-[#C8A96A]/30">
                    <h2 className="text-2xl md:text-3xl font-serif font-black mb-1 text-[#C8A96A] uppercase tracking-tight">Registration <span className="text-[#F5E6C8]">Form</span></h2>
                    <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#C8A96A]/60">Join our Sanyukt Parivaar today</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-5">
                    {(sponsorLocked || positionLocked) && (
                        <div className="rounded-xl border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-4 py-3 text-sm font-bold text-[#F5E6C8]">
                            Referral link applied
                            <div className="mt-1 text-[12px] font-semibold text-[#F5E6C8]/80">
                                Sponsor: {referralSponsorId || 'Auto detected'}{referralPosition ? ` | Preferred position: ${referralPosition}` : ''}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-500 rounded-xl text-sm font-black animate-slide-down">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] rounded-xl text-sm font-black animate-slide-down">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Sponsor Id <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="sponsorId"
                                value={formData.sponsorId}
                                onChange={handleChange}
                                readOnly={sponsorLocked}
                                placeholder="Enter Sponsor Id"
                                className={`w-full border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30 outline-none transition-all font-bold ${sponsorLocked ? 'bg-[#1A1A1A] cursor-not-allowed' : 'bg-[#0D0D0D]'}`}
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input md:col-span-2">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Select Your Plan <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { id: 'none', name: 'No Plan', price: '₹0', pv: '0 PV', bv: '0 BV', isFree: true },
                                    { id: '599', name: 'Plan A', price: '₹599', pv: '0.25 PV', bv: '250 BV' },
                                    { id: '1299', name: 'Plan B', price: '₹1299', pv: '0.5 PV', bv: '500 BV' },
                                    { id: '2699', name: 'Plan C', price: '₹2699', pv: '1 PV', bv: '1000 BV' },
                                ].map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setFormData(prev => ({ ...prev, packageType: plan.id }))}
                                        className={`cursor-pointer rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] active:scale-95 ${
                                            formData.packageType === plan.id
                                                ? 'border-[#C8A96A] bg-[#C8A96A]/10 shadow-[0_0_20px_rgba(200,169,106,0.15)]'
                                                : 'border-[#C8A96A]/20 bg-[#1A1A1A]/50 hover:border-[#C8A96A]/40'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${formData.packageType === plan.id ? 'text-[#C8A96A]' : 'text-[#F5E6C8]/40'}`}>
                                                {plan.name}
                                            </span>
                                            {formData.packageType === plan.id && (
                                                <div className="w-4 h-4 rounded-full bg-[#C8A96A] flex items-center justify-center">
                                                    <svg className="w-2.5 h-2.5 text-[#0D0D0D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xl font-serif font-black text-[#F5E6C8]">{plan.price}</div>
                                        <div className="mt-2 flex gap-3 text-[10px] font-bold text-[#C8A96A]/80 uppercase tracking-tighter">
                                            <span>{plan.pv}</span>
                                            <span className="opacity-30">|</span>
                                            <span>{plan.bv}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Sponsor Name</label>
                            <input
                                type="text"
                                name="sponsorName"
                                value={formData.sponsorName}
                                readOnly
                                placeholder="Auto-fetched Sponsor Name"
                                className="w-full bg-[#1A1A1A] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8]/60 outline-none cursor-not-allowed font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Position <span className="text-red-500">*</span></label>
                            <select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                disabled={positionLocked}
                                className={`w-full border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold appearance-none ${positionLocked ? 'bg-[#1A1A1A] cursor-not-allowed' : 'bg-[#0D0D0D]'}`}
                            >
                                <option value="" className="bg-[#0D0D0D] text-[#F5E6C8]">- Select Position -</option>
                                <option value="Left" className="bg-[#0D0D0D] text-[#F5E6C8]">Left</option>
                                <option value="Right" className="bg-[#0D0D0D] text-[#F5E6C8]">Right</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Father Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                placeholder="Enter Father Name"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Gender <span className="text-red-500">*</span></label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold appearance-none"
                            >
                                <option value="">- Select Gender -</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Mobile <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                                maxLength="10"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Email ID <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input md:col-span-2">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Password <span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input md:col-span-2">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Shipping Address <span className="text-red-500">*</span></label>
                            <p className="text-[11px] text-gray-500 italic mb-2 font-bold">Note: Enter complete shipping address with city, pincode, and state.</p>
                            <textarea
                                name="shippingAddress"
                                value={formData.shippingAddress}
                                onChange={handleChange}
                                placeholder="Enter Shipping Address"
                                rows="3"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">State <span className="text-red-500">*</span></label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold appearance-none"
                            >
                                <option value="">- Select State -</option>
                                {states.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">District <span className="text-red-500">*</span></label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                disabled={!formData.state}
                                className={`w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold appearance-none ${!formData.state ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <option value="">- Select District -</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Assembly <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="assemblyArea"
                                value={formData.assemblyArea}
                                onChange={handleChange}
                                placeholder="Enter Assembly"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Block <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="block"
                                value={formData.block}
                                onChange={handleChange}
                                placeholder="Enter Block"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Village Council <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="villageCouncil"
                                value={formData.villageCouncil}
                                onChange={handleChange}
                                placeholder="Enter Village Council"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-4 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>

                        <div className="flex flex-col gap-2 relative group/input">
                            <label className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#C8A96A]">Village <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="village"
                                value={formData.village}
                                onChange={handleChange}
                                placeholder="Enter Village"
                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-5 py-3.5 text-[15px] text-[#F5E6C8] placeholder:text-[#F5E6C8]/35 focus:border-[#C8A96A] outline-none transition-all font-bold"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pt-6">
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-0.5 w-5 h-5 rounded border-[#C8A96A]/30 bg-[#0D0D0D] text-[#C8A96A] focus:ring-[#C8A96A]/50 cursor-pointer accent-[#C8A96A]"
                        />
                        <label htmlFor="agreement" className="text-[15px] text-[#F5E6C8]/70 font-bold cursor-pointer">
                            I accept the <Link to="/terms" className="text-[#C8A96A] hover:text-[#D4AF37] font-black hover:underline uppercase tracking-tight">terms and conditions</Link> and <Link to="/privacy" className="text-[#C8A96A] hover:text-[#D4AF37] font-black hover:underline uppercase tracking-tight">privacy policy</Link>.
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || !agreed}
                            className={`luxury-button w-full relative z-10 flex items-center justify-center p-3.5 font-black tracking-widest text-sm min-h-[52px] ${loading || !agreed ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <ButtonLoader /> : 'CREATE ACCOUNT'}
                        </button>

                        <p className="mt-8 text-center text-[11px] md:text-xs font-black uppercase tracking-widest text-[#F5E6C8]/55">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#C8A96A] hover:text-[#D4AF37] border-b border-[#C8A96A]/30 hover:border-[#D4AF37] transition-all">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
