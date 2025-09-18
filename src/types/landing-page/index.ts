// Order Change Automation - Section
type ORDER_CHANGE_AUTOMATION_STEPS_TYPES = {
  Icon: React.ElementType;
  heading: string;
  subheading: string;
  time: string;
  className?: string;
};
type ORDER_CHANGE_AUTOMATION_CARD_TYPES = {
  heading: string;
  subheading: string;
};

// Rapid Resolution - Section
type RAPID_RESOLUTION_FEATURE_TYPES = {
  Icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
};

// Testimonials - Section
type TESTIMONIAL_CARD_TYPES = {
  rating: number;
  feedback: string;
  name: string;
  role: string;
  company: string;
  companyColor: string;
  avatarUrl: string;
};

// FAQs - Section
type FAQS_TYPE = {
  _id: number;
  question: string;
  answer: string;
};

export type {
  // Order Change Automation - Section
  ORDER_CHANGE_AUTOMATION_STEPS_TYPES,
  ORDER_CHANGE_AUTOMATION_CARD_TYPES,
  // Rapid Resolution - Section
  RAPID_RESOLUTION_FEATURE_TYPES,
  // Testimonials - Section
  TESTIMONIAL_CARD_TYPES,
  // FAQs - Section
  FAQS_TYPE,
};
