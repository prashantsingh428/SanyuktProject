import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Store, 
    ShoppingCart, 
    Package, 
    Zap, 
    TrendingUp, 
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';

const QuickServices = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 'franchise',
            title: 'Our Franchise',
            subtitle: 'Join the Network',
            icon: <Store className="w-6 h-6" />,
            path: '/franchise/list',
            color: 'from-[#C8A96A] to-[#D4AF37]'
        },
        {
            id: 'cart',
            title: 'My Cart',
            subtitle: 'Your Essentials',
            icon: <ShoppingCart className="w-6 h-6" />,
            path: '/my-account/cart',
            color: 'from-[#F5E6C8] to-[#C8A96A]'
        },
        {
            id: 'products',
            title: 'View Products',
            subtitle: 'Premium Range',
            icon: <Package className="w-6 h-6" />,
            path: '/products',
            color: 'from-[#C8A96A] to-[#D4AF37]'
        },
        {
            id: 'recharge',
            title: 'Recharge',
            subtitle: 'Stay Connected',
            icon: <Zap className="w-6 h-6" />,
            path: '/recharge',
            color: 'from-[#F5E6C8] to-[#C8A96A]'
        },
        {
            id: 'opportunities',
            title: 'Opportunities',
            subtitle: 'Grow Together',
            icon: <TrendingUp className="w-6 h-6" />,
            path: '/opportunities',
            color: 'from-[#C8A96A] to-[#D4AF37]'
        },
        {
            id: 'more',
            title: 'Explore More',
            subtitle: 'Discover All',
            icon: <MoreHorizontal className="w-6 h-6" />,
            path: '/contact',
            color: 'from-[#F5E6C8] to-[#C8A96A]'
        }
    ];

    return (
        <section className="relative py-4 overflow-hidden bg-[#0D0D0D]">
            <div className="container mx-auto px-4">
                {/* Grid Layout - 6 columns on desktop to fit all in one row, 3 on mobile */}
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 pb-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(service.path)}
                            className="relative w-full p-1.5 md:p-3 rounded-sm border border-[#C8A96A]/20 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] cursor-pointer group hover:border-[#C8A96A]/50 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="mb-2">
                                <div className={`p-2 md:p-3 rounded-sm bg-gradient-to-br ${service.color} text-[#0D0D0D] shadow-md group-hover:scale-105 transition-transform duration-300`}>
                                    {/* Scale down lucide icon */}
                                    {React.cloneElement(service.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <h3 className="text-[#F5E6C8] font-bold text-[11px] md:text-sm lg:text-base leading-tight group-hover:text-[#C8A96A] transition-colors font-serif capitalize truncate">
                                    {service.title}
                                </h3>
                                <p className="text-[#F5E6C8]/40 text-[7px] md:text-[9px] uppercase tracking-tighter font-black mt-0.5">
                                    {service.subtitle}
                                </p>
                            </div>
                            
                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#C8A96A] group-hover:w-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Custom styling to hide scrollbar */}
            <style jsx="true">{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default QuickServices;
