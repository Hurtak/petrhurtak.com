import { z } from "zod";

export const articleMetadataValidator = z.object({
  title: z.string(),
  description: z.string(),
  datePublication: z.string(),
});
export type ArticleMetadata = z.infer<typeof articleMetadataValidator>;

export const articleMetadataExtendedValidator = z.object({
  title: z.string(),
  description: z.string(),
  datePublication: z.number(),
  slug: z.string(),

  articlePath: z.string(),
  articleDirectory: z.string(),
});
export type ArticleMetadataExtended = z.infer<typeof articleMetadataExtendedValidator>;
