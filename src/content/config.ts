import { defineCollection, z } from "astro:content";

const policies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    appId: z.string().describe("Short id used in URLs, e.g. 'sismik'"),
    language: z.enum(["en", "tr"]).default("en"),
  }),
});

export const collections = { policies };