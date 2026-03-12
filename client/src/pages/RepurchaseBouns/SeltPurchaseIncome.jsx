import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, TrendingUp, Calendar, Download } from 'lucide-react';

const SelfRepurchaseIncome = () => {
    const navigate = useNavigate();

    // Sample data for demonstration
    const selfPurchases = [
        { id: 1, date: '2024-03-15', product: 'Health Supplement Pack', amount: 2500, points: 250, status: 'Completed' },
        { id: 2, date: '2024-03-10', product: 'Wellness Kit', amount: 1800, points: 180, status: 'Completed' },
        { id: 3, date: '2024-03-05', product: 'Nutrition Pack', amount: 3200, points: 320, status: 'Completed' },
    ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/my-account/bonus/repurchase')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-800">Self Repurchase Income</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your personal repurchase earnings</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                        <Package className="w-8 h-8 text-green-600" />
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">This Month</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹7,500</p>
                    <p className="text-xs text-gray-500 mt-1">Total Self Repurchase</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Earnings</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹750</p>
                    <p className="text-xs text-gray-500 mt-1">Commission Earned (10%)</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                        <Package className="w-8 h-8 text-purple-600" />
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Points</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">750</p>
                    <p className="text-xs text-gray-500 mt-1">Reward Points Earned</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8 text-orange-600" />
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Orders</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">3</p>
                    <p className="text-xs text-gray-500 mt-1">Total Orders</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6 flex flex-wrap gap-3">
                <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Custom Range</option>
                </select>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Points</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {selfPurchases.map((purchase) => (
                                <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-800">{purchase.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{purchase.product}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600">₹{purchase.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{purchase.points}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            {purchase.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-green-600 hover:text-green-700 text-sm font-bold">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SelfRepurchaseIncome;
