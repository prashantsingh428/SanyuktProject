import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Download, Search,
    TrendingDown, AlertCircle, FileText, RefreshCw, Filter, ChevronRight
} from 'lucide-react';
import api from '../../api';

const DeductionReport = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState('thisMonth');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState({
        totalDeductions: 0, taxDeductions: 0,
        feeDeductions: 0, adminDeductions: 0, pendingDeductions: 0
    });
    const [deductions, setDeductions] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get('/wallet/deduction-report', {
                params: { period: dateRange, type: typeFilter, search: searchTerm }
            });
            if (res.data.success) {
                setSummary(res.data.summary);
                setDeductions(res.data.deductions);
            }
        } catch {
            setError('Synchronization of deduction ledger failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [dateRange, typeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => { fetchData(); }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5E6C8] selection:bg-[#C8A96A]/30 font-bold">
            {/* Header */}
            <div className="bg-[#0D0D0D] border-b border-[#C8A96A]/20 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/my-account/wallet')}
                            className="p-1.5 hover:bg-[#C8A96A]/10 rounded-lg transition text-[#C8A96A]">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-serif font-bold text-[#F5E6C8] tracking-widest uppercase">Deduction Registry</h1>
                            <p className="text-[10px] font-black text-[#C8A96A] uppercase tracking-[0.22em]">Compliance & Protocol Fees</p>
                        </div>
                    </div>
                    <button onClick={fetchData} className="p-2 luxury-box border-[#C8A96A]/20 hover:bg-[#C8A96A]/5 transition text-[#C8A96A]">
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {[
                        { label: 'GROSS DEDUCTIONS', value: summary.totalDeductions, badge: 'Total', icon: TrendingDown },
                        { label: 'GOVERNMENT LEVY', value: summary.taxDeductions, badge: 'Tax', icon: FileText },
                        { label: 'LATTICE FEES', value: summary.feeDeductions, badge: 'Fees', icon: AlertCircle },
                        { label: 'ADMIN OVERHEAD', value: summary.adminDeductions, badge: 'Admin', icon: FileText },
                        { label: 'PENDING VERIFY', value: summary.pendingDeductions, badge: 'Hold', icon: RefreshCw },
                    ].map((card, i) => (
                        <div key={i} className="luxury-box p-3 bg-[#0B0B0B] border-[#C8A96A]/30 group hover:border-[#C8A96A] transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <card.icon className="w-4 h-4 text-[#C8A96A] transition-colors" />
                                <div className="px-2 py-0.5 border border-[#C8A96A]/40 text-[9px] font-black text-[#C8A96A] uppercase tracking-tight">{card.badge}</div>
                            </div>
                            <p className="text-3xl font-serif font-bold text-[#F5E6C8]">₹{card.value?.toLocaleString() || 0}</p>
                            <p className="text-[11px] font-black text-[#C8A96A] uppercase tracking-[0.12em] mt-0.5">{card.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="luxury-box p-3 bg-[#0B0B0B] border-[#C8A96A]/30 mb-6 font-black uppercase text-[11px] tracking-[0.12em] text-[#C8A96A] shadow-xl">
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-2 px-3 py-2 bg-[#0D0D0D] border border-[#C8A96A]/10 text-[#C8A96A]">
                                <Filter size={12} strokeWidth={3} />
                                <span>CRITERIA:</span>
                            </div>
                            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
                                className="px-3 py-2 bg-[#0D0D0D] border border-[#C8A96A]/40 text-[#F5E6C8] text-[13px] font-black outline-none focus:border-[#C8A96A] transition cursor-pointer">
                                <option value="thisMonth">Current Epoch</option>
                                <option value="lastMonth">Previous Epoch</option>
                                <option value="last3Months">90-Day Range</option>
                            </select>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-2 bg-[#0D0D0D] border border-[#C8A96A]/40 text-[#F5E6C8] text-[13px] font-black outline-none focus:border-[#C8A96A] transition cursor-pointer">
                                <option value="All Types">All Protocols</option>
                                <option value="Tax">Government Levy</option>
                                <option value="Fee">Protocol Fees</option>
                                <option value="Admin">Admin Overhead</option>
                            </select>
                            <div className="relative flex-1 md:w-64">
                                <input type="text" placeholder="MANIFEST REF..."
                                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] border border-[#C8A96A]/40 text-[#F5E6C8] text-[13px] font-black outline-none focus:border-[#C8A96A] transition placeholder:text-[#C8A96A]/70" />
                                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#C8A96A]" />
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-5 py-2 bg-[#C8A96A] text-[#0D0D0D] text-[13px] font-black shadow-lg hover:shadow-[#C8A96A]/20 transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" strokeWidth={3} /> EXPORT LEDGER
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="luxury-box bg-[#0B0B0B] border-[#C8A96A]/30 overflow-hidden shadow-2xl animate-fade-in">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <RefreshCw className="w-8 h-8 animate-spin text-[#C8A96A] mb-4" />
                            <span className="text-[13px] font-black text-[#C8A96A] uppercase tracking-[0.12em]">Compiling Registry Data...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 px-4">
                            <p className="text-red-400 font-bold mb-4 uppercase text-[13px] tracking-[0.12em]">{error}</p>
                            <button onClick={fetchData} className="px-5 py-2 border border-[#C8A96A]/20 text-[#C8A96A] text-[12px] font-black uppercase tracking-[0.12em] hover:bg-[#C8A96A]/5 transition">Restore Sync</button>
                        </div>
                    ) : deductions.length === 0 ? (
                        <div className="text-center py-24 px-4">
                            <TrendingDown className="w-16 h-16 mx-auto mb-4 text-[#C8A96A]" strokeWidth={1} />
                            <p className="text-[13px] font-black text-[#C8A96A] uppercase tracking-[0.16em]">Zero Deduction Vectors Identified</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-[#0D0D0D] border-b border-[#C8A96A]/10">
                                        {['TIMESTAMP', 'PROTOCOL DESC', 'REF ID', 'CATEGORY', 'ADJUSTMENT', 'STATUS', 'VERIFY'].map(h => (
                                            <th key={h} className="px-6 py-4 text-left text-[12px] font-black text-[#C8A96A] uppercase tracking-[0.12em]">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C8A96A]/5">
                                    {deductions.map((d) => (
                                        <tr key={d._id} className="group hover:bg-[#C8A96A]/[0.02] transition-colors">
                                            <td className="px-6 py-4 text-[13px] font-bold text-[#F5E6C8]">
                                                {formatDate(d.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[13px] font-black uppercase text-[#F5E6C8] tracking-wide">{d.description}</p>
                                                <p className="text-[10px] font-black text-[#C8A96A] mt-0.5 tracking-[0.1em]">SYSTEM DEDUCTION</p>
                                            </td>
                                            <td className="px-6 py-4 text-[12px] font-mono font-bold text-[#C8A96A] transition-colors uppercase">
                                                {d.referenceNo}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] border border-current ${
                                                    d.type === 'Tax' ? 'text-green-500' :
                                                    d.type === 'Fee' ? 'text-[#C8A96A]' : 'text-purple-500'
                                                }`}>
                                                    {d.type}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-lg font-black text-red-500">
                                                -₹{d.amount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] border ${
                                                    d.status === 'Processed' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5'
                                                }`}>
                                                    {d.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-[11px] font-black text-[#C8A96A] hover:text-[#F5E6C8] flex items-center gap-1 transition-all uppercase tracking-[0.08em]">
                                                    Audit <ChevronRight size={12} strokeWidth={3} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="text-center text-[10px] font-black text-[#C8A96A]/80 uppercase tracking-[0.3em] mt-16 pb-8">
                    Lattice Financial Integrity • End of Ledger
                </p>
            </div>
        </div>
    );
};

export default DeductionReport;
