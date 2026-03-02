import React, { useEffect, useState } from 'react';
import { Calendar, Target, Trophy, DollarSign, TrendingUp, Star, Award, Clock, Users, Package, ShoppingCart, Activity, Download, RefreshCw } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import api from '../../api';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week'); // week, month, year

    // Data states
    const [userStats, setUserStats] = useState({
        total: 0,
        active: 0,
        newToday: 0,
        growth: 0,
        chartData: []
    });

    const [productStats, setProductStats] = useState({
        total: 0,
        outOfStock: 0,
        topSelling: [],
        revenue: 0,
        chartData: []
    });

    const [orderStats, setOrderStats] = useState({
        total: 0,
        pending: 0,
        completed: 0,
        revenue: 0,
        chartData: []
    });

    const [recentActivity, setRecentActivity] = useState([]);

    // Fetch dashboard data
    useEffect(() => {
        fetchDashboardData();
    }, [timeRange]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch all data in parallel
            const [usersRes, productsRes, ordersRes, activityRes] = await Promise.all([
                api.get('/admin/stats/users?range=' + timeRange),
                api.get('/admin/stats/products?range=' + timeRange),
                api.get('/admin/stats/orders?range=' + timeRange),
                api.get('/admin/activity/recent')
            ]);

            // Update states with real data
            if (usersRes.data) {
                setUserStats(usersRes.data);
            }

            if (productsRes.data) {
                setProductStats(productsRes.data);
            }

            if (ordersRes.data) {
                setOrderStats(ordersRes.data);
            }

            if (activityRes.data) {
                setRecentActivity(activityRes.data);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Use demo data if API fails
            setDemoData();
        } finally {
            setLoading(false);
        }
    };

    // Demo data for development
    const setDemoData = () => {
        // Demo user stats
        setUserStats({
            total: 1250,
            active: 890,
            newToday: 24,
            growth: 12.5,
            chartData: [65, 78, 90, 85, 95, 110, 125, 140, 155, 170, 185, 200]
        });

        // Demo product stats
        setProductStats({
            total: 156,
            outOfStock: 12,
            topSelling: [
                { name: 'Vitamin C Cream', sales: 245, revenue: 85675 },
                { name: 'Sunscreen SPF 50', sales: 198, revenue: 64350 },
                { name: 'Anti-Aging Cream', sales: 167, revenue: 83333 },
                { name: 'Aloe Vera Gel', sales: 145, revenue: 28855 }
            ],
            revenue: 385000,
            chartData: [45, 52, 48, 70, 65, 80, 95, 88, 92, 110, 125, 140]
        });

        // Demo order stats
        setOrderStats({
            total: 892,
            pending: 45,
            completed: 812,
            revenue: 425000,
            chartData: [30, 45, 38, 52, 48, 65, 72, 68, 85, 92, 105, 118]
        });

        // Demo recent activity
        setRecentActivity([
            { id: 1, user: 'John Doe', action: 'placed an order', product: 'Vitamin C Cream', time: '5 minutes ago', amount: 375 },
            { id: 2, user: 'Jane Smith', action: 'registered as new user', time: '15 minutes ago' },
            { id: 3, user: 'Bob Johnson', action: 'purchased', product: 'Sunscreen SPF 50', time: '1 hour ago', amount: 325 },
            { id: 4, user: 'Alice Brown', action: 'withdrawn', amount: 5000, time: '2 hours ago' },
            { id: 5, user: 'Charlie Wilson', action: 'placed an order', product: 'Anti-Aging Cream', time: '3 hours ago', amount: 499 }
        ]);
    };

    // Chart configurations
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#0A7A2F',
                titleColor: 'white',
                bodyColor: 'white'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e5e7eb'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    const userChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Users',
                data: userStats.chartData,
                borderColor: '#0A7A2F',
                backgroundColor: 'rgba(10, 122, 47, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const productChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Products Sold',
                data: productStats.chartData,
                backgroundColor: '#F7931E',
                borderRadius: 6
            }
        ]
    };

    const orderChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Orders',
                data: orderStats.chartData,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true
            }
        ]
    };

    const pieChartData = {
        labels: ['Active Users', 'Inactive Users', 'Pending'],
        datasets: [
            {
                data: [
                    userStats.active,
                    userStats.total - userStats.active,
                    userStats.newToday
                ],
                backgroundColor: ['#4CAF50', '#f44336', '#ff9800'],
                borderWidth: 0
            }
        ]
    };

    return (
        <div className="space-y-6">
            {/* Header with Refresh */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <div className="flex items-center space-x-4">
                    {/* Time Range Selector */}
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>

                    <button
                        onClick={fetchDashboardData}
                        disabled={loading}
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Users Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                            +{userStats.growth}%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-1">{userStats.total}</h3>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-green-600">{userStats.active} Active</span>
                        <span className="text-blue-600">{userStats.newToday} New Today</span>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Package className="h-6 w-6 text-orange-600" />
                        </div>
                        <span className="text-sm text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded">
                            {productStats.outOfStock} Out of Stock
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-1">{productStats.total}</h3>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">Top Seller: {productStats.topSelling[0]?.name}</p>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
                            {orderStats.pending} Pending
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-1">{orderStats.total}</h3>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">{orderStats.completed} Completed</p>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-1">
                        ₹{(productStats.revenue + orderStats.revenue).toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <div className="mt-4 flex justify-between text-sm">
                        <span>Products: ₹{productStats.revenue.toLocaleString()}</span>
                        <span>Orders: ₹{orderStats.revenue.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users Growth Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">User Growth</h3>
                        <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64">
                        <Line data={userChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Products Sales Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Product Sales</h3>
                        <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64">
                        <Bar data={productChartData} options={lineChartOptions} />
                    </div>
                </div>
            </div>

            {/* Second Row - Orders Chart and User Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Orders Chart - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Order Trends</h3>
                        <ShoppingCart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64">
                        <Line data={orderChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* User Distribution Pie Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">User Distribution</h3>
                        <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64">
                        <Doughnut data={pieChartData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }} />
                    </div>
                </div>
            </div>

            {/* Top Selling Products Table */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Top Selling Products</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Units Sold</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productStats.topSelling.map((product, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-green-50">
                                    <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{product.sales} units</td>
                                    <td className="py-3 px-4 text-green-600 font-semibold">₹{product.revenue.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <TrendingUp className={`h-4 w-4 ${index < 2 ? 'text-green-600' : 'text-orange-500'}`} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Users className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {activity.user} <span className="text-gray-500">{activity.action}</span>
                                        {activity.product && (
                                            <span className="text-green-600 font-semibold"> {activity.product}</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                            {activity.amount && (
                                <span className="text-sm font-semibold text-green-600">
                                    ₹{activity.amount.toLocaleString()}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;