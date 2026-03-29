import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ currentSlide, setCurrentSlide, heroSlides, isLoggedIn, userRole, handleNavigation }) => {
    // Content always LEFT, Image always RIGHT

    return (
        <section className="relative overflow-hidden bg-[#0D0D0D] flex flex-col">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col min-h-[85vh] md:flex-1 justify-center"
                >
                    <div className="container mx-auto px-4 sm:px-6 relative z-20 py-10 md:py-16 lg:py-20">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-center w-full">

                            {/* Content Side */}
                            <motion.div
                                initial={{ x: -60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="space-y-4 text-center md:text-left flex flex-col justify-center"
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-[#F5E6C8] tracking-tight">
                                    {heroSlides[currentSlide].title}
                                </h1>
                                <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#C8A96A] font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-4">
                                    {heroSlides[currentSlide].subtitle}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F5E6C8]/80 leading-relaxed font-normal max-w-xl mx-auto md:mx-0 mt-2">
                                    {heroSlides[currentSlide].description}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                handleNavigation(userRole === 'admin' ? '/admin/dashboard' : '/my-account');
                                            } else {
                                                handleNavigation('/register');
                                            }
                                        }}
                                        className="px-10 py-4 bg-[#C8A96A] text-[#0D0D0D] font-bold rounded-sm hover:bg-[#F5E6C8] transition-all duration-300 shadow-lg flex items-center space-x-2 text-sm uppercase tracking-widest"
                                    >
                                        <span className="font-black">
                                            {isLoggedIn
                                                ? (userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard')
                                                : 'Join Now'
                                            }
                                        </span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ backgroundColor: 'rgba(200, 169, 106, 0.1)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleNavigation('/contact')}
                                        className="px-10 py-4 border border-[#C8A96A]/50 text-[#C8A96A] font-bold rounded-sm transition-all duration-300 text-sm uppercase tracking-widest"
                                    >
                                        Contact Us
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Image Side */}
                            <motion.div
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="relative flex"
                            >
                                <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#C8A96A]/10 w-full aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[600px]">
                                    <img
                                        src={heroSlides[currentSlide].image}
                                        alt={`Slide ${currentSlide + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/20"></div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#C8A96A]/20 rounded-sm -z-10"></div>
                                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#C8A96A]/10 rounded-sm -z-10"></div>
                            </motion.div>

                        </div>
                    </div>

                    {/* Background subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#121212] to-[#0D0D0D] z-0"></div>
                </motion.div>
            </AnimatePresence>

        </section>
    );
};

export default HeroSection;
