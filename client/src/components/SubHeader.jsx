import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const SubHeader = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // Map paths to breadcrumb labels
    const getLabel = (path) => {
        if (path === '/') return 'HOME';
        if (path === '/login') return 'ACCESS';
        if (path === '/register') return 'JOIN';
        if (path === '/recharge') return 'SERVICES';
        if (path === '/about' || path.includes('/about') || path.includes('/company/about')) return 'PURPOSE';
        if (path === '/contact') return 'CONNECT';
        if (path === '/grievance') return 'SUPPORT';
        if (path === '/products') return 'COLLECTIONS';
        if (path === '/opportunities') return 'FUTURE';
        if (path.includes('/legal')) return 'COMPLIANCE';
        
        // Default: take the last segment and uppercase it
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0) return 'HOME';
        return segments[segments.length - 1].toUpperCase();
    };

    // Don't show on home page if we want a cleaner look, but user said "for all pages"
    // However, if we are at root, maybe just Home?
    // Let's keep it consistent.

    return (
        <div className="fixed top-[72px] md:top-[80px] left-0 w-full bg-[#0D0D0D] border-b border-[#C8A96A]/30 py-3 z-[1050] shadow-lg">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-3 text-[#C8A96A]">
                <Home className="h-3.5 w-3.5 mb-0.5" />
                <Link 
                    to="/" 
                    className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] hover:text-[#F5E6C8] transition-colors"
                >
                    Origins
                </Link>
                <div className="w-1 h-1 rounded-full bg-[#C8A96A] shadow-[0_0_8px_rgba(200,169,106,0.5)]"></div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#F5E6C8]">
                    {getLabel(pathname)}
                </span>
            </div>
        </div>
    );
};

export default SubHeader;
