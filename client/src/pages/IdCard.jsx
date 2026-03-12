import React from 'react';
import { Contact } from 'lucide-react';

const IdCard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Contact className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My ID Card</h2>
            <p className="text-gray-600 max-w-md">
                Your digital ID card is being prepared. It will be available for download once your KYC is verified.
            </p>
            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500">
                ID card generation module is pending sync.
            </div>
        </div>
    );
};

export default IdCard;
