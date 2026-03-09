import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Wallet, CreditCard, PieChart, ShoppingBag,
    TrendingUp, Users, UserCheck, Activity,
    Copy, Target, ChevronRight, Share2,
    CheckCircle2, Clock, Package, Briefcase, Zap, 
    TrendingDown, ArrowUpRight, BarChart3, Gem, Award, Trophy
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
        productWallet: "0.00",
        paidWithdrawalToday: "0.00",
        totalDownline: 124,
        leftCount: 56,
        rightCount: 68,
        activeDirects: 12,
        pvLeft: 0,
        pvRight: 0,
        totalPvLeft: 0,
        totalPvRight: 0,
        currentSilverLeft: 0,
        currentSilverRight: 0,
        totalSilverLeft: 0,
        totalSilverRight: 0,
        currentGoldLeft: 0,
        currentGoldRight: 0,
        totalGoldLeft: 0,
        totalGoldRight: 0,
        currentDiamondLeft: 0,
        currentDiamondRight: 0,
        totalDiamondLeft: 0,
        totalDiamondRight: 0,
        dailyPV: { current: 450, target: 320 },
        lifetimePV: { current: "12,450", target: "10,200" }
    });

    const recentActivities = [
        { id: 1, user: "Yash Kumar Mishra", action: "choose a new elft", date: "09 Mar 2026", time: "10:30 AM", icon: UserCheck, color: "bg-emerald-50 text-emerald-600" },
        { id: 2, user: "Yash Kumar Mishra", action: "is jashed", date: "08 Mar 2026", time: "02:15 PM", icon: Users, color: "bg-orange-50 text-orange-600" },
        { id: 3, user: "Yash Kumar Mishra", action: "nurnes the American Express", date: "07 Mar 2026", time: "09:45 AM", icon: Zap, color: "bg-green-50 text-green-600" },
        { id: 4, user: "Yash Kumar Mishra", action: "get lve added", date: "06 Mar 2026", time: "11:20 PM", icon: Clock, color: "bg-green-50 text-green-600" },
    ];

    useEffect(() => {
        let user;
        try {
            const userStr = localStorage.getItem('user');
            user = userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            console.error('Error parsing user data from localStorage:', e);
            user = null;
        }
        setUserData(user);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    // --- Modernized Sub-components ---

    const SectionHeader = ({ title, subtitle, icon: Icon }) => (
        <div className="flex items-center justify-between mb-6 mt-2">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <Icon size={18} />
                    </div>
                )}
                <div>
                    <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.15em] leading-none mb-1">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="h-px flex-1 bg-slate-100 mx-6 hidden md:block"></div>
        </div>
    );

    const ModernWalletCard = ({ title, value, color, icon: Icon, progress }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 flex flex-col relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: `${color}10`, color: color }}>
                    <Icon size={20} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Status</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{title}</h3>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-slate-400">₹</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{value}</span>
                </div>
            </div>
            {progress !== undefined && (
                <div className="relative h-1.5 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ backgroundColor: color }}
                    ></motion.div>
                </div>
            )}
            
            <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 rounded-full -mr-8 -mt-8`} style={{ backgroundColor: color }}></div>
        </motion.div>
    );

    const PerformanceMetric = ({ title, value, icon: Icon, color, trend }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-5 border border-slate-50 shadow-sm flex items-center gap-4 group hover:border-slate-200 transition-colors"
        >
            <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
                <Icon size={20} />
            </div>
            <div className="flex flex-col flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</span>
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{value}</span>
            </div>
            {trend && (
                <div className="flex flex-col items-end justify-center">
                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        <ArrowUpRight size={10} strokeWidth={3} />
                        {trend}
                    </div>
                </div>
            )}
        </motion.div>
    );

    const BusinessMatrixCard = ({ title, lValue, rValue, icon: Icon }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex flex-col relative overflow-hidden group h-full"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon size={16} />
                </div>
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-snug line-clamp-2 flex-1">
                    {title}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="bg-slate-50/80 rounded-xl p-2.5 flex flex-col gap-0.5 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Left</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight leading-none">{lValue}</span>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-2.5 flex flex-col items-end gap-0.5 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Right</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight leading-none">{rValue}</span>
                </div>
            </div>
            
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-[#0A7A2F] opacity-40`}></div>
        </motion.div>
    );

    const GaugeAchievement = ({ title, current, target, color, label }) => (
        <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex flex-col h-full relative group overflow-hidden"
        >
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-1">{title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                </div>
                <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${color}10`, color: color }}>
                    <BarChart3 size={18} />
                </div>
            </div>

            <div className="relative h-2.5 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: color }}
                ></motion.div>
            </div>

            <div className="flex items-baseline justify-between mt-auto">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">
                    {current}
                </div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Target: {target}
                </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
        </motion.div>
    );

    if (!userData) return null;

    return (
        <div className="max-w-[1600px] mx-auto px-6 pb-12 pt-0 bg-[#f8faff] min-h-screen font-['Inter',sans-serif]">
            <div className="mb-8">
                <ProfileBanner userData={userData} />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-10"
            >
                {/* --- SECTION 1: WALLETS & EARNINGS --- */}
                <div>
                    <SectionHeader title="Financial Overview" subtitle="Real-time Wallets & Earnings" icon={Wallet} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ModernWalletCard
                            title="Repurchase Wallet"
                            value={stats?.repurchaseWallet || "0.00"}
                            color="#0A7A2F"
                            icon={Wallet}
                        />
                        <ModernWalletCard
                            title="E-Wallet Balance"
                            value={stats?.eWallet || "0.00"}
                            color="#F7931E"
                            icon={CreditCard}
                        />
                        <ModernWalletCard
                            title="Generation Earnings"
                            value={stats?.generationWallet || "0.00"}
                            color="#0A7A2F"
                            icon={PieChart}
                        />
                        <ModernWalletCard
                            title="Net Commission"
                            value={stats?.netCommission || "0.00"}
                            color="#1a8c3a"
                            icon={TrendingUp}
                        />
                        <ModernWalletCard
                            title="Product Wallet"
                            value={stats?.productWallet || "0.00"}
                            color="#F7931E"
                            icon={Package}
                        />
                        <ModernWalletCard
                            title="Paid Withdrawal"
                            value={stats?.paidWithdrawalToday || "0.00"}
                            color="#0A7A2F"
                            icon={Briefcase}
                        />
                    </div>
                </div>

                {/* --- SECTION 2: GROWTH & ACHIEVEMENTS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Network Stats */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <SectionHeader title="Network Growth" subtitle="Team Performance & Directs" icon={Users} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ModernWalletCard 
                                title="Right Count" 
                                value={stats?.rightCount || 0} 
                                icon={Users} 
                                color="#0A7A2F" 
                            />
                            <ModernWalletCard 
                                title="Active Directs" 
                                value={stats?.activeDirects || 0} 
                                icon={UserCheck} 
                                color="#F7931E" 
                            />
                            <ModernWalletCard 
                                title="Total Downline" 
                                value={stats?.totalDownline || 0} 
                                icon={TrendingUp} 
                                color="#0A7A2F" 
                            />
                            <ModernWalletCard 
                                title="Left Count" 
                                value={stats?.leftCount || 0} 
                                icon={TrendingDown} 
                                color="#64748b" 
                            />
                        </div>
                        
                        <div className="mt-4 p-6 bg-[#083d1c] rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-slate-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <ShoppingBag size={24} className="text-[#F7931E]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-green-200/60 uppercase tracking-widest">Total Product Purchases</span>
                                    <h4 className="text-3xl font-black tracking-tighter">₹ {stats.productPurchases}</h4>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-[#F7931E] hover:bg-orange-500 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-orange-900/20">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Right Column: PV Targets */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <SectionHeader title="PV Goals" subtitle="Daily & Lifetime Status" icon={Target} />
                        <div className="flex flex-col gap-6 h-full">
                                <ModernWalletCard 
                                    title="Today PV Points" 
                                    value={`${stats?.dailyPV?.current || 0} / ${stats?.dailyPV?.target || 320}`} 
                                    icon={Zap} 
                                    color="#F7931E" 
                                    progress={((stats?.dailyPV?.current || 0) / (stats?.dailyPV?.target || 320)) * 100}
                                />
                                <ModernWalletCard 
                                    title="Total PV Points" 
                                    value={`${stats?.lifetimePV?.current || 0} / ${stats?.lifetimePV?.target || 10200}`} 
                                    icon={Trophy} 
                                    color="#0A7A2F" 
                                    progress={((parseFloat(String(stats?.lifetimePV?.current).replace(/,/g, '')) || 0) / (parseFloat(String(stats?.lifetimePV?.target).replace(/,/g, '')) || 10200)) * 100}
                                />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 3: BUSINESS MATRIX --- */}
                <div>
                    <SectionHeader title="Business Matrix" subtitle="Team Volume & Rank Status" icon={Gem} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <BusinessMatrixCard
                            title="PV Left / Right"
                            lValue={stats?.pvLeft || 0}
                            rValue={stats?.pvRight || 0}
                            icon={Target}
                        />
                        <BusinessMatrixCard
                            title="Total PV L / R"
                            lValue={stats?.totalPvLeft || 0}
                            rValue={stats?.totalPvRight || 0}
                            icon={Activity}
                        />
                        <BusinessMatrixCard
                            title="Silver L / R"
                            lValue={stats?.currentSilverLeft || 0}
                            rValue={stats?.currentSilverRight || 0}
                            icon={CheckCircle2}
                        />
                        <BusinessMatrixCard
                            title="Total Silver L / R"
                            lValue={stats?.totalSilverLeft || 0}
                            rValue={stats?.totalSilverRight || 0}
                            icon={CheckCircle2}
                        />
                        <BusinessMatrixCard
                            title="Gold L / R"
                            lValue={stats?.currentGoldLeft || 0}
                            rValue={stats?.currentGoldRight || 0}
                            icon={Award}
                        />
                        <BusinessMatrixCard
                            title="Total Gold L / R"
                            lValue={stats?.totalGoldLeft || 0}
                            rValue={stats?.totalGoldRight || 0}
                            icon={Award}
                        />
                        <BusinessMatrixCard
                            title="Diamond L / R"
                            lValue={stats?.currentDiamondLeft || 0}
                            rValue={stats?.currentDiamondRight || 0}
                            icon={Gem}
                        />
                        <BusinessMatrixCard
                            title="Total Diamond L / R"
                            lValue={stats?.totalDiamondLeft || 0}
                            rValue={stats?.totalDiamondRight || 0}
                            icon={Gem}
                        />
                    </div>
                </div>

                {/* --- SECTION 4: RECENT ACTIVITY --- */}
                <div>
                    <SectionHeader title="Recent Activity" subtitle="Network Live Updates" icon={Activity} />
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-[2rem] p-6 shadow-[0_20px_60px_rgb(0,0,0,0.03)] border border-slate-50 overflow-hidden"
                    >
                        <div className="flex flex-col">
                            {recentActivities.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div 
                                        key={item.id} 
                                        className={`flex items-center justify-between py-4 px-6 group cursor-pointer hover:bg-slate-50/80 transition-all ${index !== recentActivities.length - 1 ? 'border-b border-slate-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center ${item.color} shadow-sm group-hover:scale-105 transition-transform`}>
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-[14px] font-black text-slate-900 leading-tight">
                                                    {item.user} <span className="font-semibold text-slate-500">{item.action}</span>
                                                </div>
                                                <div className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest group-hover:text-[#0A7A2F] transition-colors">
                                                    Activity Log ID: #REF-{item.id}024
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                                                {item.time}
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* --- FOOTER --- */}
                <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-8">
                        <div>System Log: <span className="text-slate-900">Online</span></div>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="hidden md:block">Update Frequency: <span className="text-slate-900">Real-time</span></div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Powered by</span>
                        <span className="text-[#0A7A2F] bg-green-50 px-3 py-1.5 rounded-lg border border-green-100/50">Sanyukt Executive</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardOverview;
