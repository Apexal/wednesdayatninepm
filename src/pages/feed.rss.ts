import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

import {
  PODCAST_HOSTS,
  PODCAST_DESCRIPTION,
  PODCAST_EMAIL,
  PODCAST_LOGO_URL,
  PODCAST_TITLE,
  SITE_URL,
} from "src/podcast";
import XMLBuilder from "xmlbuilder";
import {
  getEpisodeAudioURL,
  getEpisodeImagesPath,
  getEpisodePagePath,
  getEpisodeTranscriptPath,
  personToItemPerson,
} from "src/lib/utils";

const publishedEpisodeEntries = await getCollection("episodes", ({ data }) => {
  return data.draft !== true;
});

const sortedEpisodeEntries = publishedEpisodeEntries.sort(
  (a, b) =>
    new Date(b.data.publishedAt).valueOf() -
    new Date(a.data.publishedAt).valueOf()
);

const episodeHtmlDescription = (
  slug: string,
  episode: CollectionEntry<"episodes">["data"]
) => {
  return {
    "#cdata": `<p>${episode.description}</p>
    
    ${
      episode.images
        ? episode.images.map(
            (image) =>
              `<figure><img src='${SITE_URL}${getEpisodeImagesPath(slug)}${
                image.fileName
              }'><figcaption>${image.description}</figcaption></figure>`
          )
        : ""
    }

    <a href='${
      SITE_URL + getEpisodePagePath(slug)
    }'>View show notes and sources</a>`,
  };
};

const entryToItem = ({ slug, data: episode }: CollectionEntry<"episodes">) => ({
  guid: SITE_URL + getEpisodePagePath(slug),
  link: SITE_URL + getEpisodePagePath(slug),
  title: episode.title,
  "itunes:summary": episode.tagline,
  description: episodeHtmlDescription(slug, episode),
  pubDate: episode.publishedAt.toUTCString(),
  "itunes:explicit": episode.explicit ? "yes" : "no",
  enclosure: {
    "@url": getEpisodeAudioURL(slug),
    "@type": "audio/m4a",
    "@length": episode.audioMetadata.bytes,
  },
  "itunes:image": {
    "@href": SITE_URL + getEpisodePagePath(slug) + ".jpg",
  },
  "itunes:duration": episode.audioMetadata.seconds,
  "podcast:person": [
    ...(episode.hosts ?? PODCAST_HOSTS).map(personToItemPerson("host")),
    ...(episode.cohosts ?? []).map(personToItemPerson("co-host")),
    ...(episode.guests?.map((name) => ({
      "#text": name,
      "@role": "guest",
    })) ?? []),
  ],
  "podcast:location": episode.locations?.slice(0, 1).map((loc) => ({
    "#text": loc.name,
    "@geo": `geo:${loc.lat},${loc.long}`,
  })),
  "podcast:transcript": [
    {
      "@url": SITE_URL + getEpisodeTranscriptPath + slug + ".json",
      "@type": "application/json",
    },
    {
      "@url": SITE_URL + getEpisodeTranscriptPath + slug + ".srt",
      "@type": "application/srt",
    },
  ],
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
            "itunes:name": "Matranga Productions",
            "itunes:email": PODCAST_EMAIL,
          },
          "itunes:author": "Matranga Productions",
          "itunes:category": "Society & Culture",
          description: PODCAST_DESCRIPTION,
          "itunes:image": {
            "@href": SITE_URL + PODCAST_LOGO_URL,
          },
          "podcast:person": [
            ...PODCAST_HOSTS.map(personToItemPerson("host")),
            {
              "@role": "guest",
              "#text": "Ryan the Skeleton",
            },
          ],
          language: "en-us",
          link: SITE_URL,
          item: sortedEpisodeEntries.map(entryToItem),
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
