import z from "zod";
import { VISUAL_BUILDER_FORM_SCHEMA } from "../../schema/visual-builder";

type VISUAL_BUILDER_FORM_TYPE = z.infer<typeof VISUAL_BUILDER_FORM_SCHEMA>;

export type { VISUAL_BUILDER_FORM_TYPE };
