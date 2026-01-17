import React, { useState } from 'react';
import { PolicyHeader, TableOfContents, PolicySectionComponent, FAQSection, ContactSection, DownloadSection, Icons } from './PolicyComponents';
const { RefreshCw } = (Icons as any);

const ReturnPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['eligibility']));

  const returnSections = [
    { id: 'eligibility', title: 'Return Eligibility', content: 'Items must be returned within 30 days of delivery.' },
    { id: 'process', title: 'Return Process', content: 'Follow these steps to initiate a return.' }
  ];

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Return & Refund Policy" description="Our hassle-free return policy ensures you can shop with confidence." icon={<RefreshCw size={32} />} />

        <div className="flex flex-col gap-8">
          {/* <div className="lg:w-1/4">
            <TableOfContents sections={returnSections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div> */}
          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 text-center">30 Day Returns</div>
              <div className="bg-white rounded-xl p-4 text-center">Free Returns</div>
            </div>

            {returnSections.map((s) => (
              <PolicySectionComponent key={s.id} section={s as any} isExpanded={expandedSections.has(s.id)} onToggle={() => toggleSection(s.id)} />
            ))}

            {/* <FAQSection /> */}
            <ContactSection />
            <DownloadSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
