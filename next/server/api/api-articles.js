import { sortBy } from "lodash";
import * as apiCommon from "./api-common.js";

export default async function getPosts() {
  let metadata = await apiCommon.getArticlesMetadata();

  // TODO: test this
  metadata = metadata.filter(article => article.dateLastUpdate <= Date.now());
  metadata = sortBy(metadata, "dateLastUpdate");
  metadata = metadata.reverse();

  return metadata;
}
