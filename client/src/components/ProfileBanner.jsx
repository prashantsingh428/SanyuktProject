import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, Calendar, Star, Activity,
    Copy, Mail, Map, Award, User,
    Shield, Share2
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileBanner = ({ userData }) => {
    if (!userData) return null;

    const copyToClipboard = async (text) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        toast.success(`Copied to clipboard!`, {
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600'
            },
        });
    };

    const details = [
        { label: "Sponsor ID", value: userData.sponsorId || 'SPRL0000', icon: Users },
        { label: "Joining Date", value: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '08 Mar, 2026', icon: Calendar },
        { label: "Current Rank", value: userData.rank || 'Platinum Member', icon: Award },
        { label: "Regional Zone", value: userData.zone || 'North Zone', icon: Map },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative"
        >
            {/* Minimalist Top Accent */}
            <div className="h-1 w-full bg-slate-100"></div>

            <div className="p-6 lg:p-10 flex flex-col gap-8">
                {/* Tier 1: Identity Focus */}
                <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                    <div className="relative shrink-0">
                        <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-100 bg-slate-50">
                            <img
                                src={userData.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&h=400&q=80"}
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col text-center md:text-left gap-2 flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                                {userData.userName}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center md:items-start leading-tight space-y-1">
                            <span className="text-[15px] font-black text-[#0A7A2F] uppercase tracking-[0.2em]">
                                Premium Membership
                            </span>
                            <span className="text-[14px] font-bold text-slate-600 tracking-wide">
                                {userData.email}
                            </span>
                            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                                <Award size={12} className="text-[#0A7A2F]" />
                                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest leading-none">
                                    {userData.position || 'Right Wing'} Position
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tier 2: Official Identification */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 mb-1">
                            <Shield size={14} className="fill-emerald-700/10" />
                            <span className="text-[11px] font-black uppercase tracking-widest">{userData.status || 'Verified Active'}</span>
                        </div>
                        <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.25em]">Member ID</span>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
                                {userData.memberId}
                            </span>
                            <button
                                onClick={() => copyToClipboard(userData.memberId)}
                                className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:text-[#0A7A2F] hover:bg-white hover:shadow-lg transition-all border border-slate-100 active:scale-95"
                                title="Copy Member ID"
                            >
                                <Copy size={22} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tier 3: Logistic Details (Clean Grid) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
                    {details.slice(0, 4).map((item, idx) => ( // Using slice(0,4) to match the original 4 items
                        <div key={idx} className="flex flex-col gap-2 group cursor-default">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#0A7A2F]/10 group-hover:text-[#0A7A2F] transition-all">
                                    <item.icon size={16} />
                                </div>
                                <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors">
                                    {item.label}
                                </span>
                            </div>
                            <span className="text-[18px] lg:text-[20px] font-black text-slate-900 tracking-tight group-hover:text-[#0A7A2F] transition-colors truncate pl-10">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50/50"></div>
        </motion.div>
    );
};

export default ProfileBanner;
