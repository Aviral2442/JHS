import React from 'react';
import { Shield, FileText, Truck, RefreshCw, Lock } from 'react-feather';
import { Cookie } from 'lucide-react';

const PolicyHubPage: React.FC = () => {
  const policies = [
    { title: 'Privacy Policy', description: 'How we collect, use, and protect your personal information', icon: <Shield size={32} />, link: '/privacy' },
    { title: 'Terms of Service', description: 'Rules and guidelines for using our services', icon: <FileText size={32} />, link: '/terms' },
    { title: 'Shipping Policy', description: 'Information about shipping methods and delivery times', icon: <Truck size={32} />, link: '/shipping' },
    { title: 'Return Policy', description: 'Our hassle-free return and refund process', icon: <RefreshCw size={32} />, link: '/returns' },
    { title: 'Cookie Policy', description: 'How we use cookies and tracking technologies', icon: <Cookie size={32} />, link: '/cookies' },
    { title: 'Legal Documents', description: 'Additional legal documents and disclosures', icon: <Lock size={32} />, link: '/legal' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, var(--background-alt), var(--white-color))' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Policy Hub</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--gray-color)' }}>All our legal policies and terms in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {policies.map((p, i) => (
            <a key={i} href={p.link} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">{p.icon}<div className="ml-4"><h3 className="font-bold">{p.title}</h3><p className="text-sm" style={{ color: 'var(--gray-color)' }}>{p.description}</p></div></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyHubPage;
