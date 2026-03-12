import React from 'react';
import { Mail } from 'lucide-react';

const WelcomeLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Letter</h2>
            <p className="text-gray-600 max-w-md">
                Your official welcome letter is being generated. Please check back shortly to download it.
            </p>
            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500">
                Component logic is ready for integration.
            </div>
        </div>
    );
};

export default WelcomeLetter;
