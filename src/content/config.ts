import { z, defineCollection } from "astro:content";

const episodeCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    explicit: z.boolean().optional().default(false),
    title: z.string({
      required_error: "Required frontmatter missing: title",
      invalid_type_error: "title must be a string",
    }),
    tagline: z.string().optional(),
    date: z.date({
      required_error: "Required frontmatter missing: publishedAt",
      invalid_type_error:
        "date must be written in ISO format in UTC timezonewithout quotes: For example, Jan 11, 2000 12:30pm EST should be written as 2000-01-11T07:30:00Z.",
    }),
    description: z.string(),
    ogImagePath: z.optional(z.string()),
    canonicalUrl: z.optional(z.string()),
    audioURL: z.string().optional(),
    audioLengthBytes: z.number().gt(0).optional(),
    audioLengthSeconds: z.number().gt(0).optional()
  }),
});

export const collections = {
  episodes: episodeCollection,
};
