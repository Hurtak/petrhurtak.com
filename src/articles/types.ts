import { z } from "zod";

export const articleMetadataJsonValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
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
};
export type ArticleBlogVisible = ArticleBlogMetadata & { type: "ARTICLE_BLOG_VISIBLE" };
export type ArticleBlogHidden = ArticleBlogMetadata & { type: "ARTICLE_BLOG_HIDDEN" };

export type ArticleBlog = ArticleBlogVisible | ArticleBlogHidden;

export type ArticleTwitterRaw = {
  title: string;
  datePublication: string;
  link: string;
};
export type ArticleTwitter = ArticleBase & {
  type: "ARTICLE_TWITTER";

  link: string;
};

export type Article = ArticleBlog | ArticleTwitter;
export type ArticlePublished = ArticleBlogVisible | ArticleTwitter;
