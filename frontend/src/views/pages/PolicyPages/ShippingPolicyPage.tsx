import React, { useState } from 'react';
import { PolicyHeader, TableOfContents, PolicySectionComponent, FAQSection, ContactSection, DownloadSection, Icons } from './PolicyComponents';
const { Truck } = (Icons as any);

const ShippingPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['domestic']));

  const shippingSections = [
    { id: 'domestic', title: 'Domestic Shipping', content: 'We offer several shipping options for orders within the United States.' },
    { id: 'international', title: 'International Shipping', content: 'We ship to over 50 countries worldwide.' }
  ];

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Shipping Policy" description="Information about our shipping methods and delivery times." icon={<Truck size={32} />} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <TableOfContents sections={shippingSections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div>
          <div className="lg:w-3/4">
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold">Delivery & Options</h3>
              <p className="text-gray-600">Choose a shipping method based on speed and cost.</p>
            </div>

            {shippingSections.map((s) => (
              <PolicySectionComponent key={s.id} section={s as any} isExpanded={expandedSections.has(s.id)} onToggle={() => toggleSection(s.id)} />
            ))}

            <FAQSection />
            <ContactSection />
            <DownloadSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
