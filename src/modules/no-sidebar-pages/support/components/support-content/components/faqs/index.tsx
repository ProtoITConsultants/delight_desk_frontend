"use client";
import FAQsContent from "./components/accordion-content";
import FAQsSidebar from "./components/accordion-sidebar";
import ContactUsForm from "./components/contact-us-form";
import { FAQSidebarProvider } from "./context/use-faq-sidebar";

const FAQs = () => {
  return (
    <FAQSidebarProvider>
      <div className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1 sticky top-6">
          <FAQsSidebar />
        </div>
        <div className="col-span-1 lg:col-span-3" id="faq-section">
          <FAQsContent />
          <ContactUsForm />
        </div>
      </div>
    </FAQSidebarProvider>
  );
};

export default FAQs;
