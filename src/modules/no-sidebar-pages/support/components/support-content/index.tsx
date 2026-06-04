import DirectEmailSupportCard from "./components/direct-email-card";
import FAQs from "./components/faqs";
import FaqAndDocumentationCard from "./components/faq-and-documentation-card";

const SupportContent = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        {/* Quick Help Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FaqAndDocumentationCard />
          <DirectEmailSupportCard />
        </div>
        {/* FAQs */}
        <FAQs />
      </div>
    </div>
  );
};

export default SupportContent;
