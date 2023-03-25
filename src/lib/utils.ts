import { fileURLToPath } from "url";
import { parseFile } from "music-metadata";
import path from "path";
import { stat } from "node:fs/promises";
import { SITE_URL } from "src/config";

export const getEpisodePath = (slug: string) => `/episodes/${slug}`;

export const getEpisodeCoverArtPath = (slug: string) =>
  `/episodes/coverart/${slug}.jpg`;

const __filename = fileURLToPath(import.meta.url);

export type AudioMetadata = {
  path: string;
  seconds: number;
  bytes: number;
};

export async function getEpisodeAudioMetadata(
  slug: string
): Promise<AudioMetadata> {
  const audioPath = path.join(
    path.dirname(__filename),
    "..",
    "..",
    SITE_URL.includes("localhost") ? "public" : ".",
    "episodes",
    "audio",
    slug + ".m4a"
  );
  const [stats, metadata] = await Promise.all([
    stat(audioPath),
    parseFile(audioPath),
  ]);

  return {
    path: `/episodes/audio/${slug}.m4a`,
    seconds: Math.round(metadata.format.duration!),
    bytes: stats.size ?? metadata.native,
  };
}
