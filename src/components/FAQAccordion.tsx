'use client';

import { Minus,Plus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = activeIndex === i;
        return (
          <div
            key={i}
            className="faq-item"
            data-open={isOpen}
          >
            <button
              className="flex items-center justify-between gap-4 w-full p-5 sm:p-5 text-left select-none"
              onClick={() => toggleAccordion(i)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-sm sm:text-base text-[var(--text-primary)] pr-4">
                {faq.q}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6] rotate-0'
                    : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>
            </button>

            <div
              className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-4 mx-5">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
