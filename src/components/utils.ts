import { z } from "zod";

const validateSvgImport = z.object({
  src: z.string().min(1),
  width: z.number(),
  height: z.number(),
});
type SvgImport = z.infer<typeof validateSvgImport>;

// Needed because of https://duncanleung.com/next-js-typescript-svg-any-module-declaration/
export const parseSvgImage = (svgImport: unknown): SvgImport => {
  const svgImportValidated = validateSvgImport.parse(svgImport);
  return svgImportValidated;
};
