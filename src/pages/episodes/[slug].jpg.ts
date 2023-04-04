import type { APIRoute } from "astro";
import Jimp from "jimp";
import { getEpisodeCoverArtPath } from "src/lib/utils";
import { fileURLToPath } from "url";
import path from "path";
import { SITE_URL } from "src/config";
import { getCollection } from "astro:content";

const __filename = fileURLToPath(import.meta.url);

export async function getStaticPaths() {
  const episodeEntries = await getCollection("episodes", ({ data }) => {
    return data.draft !== true;
  });
  return episodeEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

export const get: APIRoute = async function get({ params, request }) {
  const slug = params.slug!;

  const coverArtPath = path.join(
    path.dirname(__filename),
    "..",
    "..",
    "..",
    "public",
    getEpisodeCoverArtPath(slug)
  );

  // Read input image
  const image = await Jimp.read(coverArtPath);
  const imageWidth = image.getWidth();
  const imageHeight = image.getHeight();
  image.resize(512, 512);

  // Write text in CENTER
  const textHorizontalPadding = 50;
  const textVerticalPadding = 10;
  const textMaxWidth = imageWidth - textHorizontalPadding * 2;
  const text = slug.split("-")[0];
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const textWidth = Jimp.measureText(font, text);
  const textHeight = Jimp.measureTextHeight(font, text, textMaxWidth);

  // Draw black banner for text
  image.scan(
    0,
    imageHeight - textHeight - textVerticalPadding * 2,
    imageWidth,
    textHeight + textVerticalPadding * 2,
    function (x, y, idx) {
      this.bitmap.data[idx] = 14;
      this.bitmap.data[idx + 1] = 20;
      this.bitmap.data[idx + 2] = 27;
    }
  );

  image.print(
    font,
    image.getWidth() / 2 - textWidth / 2,
    imageHeight - textHeight - textVerticalPadding,
    text,
    textMaxWidth
  );

  const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  return {
    encoding: "binary",
    body: buffer,
  };
};
