import React, { useState } from 'react';
import { PolicyHeader, TableOfContents, PolicySectionComponent, FAQSection, ContactSection, DownloadSection, Icons } from './PolicyComponents';

const { Shield, Globe } = (Icons as any);

const PrivacyPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['data-collection']));

  const privacySections = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      content: 'We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes personal information such as your name, email address, shipping address, and payment information.',
      subsections: [
        { title: 'Information You Provide', content: 'Account details, purchase history, communications, and preferences you share with us.' },
        { title: 'Automatically Collected Information', content: 'Device information, IP addresses, browser type, and usage data through cookies and similar technologies.' }
      ]
    },
    { id: 'data-usage', title: 'How We Use Your Data', content: 'We use your information to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience.' }
  ];

  const toggleSection = (id: string) => {
    const next = new Set(expandedSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSections(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader title="Privacy Policy" description="Learn how we collect, use, and protect your personal information." icon={<Shield size={32} />} />
        <div className="flex flex-col gap-8">
          {/* <div className="lg:w-1/4">
            <TableOfContents sections={privacySections as any} activeSection={Array.from(expandedSections)[0] || ''} onSectionClick={(id) => { if (!expandedSections.has(id)) toggleSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div> */}
          <div className="">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-600">At ShopCart, we are committed to protecting your privacy and ensuring the security of your personal information.</p>
            </div>
            {privacySections.map((s) => (
              <PolicySectionComponent key={s.id} section={s as any} isExpanded={expandedSections.has(s.id)} onToggle={() => toggleSection(s.id)} />
            ))}

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-start mb-4">
                <Globe className="text-blue-600 mr-3 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold">International Data Transfers</h4>
                  <p className="text-gray-600">We may transfer your information across borders as necessary to operate our services.</p>
                </div>
              </div>
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

export default PrivacyPolicyPage;
