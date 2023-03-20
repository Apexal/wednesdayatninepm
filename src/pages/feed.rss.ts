import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";
import { parseFile } from "music-metadata";
import path from "path";
import { stat } from "node:fs/promises";

import {
  PODCAST_AUTHOR,
  PODCAST_DESCRIPTION,
  PODCAST_EMAIL,
  PODCAST_LOGO_URL,
  PODCAST_TITLE,
  SITE_URL,
} from "src/config";
import XMLBuilder from "xmlbuilder";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const publishedEpisodeEntries = await getCollection("episodes", ({ data }) => {
  return data.draft !== true;
});

const sortedEpisodeEntries = publishedEpisodeEntries.sort(
  (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
);

const sortedEpisodeEntriesWithAudio = await Promise.all(
  sortedEpisodeEntries.map(async (entry) => {
    const audioPath = path.join(
      path.dirname(__filename),
      "..",
      "..",
      SITE_URL.includes("localhost") ? "public" : ".",
      "episodes",
      "audio",
      entry.slug + ".m4a"
    );
    const stats = await stat(audioPath);
    const audioMetadata = await parseFile(audioPath);

    const data: CollectionEntry<"episodes">["data"] = {
      ...entry.data,
      audioURL: SITE_URL + "/episodes/audio/" + entry.slug + ".m4a",
      audioLengthBytes: stats.size,
      audioLengthSeconds: Math.round(audioMetadata.format.duration!),
    };
    return {
      ...entry,
      data,
    };
  })
);

/**
 * Generate podcast RSS feed.
 */
export const all: APIRoute = async () => {
  const xml = XMLBuilder.create(
    {
      rss: {
        "@version": "2.0",
        "@xlmns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "@xmlns:content": "http://purl.org/rss/1.0/modules/content/",
        channel: {
          title: PODCAST_TITLE,
          "itunes:owner": {
            "itunes:email": PODCAST_EMAIL,
          },
          "itunes:author": PODCAST_AUTHOR,
          "itunes:category": "Society & Culture",
          description: PODCAST_DESCRIPTION,
          "itunes:image": {
            "@href": SITE_URL + PODCAST_LOGO_URL,
          },
          language: "en-us",
          link: "homepage url",
          item: [
            sortedEpisodeEntriesWithAudio.map((entry) => ({
              guid: {
                "@isPermaLink": true,
                "#text": entry.id,
              },
              title: entry.data.title,
              description: entry.data.description,
              pubDate: entry.data.date.toUTCString(),
              "itunes:explicit": entry.data.explicit ? "yes" : "no",
              enclosure: {
                "@url": entry.data.audioURL,
                "@type": "audio/m4a",
                "@length": entry.data.audioLengthBytes,
              },
              "itunes:duration": entry.data.audioLengthSeconds,
            })),
          ],
        },
      },
    },
    {
      encoding: "UTF-8",
    }
  ).end({ pretty: true });
  return {
    body: xml,
  };
};
