import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-7 py-6 mt-9">
      <h2 className="text-xl font-semibold mb-4">FAQs</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-neutral-700 rounded-2xl px-4 py-3"
            onClick={() => toggleFAQ(idx)}
          >
            {/* Question */}
            <div className="flex items-center justify-between cursor-pointer">
              <p className="text-sm font-medium">{faq.question}</p>
              {openIndex === idx ? (
                <ChevronUp size={18} className="text-neutral-300" />
              ) : (
                <ChevronDown size={18} className="text-neutral-300" />
              )}
            </div>

            {/* Answer */}
            {openIndex === idx && (
              <p className="text-sm text-neutral-300 mt-2 leading-snug">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
