import z from "zod";

export const RETURN_POLICY_FORM_SCHEMA = z.object({
  // Auto Approval
  enableAutoApproval: z.boolean().catch(false),
  autoApprovalDays: z.number().optional(),
  enableAutoRefund: z.boolean().catch(false),

  // Smart Follow-up
  enableSmartFollowUp: z.boolean().catch(false),
  maxFollowUpAttempts: z.number().optional(),
  requirePhotosForDamagedItems: z.boolean().catch(false),
  requireReasonForReturn: z.boolean().catch(false),
  returnPolicyText: z
    .string()
    .min(10, "Return policy text must be at least 10 characters long"),
  returnInstructions: z
    .string()
    .min(10, "Return instructions must be at least 10 characters long"),
});
