
import React from 'react';
import type { AnalysisResult, Finding } from '../types';
import { FindingSeverity } from '../types';

const severityConfig = {
    [FindingSeverity.Critical]: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        )
    },
    [FindingSeverity.Warning]: {
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-200',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        )
    },
    [FindingSeverity.Compliant]: {
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        )
    }
};

const FindingCard: React.FC<{ finding: Finding }> = ({ finding }) => {
    const config = severityConfig[finding.severity] || severityConfig[FindingSeverity.Warning];
    return (
        <div className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 pt-0.5">{config.icon}</div>
                <div>
                    <p className={`text-sm font-bold ${config.textColor}`}>{finding.severity}: Clause {finding.clause}</p>
                    <p className="mt-1 text-sm text-slate-700">{finding.risk_summary}</p>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                        <span className="font-bold">Recommendation:</span> {finding.recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const AnalysisResultDisplay: React.FC<{ result: AnalysisResult }> = ({ result }) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Overall Summary</h3>
                <p className="mt-2 text-slate-600 bg-slate-50 p-4 rounded-md border border-slate-200">
                    <span className="font-semibold">Document Type:</span> {result.document_type}<br />
                    {result.overall_summary}
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Findings</h3>
                <div className="space-y-4">
                    {result.key_findings.sort((a, b) => {
                        const order = { 'Critical': 0, 'Warning': 1, 'Compliant': 2 };
                        return order[a.severity] - order[b.severity];
                    }).map((finding, index) => (
                        <FindingCard key={index} finding={finding} />
                    ))}
                </div>
            </div>
        </div>
    );
};
