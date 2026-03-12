import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Filter,
    Calendar,
    TrendingDown,
    AlertCircle,
    FileText,
    Search,
    ChevronDown
} from 'lucide-react';

const DeductionReport = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState('thisMonth');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample deduction data
    const deductions = [
        {
            id: 1,
            date: '2024-03-15',
            description: 'Tax Deducted at Source (TDS)',
            amount: 1250,
            type: 'Tax',
            status: 'Processed',
            reference: 'TDS/MAR/001'
        },
        {
            id: 2,
            date: '2024-03-14',
            description: 'Processing Fee - Withdrawal',
            amount: 100,
            type: 'Fee',
            status: 'Processed',
            reference: 'FEE/MAR/002'
        },
        {
            id: 3,
            date: '2024-03-12',
            description: 'Admin Charges',
            amount: 500,
            type: 'Admin',
            status: 'Processed',
            reference: 'ADM/MAR/003'
        },
        {
            id: 4,
            date: '2024-03-10',
            description: 'Service Tax',
            amount: 750,
            type: 'Tax',
            status: 'Pending',
            reference: 'TAX/MAR/004'
        },
        {
            id: 5,
            date: '2024-03-08',
            description: 'Withdrawal Charges',
            amount: 50,
            type: 'Fee',
            status: 'Processed',
            reference: 'FEE/MAR/005'
        },
    ];

    // Summary statistics
    const summary = {
        totalDeductions: 2650,
        taxDeductions: 2000,
        feeDeductions: 150,
        adminCharges: 500,
        pendingDeductions: 750,
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/my-account/wallet')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-800">Deduction Report</h1>
                    <p className="text-sm text-gray-500 mt-1">View all deductions from your wallet</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-2xl border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingDown className="w-6 h-6 text-red-600" />
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-xl font-black text-gray-800">₹{summary.totalDeductions}</p>
                    <p className="text-xs text-gray-500 mt-1">All Deductions</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-2xl border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                        <FileText className="w-6 h-6 text-amber-600" />
                        <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Tax</span>
                    </div>
                    <p className="text-xl font-black text-gray-800">₹{summary.taxDeductions}</p>
                    <p className="text-xs text-gray-500 mt-1">TDS & Service Tax</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                        <AlertCircle className="w-6 h-6 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Fees</span>
                    </div>
                    <p className="text-xl font-black text-gray-800">₹{summary.feeDeductions}</p>
                    <p className="text-xs text-gray-500 mt-1">Processing Fees</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                        <FileText className="w-6 h-6 text-purple-600" />
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Admin</span>
                    </div>
                    <p className="text-xl font-black text-gray-800">₹{summary.adminCharges}</p>
                    <p className="text-xs text-gray-500 mt-1">Admin Charges</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <AlertCircle className="w-6 h-6 text-gray-600" />
                        <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-xl font-black text-gray-800">₹{summary.pendingDeductions}</p>
                    <p className="text-xs text-gray-500 mt-1">Pending Deductions</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6">
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="thisWeek">This Week</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="custom">Custom Range</option>
                        </select>

                        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
                            <option value="all">All Types</option>
                            <option value="tax">Tax Deductions</option>
                            <option value="fee">Processing Fees</option>
                            <option value="admin">Admin Charges</option>
                        </select>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by reference..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        </div>
                    </div>

                    <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Report
                    </button>
                </div>

                {/* Active Filters */}
                <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs text-gray-500">Active Filters:</span>
                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold flex items-center gap-1">
                        This Month
                        <button className="hover:text-red-800">×</button>
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                        + Add Filter
                    </span>
                </div>
            </div>

            {/* Deductions Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Reference</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {deductions.map((deduction) => (
                                <tr key={deduction.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-800">{deduction.date}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{deduction.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{deduction.reference}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${deduction.type === 'Tax' ? 'bg-amber-100 text-amber-700' :
                                                deduction.type === 'Fee' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                            }`}>
                                            {deduction.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-red-600">-₹{deduction.amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${deduction.status === 'Processed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {deduction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-red-600 hover:text-red-700 text-sm font-bold">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1-5 of 23 deductions</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>

            {/* Deduction Chart or Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-black text-gray-800 mb-4">Deduction Breakdown</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Tax Deductions (TDS)</span>
                                <span className="font-bold text-gray-800">₹1,250</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: '47%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Service Tax</span>
                                <span className="font-bold text-gray-800">₹750</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Processing Fees</span>
                                <span className="font-bold text-gray-800">₹150</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '6%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Admin Charges</span>
                                <span className="font-bold text-gray-800">₹500</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '19%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-black text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {deductions.slice(0, 3).map((deduction) => (
                            <div key={deduction.id} className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${deduction.type === 'Tax' ? 'bg-amber-100' :
                                        deduction.type === 'Fee' ? 'bg-blue-100' : 'bg-purple-100'
                                    }`}>
                                    <TrendingDown className={`w-4 h-4 ${deduction.type === 'Tax' ? 'text-amber-600' :
                                            deduction.type === 'Fee' ? 'text-blue-600' : 'text-purple-600'
                                        }`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">{deduction.description}</p>
                                    <p className="text-xs text-gray-500">{deduction.date}</p>
                                </div>
                                <span className="text-sm font-bold text-red-600">-₹{deduction.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeductionReport;
