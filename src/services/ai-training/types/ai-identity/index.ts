export enum BrandVoice {
  Friendly = "friendly",
  Professional = "professional",
  Sophisticated = "sophisticated",
  Custom = "custom",
}

export interface GET_AI_IDENTITY_RESPONSE {
  id: string;
  userId: string;
  aiAgentName: string;
  businessType: string;
  aiAgentTitle: string;
  emailSalutation: string;
  companyNameForEmailSignature: string;
  signatureFooter: string;
  brandVoice: BrandVoice;
  customBrandVoice: string;
  industrySpecificGuidance: boolean;
  thankLoyalCustomers: boolean;
  allowEmojiInResponses: boolean;
  customInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface UPDATE_AI_IDENTITY_PARAMS {
  aiAgentName: string;
  businessType: string;
  aiAgentTitle: string;
  emailSalutation: string;
  companyNameForEmailSignature: string;
  signatureFooter: string;
  brandVoice: string;
  customBrandVoice?: string;
  industrySpecificGuidance: boolean;
  thankLoyalCustomers: boolean;
  allowEmojiInResponses: boolean;
  customInstructions: string;
}

export interface GENERATE_NAMES_FOR_AI_IDENTITY_PARAMS {
  customerDescription: string;
}

export interface GENERATED_NAME_FOR_AI_IDENTITY {
  name: string;
  description: string;
}
