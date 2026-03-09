import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Wallet, CreditCard, PieChart, ShoppingBag,
    TrendingUp, Users, UserCheck, Activity,
    Copy, Target, ChevronRight, Share2,
    CheckCircle2, Clock, Package, Briefcase, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

import ProfileBanner from '../components/ProfileBanner';

const DashboardOverview = () => {
    const [userData, setUserData] = useState(null);
    const [stats] = useState({
        repurchaseWallet: "0.00",
        eWallet: "0.00",
        generationWallet: "0.00",
        netCommission: "450.00",
        productPurchases: "1,250.00",
        totalDownline: 124,
        leftCount: 56,
        rightCount: 68,
        activeDirects: 12,
        dailyPV: { current: 450, target: 320 },
        lifetimePV: { current: "12,450", target: "10,200" }
    });

    const recentActivities = [
        { id: 1, user: "Yash Kumar Mishra", action: "choose a new elft", time: "28 days ago", icon: UserCheck, color: "bg-emerald-100 text-emerald-600" },
        { id: 2, user: "Yash Kumar Mishra", action: "is jashed", time: "24 days ago", icon: Users, color: "bg-orange-100 text-orange-600" },
        { id: 3, user: "Yash Kumar Mishra", action: "nurnes the American Express", time: "28 days ago", icon: Zap, color: "bg-blue-100 text-blue-600" },
        { id: 4, user: "Yash Kumar Mishra", action: "get lve added", time: "25 days ago", icon: Clock, color: "bg-green-100 text-green-600" },
    ];

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, []);

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success('ID copied!', {
            style: { borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '12px' },
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    // --- Sub-components to match the image ---

    const WalletCard = ({ title, amount, color, icon: Icon }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${color.bg} ${color.text}`}>
                    <Icon size={18} />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Balance</div>
            </div>
            <h3 className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-slate-400">₹</span>
                <span className="text-3xl font-black text-black tracking-tighter">{amount}</span>
            </div>
            <div className={`absolute bottom-0 left-0 h-1.5 w-full transition-all duration-500 ${color.accent}`}></div>
        </motion.div>
    );

    const StatListCard = ({ title, value, badge, color, icon: Icon }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-slate-100 flex flex-col h-full"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.bg} ${color.text} shadow-sm`}>
                    <Icon size={20} />
                </div>
                {badge && (
                    <div className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-emerald-100/50">
                        {badge}
                    </div>
                )}
            </div>
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{title}</div>
            <div className="text-3xl font-black text-black tracking-tighter">{value}</div>
        </motion.div>
    );

    const GaugeCard = ({ title, current, target, label, color }) => {
        return (
            <motion.div
                variants={cardVariants}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full"
            >
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">{title}</div>

                <div className="relative w-48 h-20 mb-6 flex items-center justify-center">
                    <svg className="w-full h-full transform translate-y-2" viewBox="0 0 100 50">
                        <path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.75 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M 10 50 A 40 40 0 0 1 90 50" 
                            fill="none" 
                            stroke={color} 
                            strokeWidth="8" 
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden mb-6 border border-slate-100/50">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                    ></motion.div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-[12px] font-black text-slate-600 uppercase tracking-widest">
                        <Zap size={12} style={{ color: color }} fill={color} /> {label}
                    </div>
                    <div className="text-3xl font-black text-black tracking-tighter leading-none">
                        {current} <span className="text-slate-300 mx-0.5 font-bold">/</span> {target}
                    </div>
                </div>
            </motion.div>
        );
    };

    if (!userData) return null;

    return (
        <div className="max-w-[1600px] mx-auto px-6 pb-10 pt-0 bg-[#f8faff] min-h-screen font-['Inter',sans-serif]">
            {/* --- TOP SECTION: Professional Unified Profile Banner --- */}
            <div className="mb-6">
                <ProfileBanner userData={userData} />
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
                {/* --- LEFT SECTION (Wallets) --- */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                        <WalletCard
                            title="Repurchase Wallet"
                            amount={stats.repurchaseWallet}
                            color={{ bg: "bg-emerald-50", text: "text-emerald-600", accent: "bg-emerald-600" }}
                            icon={Wallet}
                        />
                        <WalletCard
                            title="E-Wallet Balance"
                            amount={stats.eWallet}
                            color={{ bg: "bg-orange-50", text: "text-orange-600", accent: "bg-orange-600" }}
                            icon={CreditCard}
                        />
                        <WalletCard
                            title="Generation Earnings"
                            amount={stats.generationWallet}
                            color={{ bg: "bg-gray-50", text: "text-black", accent: "bg-black" }}
                            icon={PieChart}
                        />
                        <WalletCard
                            title="Net Commission"
                            amount={stats.netCommission}
                            color={{ bg: "bg-orange-50", text: "text-orange-600", accent: "bg-orange-600" }}
                            icon={TrendingUp}
                        />
                    </div>

                {/* --- MIDDLE SECTION (Stat List) --- */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 text-center lg:text-left">Network Details</div>
                    <StatListCard
                        title="Right Count"
                        value={stats.rightCount}
                        color={{ bg: "bg-orange-600", text: "text-white" }}
                        icon={UserCheck}
                    />
                    <StatListCard
                        title="Active Directs"
                        value={stats.activeDirects}
                        color={{ bg: "bg-emerald-700", text: "text-white" }}
                        icon={Activity}
                    />
                </div>

                {/* --- RIGHT SECTION (Product Purchases + Gauges) --- */}
                <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Purchases Column */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-[1.2rem] p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-black flex items-center justify-center mb-3">
                                <ShoppingBag size={20} />
                            </div>
                            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Product Purchases</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-slate-400">₹</span>
                                <span className="text-3xl font-black text-black tracking-tighter">{stats.productPurchases}</span>
                            </div>
                        </motion.div>

                        <StatListCard
                            title="Total Downline"
                            value={stats.totalDownline}
                            badge="+8 today"
                            color={{ bg: "bg-emerald-600", text: "text-white" }}
                            icon={Users}
                        />
                        <StatListCard
                            title="Left Count"
                            value={stats.leftCount}
                            color={{ bg: "bg-black", text: "text-white" }}
                            icon={UserCheck}
                        />
                    </div>

                    {/* Gauge Cards Column */}
                    <div className="flex flex-col gap-6">
                        <GaugeCard
                            title="Daily Performance"
                            current={stats.dailyPV.current}
                            target={stats.dailyPV.target}
                            label="Today PV Points"
                            color="#059669"
                        />
                        <GaugeCard
                            title="Lifetime Achievement"
                            current={stats.lifetimePV.current}
                            target={stats.lifetimePV.target}
                            label="Total PV Points"
                            color="#ea580c"
                        />
                    </div>
                </div>

                {/* --- BOTTOM SECTION (Recent Activity Full Width) --- */}
                <div className="lg:col-span-12 mt-4">
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">Recent Activity</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Updates</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recentActivities.map((item, index) => (
                                <div key={item.id} className="flex gap-4 group cursor-pointer border-r border-gray-50 last:border-0 pr-4">
                                    <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${item.color.includes('emerald') ? 'bg-emerald-50 text-emerald-600' : item.color.includes('orange') ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-black'} shadow-sm group-hover:scale-110 transition-transform`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-[13px] font-black text-black leading-tight mb-1">
                                            {item.user} <span className="font-semibold text-slate-600">{item.action}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Dashboard Footer Decoration to match image */}
            <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div>Page 1 of 2</div>
                <div className="flex items-center gap-4">
                    <span>Refison</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-emerald-700 font-black">Quick Links</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
