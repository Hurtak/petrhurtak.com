import { z } from "zod";

export const articleMetadataJsonValidator = z.object({
  title: z.string(),
  description: z.string(),
  datePublication: z.string(),
});
export type ArticleMetadataJson = z.infer<typeof articleMetadataJsonValidator>;

export const articleMetadataValidator = z.object({
  title: z.string(),
  description: z.string(),
  datePublication: z.number(),
  articlePath: z.string(),
  articleDirectory: z.string(),
});
export type ArticleMetadata = z.infer<typeof articleMetadataValidator>;
