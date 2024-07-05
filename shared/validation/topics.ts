import { z } from "zod";

const domainSchema = z.object({
  name: z.string().min(1, "Domain name is required"),
  color: z.string().min(1, "Color is required"),
});

const RevisionTypeEnum = z.enum(["1-3-7-21", "daily"], {
  required_error: "Revision type is required",
  invalid_type_error: "Revision type must be '1-3-7-21' or 'daily'",
});

export const addTopicSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  domain: z.string().min(1, "Domain is required").optional(),
  revisionType: z.string().min(1, "Revision plan is required"),
  //   domain: domainSchema,
  //   revisionType: RevisionTypeEnum,
});

export type AddTopicType = z.infer<typeof addTopicSchema>;
