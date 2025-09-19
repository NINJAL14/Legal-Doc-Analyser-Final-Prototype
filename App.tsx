
import React, { useState } from 'react';
import type { AnalysisResult } from './types';
import { analyzeDocument } from './services/geminiService';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { Loader } from './components/Loader';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const result = await analyzeDocument(selectedFile.name);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the document. Please ensure your API key is configured correctly and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80">
          {!file ? (
            <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-700">Analysis Dashboard</h2>
                  <p className="text-slate-500 mt-1">File: <span className="font-medium text-slate-600">{file.name}</span></p>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Analyze Another
                </button>
              </div>

              {isLoading && <Loader />}
              {error && <ErrorDisplay message={error} />}
              {analysisResult && <AnalysisResultDisplay result={analysisResult} />}
            </div>
          )}
        </div>
      </main>
      <InfoSection />
      <Footer />
    </div>
  );
}

export default App;
