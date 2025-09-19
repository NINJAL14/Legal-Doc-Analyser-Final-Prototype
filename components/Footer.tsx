
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 text-center p-6 mt-10">
      <p>&copy; {new Date().getFullYear()} AI Legal Analyzer. All rights reserved.</p>
      <p className="text-sm text-slate-400 mt-1">Disclaimer: This tool provides AI-generated analysis and is not a substitute for professional legal advice.</p>
    </footer>
  );
};
