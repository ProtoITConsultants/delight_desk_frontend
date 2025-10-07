import z from "zod";
import { PROMO_CODE_FORM_SCHEMA } from "../../schema/promo-code-agent";

type PROMO_CODE_TYPES = z.infer<typeof PROMO_CODE_FORM_SCHEMA> & {
  id: string;
  usage_count: number;
  last_used: string;
};

// type PROMO_CODE_CARD_PROPS = Pick<z.infer<typeof PROMO_CODE_FORM_SCHEMA>, "">

export type { PROMO_CODE_TYPES };
