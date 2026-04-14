import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Receipt, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../api';

const ITEMS_PER_PAGE = 10;

const AllTransactionReport = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get('/wallet/all-transactions', {
                params: { search }
            });
            if (res.data.success) {
                setTransactions(res.data.transactions || []);
            }
        } catch {
            setError('Transaction ledger synchronization failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Reset page when filter or search changes
    useEffect(() => { setCurrentPage(1); }, [filterType, search]);

    const filtered = transactions.filter(txn => {
        if (filterType === 'All') return true;
        if (filterType === 'Credit') return txn.txType === 'credit';
        if (filterType === 'Debit') return txn.txType === 'debit';
        return true;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5E6C8] selection:bg-[#C8A96A]/30">
            {/* Header */}
            <div className="bg-[#0D0D0D] border-b border-[#C8A96A]/20 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/my-account/wallet')}
                            className="p-2 hover:bg-[#C8A96A]/10 rounded-xl transition text-[#C8A96A]">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#F5E6C8] tracking-wide uppercase">Transaction Report</h1>
                            <p className="text-xs font-bold text-[#C8A96A]/50 uppercase tracking-wider">Complete Audit History</p>
                        </div>
                    </div>
                    <button onClick={fetchData} className="p-2.5 border border-[#C8A96A]/20 rounded-xl hover:bg-[#C8A96A]/5 transition text-[#C8A96A]">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Filters */}
                <div className="bg-[#1A1A1A] border border-[#C8A96A]/10 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#0D0D0D] border border-[#C8A96A]/10 rounded-lg text-[#C8A96A]/60">
                            <Filter size={14} strokeWidth={2.5} />
                            <span className="text-xs font-bold uppercase tracking-wider">Type:</span>
                        </div>
                        {['All', 'Credit', 'Debit'].map(f => (
                            <button key={f} onClick={() => setFilterType(f)}
                                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all ${filterType === f
                                        ? 'bg-[#C8A96A] text-[#0D0D0D] border-[#C8A96A]'
                                        : 'bg-[#0D0D0D] text-[#C8A96A]/60 border-[#C8A96A]/10 hover:border-[#C8A96A]/30 hover:text-[#C8A96A]'
                                    }`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64 group">
                            <input type="text" placeholder="Search transactions..."
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-lg text-sm font-semibold text-[#F5E6C8] outline-none focus:border-[#C8A96A] transition-all placeholder:text-[#C8A96A]/20" />
                            <Search className="w-4 h-4 text-[#C8A96A]/30 group-focus-within:text-[#C8A96A] absolute left-3 top-3 transition-colors" />
                        </div>

                        <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-[#C8A96A]/5 border border-[#C8A96A]/10 rounded-lg whitespace-nowrap">
                            <span className="text-xs font-bold text-[#C8A96A] uppercase tracking-wider">
                                {filtered.length} Records
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#1A1A1A] border border-[#C8A96A]/10 rounded-2xl overflow-hidden shadow-2xl">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <RefreshCw className="w-8 h-8 animate-spin text-[#C8A96A] mb-4" />
                            <span className="text-sm font-bold text-[#C8A96A]/60 uppercase tracking-wider">Loading Transactions...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 px-4">
                            <p className="text-red-400 font-bold mb-4 text-sm">{error}</p>
                            <button onClick={fetchData} className="px-6 py-2.5 border border-[#C8A96A]/20 rounded-xl text-[#C8A96A] text-sm font-bold hover:bg-[#C8A96A]/5 transition">Try Again</button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24">
                            <Receipt className="w-16 h-16 mx-auto mb-4 text-[#C8A96A]/30" strokeWidth={1} />
                            <p className="text-sm font-bold text-[#C8A96A]/40 uppercase tracking-wider">No Transactions Found</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead className="bg-[#0D0D0D] border-b border-[#C8A96A]/15">
                                        <tr>
                                            {['S.No', 'Date', 'Type', 'Amount', 'Source', 'Details'].map(h => (
                                                <th key={h} className="px-6 py-4 text-left text-xs font-bold text-[#C8A96A] uppercase tracking-wider">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#C8A96A]/5">
                                        {paginatedData.map((txn, index) => (
                                            <tr key={txn._id || index} className="group hover:bg-[#C8A96A]/[0.03] transition-colors">
                                                <td className="px-6 py-4 text-[#C8A96A]/40 font-mono text-sm font-semibold">{startIdx + index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-sm text-[#F5E6C8]">{formatDate(txn.date)}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-lg text-xs font-bold uppercase tracking-wider ${txn.txType === 'credit'
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                        }`}>
                                                        {txn.txType === 'credit' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                        {txn.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-base font-black ${txn.txType === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {txn.txType === 'credit' ? '+' : '-'}₹{txn.amount?.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-sm text-[#F5E6C8]/70 uppercase tracking-wider truncate max-w-[180px]">{txn.source || 'Internal'}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[#C8A96A]/50 font-medium group-hover:text-[#C8A96A]/80 transition-colors max-w-[250px] truncate">
                                                    {txn.details || 'System Generated'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-[#C8A96A]/5">
                                {paginatedData.map((txn, index) => (
                                    <div key={txn._id || index} className="p-4 hover:bg-[#C8A96A]/[0.03] transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="text-base font-bold text-[#F5E6C8]">{formatDate(txn.date)}</p>
                                                <p className="text-xs font-semibold text-[#C8A96A]/50 uppercase tracking-wider mt-0.5">{txn.source || 'Internal'}</p>
                                            </div>
                                            <span className={`text-lg font-black ${txn.txType === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                                                {txn.txType === 'credit' ? '+' : '-'}₹{txn.amount?.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[11px] font-bold uppercase tracking-wider ${txn.txType === 'credit'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                }`}>
                                                {txn.txType === 'credit' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                {txn.type}
                                            </div>
                                            <p className="text-xs text-[#C8A96A]/40 font-medium truncate max-w-[50%] text-right">
                                                {txn.details || 'System Generated'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Pagination */}
                {!loading && !error && filtered.length > ITEMS_PER_PAGE && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                        <p className="text-sm font-semibold text-[#C8A96A]/50">
                            Showing <span className="text-[#C8A96A] font-bold">{startIdx + 1}</span> - <span className="text-[#C8A96A] font-bold">{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-[#C8A96A] font-bold">{filtered.length}</span> records
                        </p>

                        <div className="flex items-center gap-1.5">
                            {/* Prev */}
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2.5 rounded-xl border transition-all ${currentPage === 1
                                    ? 'border-[#C8A96A]/5 text-[#C8A96A]/15 cursor-not-allowed'
                                    : 'border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A]/10'
                                }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Page Numbers */}
                            {getPageNumbers()[0] > 1 && (
                                <>
                                    <button onClick={() => goToPage(1)}
                                        className="w-10 h-10 rounded-xl border border-[#C8A96A]/10 text-sm font-bold text-[#C8A96A]/60 hover:bg-[#C8A96A]/10 hover:text-[#C8A96A] transition-all">
                                        1
                                    </button>
                                    {getPageNumbers()[0] > 2 && <span className="text-[#C8A96A]/30 px-1">...</span>}
                                </>
                            )}

                            {getPageNumbers().map(page => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === currentPage
                                        ? 'bg-[#C8A96A] text-[#0D0D0D] border border-[#C8A96A]'
                                        : 'border border-[#C8A96A]/10 text-[#C8A96A]/60 hover:bg-[#C8A96A]/10 hover:text-[#C8A96A]'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                                <>
                                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="text-[#C8A96A]/30 px-1">...</span>}
                                    <button onClick={() => goToPage(totalPages)}
                                        className="w-10 h-10 rounded-xl border border-[#C8A96A]/10 text-sm font-bold text-[#C8A96A]/60 hover:bg-[#C8A96A]/10 hover:text-[#C8A96A] transition-all">
                                        {totalPages}
                                    </button>
                                </>
                            )}

                            {/* Next */}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2.5 rounded-xl border transition-all ${currentPage === totalPages
                                    ? 'border-[#C8A96A]/5 text-[#C8A96A]/15 cursor-not-allowed'
                                    : 'border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A]/10'
                                }`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between py-6 border-t border-[#C8A96A]/5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-[#C8A96A]/40 uppercase tracking-wider">Ledger Verified</span>
                    </div>
                    <span className="text-xs font-semibold text-[#C8A96A]/20 uppercase tracking-wider hidden sm:block">Sanyukt Parivaar</span>
                </div>
            </div>
        </div>
    );
};

export default AllTransactionReport;
