import { FAQS_TYPE } from "@/types/landing-page";
import { LANDING_PAGE_CONSTANTS } from "../constants";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQCard = ({ _id, question, answer }: FAQS_TYPE) => {
  return (
    <AccordionItem
      value={_id.toString()}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      <AccordionTrigger className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors hover:cursor-pointer">
        <h3 className="text-lg font-semibold text-white !no-underline group-hover:!no-underline">
          {question}
        </h3>
      </AccordionTrigger>
      <AccordionContent className="px-6 py-5">
        <p className="text-white/80 leading-relaxed">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

const FAQs = () => {
  return (
    <section
      id="faq"
      className="relative ds-section-padding-mobile bg-gradient-to-br from-blue-900/30 via-slate-900 to-purple-900/30"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="ds-heading-lg font-bold mb-6 text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {LANDING_PAGE_CONSTANTS.FAQs.map((faq) => (
            <FAQCard key={faq._id} {...faq} />
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;
