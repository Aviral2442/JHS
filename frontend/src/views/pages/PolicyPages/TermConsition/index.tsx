import React, { useState } from 'react';
import {
  Shield, Lock, FileText, Globe, Cookie,
  Truck, RefreshCw, X, Search, ChevronDown,
  ChevronUp, Check, AlertCircle, Mail,
  Phone, Home, Clock, User, BookOpen,
  ExternalLink, HelpCircle, Eye, Users,
  CreditCard, Package, Heart, Star,
  Download
} from 'lucide-react';

// ================ TYPES ================
interface PolicySection {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// ================ COMPONENTS ================

// Header Component
const PolicyHeader: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ 
  title, 
  description, 
  icon 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white/20 p-3 rounded-xl mr-4">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-blue-100 mt-2 max-w-3xl">{description}</p>
          </div>
        </div>
        <div className="text-sm bg-white/10 px-4 py-2 rounded-full">
          Last Updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};

// Table of Contents Component
const TableOfContents: React.FC<{ 
  sections: PolicySection[]; 
  activeSection: string;
  onSectionClick: (id: string) => void;
}> = ({ sections, activeSection, onSectionClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <BookOpen size={20} className="mr-2" />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                activeSection === section.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {activeSection === section.id ? (
                  <Check size={12} className="text-blue-600" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                )}
              </div>
              {section.title}
            </div>
          </button>
        ))}
      </nav>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Quick Links</h4>
        <div className="space-y-2">
          <a href="#contact" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
            <Mail size={16} className="mr-2" />
            Contact Information
          </a>
          <a href="#faq" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
            <HelpCircle size={16} className="mr-2" />
            Frequently Asked Questions
          </a>
          <a href="#download" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
            <ExternalLink size={16} className="mr-2" />
            Download PDF Version
          </a>
        </div>
      </div>
    </div>
  );
};

