import { z, defineCollection } from "astro:content";
import { markdownLinkRegex } from "src/lib/utils";
import { PEOPLE_NAMES } from "src/podcast";

// https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md

const episodeImage = z.object({
  fileName: z.string(),
  description: z.string(),
});

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
    audioMetadata: z.object({
      seconds: z.number().positive(),
      bytes: z.number().positive(),
    }),
    hosts: z.array(z.enum(PEOPLE_NAMES)),
    cohosts: z.array(z.enum(PEOPLE_NAMES)).optional(),
    guests: z.array(z.string()).optional(),
    images: z.array(episodeImage).optional(),
    locations: z
      .array(
        z.object({
          name: z.string(),
          lat: z.number(),
          long: z.number(),
        })
      )
      .optional(),
    sources: z
      .array(z.string().url().or(z.string().regex(markdownLinkRegex)))
      .optional(),
  }),
});

export const collections = {
  episodes: episodeCollection,
};
