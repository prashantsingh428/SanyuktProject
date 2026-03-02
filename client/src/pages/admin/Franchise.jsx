import React, { useEffect, useState } from "react";
import api from "../../api";
import { motion } from "framer-motion";
import { Building2, User, Phone, MapPin, Key, Plus, Eye, EyeOff, Copy, CheckCircle } from "lucide-react";

const AdminFranchise = () => {
    const [form, setForm] = useState({
        franchiseId: "",
        name: "",
        mobile: "",
        address: "",
        password: "",
    });

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({});
    const [copied, setCopied] = useState("");

    // =====================
    // INPUT CHANGE
    // =====================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // =====================
    // COPY TO CLIPBOARD
    // =====================
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(""), 2000);
    };

    // =====================
    // ADD FRANCHISE
    // =====================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate form
            if (!form.franchiseId || !form.name || !form.mobile || !form.address || !form.password) {
                alert("Please fill all fields");
                setLoading(false);
                return;
            }

            await api.post("/franchises/add", form); // Note: franchises vs franchise

            alert("Franchise Added Successfully ✅");

            setForm({
                franchiseId: "",
                name: "",
                mobile: "",
                address: "",
                password: "",
            });

            loadData();

        } catch (err) {
            console.error("Add Error:", err);
            alert(err.response?.data?.message || "Error Adding Franchise");
        } finally {
            setLoading(false);
        }
    };

    // =====================
    // ADMIN LIST
    // =====================
    const loadData = async () => {
        try {
            const res = await api.get("/franchises/admin-list"); // Note: franchises vs franchise
            setList(res.data);
        } catch (err) {
            console.error("Load Error:", err);
            alert("Error loading franchise list");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Toggle password visibility
    const togglePassword = (id) => {
        setShowPasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-blue-600" />
                        Admin Franchise Panel
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your franchise partners</p>
                </motion.div>

                {/* Add Franchise Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-green-600" />
                        Add New Franchise
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Franchise ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Franchise ID
                            </label>
                            <input
                                type="text"
                                name="franchiseId"
                                value={form.franchiseId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter Franchise ID"
                                required
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Franchise Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter Name"
                                required
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter Mobile"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter Address"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter Password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    "Add Franchise"
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Franchise List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Franchise List (Admin Only)
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mobile</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                            No franchises found
                                        </td>
                                    </tr>
                                ) : (
                                    list.map((item, index) => (
                                        <motion.tr
                                            key={item._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.franchiseId}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.mobile}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.address}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-gray-600">
                                                        {showPasswords[item._id] ? item.password : "••••••••"}
                                                    </span>
                                                    <button
                                                        onClick={() => togglePassword(item._id)}
                                                        className="text-gray-400 hover:text-blue-600 transition"
                                                    >
                                                        {showPasswords[item._id] ?
                                                            <EyeOff className="w-4 h-4" /> :
                                                            <Eye className="w-4 h-4" />
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={() => copyToClipboard(item.password, item._id)}
                                                        className="text-gray-400 hover:text-green-600 transition"
                                                    >
                                                        {copied === item._id ?
                                                            <CheckCircle className="w-4 h-4 text-green-500" /> :
                                                            <Copy className="w-4 h-4" />
                                                        }
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Total Franchises: <span className="font-semibold">{list.length}</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminFranchise;