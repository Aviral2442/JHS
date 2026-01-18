import React, { useState } from 'react';
import { PolicyHeader, PolicySectionComponent, ContactSection, DownloadSection } from './PolicyComponents';
import { FileText } from 'react-feather';

const TermsOfServicePage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['agreement']));

  const termsSections = [
    { id: 'agreement', title: 'Agreement to Terms', content: 'By accessing or using our services, you agree to be bound by these Terms of Service.' },
    { id: 'user-obligations', title: 'User Obligations', content: 'You agree to use our services only for lawful purposes.' }
  ];

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Terms of Service" description="The rules and guidelines for using our services." icon={<FileText size={32} />} />

        <div className="flex flex-col gap-8">
          {/* <div className="lg:w-1/4">
            <TableOfContents sections={termsSections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div> */}
          <div className="">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to ShopCart</h2>
              <p className="text-gray-600">These Terms of Service govern your use of the ShopCart website and services.</p>
            </div>

            {termsSections.map((s) => (
              <PolicySectionComponent key={s.id} section={s as any} isExpanded={expandedSections.has(s.id)} onToggle={() => toggleSection(s.id)} />
            ))}

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Governing Law</h3>
              <p className="text-gray-600">These Terms shall be governed and construed in accordance with the laws of the State of New York.</p>
            </div>

            {/* <FAQSection /> */}
            <ContactSection />
            <DownloadSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
