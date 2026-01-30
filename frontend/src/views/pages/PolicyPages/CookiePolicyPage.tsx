import React, { useState } from 'react';
import { PolicyHeader, PolicySectionComponent, ContactSection, DownloadSection, Icons } from './PolicyComponents';
const { Cookie } = (Icons as any);

const CookiePolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-are-cookies']));

  const cookieSections = [
    { id: 'what-are-cookies', title: 'What Are Cookies?', content: 'Cookies are small text files that are placed on your device when you visit our website.' },
    { id: 'types-of-cookies', title: 'Types of Cookies We Use', content: 'We use several types of cookies for different purposes.' }
  ];

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, var(--background-alt), var(--white-color))' }}>
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Cookie Policy" description="Learn about how we use cookies and similar technologies." icon={<Cookie size={32} />} />

        <div className="flex flex-col gap-8">
          {/* <div className="lg:w-1/4">
            <TableOfContents sections={cookieSections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div> */}
          <div className="">
            <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: 'var(--background-alt)', border: '1px solid var(--sky-blue)' }}>
              <h4 className="font-semibold" style={{ color: 'var(--black-color)' }}>Cookie Controls</h4>
              <p style={{ color: 'var(--gray-color)' }}>Manage cookie preferences through browser settings or our consent tool.</p>
            </div>

            {cookieSections.map((s) => (
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

export default CookiePolicyPage;
