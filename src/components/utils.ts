import { z } from "zod";

const validateSvgImport = z.union([
  z.object({
    src: z.string().min(1),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  z.string().min(1),
]);
type SvgImport = {
  src: string;
};

// SVG import normalizer for bundlers that return different asset shapes.
export const parseSvgImage = (svgImport: unknown): SvgImport => {
  const svgImportValidated = validateSvgImport.parse(svgImport);

  if (typeof svgImportValidated === "string") {
    return { src: svgImportValidated };
  }

  return { src: svgImportValidated.src };
};
