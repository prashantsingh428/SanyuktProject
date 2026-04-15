import React from 'react';

/**
 * A small, centered spinner for use inside buttons.
 */
export const ButtonLoader = ({ color = '#0D0D0D' }) => (
    <div className="flex items-center justify-center w-full h-full">
        <div 
            className="w-5 h-5 animate-spin rounded-full border-2 border-transparent border-t-current"
            style={{ color }}
        />
    </div>
);

/**
 * A large, centered spinner for entire sections or cards.
 */
export const SectionLoader = ({ text = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center py-12 w-full">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#2b2b2b] border-t-[#c8a96a] mb-4" />
        {text && (
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#c8a96a]">
                {text}
            </span>
        )}
    </div>
);

const Loader = {
    Button: ButtonLoader,
    Section: SectionLoader
};

export default Loader;
