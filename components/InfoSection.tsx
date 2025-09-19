
import React from 'react';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="text-center p-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-slate-600">{description}</p>
    </div>
);

const TeamMemberCard: React.FC<{ name: string; role: string }> = ({ name, role }) => (
    <div className="bg-white p-6 shadow-md rounded-lg text-center border border-slate-200/80">
        <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-4">
             <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="rounded-full w-full h-full object-cover" />
        </div>
        <p className="font-semibold text-lg text-slate-800">{name}</p>
        <p className="text-blue-600">{role}</p>
    </div>
);

export const InfoSection: React.FC = () => {
  return (
    <>
      <section className="bg-white py-16 sm:py-20 mt-10 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    title="1. Secure Upload" 
                    description="Drag and drop or select your legal document. All uploads are processed securely." 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                />
                <FeatureCard 
                    title="2. AI Analysis" 
                    description="Our advanced AI model reads and interprets the document, identifying key clauses and potential risks." 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                />
                <FeatureCard 
                    title="3. Clear Results" 
                    description="Receive a simple, color-coded report with actionable insights and plain-language summaries." 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">Our Team</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                <TeamMemberCard name="Alex Johnson" role="AI & Machine Learning" />
                <TeamMemberCard name="Maria Garcia" role="Legal Tech Strategy" />
                <TeamMemberCard name="Sam Chen" role="Full-Stack Engineering" />
            </div>
        </div>
      </section>
    </>
  );
};
