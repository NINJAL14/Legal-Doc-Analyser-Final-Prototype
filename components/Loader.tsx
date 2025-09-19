
import React from 'react';

const messages = [
    "Initializing AI legal circuits...",
    "Cross-referencing legal statutes...",
    "Scanning for ambiguous language...",
    "Identifying potential liabilities...",
    "Compiling risk assessment report...",
    "Finalizing recommendations..."
];

export const Loader: React.FC = () => {
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-4 rounded-lg bg-slate-50 border border-slate-200">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-700">Analyzing Document</p>
        <p className="text-slate-500 mt-1 transition-opacity duration-500">{message}</p>
    </div>
  );
};
