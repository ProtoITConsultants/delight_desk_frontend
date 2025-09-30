import { apiService } from "@/lib/api-service";
import CONTACT_US_FORM from "../../constants/contact-us-form";
import { CONTACT_US_FORM_TYPE } from "../../utils/contact-us-form/types";

const ContactUsFormAPIs = {
  // Contact Us Form
  sendUserInquiry: ({ name, email, subject, inquiry }: CONTACT_US_FORM_TYPE) =>
    apiService.post(CONTACT_US_FORM.SEND_USER_INQUIRY_URL, {
      name,
      email,
      subject,
      inquiry,
    }),
};

export default ContactUsFormAPIs;
