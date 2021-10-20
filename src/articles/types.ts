import { z } from "zod";

export const articleMetadataJsonValidator = z.object({
  title: z.string(),
  description: z.string(),
});
export type ArticleMetadataJson = z.infer<typeof articleMetadataJsonValidator>;

export type ArticleType = "ARTICLE" | "ARTICLE_HIDDEN";

export type ArticleMetadata = {
  type: ArticleType;

  title: string;
  description: string;
  datePublication: number;
  slug: string;

  articlePath: string;
  articleDirectory: string;
};