// Policy Section Component
const PolicySection: React.FC<{
  section: PolicySection;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ section, isExpanded, onToggle }) => {
  return (
    <div id={section.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-xl font-bold text-gray-800 text-left">{section.title}</h3>
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-4">{section.content}</p>
            
            {section.subsections && section.subsections.length > 0 && (
              <div className="mt-6 space-y-4">
                {section.subsections.map((subsection, index) => (
                  <div key={index} className="pl-4 border-l-2 border-blue-200">
                    <h4 className="font-bold text-gray-800 mb-2">{subsection.title}</h4>
                    <p className="text-gray-600">{subsection.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// FAQ Component
const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqItems: FAQItem[] = [
    {
      question: "How do I request a return?",
      answer: "You can request a return within 30 days of delivery by visiting your order history page and selecting the 'Return' option. We'll provide a prepaid shipping label and instructions for returning your item.",
      category: "Returns"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for certain orders. All payments are processed securely through encrypted channels.",
      category: "Payments"
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Next-day delivery is available for eligible items. International shipping times vary by destination.",
      category: "Shipping"
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties for marketing purposes without your explicit consent.",
      category: "Privacy"
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placement through your account page. After that time, orders enter processing and cannot be modified. Contact customer service for assistance.",
      category: "Orders"
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs duties and taxes may apply depending on your country's regulations.",
      category: "Shipping"
    }
  ];
  
  const filteredFAQs = searchTerm 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqItems;
  
  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  
  return (
    <div id="faq" className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h3>
          <p className="text-gray-600">Find quick answers to common questions</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSearchTerm('')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            searchTerm === '' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSearchTerm(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              searchTerm === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-blue-200"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg mr-4">
                  <HelpCircle size={20} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">{item.question}</h4>
                  <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 ml-4">
                {expandedIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>
            
            {expandedIndex === index && (
              <div className="px-6 pb-6 pl-16">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No FAQs found matching your search.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

// Contact Section Component
const ContactSection: React.FC = () => {
  return (
    <div id="contact" className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Need More Help?</h3>
        <p className="text-gray-600">Contact our support team for assistance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-blue-600" size={24} />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Email Support</h4>
          <p className="text-gray-600 text-sm mb-3">For general inquiries</p>
          <a href="mailto:support@shopcart.com" className="text-blue-600 hover:text-blue-800 font-medium">
            support@shopcart.com
          </a>
          <p className="text-gray-500 text-xs mt-2">Response time: 24 hours</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-green-600" size={24} />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Phone Support</h4>
          <p className="text-gray-600 text-sm mb-3">For urgent matters</p>
          <a href="tel:+18005551234" className="text-gray-800 hover:text-blue-600 font-medium text-lg">
            +1 (800) 555-1234
          </a>
          <p className="text-gray-500 text-xs mt-2">Mon-Fri, 9AM-6PM EST</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="text-purple-600" size={24} />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Office Address</h4>
          <p className="text-gray-600 text-sm mb-3">Visit our headquarters</p>
          <address className="text-gray-700 not-italic">
            123 Commerce Street<br />
            New York, NY 10001<br />
            United States
          </address>
        </div>
      </div>
    </div>
  );
};

// Download Section Component
const DownloadSection: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = () => {
    setDownloading(true);
    // Simulate download
    setTimeout(() => {
      setDownloading(false);
      alert('PDF download started!');
    }, 1500);
  };
  
  return (
    <div id="download" className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <FileText size={24} className="text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Download Full Policy</h3>
          </div>
          <p className="text-gray-600">Get a printable PDF version of this policy document</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center"
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download size={20} className="mr-2" />
                Download PDF (2.4 MB)
              </>
            )}
          </button>
          
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center">
            <ExternalLink size={20} className="mr-2" />
            Print Version
          </button>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Document Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">File Size</div>
            <div className="font-bold text-gray-800">2.4 MB</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Pages</div>
            <div className="font-bold text-gray-800">12</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Format</div>
            <div className="font-bold text-gray-800">PDF</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Version</div>
            <div className="font-bold text-gray-800">3.2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================ POLICY PAGES ================

// Privacy Policy Page
export const PrivacyPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['data-collection']));
  
  const privacySections: PolicySection[] = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      content: 'We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes personal information such as your name, email address, shipping address, and payment information.',
      subsections: [
        {
          title: 'Information You Provide',
          content: 'Account details, purchase history, communications, and preferences you share with us.'
        },
        {
          title: 'Automatically Collected Information',
          content: 'Device information, IP addresses, browser type, and usage data through cookies and similar technologies.'
        },
        {
          title: 'Third-Party Information',
          content: 'Information from partners, social media platforms (when you connect your account), and payment processors.'
        }
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      content: 'We use your information to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience.',
      subsections: [
        {
          title: 'Service Delivery',
          content: 'Processing orders, managing your account, and providing customer support.'
        },
        {
          title: 'Personalization',
          content: 'Showing relevant products, recommendations, and customized content based on your preferences.'
        },
        {
          title: 'Communication',
          content: 'Sending order updates, promotional offers (with consent), and important service announcements.'
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Disclosure',
      content: 'We do not sell your personal information. We may share data with trusted partners only for specific purposes outlined in this policy.',
      subsections: [
        {
          title: 'Service Providers',
          content: 'Shipping carriers, payment processors, and cloud service providers necessary for order fulfillment.'
        },
        {
          title: 'Legal Requirements',
          content: 'When required by law, regulation, legal process, or governmental request.'
        },
        {
          title: 'Business Transfers',
          content: 'In connection with a merger, acquisition, or sale of assets where customer information may be transferred.'
        }
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from.',
      subsections: [
        {
          title: 'Essential Cookies',
          content: 'Required for basic site functionality like maintaining your shopping cart and secure checkout.'
        },
        {
          title: 'Analytics Cookies',
          content: 'Help us understand how visitors interact with our website to improve user experience.'
        },
        {
          title: 'Marketing Cookies',
          content: 'Used to show relevant advertisements on other websites (you can opt out).'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      subsections: [
        {
          title: 'Encryption',
          content: 'All sensitive data is encrypted using industry-standard protocols (SSL/TLS).'
        },
        {
          title: 'Access Controls',
          content: 'Strict access controls limit employee access to personal information based on job requirements.'
        },
        {
          title: 'Regular Audits',
          content: 'We conduct regular security assessments and penetration testing to identify and address vulnerabilities.'
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights & Choices',
      content: 'You have certain rights regarding your personal information, including access, correction, deletion, and objection to processing.',
      subsections: [
        {
          title: 'Access & Portability',
          content: 'You can request a copy of your personal data in a structured, machine-readable format.'
        },
        {
          title: 'Correction & Deletion',
          content: 'You can update or request deletion of your personal information from our systems.'
        },
        {
          title: 'Opt-Out Rights',
          content: 'You can opt out of marketing communications and certain data processing activities.'
        }
      ]
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.',
      subsections: [
        {
          title: 'Age Restrictions',
          content: 'Users must be at least 16 years old to create an account and use our services.'
        },
        {
          title: 'Parental Controls',
          content: 'Parents can contact us to review or delete any information collected from their children.'
        }
      ]
    }
  ];
  
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader
          title="Privacy Policy"
          description="Learn how we collect, use, and protect your personal information. Your privacy is important to us."
          icon={<Shield size={32} />}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Table of Contents */}
          <div className="lg:w-1/4">
            <TableOfContents
              sections={privacySections}
              activeSection={Array.from(expandedSections)[0] || ''}
              onSectionClick={(id) => {
                if (!expandedSections.has(id)) {
                  toggleSection(id);
                }
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          
          {/* Right Column - Policy Content */}
          <div className="lg:w-3/4">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                At ShopCart, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services.
              </p>
              <p className="text-gray-600">
                By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
            
            {/* Policy Sections */}
            {privacySections.map(section => (
              <PolicySection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            
            {/* International Data Transfers */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-start mb-4">
                <Globe className="text-blue-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">International Data Transfers</h3>
                  <p className="text-gray-600">
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your data in accordance with 
                    applicable data protection laws, including the use of standard contractual clauses approved 
                    by the European Commission.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Policy Updates */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Policy Updates</h3>
                  <p className="text-gray-700 mb-3">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by 
                    posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
                  </p>
                  <p className="text-gray-700">
                    We encourage you to review this Privacy Policy periodically for any changes. Changes to this 
                    Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <FAQSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Download Section */}
            <DownloadSection />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="/terms" className="text-blue-600 hover:underline mx-2">Terms of Service</a> | 
            <a href="/shipping" className="text-blue-600 hover:underline mx-2">Shipping Policy</a> | 
            <a href="/returns" className="text-blue-600 hover:underline mx-2">Return Policy</a>
          </p>
          <p className="mt-2">For questions about this policy, contact: 
            <a href="mailto:privacy@shopcart.com" className="text-blue-600 hover:underline ml-1">
              privacy@shopcart.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Terms of Service Page
export const TermsOfServicePage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['agreement']));
  
  const termsSections: PolicySection[] = [
    {
      id: 'agreement',
      title: 'Agreement to Terms',
      content: 'By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.',
      subsections: [
        {
          title: 'Eligibility',
          content: 'You must be at least 16 years old to use our services. By using our services, you represent that you meet this requirement.'
        },
        {
          title: 'Account Responsibility',
          content: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.'
        }
      ]
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      content: 'As a user of our services, you agree to use them only for lawful purposes and in accordance with these Terms.',
      subsections: [
        {
          title: 'Prohibited Activities',
          content: 'You may not use our services to engage in any illegal activities, infringe intellectual property rights, or interfere with the proper functioning of our services.'
        },
        {
          title: 'Content Standards',
          content: 'You agree not to post or transmit any content that is defamatory, obscene, or violates any third-party rights.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: 'All content on our website, including text, graphics, logos, and software, is the property of ShopCart or its content suppliers and is protected by intellectual property laws.',
      subsections: [
        {
          title: 'Trademarks',
          content: 'ShopCart trademarks and logos may not be used without our prior written permission.'
        },
        {
          title: 'User Content',
          content: 'By submitting content to our website, you grant us a non-exclusive, worldwide license to use, reproduce, and display that content.'
        }
      ]
    },
    {
      id: 'purchases',
      title: 'Purchases & Payments',
      content: 'All purchases through our website are subject to availability and our acceptance of your order. We reserve the right to refuse or cancel any order.',
      subsections: [
        {
          title: 'Pricing',
          content: 'Prices are subject to change without notice. We are not responsible for typographical errors in pricing.'
        },
        {
          title: 'Payment Terms',
          content: 'Payment must be received before we process your order. We accept various payment methods as listed on our checkout page.'
        }
      ]
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers & Limitations',
      content: 'Our services are provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.',
      subsections: [
        {
          title: 'Service Availability',
          content: 'We do not guarantee uninterrupted access to our services and may suspend or terminate services at any time.'
        },
        {
          title: 'Product Descriptions',
          content: 'We attempt to be as accurate as possible with product descriptions but do not warrant that descriptions are accurate, complete, or error-free.'
        }
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'We may terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.',
      subsections: [
        {
          title: 'User Termination',
          content: 'You may terminate your account at any time by contacting customer service or through your account settings.'
        },
        {
          title: 'Effect of Termination',
          content: 'Upon termination, your right to use our services will immediately cease. All provisions that by their nature should survive termination will survive.'
        }
      ]
    }
  ];
  
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader
          title="Terms of Service"
          description="The rules and guidelines for using our services. Please read these terms carefully before using our website."
          icon={<FileText size={32} />}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/4">
            <TableOfContents
              sections={termsSections}
              activeSection={Array.from(expandedSections)[0] || ''}
              onSectionClick={(id) => {
                if (!expandedSections.has(id)) {
                  toggleSection(id);
                }
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          
          {/* Right Column */}
          <div className="lg:w-3/4">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to ShopCart</h2>
              <p className="text-gray-600 mb-4">
                These Terms of Service govern your use of the ShopCart website and services. By accessing or using our services, 
                you agree to be bound by these terms. If you do not agree to these terms, please do not use our services.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-700 text-sm">
                  <strong>Important:</strong> These terms contain important information about your legal rights, 
                  remedies, and obligations. Please read them carefully.
                </p>
              </div>
            </div>
            
            {/* Terms Sections */}
            {termsSections.map(section => (
              <PolicySection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            
            {/* Governing Law */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Governing Law</h3>
              <p className="text-gray-600 mb-4">
                These Terms shall be governed and construed in accordance with the laws of the State of New York, 
                United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600">
                Any disputes arising from these Terms or your use of our services shall be resolved in the state 
                or federal courts located in New York County, New York.
              </p>
            </div>
            
            {/* Changes to Terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Changes to Terms</h3>
                  <p className="text-gray-700">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                    we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                    a material change will be determined at our sole discretion.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <FAQSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Download Section */}
            <DownloadSection />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="/privacy" className="text-blue-600 hover:underline mx-2">Privacy Policy</a> | 
            <a href="/shipping" className="text-blue-600 hover:underline mx-2">Shipping Policy</a> | 
            <a href="/returns" className="text-blue-600 hover:underline mx-2">Return Policy</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Shipping Policy Page
export const ShippingPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['domestic']));
  
  const shippingSections: PolicySection[] = [
    {
      id: 'domestic',
      title: 'Domestic Shipping',
      content: 'We offer several shipping options for orders within the United States. Shipping costs and delivery times vary based on the shipping method selected.',
      subsections: [
        {
          title: 'Standard Shipping',
          content: '5-7 business days | $4.99 (Free on orders over $50)'
        },
        {
          title: 'Express Shipping',
          content: '2-3 business days | $9.99'
        },
        {
          title: 'Next Day Delivery',
          content: '1 business day | $19.99 (Order by 2 PM EST)'
        }
      ]
    },
    {
      id: 'international',
      title: 'International Shipping',
      content: 'We ship to over 50 countries worldwide. International shipping times and costs vary based on destination.',
      subsections: [
        {
          title: 'Standard International',
          content: '10-21 business days | Costs vary by destination'
        },
        {
          title: 'Expedited International',
          content: '5-10 business days | Costs vary by destination'
        },
        {
          title: 'Customs & Duties',
          content: 'International customers are responsible for any customs duties, taxes, or fees imposed by their country.'
        }
      ]
    },
    {
      id: 'processing',
      title: 'Order Processing',
      content: 'Orders are typically processed within 1-2 business days. Processing time may be longer during peak seasons or for custom products.',
      subsections: [
        {
          title: 'Processing Time',
          content: '1-2 business days for in-stock items'
        },
        {
          title: 'Order Verification',
          content: 'All orders undergo verification to prevent fraud and ensure accuracy'
        },
        {
          title: 'Holiday Processing',
          content: 'During holidays, processing may take 3-5 business days'
        }
      ]
    },
    {
      id: 'tracking',
      title: 'Order Tracking',
      content: 'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order through your account.',
      subsections: [
        {
          title: 'Tracking Updates',
          content: 'Tracking information is updated as your package moves through the shipping network'
        },
        {
          title: 'Delivery Notifications',
          content: 'Receive SMS or email notifications when your package is out for delivery and when delivered'
        }
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery Information',
      content: 'Packages require a signature for delivery. If you are not available, the carrier will leave a notice with instructions for rescheduling delivery.',
      subsections: [
        {
          title: 'Delivery Hours',
          content: 'Typically between 9 AM and 8 PM local time, Monday through Saturday'
        },
        {
          title: 'Failed Delivery Attempts',
          content: 'After 3 failed attempts, packages are returned to our warehouse'
        },
        {
          title: 'PO Box Delivery',
          content: 'Available for standard shipping only (no express options)'
        }
      ]
    },
    {
      id: 'issues',
      title: 'Shipping Issues',
      content: 'If you experience any issues with your shipment, please contact our customer service team immediately.',
      subsections: [
        {
          title: 'Lost Packages',
          content: 'Report lost packages within 30 days of expected delivery date'
        },
        {
          title: 'Damaged Items',
          content: 'Inspect packages upon delivery and report damage within 48 hours'
        },
        {
          title: 'Address Corrections',
          content: 'Contact us immediately if you need to correct your shipping address'
        }
      ]
    }
  ];
  
  const shippingMethods = [
    { name: 'USPS', icon: '📮', coverage: 'Nationwide' },
    { name: 'FedEx', icon: '📦', coverage: 'Nationwide + International' },
    { name: 'UPS', icon: '🚚', coverage: 'Nationwide + International' },
    { name: 'DHL', icon: '✈️', coverage: 'International' }
  ];
  
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader
          title="Shipping Policy"
          description="Information about our shipping methods, delivery times, and international shipping options."
          icon={<Truck size={32} />}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/4">
            <TableOfContents
              sections={shippingSections}
              activeSection={Array.from(expandedSections)[0] || ''}
              onSectionClick={(id) => {
                if (!expandedSections.has(id)) {
                  toggleSection(id);
                }
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            
            {/* Shipping Partners */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="font-bold text-gray-800 mb-4">Our Shipping Partners</h3>
              <div className="space-y-3">
                {shippingMethods.map((carrier, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">{carrier.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{carrier.name}</div>
                      <div className="text-sm text-gray-600">{carrier.coverage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:w-3/4">
            {/* Shipping Calculator */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Shipping Calculator</h3>
                  <p className="text-gray-600">Estimate shipping costs and delivery times</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
                  Calculate Shipping
                </button>
              </div>
            </div>
            
            {/* Shipping Sections */}
            {shippingSections.map(section => (
              <PolicySection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            
            {/* Shipping Timeline */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Shipping Timeline</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                {/* Timeline Items */}
                {[
                  { step: 'Order Placed', time: 'Day 1', icon: '🛒' },
                  { step: 'Order Processing', time: '1-2 Days', icon: '⚙️' },
                  { step: 'Order Shipped', time: 'Day 3', icon: '📦' },
                  { step: 'In Transit', time: '3-7 Days', icon: '🚚' },
                  { step: 'Out for Delivery', time: 'Day 5-8', icon: '🏠' },
                  { step: 'Delivered', time: 'Day 5-9', icon: '✅' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center mb-8 relative">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 mr-4">
                      {item.icon}
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-gray-800">{item.step}</h4>
                        <span className="text-sm font-medium text-blue-600">{item.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {index === 0 && 'Your order is received and confirmed'}
                        {index === 1 && 'We prepare your items for shipment'}
                        {index === 2 && 'Package is handed off to carrier'}
                        {index === 3 && 'Package is moving through the network'}
                        {index === 4 && 'Package is on the delivery vehicle'}
                        {index === 5 && 'Package is delivered to your address'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQ Section */}
            <FAQSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Download Section */}
            <DownloadSection />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="/privacy" className="text-blue-600 hover:underline mx-2">Privacy Policy</a> | 
            <a href="/terms" className="text-blue-600 hover:underline mx-2">Terms of Service</a> | 
            <a href="/returns" className="text-blue-600 hover:underline mx-2">Return Policy</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Return Policy Page
export const ReturnPolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['eligibility']));
  
  const returnSections: PolicySection[] = [
    {
      id: 'eligibility',
      title: 'Return Eligibility',
      content: 'Items must be returned within 30 days of delivery. To be eligible for a return, items must be unused, in their original packaging, and in the same condition as received.',
      subsections: [
        {
          title: 'Time Frame',
          content: '30 days from delivery date for most items'
        },
        {
          title: 'Condition Requirements',
          content: 'Unused, undamaged, with original tags and packaging'
        },
        {
          title: 'Proof of Purchase',
          content: 'Original receipt or order confirmation required'
        }
      ]
    },
    {
      id: 'non-returnable',
      title: 'Non-Returnable Items',
      content: 'Certain items cannot be returned for health, safety, or customization reasons.',
      subsections: [
        {
          title: 'Personalized Items',
          content: 'Custom engraved, monogrammed, or made-to-order products'
        },
        {
          title: 'Health & Beauty',
          content: 'Opened cosmetics, skincare, and personal care items'
        },
        {
          title: 'Digital Products',
          content: 'Software, eBooks, and digital downloads'
        }
      ]
    },
    {
      id: 'process',
      title: 'Return Process',
      content: 'Follow these steps to initiate a return. We recommend using our online return portal for the fastest processing.',
      subsections: [
        {
          title: 'Step 1: Request Return',
          content: 'Log into your account and navigate to Order History'
        },
        {
          title: 'Step 2: Print Label',
          content: 'Download and print the prepaid return shipping label'
        },
        {
          title: 'Step 3: Package Items',
          content: 'Pack items securely in original packaging if possible'
        },
        {
          title: 'Step 4: Ship Back',
          content: 'Drop off at designated carrier location'
        }
      ]
    },
    {
      id: 'refunds',
      title: 'Refunds & Credits',
      content: 'Once we receive and inspect your return, we will process your refund. The time it takes for the refund to appear in your account depends on your payment method.',
      subsections: [
        {
          title: 'Refund Timeline',
          content: '5-10 business days after we receive your return'
        },
        {
          title: 'Refund Method',
          content: 'Refunds are issued to the original payment method'
        },
        {
          title: 'Shipping Costs',
          content: 'Original shipping costs are non-refundable unless due to our error'
        }
      ]
    },
    {
      id: 'exchanges',
      title: 'Exchanges',
      content: 'We offer exchanges for different sizes, colors, or styles of the same item. Exchanges are subject to availability.',
      subsections: [
        {
          title: 'Exchange Process',
          content: 'Follow the same return process and note "Exchange" as the reason'
        },
        {
          title: 'Price Differences',
          content: 'You will be charged or refunded any price difference for exchanges'
        },
        {
          title: 'Exchange Shipping',
          content: 'Free shipping on exchanged items shipped within the US'
        }
      ]
    },
    {
      id: 'damaged',
      title: 'Damaged or Defective Items',
      content: 'If you receive a damaged or defective item, contact us immediately. We will arrange for a replacement or refund at no additional cost.',
      subsections: [
        {
          title: 'Reporting Time',
          content: 'Report damage within 48 hours of delivery'
        },
        {
          title: 'Documentation',
          content: 'Photos of damaged item and packaging are required'
        },
        {
          title: 'Replacement Shipping',
          content: 'We cover all shipping costs for replacement items'
        }
      ]
    }
  ];
  
  const returnReasons = [
    { reason: 'Wrong Size', icon: '📏', timeframe: '30 Days' },
    { reason: 'Changed Mind', icon: '💭', timeframe: '30 Days' },
    { reason: 'Defective Item', icon: '⚠️', timeframe: '60 Days' },
    { reason: 'Wrong Item', icon: '❌', timeframe: '30 Days' },
    { reason: 'Damaged Item', icon: '📦', timeframe: '48 Hours' }
  ];
  
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader
          title="Return & Refund Policy"
          description="Our hassle-free return policy ensures you can shop with confidence. Learn about our return process and refund timelines."
          icon={<RefreshCw size={32} />}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/4">
            <TableOfContents
              sections={returnSections}
              activeSection={Array.from(expandedSections)[0] || ''}
              onSectionClick={(id) => {
                if (!expandedSections.has(id)) {
                  toggleSection(id);
                }
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            
            {/* Quick Return Guide */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="font-bold text-gray-800 mb-4">Common Return Reasons</h3>
              <div className="space-y-3">
                {returnReasons.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.reason}</div>
                      <div className="text-sm text-gray-600">Return within: {item.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:w-3/4">
            {/* Return Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700">30</div>
                <div className="text-sm text-gray-600">Day Return Window</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-700">Free</div>
                <div className="text-sm text-gray-600">Return Shipping</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-700">5-10</div>
                <div className="text-sm text-gray-600">Business Day Refund</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-700">24/7</div>
                <div className="text-sm text-gray-600">Online Returns</div>
              </div>
            </div>
            
            {/* Return Sections */}
            {returnSections.map(section => (
              <PolicySection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            
            {/* Start Return Button */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 text-center">
              <RefreshCw size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Start a Return?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Use our online return portal for a quick and easy return process. 
                Generate a prepaid shipping label and track your return every step of the way.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5 shadow-md">
                Start Return Process
              </button>
            </div>
            
            {/* FAQ Section */}
            <FAQSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Download Section */}
            <DownloadSection />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="/privacy" className="text-blue-600 hover:underline mx-2">Privacy Policy</a> | 
            <a href="/terms" className="text-blue-600 hover:underline mx-2">Terms of Service</a> | 
            <a href="/shipping" className="text-blue-600 hover:underline mx-2">Shipping Policy</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Cookie Policy Page
export const CookiePolicyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-are-cookies']));
  
  const cookieSections: PolicySection[] = [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies?',
      content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience and understand how you use our site.',
      subsections: [
        {
          title: 'First-Party Cookies',
          content: 'Set by us directly to enable core site functionality'
        },
        {
          title: 'Third-Party Cookies',
          content: 'Set by our partners and service providers to enhance functionality'
        }
      ]
    },
    {
      id: 'types-of-cookies',
      title: 'Types of Cookies We Use',
      content: 'We use several types of cookies for different purposes, as outlined below.',
      subsections: [
        {
          title: 'Essential Cookies',
          content: 'Required for basic site functionality like maintaining your shopping cart and secure checkout'
        },
        {
          title: 'Performance Cookies',
          content: 'Help us understand how visitors interact with our website to improve user experience'
        },
        {
          title: 'Functionality Cookies',
          content: 'Remember your preferences like language selection and regional settings'
        },
        {
          title: 'Advertising Cookies',
          content: 'Used to show relevant advertisements on other websites (you can opt out)'
        }
      ]
    },
    {
      id: 'cookie-control',
      title: 'Cookie Control',
      content: 'You have control over which cookies you accept. You can manage your cookie preferences through your browser settings or our cookie consent tool.',
      subsections: [
        {
          title: 'Browser Settings',
          content: 'Most browsers allow you to refuse or delete cookies through their settings'
        },
        {
          title: 'Opt-Out Tools',
          content: 'Use industry opt-out tools for advertising cookies'
        },
        {
          title: 'Essential Cookies',
          content: 'Note that blocking essential cookies may affect site functionality'
        }
      ]
    },
    {
      id: 'third-party',
      title: 'Third-Party Cookies',
      content: 'We work with third-party service providers who may also set cookies on our website for various purposes.',
      subsections: [
        {
          title: 'Analytics Providers',
          content: 'Google Analytics to understand site traffic and usage patterns'
        },
        {
          title: 'Advertising Partners',
          content: 'Social media and advertising platforms for targeted advertising'
        },
        {
          title: 'Payment Processors',
          content: 'Secure payment processing and fraud prevention'
        }
      ]
    }
  ];
  
  const cookieList = [
    { name: 'session_id', purpose: 'Maintain user session', duration: 'Session', type: 'Essential' },
    { name: 'cart_id', purpose: 'Store shopping cart items', duration: '30 days', type: 'Essential' },
    { name: 'preferences', purpose: 'Remember user preferences', duration: '1 year', type: 'Functional' },
    { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years', type: 'Analytics' },
    { name: '_fbp', purpose: 'Facebook advertising', duration: '90 days', type: 'Advertising' }
  ];
  
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PolicyHeader
          title="Cookie Policy"
          description="Learn about how we use cookies and similar technologies to enhance your browsing experience and improve our services."
          icon={<Cookie size={32} />}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/4">
            <TableOfContents
              sections={cookieSections}
              activeSection={Array.from(expandedSections)[0] || ''}
              onSectionClick={(id) => {
                if (!expandedSections.has(id)) {
                  toggleSection(id);
                }
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            
            {/* Cookie Settings */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="font-bold text-gray-800 mb-4">Cookie Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Essential Cookies</span>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Analytics Cookies</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Marketing Cookies</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:w-3/4">
            {/* Cookie Consent Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <Cookie className="text-blue-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your Cookie Preferences</h3>
                  <p className="text-gray-700 mb-4">
                    We use cookies to enhance your browsing experience. By clicking "Accept All", you consent to 
                    our use of cookies. You can manage your preferences at any time by clicking "Cookie Settings".
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Accept All
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Cookie Settings
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Reject All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cookie Sections */}
            {cookieSections.map(section => (
              <PolicySection
                key={section.id}
                section={section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            
            {/* Cookie Details Table */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Detailed Cookie List</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-gray-700 font-medium">Cookie Name</th>
                      <th className="text-left p-3 text-gray-700 font-medium">Purpose</th>
                      <th className="text-left p-3 text-gray-700 font-medium">Duration</th>
                      <th className="text-left p-3 text-gray-700 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieList.map((cookie, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-mono text-sm">{cookie.name}</td>
                        <td className="p-3 text-gray-600">{cookie.purpose}</td>
                        <td className="p-3 text-gray-600">{cookie.duration}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cookie.type === 'Essential' 
                              ? 'bg-blue-100 text-blue-800'
                              : cookie.type === 'Analytics'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {cookie.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* FAQ Section */}
            <FAQSection />
            
            {/* Contact Section */}
            <ContactSection />
            
            {/* Download Section */}
            <DownloadSection />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 ShopCart. All rights reserved. | 
            <a href="/privacy" className="text-blue-600 hover:underline mx-2">Privacy Policy</a> | 
            <a href="/terms" className="text-blue-600 hover:underline mx-2">Terms of Service</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Policy Hub Page (Main Page linking to all policies)
export const PolicyHubPage: React.FC = () => {
  const policies = [
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: <Shield size={32} />,
      color: 'from-blue-500 to-blue-600',
      link: '/privacy',
      features: ['Data Collection', 'Cookie Usage', 'Security Measures', 'Your Rights']
    },
    {
      title: 'Terms of Service',
      description: 'Rules and guidelines for using our services',
      icon: <FileText size={32} />,
      color: 'from-green-500 to-green-600',
      link: '/terms',
      features: ['User Obligations', 'Intellectual Property', 'Payment Terms', 'Termination']
    },
    {
      title: 'Shipping Policy',
      description: 'Information about shipping methods and delivery times',
      icon: <Truck size={32} />,
      color: 'from-orange-500 to-orange-600',
      link: '/shipping',
      features: ['Domestic Shipping', 'International Shipping', 'Order Tracking', 'Delivery Info']
    },
    {
      title: 'Return Policy',
      description: 'Our hassle-free return and refund process',
      icon: <RefreshCw size={32} />,
      color: 'from-purple-500 to-purple-600',
      link: '/returns',
      features: ['30-Day Returns', 'Free Returns', 'Easy Process', 'Quick Refunds']
    },
    {
      title: 'Cookie Policy',
      description: 'How we use cookies and tracking technologies',
      icon: <Cookie size={32} />,
      color: 'from-pink-500 to-pink-600',
      link: '/cookies',
      features: ['Cookie Types', 'Control Options', 'Third-Party Cookies', 'Opt-Out']
    },
    {
      title: 'Legal Documents',
      description: 'Additional legal documents and disclosures',
      icon: <Lock size={32} />,
      color: 'from-gray-600 to-gray-700',
      link: '/legal',
      features: ['Compliance', 'Disclosures', 'Licenses', 'Regulatory Info']
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Policy Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All our legal policies and terms in one place. Transparency and trust are our top priorities.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search policies and terms..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {policies.map((policy, index) => (
            <a
              key={index}
              href={policy.link}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${policy.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="bg-white/20 p-3 rounded-xl">
                    {policy.icon}
                  </div>
                  <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold mt-4">{policy.title}</h3>
                <p className="opacity-90 mt-2">{policy.description}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <h4 className="font-bold text-gray-800 mb-3">Key Topics:</h4>
                <ul className="space-y-2">
                  {policy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="text-sm font-medium text-gray-700">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Need Help Understanding?</h2>
            <p className="text-gray-600">We're here to help clarify any questions about our policies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">FAQ Section</h3>
              <p className="text-gray-600 mb-4">Find answers to common questions about our policies</p>
              <a href="#faq" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse FAQs →
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Contact Legal Team</h3>
              <p className="text-gray-600 mb-4">Get in touch with our legal department for specific questions</p>
              <a href="mailto:legal@shopcart.com" className="text-green-600 hover:text-green-800 font-medium">
                Email Legal →
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Download All</h3>
              <p className="text-gray-600 mb-4">Download all policy documents in a single PDF package</p>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Download Bundle →
              </button>
            </div>
          </div>
        </div>
        
        {/* Update Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-600 mr-4 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Policy Updates</h3>
              <p className="text-gray-700 mb-3">
                We periodically update our policies to reflect changes in our services, legal requirements, 
                and industry standards. The "Last Updated" date at the top of each policy indicates when it was last revised.
              </p>
              <p className="text-gray-700">
                Significant changes will be communicated to users via email or through notifications on our website.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Shield className="text-blue-600 mr-2" />
                <span className="text-lg font-bold text-gray-800">ShopCart Policies</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Transparent, Fair, and Secure</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">© 2023 ShopCart. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">
                For questions: <a href="mailto:policies@shopcart.com" className="text-blue-600 hover:underline">
                  policies@shopcart.com
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Main export
export default {
  PrivacyPolicyPage,
  TermsOfServicePage,
  ShippingPolicyPage,
  ReturnPolicyPage,
  CookiePolicyPage,
  PolicyHubPage
};