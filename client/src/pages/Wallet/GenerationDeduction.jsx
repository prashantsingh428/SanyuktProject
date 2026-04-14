import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const GenerationDeduction = () => {
    const navigate = useNavigate();
    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/my-account/wallet/generation')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-gray-800">Generation Deductions</h1>
                    <p className="text-sm text-gray-500">TDS/Admin charges on your earnings</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-center p-20">
                <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-800 mb-2">Detailed Reports Loading...</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Currently, deduction details are included in the main transaction history. Specific deduction reports for Generation Wallet are being synchronized.</p>
            </div>
        </div>
    );
};

export default GenerationDeduction;
