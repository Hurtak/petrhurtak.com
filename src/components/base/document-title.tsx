import { useEffect } from "react";

import { config } from "../../config";
import { nDashString } from "./dash";

export const DocumentTitle = ({ title, description }: { title?: string; description?: string }) => {
  useEffect(() => {
    document.title = title ? `${title} ${nDashString} ${config.site.documentTitle}` : config.site.documentTitle;
  }, [title]);

  useEffect(() => {
    if (!description) return;

    const existingMeta = document.querySelector("meta[name=\"description\"]");
    const meta = existingMeta ?? document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", description);

    if (!existingMeta) {
      document.head.append(meta);
    }
  }, [description]);

  return <></>;
};
