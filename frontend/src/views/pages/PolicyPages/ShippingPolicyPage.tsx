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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, var(--background-alt), var(--white-color))' }}>
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Shipping Policy" description="Information about our shipping methods and delivery times." icon={<Truck size={32} />} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <TableOfContents sections={shippingSections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div>
          <div className="lg:w-3/4">
            <div className="rounded-2xl p-8 mb-8" style={{ background: 'linear-gradient(to right, var(--background-alt), var(--white-color))' }}>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--black-color)' }}>Delivery & Options</h3>
              <p style={{ color: 'var(--gray-color)' }}>Choose a shipping method based on speed and cost.</p>
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
