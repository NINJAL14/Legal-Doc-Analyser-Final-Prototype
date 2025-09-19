
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">AI-Powered Legal Document Analyzer</h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
                Upload contracts, policies, or agreements and uncover hidden risks, ambiguities, and non-standard clauses in seconds.
            </p>
        </div>
    </header>
  );
};
