import z from "zod";
import { HTML_BUILDER_FORM_SCHEMA } from "../../schema/html-builder";

type HTML_BUILDER_FORM_TYPE = z.infer<typeof HTML_BUILDER_FORM_SCHEMA>;

export type { HTML_BUILDER_FORM_TYPE };
