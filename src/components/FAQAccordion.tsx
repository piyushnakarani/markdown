'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({
  items,
  speakableAnswerIndex,
}: {
  items: FAQItem[];
  speakableAnswerIndex?: number | number[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {items.map((faq, i) => {
        const isOpen = activeIndex === i;
        return (
          <div key={i} className="faq-row" data-open={isOpen}>
            <button
              id={`faq-button-${i}`}
              className="faq-row-trigger"
              onClick={() => toggleAccordion(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-content-${i}`}
            >
              <span className="faq-row-index" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="faq-row-question">{faq.q}</span>
              <ChevronDown className="faq-row-chevron" aria-hidden />
            </button>

            <div
              id={`faq-content-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`faq-row-answer${
                    speakableAnswerIndex !== undefined &&
                    (Array.isArray(speakableAnswerIndex)
                      ? speakableAnswerIndex.includes(i)
                      : speakableAnswerIndex === i)
                      ? ' speakable-faq-answer'
                      : ''
                  }`}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
