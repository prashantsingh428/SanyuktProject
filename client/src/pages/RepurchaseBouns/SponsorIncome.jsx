import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Users, TrendingUp, Gift } from 'lucide-react';

const SponsorIncome = () => {
    const navigate = useNavigate();

    const sponsorEarnings = [
        { id: 1, date: '2024-03-15', sponsor: 'Rajesh Kumar', amount: 500, level: 'Direct', status: 'Credited' },
        { id: 2, date: '2024-03-14', sponsor: 'Priya Singh', amount: 350, level: 'Direct', status: 'Credited' },
        { id: 3, date: '2024-03-12', sponsor: 'Amit Patel', amount: 250, level: 'Indirect', status: 'Pending' },
    ];

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/my-account/bonus/repurchase')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-800">Sponsor Income</h1>
                    <p className="text-sm text-gray-500 mt-1">Earnings from your sponsored members</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <UserPlus className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-3xl font-black text-gray-800">₹1,100</p>
                    <p className="text-xs text-gray-500">Total Sponsor Income</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-3xl font-black text-gray-800">12</p>
                    <p className="text-xs text-gray-500">Active Sponsors</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <Gift className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-3xl font-black text-gray-800">8%</p>
                    <p className="text-xs text-gray-500">Avg. Commission</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Sponsor</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Level</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sponsorEarnings.map((earning) => (
                                <tr key={earning.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">{earning.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{earning.sponsor}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600">₹{earning.amount}</td>
                                    <td className="px-6 py-4 text-sm">{earning.level}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${earning.status === 'Credited'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {earning.status}
                                        </span>
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

export default SponsorIncome;
