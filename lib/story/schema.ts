import { z } from "zod";

export const storyFormSchema = z.object({
  era: z.string().min(1),
  region: z.string().min(1),
  gender: z.string().min(1),
  ageGroup: z.string().min(1),
  role: z.string().min(1),
  genre: z.string().min(1),
  subGenre: z.string().min(1),
  tone: z.string().min(1),
  conflict: z.string().min(1),
  ending: z.string().min(1),
  perspective: z.enum(["first_person", "third_person"]),
  romanceLevel: z.enum(["none", "low", "medium", "high"]),
  combatLevel: z.enum(["none", "low", "medium", "high"]),
  protagonistName: z.string().max(30).default(""),
  keyword: z.string().max(100).default(""),
  length: z.number().int().min(500).max(3000).default(1200),
});

export type StoryFormValues = z.infer<typeof storyFormSchema>;

export const generatedStorySchema = z.object({
  title: z.string(),
  summary: z.string(),
  story: z.string(),
  metadata: z.object({
    era: z.string(),
    region: z.string(),
    genre: z.string(),
    tone: z.string(),
    ending: z.string(),
    estimatedLength: z.number().int(),
  }),
});

export type GeneratedStory = z.infer<typeof generatedStorySchema>;
