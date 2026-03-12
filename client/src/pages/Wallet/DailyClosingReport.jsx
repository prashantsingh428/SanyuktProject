import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    Wallet,
    PieChart,
    BarChart3,
    CheckCircle,
    Clock,
    IndianRupee
} from 'lucide-react';

const DailyClosingReport = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Sample daily closing data
    const closingData = {
        date: '2024-03-15',
        openingBalance: 25000,
        closingBalance: 32450,
        totalCredits: 12450,
        totalDebits: 5000,
        netChange: 7450,
        transactions: {
            total: 28,
            successful: 26,
            failed: 2,
            pending: 0,
        },
        breakdown: {
            commissions: 8500,
            bonuses: 2500,
            withdrawals: 4000,
            deductions: 1000,
            transfers: 500,
        }
    };

    // Sample daily transactions
    const dailyTransactions = [
        { id: 1, time: '09:30 AM', type: 'Credit', description: 'Level Income', amount: 500, status: 'Success' },
        { id: 2, time: '10:15 AM', type: 'Credit', description: 'Sponsor Bonus', amount: 350, status: 'Success' },
        { id: 3, time: '11:00 AM', type: 'Debit', description: 'Withdrawal Request', amount: 2000, status: 'Success' },
        { id: 4, time: '01:30 PM', type: 'Credit', description: 'Royalty Bonus', amount: 1000, status: 'Success' },
        { id: 5, time: '02:45 PM', type: 'Debit', description: 'TDS Deduction', amount: 250, status: 'Success' },
        { id: 6, time: '03:20 PM', type: 'Credit', description: 'Repurchase Commission', amount: 750, status: 'Success' },
        { id: 7, time: '04:00 PM', type: 'Credit', description: 'Direct Referral', amount: 300, status: 'Pending' },
        { id: 8, time: '05:30 PM', type: 'Debit', description: 'Processing Fee', amount: 50, status: 'Success' },
    ];

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
                    <h1 className="text-2xl md:text-3xl font-black text-gray-800">Daily Closing Report</h1>
                    <p className="text-sm text-gray-500 mt-1">End of day wallet summary and statistics</p>
                </div>
            </div>

            {/* Date Selector */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6">
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                            Print
                        </button>
                    </div>
                </div>
            </div>

            {/* Balance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                        <Wallet className="w-8 h-8 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Opening</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹{closingData.openingBalance.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Opening Balance</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                        <Wallet className="w-8 h-8 text-green-600" />
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Closing</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹{closingData.closingBalance.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Closing Balance</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Credits</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹{closingData.totalCredits.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Credits</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingDown className="w-8 h-8 text-red-600" />
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">Debits</span>
                    </div>
                    <p className="text-2xl font-black text-gray-800">₹{closingData.totalDebits.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Debits</p>
                </div>
            </div>

            {/* Net Change and Transaction Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl ${closingData.netChange >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                            {closingData.netChange >= 0 ? (
                                <TrendingUp className={`w-6 h-6 ${closingData.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                            ) : (
                                <TrendingDown className={`w-6 h-6 ${closingData.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Net Change</p>
                            <p className={`text-2xl font-black ${closingData.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {closingData.netChange >= 0 ? '+' : '-'}₹{Math.abs(closingData.netChange).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-500 mb-2">Closing Balance Change</p>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${closingData.netChange >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
                                style={{ width: `${Math.min(Math.abs((closingData.netChange / closingData.openingBalance) * 100), 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 md:col-span-2">
                    <h3 className="font-black text-gray-800 mb-4">Transaction Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-black text-gray-800">{closingData.transactions.total}</div>
                            <p className="text-xs text-gray-500">Total Transactions</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-green-600">{closingData.transactions.successful}</div>
                            <p className="text-xs text-gray-500">Successful</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-red-600">{closingData.transactions.failed}</div>
                            <p className="text-xs text-gray-500">Failed</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-yellow-600">{closingData.transactions.pending}</div>
                            <p className="text-xs text-gray-500">Pending</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Success Rate</span>
                            <span className="text-sm font-bold text-green-600">
                                {((closingData.transactions.successful / closingData.transactions.total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breakdown and Daily Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Breakdown Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-black text-gray-800 mb-4">Income/Expense Breakdown</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Commissions</span>
                                <span className="font-bold text-green-600">+₹{closingData.breakdown.commissions}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Bonuses</span>
                                <span className="font-bold text-green-600">+₹{closingData.breakdown.bonuses}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-400 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Withdrawals</span>
                                <span className="font-bold text-red-600">-₹{closingData.breakdown.withdrawals}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Deductions</span>
                                <span className="font-bold text-red-600">-₹{closingData.breakdown.deductions}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-400 rounded-full" style={{ width: '14%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Transfers</span>
                                <span className="font-bold text-blue-600">±₹{closingData.breakdown.transfers}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '7%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Transactions List */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-black text-gray-800">Daily Transactions</h3>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                        {dailyTransactions.map((transaction) => (
                            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${transaction.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'
                                            }`}>
                                            {transaction.type === 'Credit' ? (
                                                <TrendingUp className={`w-4 h-4 ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`} />
                                            ) : (
                                                <TrendingDown className={`w-4 h-4 ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{transaction.description}</p>
                                            <p className="text-xs text-gray-500">{transaction.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount}
                                        </p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${transaction.status === 'Success' ? 'bg-green-100 text-green-700' :
                                                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary Footer */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-blue-100 text-sm mb-1">Report Generated</p>
                        <p className="text-lg font-bold">{new Date().toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-blue-100 text-sm mb-1">Closing Balance</p>
                        <p className="text-2xl font-black">₹{closingData.closingBalance.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-blue-100 text-sm mb-1">Next Business Day</p>
                        <p className="text-lg font-bold">March 16, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyClosingReport;
