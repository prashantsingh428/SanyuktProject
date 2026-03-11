import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Shield, Zap, Star, CheckCircle2, ShoppingCart, Info } from 'lucide-react';

const PackageUpgrade = () => {
    const [selectedPkg, setSelectedPkg] = useState(null);

    const packages = [
        {
            id: '599',
            name: 'Basic',
            price: '₹599',
            bv: '250 BV',
            pv: '0.25 PV',
            capping: '₹2000',
            color: 'from-blue-500 to-blue-700',
            icon: Shield,
            features: ['250 Business Volume', '0.25 Point Value', 'Daily Capping ₹2000', 'Basic Support']
        },
        {
            id: '1299',
            name: 'Standard',
            price: '₹1299',
            bv: '500 BV',
            pv: '0.5 PV',
            capping: '₹4000',
            color: 'from-green-500 to-green-700',
            icon: Zap,
            features: ['500 Business Volume', '0.5 Point Value', 'Daily Capping ₹4000', 'Standard Support', 'Priority Training']
        },
        {
            id: '2699',
            name: 'Premium',
            price: '₹2699',
            bv: '1000 BV',
            pv: '1 PV',
            capping: '₹10000',
            color: 'from-orange-500 to-orange-700',
            icon: Star,
            features: ['1000 Business Volume', '1 Point Value', 'Daily Capping ₹10000', '24/7 Premium Support', 'Advanced Training', 'Exclusive Events']
        }
    ];

    const handleActivate = (pkgId) => {
        // This will be connected to a payment gateway or wallet deduction later
        alert(`Request to activate ${pkgId} package received! Our team will verify and activate your account soon.`);
    };

    return (
        <div className="py-6 px-4 max-w-7xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Activate Your Success</h1>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">Choose a package to unlock your MLM earnings and potential</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 flex flex-col h-full transform transition-all hover:scale-[1.02] ${selectedPkg === pkg.id ? 'ring-4 ring-green-500 ring-offset-4' : ''}`}
                    >
                        {/* Header Section */}
                        <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                        <pkg.icon className="w-8 h-8" />
                                    </div>
                                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Active Section
                                    </div>
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-wider mb-1">{pkg.name}</h3>
                                <div className="text-4xl font-black">{pkg.price}</div>
                            </div>
                        </div>

                        {/* MLM Stats Strip */}
                        <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Business Volume</p>
                                <p className="text-lg font-black text-slate-700">{pkg.bv}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Point Value</p>
                                <p className="text-lg font-black text-slate-700">{pkg.pv}</p>
                            </div>
                        </div>

                        {/* Daily Capping */}
                        <div className="px-8 py-6 bg-green-50/50 flex items-center justify-between border-b border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-green-600/70 font-bold uppercase tracking-widest">Daily Capping</p>
                                    <p className="text-xl font-black text-green-700">{pkg.capping}</p>
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="px-8 py-8 flex-1">
                            <ul className="space-y-4">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Area */}
                        <div className="p-8 pt-0">
                            <button
                                onClick={() => handleActivate(pkg.id)}
                                className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl
                                    ${pkg.id === '2699' 
                                        ? 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700' 
                                        : 'bg-slate-900 text-white shadow-slate-200 hover:bg-black'}`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Activate Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Information Alert */}
            <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 shrink-0">
                    <Info className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="font-black text-slate-700 uppercase tracking-wider mb-1">Requirement Information</h4>
                    <p className="text-sm text-slate-500 font-medium">After selecting a package, you will be redirected to the payment gateway. Once successful, your account will be activated and your BV/PV will be credited instantly across the network.</p>
                </div>
            </div>
        </div>
    );
};

export default PackageUpgrade;
