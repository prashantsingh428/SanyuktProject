import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { 
    Home, UserPlus, Users, ShoppingCart, 
    Gift, Package, Wallet, Folder, 
    UserCheck, MessageSquare, LogOut, Menu, X, ChevronDown, Bell, Search, Shield,
    ShoppingBag, Globe
} from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const UserDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        } else {
            navigate('/login');
        }

        if (isMobile) {
            setSidebarOpen(false);
        }
    }, [isMobile, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { name: 'Home', icon: Home, path: '/my-account', id: 'home' },
        { name: 'New Sign Up', icon: UserPlus, path: '/register', id: 'signup' },
        { 
            name: 'My Downline', 
            icon: Users, 
            path: '/my-account/downline', 
            id: 'downline', 
            badge: 5,
            children: [
                { name: 'My Directs', path: '/my-account/downline/directs', id: 'downline_directs' },
                { name: 'Left Team', path: '/my-account/downline/left-team', id: 'downline_left' },
                { name: 'Right Team', path: '/my-account/downline/right-team', id: 'downline_right' },
                { name: 'All Team', path: '/my-account/downline/all-team', id: 'downline_all' },
                { name: 'Tree View', path: '/my-account/downline/tree-view', id: 'downline_tree' },
            ],
        },
        { name: 'Product Order', icon: ShoppingCart, path: '/my-account/orders', id: 'orders', badge: 6 },
        { 
            name: 'First Purchase Bonus', 
            icon: Gift, 
            path: '/my-account/bonus/first', 
            id: 'first_bonus', 
            badge: 3,
            children: [
                { name: 'Silver Matching', path: '/my-account/bonus/first/silver', id: 'first_silver' },
                { name: 'Gold Matching', path: '/my-account/bonus/first/gold', id: 'first_gold' },
                { name: 'Diamond Matching', path: '/my-account/bonus/first/diamond', id: 'first_diamond' },
            ],
        },
        { 
            name: 'Repurchase Bonus', 
            icon: Package, 
            path: '/my-account/bonus/repurchase', 
            id: 'repurchase_bonus', 
            badge: 10,
            children: [
                { name: 'Self Repurchase Income', path: '/my-account/bonus/repurchase/self', id: 'repurchase_self' },
                { name: 'Repurchase Level Income', path: '/my-account/bonus/repurchase/level', id: 'repurchase_level' },
                { name: 'Sponsor Income', path: '/my-account/bonus/repurchase/sponsor', id: 'repurchase_sponsor' },
                { name: 'Royalty Bonus', path: '/my-account/bonus/repurchase/royalty', id: 'repurchase_royalty' },
                { name: 'Director Bonus', path: '/my-account/bonus/repurchase/director', id: 'repurchase_director' },
                { name: 'House Fund', path: '/my-account/bonus/repurchase/house', id: 'repurchase_house' },
                { name: 'Leadership Fund', path: '/my-account/bonus/repurchase/leadership', id: 'repurchase_leadership' },
                { name: 'Car Fund', path: '/my-account/bonus/repurchase/car', id: 'repurchase_car' },
                { name: 'Travel Fund', path: '/my-account/bonus/repurchase/travel', id: 'repurchase_travel' },
                { name: 'Bike Fund', path: '/my-account/bonus/repurchase/bike', id: 'repurchase_bike' },
            ],
        },
        { name: 'Our Products', icon: ShoppingBag, path: '/products', id: 'shop' },
        { 
            name: 'E-Wallet', 
            icon: Wallet, 
            path: '/my-account/wallet', 
            id: 'wallet', 
            badge: 4,
            children: [
                { name: 'Deduction Report', path: '/my-account/wallet/deduction-report', id: 'wallet_deduction' },
                { name: 'Withdrawal History', path: '/my-account/wallet/withdrawal-history', id: 'wallet_withdrawal' },
                { name: 'All Transaction Report', path: '/my-account/wallet/all-transactions', id: 'wallet_all_txn' },
                { name: 'Daily Closing Report', path: '/my-account/wallet/daily-closing', id: 'wallet_daily' },
            ],
        },
        { 
            name: 'Generation Wallet', 
            icon: Wallet, 
            path: '/my-account/wallet/generation', 
            id: 'gen_wallet', 
            badge: 4,
            children: [
                { name: 'Deduction Report', path: '/my-account/wallet/generation/deduction-report', id: 'gen_deduction' },
                { name: 'Withdrawal History', path: '/my-account/wallet/generation/withdrawal-history', id: 'gen_withdrawal' },
                { name: 'All Transaction Report', path: '/my-account/wallet/generation/all-transactions', id: 'gen_all_txn' },
                { name: 'Monthly Closing Report', path: '/my-account/wallet/generation/monthly-closing', id: 'gen_monthly' },
            ],
        },
        { 
            name: 'My Folder', 
            icon: Folder, 
            path: '/my-account/folder', 
            id: 'folder', 
            badge: 4,
            children: [
                { name: 'Welcome Letter', path: '/my-account/folder/welcome-letter', id: 'folder_welcome' },
                { name: 'Download Files', path: '/my-account/folder/download-files', id: 'folder_downloads' },
                { name: 'Our Banker', path: '/my-account/folder/our-banker', id: 'folder_banker' },
                { name: 'ID Card', path: '/my-account/folder/id-card', id: 'folder_id' },
            ],
        },
        { name: 'Profile & KYC', icon: UserCheck, path: '/my-account/profile', id: 'profile', badge: 4 },
        { name: 'Submit Complain', icon: MessageSquare, path: '/my-account/grievances', id: 'grievance', badge: 2 },
    ];

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside 
                className={`fixed left-0 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] top-[60px] md:top-[80px] bg-[#0A7A2F] text-white transition-all duration-300 z-50 shadow-none overflow-y-auto no-scrollbar
                    ${sidebarOpen ? 'w-72' : 'w-0 md:w-20 overflow-hidden'}`}
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Brand / Logo Area */}
                    <Link to="/" className="flex items-center space-x-3 mb-10 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        {sidebarOpen && (
                            <div className="leading-tight text-white">
                                <h2 className="font-bold text-lg whitespace-nowrap">SANYUKT</h2>
                                <p className="text-[10px] text-white/70 uppercase tracking-widest">Parivaar</p>
                            </div>
                        )}
                    </Link>

                    {/* Profile Summary in Sidebar */}
                    {sidebarOpen && (
                        <div className="mb-10 text-center px-4">
                            <div className="relative inline-block mb-4">
                                <div className="w-24 h-24 rounded-full border-2 border-white/20 p-1 bg-[#096628] overflow-hidden">
                                    <img 
                                        src={userData.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200&q=80"} 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-orange-500 border-2 border-[#0A7A2F] rounded-full"></div>
                            </div>
                            <h3 className="font-black text-lg leading-tight uppercase tracking-wide text-white">{userData.userName}</h3>
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="text-[10px] text-white/50 font-black tracking-widest uppercase">Member ID: {userData.memberId || 'SPRL0000'}</p>
                                <div className="flex items-center justify-center gap-2 text-white/90">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Live Support</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <nav className="flex-1 space-y-1">
                        {menuItems.map((item) => {
                            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                            const isActiveDirect = location.pathname === item.path || (item.path === '/my-account' && location.pathname === '/my-account/');
                            const isChildActive = hasChildren && item.children.some(child => location.pathname === child.path);
                            const active = isActiveDirect || isChildActive;

                            return (
                                <div key={item.id} className="space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (hasChildren) {
                                                setOpenDropdown(prev => prev === item.id ? null : item.id);
                                            } else {
                                                navigate(item.path);
                                            }
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left
                                            ${active ? 'bg-white text-[#0A7A2F]' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-[#0A7A2F]' : 'group-hover:text-white'}`} />
                                        {sidebarOpen && (
                                            <div className="flex items-center justify-between flex-1 overflow-hidden">
                                                <span className="font-bold text-[13px] whitespace-nowrap">{item.name}</span>
                                                <div className="flex items-center gap-2">
                                                    {item.badge && (
                                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black
                                                            ${active ? 'bg-orange-600 text-white' : 'bg-white/10 text-white/50'}`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                    {hasChildren && (
                                                        <ChevronDown 
                                                            className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} 
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </button>

                                    {hasChildren && sidebarOpen && (
                                        <div
                                            className={`
                                                ml-10 mr-4 rounded-b-xl overflow-hidden bg-[#0A7A2F]
                                                transition-[max-height,opacity,transform] duration-200
                                                ${openDropdown === item.id ? 'max-h-96 opacity-100 translate-y-0 py-2' : 'max-h-0 opacity-0 -translate-y-1 py-0'}
                                            `}
                                        >
                                            {item.children.map((child) => {
                                                const childActive = location.pathname === child.path;
                                                return (
                                                    <Link
                                                        key={child.id}
                                                        to={child.path}
                                                        className={`block px-4 py-1.5 text-[13px] text-left ${
                                                            childActive ? 'text-white font-bold' : 'text-white/80 hover:text-white font-semibold'
                                                        }`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Logout at bottom */}
                    <div className="mt-auto pt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-white/50 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-all"
                        >
                            <LogOut className="w-5 h-5 shrink-0" />
                            {sidebarOpen && <span className="font-bold text-[13px]">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main 
                className={`flex-1 flex flex-col transition-all duration-300 min-h-[calc(100vh-80px)]
                    ${sidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
            >
                {/* Dashboard Sub-Header (Toggle Only) */}
                <div className="h-12 bg-white flex items-center px-6 border-b border-gray-100">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-black flex items-center gap-2"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0A7A2F]">{sidebarOpen ? 'Close Menu' : 'Open Menu'}</span>
                    </button>
                    <div className="ml-auto flex items-center gap-4">
                         <span className="text-[10px] font-black text-[#0A7A2F] uppercase tracking-[0.2em] hidden sm:block">Dashboard Mode</span>
                         <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    </div>
                </div>

                {/* Dynamic Page Content */}
                <div className="flex-1 animate-fadeIn">
                    <Outlet />
                </div>
            </main>

            {/* Global Overlay for mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-[#0A7A2F]/20 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default UserDashboardLayout;
