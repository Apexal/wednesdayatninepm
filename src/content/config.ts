import { z, defineCollection } from "astro:content";
import { PEOPLE, PEOPLE_NAMES } from "src/podcast";

// https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md

const episodeCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional().default(true),
    explicit: z.boolean().optional().default(false),
    title: z.string(),
    tagline: z.string(),
    episodeNumber: z.number().gte(0),
    publishedAt: z.date({
      required_error: "Required frontmatter missing: publishedAt",
      invalid_type_error:
        "date must be written in ISO format in UTC timezonewithout quotes: For example, Jan 11, 2000 12:30pm EST should be written as 2000-01-11T07:30:00Z.",
    }),
    hosts: z.array(z.enum(PEOPLE_NAMES)),
    cohosts: z.array(z.enum(PEOPLE_NAMES)).optional(),
    guests: z.array(z.string()).optional(),
    // 1000-character episode description shown in podcast apps
    description: z.string().max(1000),
    locations: z
      .array(
        z.object({
          name: z.string(),
          lat: z.number(),
          long: z.number(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  episodes: episodeCollection,
};
