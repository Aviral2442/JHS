import { Cookie } from "lucide-react";
import React, { useState } from "react";
import {
  BookOpen,
  Mail,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  Download,
  Phone,
  Home,
  Shield,
  Globe,
  Truck,
  RefreshCw,
  Lock,
} from "react-feather";

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
}

interface PolicyHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const PolicyHeader: React.FC<PolicyHeaderProps> = ({
  title,
  description,
  icon,
}) => (
  <div
    className="text-white transition-all rounded-2xl p-8 mb-8 shadow-lg"
    style={{
      background:
        "linear-gradient(to right, var(--sky-blue), var(--gray-color))",
    }}
  >
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-white/20 p-3 rounded-xl mr-4">{icon}</div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p
            className="mt-2 max-w-3xl"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="text-sm bg-white/10 px-4 py-2 rounded-full">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  </div>
);

export const TableOfContents: React.FC<{
  sections: PolicySection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}> = ({ sections, activeSection, onSectionClick }) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-6">
    <h3
      className="text-lg font-bold mb-4 flex items-center"
      style={{ color: "var(--black-color)" }}
    >
      <BookOpen size={20} className="mr-2" />
      Table of Contents
    </h3>
    <nav className="space-y-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
            activeSection === section.id ? "font-medium" : "hover:bg-gray-50"
          }`}
          style={
            activeSection === section.id
              ? {
                  backgroundColor: "var(--background-alt)",
                  color: "var(--sky-blue)",
                }
              : { color: "var(--gray-color)" }
          }
        >
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center mr-3"
              style={
                activeSection === section.id
                  ? { backgroundColor: "var(--background-alt)" }
                  : { backgroundColor: "#f3f4f6" }
              }
            />
            {section.title}
          </div>
        </button>
      ))}
    </nav>
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="font-medium mb-3" style={{ color: "var(--black-color)" }}>
        Quick Links
      </h4>
      <div className="space-y-2">
        <a
          href="#contact"
          className="flex items-center text-sm"
          style={{ color: "var(--sky-blue)" }}
        >
          <Mail size={16} className="mr-2" />
          Contact Information
        </a>
        <a
          href="#faq"
          className="flex items-center text-sm"
          style={{ color: "var(--sky-blue)" }}
        >
          <HelpCircle size={16} className="mr-2" />
          Frequently Asked Questions
        </a>
        <a
          href="#download"
          className="flex items-center text-sm"
          style={{ color: "var(--sky-blue)" }}
        >
          <ExternalLink size={16} className="mr-2" />
          Download PDF Version
        </a>
      </div>
    </div>
  </div>
);

export const PolicySectionComponent: React.FC<{
  section: PolicySection;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ section, isExpanded, onToggle }) => (
  <div
    id={section.id}
    className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-xl font-bold text-gray-800 text-left">
        {section.title}
      </h3>
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
              {section.subsections.map((sub, i) => (
                <div key={i} className="pl-4 border-l-2 border-blue-200">
                  <h4 className="font-semibold text-gray-800">{sub.title}</h4>
                  <p className="text-gray-600">{sub.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      question: "How do I request a return?",
      answer: "You can request a return within 30 days...",
      category: "Returns",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards...",
      category: "Payments",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days.",
      category: "Shipping",
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption.",
      category: "Privacy",
    },
  ];

  const filtered = searchTerm
    ? faqItems.filter(
        (i) =>
          i.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : faqItems;

  const categories = Array.from(new Set(faqItems.map((i) => i.category)));

  return (
    <div id="faq" className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-600">
            Find quick answers to common questions
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor:
              searchTerm === ""
                ? "rgba(0,173,181,0.2)"
                : "var(--background-alt)",
            color: searchTerm === "" ? "var(--sky-blue)" : "var(--gray-color)",
          }}
        >
          All Categories
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSearchTerm(c)}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor:
                searchTerm === c
                  ? "rgba(0,173,181,0.2)"
                  : "var(--background-alt)",
              color: searchTerm === c ? "var(--sky-blue)" : "var(--gray-color)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedIndex(expandedIndex === idx ? null : idx)
              }
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <div className="font-medium text-gray-800">{item.question}</div>
                <div className="text-xs text-gray-500">{item.category}</div>
              </div>
              <div className="text-gray-400">
                {expandedIndex === idx ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>
            {expandedIndex === idx && (
              <div className="px-6 pb-6 pl-16">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => (
  <div
    id="contact"
    className="rounded-2xl p-8 mb-8"
    style={{
      background:
        "linear-gradient(to right, rgba(0,173,181,0.1), rgba(57,62,70,0.1))",
    }}
  >
    <div className="text-center mb-8">
      <h3
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--black-color)" }}
      >
        Need More Help?
      </h3>
      <p style={{ color: "var(--gray-color)" }}>
        Contact our support team for assistance
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(0,173,181,0.2)" }}
        >
          <Mail style={{ color: "var(--sky-blue)" }} size={24} />
        </div>
        <h4 className="font-bold mb-2" style={{ color: "var(--black-color)" }}>
          Email Support
        </h4>
        <p className="text-sm mb-3" style={{ color: "var(--gray-color)" }}>
          For general inquiries
        </p>
        <a
          href="mailto:support@shopcart.com"
          className="font-medium"
          style={{ color: "var(--sky-blue)" }}
        >
          support@shopcart.com
        </a>
      </div>
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="text-green-600" size={24} />
        </div>
        <h4 className="font-bold mb-2" style={{ color: "var(--black-color)" }}>
          Phone Support
        </h4>
        <a
          href="tel:+18005551234"
          className="font-medium text-lg"
          style={{ color: "var(--black-color)" }}
        >
          +1 (800) 555-1234
        </a>
      </div>
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="text-purple-600" size={24} />
        </div>
        <h4 className="font-bold mb-2" style={{ color: "var(--black-color)" }}>
          Office Address
        </h4>
        <address className="not-italic" style={{ color: "var(--gray-color)" }}>
          123 Commerce Street
          <br />
          New York, NY 10001
          <br />
          United States
        </address>
      </div>
    </div>
  </div>
);

export const DownloadSection: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("PDF download started!");
    }, 1200);
  };
  return (
    <div id="download" className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <FileText
              size={24}
              className="mr-3"
              style={{ color: "var(--sky-blue)" }}
            />
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--black-color)" }}
            >
              Download Full Policy
            </h3>
          </div>
          <p style={{ color: "var(--gray-color)" }}>
            Get a printable PDF version of this policy document
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-6 py-3 text-white rounded-lg flex items-center"
            style={{
              background:
                "linear-gradient(to right, var(--sky-blue), var(--gray-color))",
            }}
          >
            {downloading ? (
              "Downloading..."
            ) : (
              <>
                <Download size={20} className="mr-2" />
                Download PDF (2.4 MB)
              </>
            )}
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg">
            Print Version
          </button>
        </div>
      </div>
    </div>
  );
};

export const Icons = { Shield, Globe, Truck, RefreshCw, Cookie, Lock };

const PolicyComponents = {} as any;
export default PolicyComponents;
