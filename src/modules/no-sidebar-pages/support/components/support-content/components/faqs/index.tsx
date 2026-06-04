"use client";
import { Mail } from "lucide-react";
import FAQsContent from "./components/accordion-content";
import FAQsSidebar from "./components/accordion-sidebar";
import ContactUsForm from "@/modules/core/components/contact-us-form";
import { FAQSidebarProvider } from "./context/use-faq-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FAQs = () => {
  return (
    <FAQSidebarProvider>
      <div className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1 sticky top-6">
          <FAQsSidebar />
        </div>
        <div className="col-span-1 lg:col-span-3" id="faq-section">
          {/* FAQs Content - Accordions */}
          <FAQsContent />

          {/* Contact Us Form */}
          <Card className="mt-8" id="contact-form">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-5 w-5" />
                Still Need Help?
              </CardTitle>
              <CardDescription>
                Can&apos;t find what you&apos;re looking for? Send us a message
                and we&apos;ll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactUsForm formType="get-help" />
            </CardContent>
          </Card>
        </div>
      </div>
    </FAQSidebarProvider>
  );
};

export default FAQs;
