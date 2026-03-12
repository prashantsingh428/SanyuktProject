import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, Award, Target } from 'lucide-react';

const LeadershipFund = () => {
    const navigate = useNavigate();

    const leadershipStats = {
        totalEarned: 15000,
        teamSize: 150,
        qualifiedLeaders: 5,
        monthlyTarget: 50000,
        currentAchieved: 35000,
    };

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
                    <h1 className="text-2xl md:text-3xl font-black text-gray-800">Leadership Fund</h1>
                    <p className="text-sm text-gray-500 mt-1">Rewards for building strong teams</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <Award className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-2xl font-black text-gray-800">₹{leadershipStats.totalEarned}</p>
                    <p className="text-xs text-gray-500">Leadership Earnings</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-2xl font-black text-gray-800">{leadershipStats.teamSize}</p>
                    <p className="text-xs text-gray-500">Team Members</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-2xl font-black text-gray-800">{leadershipStats.qualifiedLeaders}</p>
                    <p className="text-xs text-gray-500">Qualified Leaders</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                    <Target className="w-8 h-8 text-amber-600 mb-2" />
                    <p className="text-2xl font-black text-gray-800">{((leadershipStats.currentAchieved / leadershipStats.monthlyTarget) * 100).toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">Monthly Target</p>
                </div>
            </div>

            {/* Leadership Levels */}
            <h3 className="text-lg font-black text-gray-800 mb-4">Leadership Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Bronze Leader', 'Silver Leader', 'Gold Leader', 'Platinum Leader'].map((level, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between">
                        <div>
                            <h4 className="font-black text-gray-800">{level}</h4>
                            <p className="text-sm text-gray-500">Requires {10 * (index + 1)} leaders</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${index < 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {index < 2 ? 'Qualified' : 'In Progress'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadershipFund;
