import { FULFILLMENT_METHOD_CONFIG_FAQS_PROPS } from "../../../../../utils/types";

const FulFillmentMethodConfigFAQs = ({
  faqs,
}: FULFILLMENT_METHOD_CONFIG_FAQS_PROPS) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h3>

      {/* FAQs List */}
      <div className="flex flex-col gap-2 text-sm">
        {faqs.map((faq, index) => (
          <div key={index}>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {faq.question}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FulFillmentMethodConfigFAQs;
