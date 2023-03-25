import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

import {
  PODCAST_HOSTS,
  PODCAST_DESCRIPTION,
  PODCAST_EMAIL,
  PODCAST_LOGO_URL,
  PODCAST_TITLE,
  SITE_URL,
} from "src/config";
import XMLBuilder from "xmlbuilder";
import {
  AudioMetadata,
  getEpisodeAudioMetadata,
  getEpisodeCoverArtPath,
  getEpisodePagePath,
} from "src/lib/utils";

const publishedEpisodeEntries = await getCollection("episodes", ({ data }) => {
  return data.draft !== true;
});

const sortedEpisodeEntries = publishedEpisodeEntries.sort(
  (a, b) =>
    new Date(b.data.publishedAt).valueOf() -
    new Date(a.data.publishedAt).valueOf()
);

const sortedEpisodeEntriesWithAudioMetadata = await Promise.all(
  sortedEpisodeEntries.map(async (entry) => {
    const audioMetadata = await getEpisodeAudioMetadata(entry.slug);
    return {
      entry,
      audioMetadata,
    };
  })
);

const entryToItem = ({
  entry: { slug, data: episode },
  audioMetadata,
}: {
  entry: CollectionEntry<"episodes">;
  audioMetadata: AudioMetadata;
}) => ({
  guid: SITE_URL + getEpisodePagePath(slug),
  link: SITE_URL + getEpisodePagePath(slug),
  title: episode.title,
  "itunes:summary": episode.tagline,
  description: episode.description,
  pubDate: episode.publishedAt.toUTCString(),
  "itunes:explicit": episode.explicit ? "yes" : "no",
  enclosure: {
    "@url": SITE_URL + audioMetadata.path,
    "@type": "audio/m4a",
    "@length": audioMetadata.bytes,
  },
  "itunes:image": {
    "@href": SITE_URL + getEpisodeCoverArtPath(slug),
  },
  "itunes:duration": audioMetadata.seconds,
  "podcast:person": [
    ...(episode.hosts ?? []),
    ...(episode.guests?.map((name) => ({
      "#text": name,
      "@role": "guest",
    })) ?? []),
  ],
  "podcast:location": episode.locations?.map((loc) => ({
    "#text": loc.name,
    "@geo": `geo:${loc.lat},${loc.long}`,
  })),
  "podcast:episode": episode.episodeNumber,
});

/**
 * Generate podcast RSS feed.
 */
export const all: APIRoute = async () => {
  const xml = XMLBuilder.create(
    {
      rss: {
        "@version": "2.0",
        "@xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "@xmlns:content": "http://purl.org/rss/1.0/modules/content/",
        "@xmlns:podcast": "https://podcastindex.org/namespace/1.0",
        channel: {
          title: PODCAST_TITLE,
          "itunes:owner": {
            "itunes:name": "Hollow Moon Studio",
            "itunes:email": PODCAST_EMAIL,
          },
          "itunes:author": "Hollow Moon Studio",
          "itunes:category": "Society & Culture",
          description: PODCAST_DESCRIPTION,
          "itunes:image": {
            "@href": SITE_URL + PODCAST_LOGO_URL,
          },
          "podcast:person": [
            ...PODCAST_HOSTS,
            {
              "#text": "Ryan the Skeleton",
              "@role": "guest",
            },
          ],
          language: "en-us",
          link: SITE_URL,
          item: sortedEpisodeEntriesWithAudioMetadata.map(entryToItem),
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
