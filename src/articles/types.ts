import { z } from "zod";

export const articleMetadataJsonValidator = z.object({
  title: z.string(),
  description: z.string(),
});
export type ArticleMetadataJson = z.infer<typeof articleMetadataJsonValidator>;

type ArticleBlogMetadata = {
  title: string;
  description: string;
  datePublication: number;
  slug: string;

  articlePath: string;
  articleDirectory: string;
};
export type ArticleBlogVisible = ArticleBlogMetadata & { type: "ARTICLE_BLOG_VISIBLE" };
export type ArticleBlogHidden = ArticleBlogMetadata & { type: "ARTICLE_BLOG_HIDDEN" };

export type ArticleBlog = ArticleBlogVisible | ArticleBlogHidden;

export type ArticleTwitterRaw = {
  title: string;
  datePublication: string;
  link: string;
};
export type ArticleTwitter = {
  type: "ARTICLE_TWITTER";

  title: string;
  datePublication: number;

  link: string;
};

export type Article = ArticleBlog | ArticleTwitter;
export type ArticlePublished = ArticleBlogVisible | ArticleTwitter;
