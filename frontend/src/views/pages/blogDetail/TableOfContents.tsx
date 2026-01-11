// components/blog/TableOfContents.tsx
import React, { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ contentRef }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!contentRef.current) return;

    const headingElements = contentRef.current.querySelectorAll('h2, h3, h4');
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setHeadings(extractedHeadings);
  }, [contentRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
          📖 Table of Contents
        </h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full px-3 py-2 rounded-lg transition-colors ${
                  activeId === heading.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                style={{ paddingLeft: `${(heading.level - 2) * 1 + 0.75}rem` }}
              >
                <span className="text-sm font-medium">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Read time</span>
            <span className="font-medium text-gray-900 dark:text-white">8 min</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-500 dark:text-gray-400">Sections</span>
            <span className="font-medium text-gray-900 dark:text-white">{headings.length}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};