import { z } from "zod";

export const StallStatusSchema = z.enum(["open", "coming_soon", "closed"]);
export const StallTypeSchema = z.enum(["generic_ai", "custom_ai", "daily", "local"]);
export const MetricEventSchema = z.enum(["visit", "generation", "image_save"]);

export const StallSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  code: z.string().regex(/^[A-Z]-\d{2}$/),
  districtSlug: z.string(),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(100),
  status: StallStatusSchema,
  type: StallTypeSchema,
  sortOrder: z.number().int().nonnegative(),
  config: z.record(z.string(), z.unknown()),
});

export const DistrictSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  accent: z.string().min(1),
  sortOrder: z.number().int().nonnegative(),
});

export const StallGenerationRequestSchema = z.record(z.string(), z.string());

export const ShareTemplateSchema = z.enum([
  "badge",
  "fortune",
  "chat",
  "notice",
  "leave",
  "report",
  "handbook",
  "drill",
  "award",
]);

export const StallResultSchema = z.object({
  title: z.string(),
  summary: z.string(),
  sections: z.array(z.object({ label: z.string(), value: z.string() })),
  shareTemplate: ShareTemplateSchema,
});

export type StallStatus = z.infer<typeof StallStatusSchema>;
export type StallType = z.infer<typeof StallTypeSchema>;
export type MetricEvent = z.infer<typeof MetricEventSchema>;
export type Stall = z.infer<typeof StallSchema>;
export type District = z.infer<typeof DistrictSchema>;
export type StallGenerationRequest = z.infer<typeof StallGenerationRequestSchema>;
export type ShareTemplate = z.infer<typeof ShareTemplateSchema>;
export type StallResult = z.infer<typeof StallResultSchema>;
