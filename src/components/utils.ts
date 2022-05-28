import { z } from "zod";

const validateSvgImport = z.object({
  src: z.string().min(1),
  width: z.number(),
  height: z.number(),
});
type SvgImport = z.infer<typeof validateSvgImport>;

export const parseSvgImage = (svgImport: unknown): SvgImport => {
  const svgImportValidated = validateSvgImport.safeParse(svgImport);

  if (!svgImportValidated.success) {
    console.error("Cannot parse svg import", svgImport);

    return {
      src: "",
      width: 0,
      height: 0,
    };
  }

  return svgImportValidated.data;
};
