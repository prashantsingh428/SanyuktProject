import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Building2, MapPin, Phone, User, ChevronRight, Store, Users, Award } from "lucide-react";

const PublicFranchise = () => {
    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFranchise, setSelectedFranchise] = useState(null);

    // =====================
    // LOAD PUBLIC FRANCHISES
    // =====================
    const loadFranchises = async () => {
        try {
            setLoading(true);
            // Public endpoint - बिना पासवर्ड के
            const response = await api.get("/franchises/list");
            setFranchises(response.data);
        } catch (err) {
            console.error("Error loading franchises:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFranchises();
    }, []);

    // Stats
    const totalFranchises = franchises.length;
    const cities = [...new Set(franchises.map(f => f.address?.split(',').pop()?.trim() || 'Unknown'))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Franchise Network</h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                        Find a franchise partner near you
                    </p>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-xl">
                            <Store className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{totalFranchises}</p>
                            <p className="text-gray-600">Total Franchises</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-xl">
                            <MapPin className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{cities.length}</p>
                            <p className="text-gray-600">Cities Covered</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-xl">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">24/7</p>
                            <p className="text-gray-600">Support Available</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-green-600" />
                        Our Franchise Partners
                    </h2>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Franchise Grid */}
                        {franchises.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Franchises Yet</h3>
                                <p className="text-gray-500">Check back later for franchise opportunities</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {franchises.map((franchise, index) => (
                                    <motion.div
                                        key={franchise._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        <div className="p-6">
                                            {/* Header with Icon */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
                                                    <Building2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800">
                                                        {franchise.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        ID: {franchise.franchiseId}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm">{franchise.address}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm">{franchise.mobile}</span>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <button
                                                onClick={() => setSelectedFranchise(franchise)}
                                                className="mt-6 w-full bg-green-50 text-green-700 py-2 px-4 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                                            >
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Features Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16 bg-white rounded-3xl p-8 shadow-lg"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                                Why Choose Our Franchise?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Trusted Network</h4>
                                    <p className="text-gray-600 text-sm">
                                        Join our growing family of successful franchise partners
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Expert Support</h4>
                                    <p className="text-gray-600 text-sm">
                                        24/7 dedicated support for all franchise partners
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Building2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Pan India Presence</h4>
                                    <p className="text-gray-600 text-sm">
                                        Strong network across multiple cities
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Details Modal */}
            {selectedFranchise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl max-w-md w-full p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{selectedFranchise.name}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Franchise ID</p>
                                <p className="font-mono font-semibold text-gray-800">{selectedFranchise.franchiseId}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Address</p>
                                <p className="text-gray-800">{selectedFranchise.address}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                                <p className="text-gray-800 font-medium">{selectedFranchise.mobile}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Partner Since</p>
                                <p className="text-gray-800">
                                    {new Date(selectedFranchise.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href={`tel:${selectedFranchise.mobile}`}
                                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition text-center"
                            >
                                Call Now
                            </a>
                            <button
                                onClick={() => setSelectedFranchise(null)}
                                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PublicFranchise;