import { z } from "zod";

export const articleMetadataJsonValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  lastUpdate: z.string().optional(),
});
export type ArticleMetadataJson = z.infer<typeof articleMetadataJsonValidator>;

type ArticleBase = {
  id: string;
  title: string;
  datePublication: number;
};

type ArticleBlogMetadata = ArticleBase & {
  description: string;
  slug: string;

  articlePath: string;
  articleDirectory: string;

  dateLastUpdate?: number;
};
export type ArticleBlogVisible = ArticleBlogMetadata & { type: "ARTICLE_BLOG_VISIBLE" };
export type ArticleBlogHidden = ArticleBlogMetadata & { type: "ARTICLE_BLOG_HIDDEN" };

export type ArticleBlog = ArticleBlogVisible | ArticleBlogHidden;

export type ArticleXRaw = {
  title: string;
  datePublication: string;
  link: string;
};
export type ArticleX = ArticleBase & {
  type: "ARTICLE_X";

  link: string;
};

export type Article = ArticleBlog | ArticleX;
export type ArticlePublished = ArticleBlogVisible | ArticleX;
