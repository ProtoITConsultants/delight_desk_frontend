export interface TestWismoAgentParams {
  query: string;
}

export interface TestWismoAgentResponse {
  from: string;
  to: string;
  subject: string;
  body: string;
  signature: string;
  orderDetails?: {
    orderId: string;
    status: string;
    trackingNumber?: string;
  };
  hasTracking: boolean;
}
