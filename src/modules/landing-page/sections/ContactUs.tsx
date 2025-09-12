import { Mail } from "lucide-react";
import ContactUsForm from "../components/ContactUsForm";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="relative ds-section-padding-mobile bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="ds-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Contact Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20 glass-pulse">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/90">
                Contact Us
              </span>
            </div>
            <h2 className="ds-heading-lg font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Ready to Transform Your{" "}
              <span className="ds-gradient-primary-text">
                Customer Service?
              </span>
            </h2>
            <p className="ds-body-lg ds-text-muted max-w-2xl mx-auto">
              Get in touch to learn how Delight Desk can revolutionize your
              customer support workflow.
            </p>
          </div>

          {/* Contact Form - Centered */}
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
