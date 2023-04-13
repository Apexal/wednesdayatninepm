import { PEOPLE, PEOPLE_NAME } from "src/podcast";

export const getEpisodePagePath = (slug: string) => `/episodes/${slug}`;

export const getEpisodeAudioURL = (slug: string) =>
  `https://wednesdayatninepm.nyc3.cdn.digitaloceanspaces.com/${slug}.m4a`;

export const getEpisodeCoverArtPath = (slug: string) =>
  `/episodes/coverart/${slug}.jpg`;

export const getEpisodeImagesPath = (slug: string) =>
  `/episodes/images/${slug}/`;

export const personToItemPerson = (role: string) => (nickname: string) => {
  if (nickname in PEOPLE) {
    const person = PEOPLE[nickname as PEOPLE_NAME];
    return {
      "@role": role,
      "#text": person.name,
      "@href": person.url,
      "@img": person.imgUrl,
    };
  } else {
    return {
      "@role": role,
      "#text": nickname,
    };
  }
};

export const parseTitle = (body: string) => {
  let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== "string") return null;
  return parseHtmlEntities(match[1]);
};

function parseHtmlEntities(str: string) {
  return str.replace(/&#([0-9]{1,3});/gi, function (match, numStr) {
    var num = parseInt(numStr, 10); // read num as normal number
    return String.fromCharCode(num);
  });
}
