const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;

export const PODCAST_TITLE = "Wednesday at 9PM";
export const PODCAST_LOGO_URL = "/logo.png";
export const PODCAST_TAGLINE =
  "A semi-serious research podcast about weird, local stories.";
export const PODCAST_EMAIL = "wednesdayatninepm@gmail.com";
export const PODCAST_DESCRIPTION =
  "Join Frank, Nick, and Aaron as they research and discuss local, strange stories.";
export const EPISODE_PREFACE =
  "This Wednesday night at 9pm at midnight at 3am in a cemetery... ";
export const PODCAST_HOSTS: PEOPLE_NAME[] = ["Aaron", "Frank", "Nick"];
export const PODCAST_AUTHOR = "Matranga Productions";

export type Person = {
  name: string;
  imgUrl?: string;
  url?: string;
  roles?: ReadonlyArray<string>;
  bio?: string;
};

export const SHARE_URLS = {
  spotify: "https://open.spotify.com/show/15dzhmwVaXot0JDilN0AR7",
  google:
    "https://podcasts.google.com/feed/aHR0cHM6Ly93ZWRuZXNkYXlhdG5pbmVwbS5jb20vZmVlZC5yc3M",
  apple: "https://podcasts.apple.com/us/podcast/wednesday-at-9pm/id1680373413",
} as const;

export const PEOPLE_NAMES = [
  "Frank",
  "Nick",
  "Aaron",
  "Ryan",
  "Troy",
  "Sarah",
] as const;
export type PEOPLE_NAME = (typeof PEOPLE_NAMES)[number];
export const PEOPLE: Record<(typeof PEOPLE_NAMES)[number], Person> = {
  Frank: {
    name: "Frank Matranga",
    imgUrl: SITE_URL + "/people/frank.jpg",
    url: "https://www.linkedin.com/in/frank-matranga/",
    roles: ["producer", "researcher", "co-host", "hollow moon truther"],
    bio: `Frank is a software engineer and non-profit consultant with a dual degree in Computer Science & Information Technology and Web Science from Rensselaer Polytechnic Institute. Originally, from the Bronx, NY, he lives in the NY Capital Region and is always interested in learning more of the local history and lore of the land. The Catskills hold a special place in his heart as his family's vacation stomping ground for two decades. Ask him if he's ever met Rip Van Winkle.`
  },
  Aaron: {
    name: "Aaron Reers",
    imgUrl: SITE_URL + "/people/aaron.jpg",
    roles: ["researcher", "co-host", "monkey man"]
  },
  Nick: {
    name: "Nicholas Oertel",
    imgUrl: SITE_URL + "/people/nick.jpg",
    roles: ["researcher", "co-host", "resident poltergeist"]
  },
  Ryan: {
    name: "Ryan Schnur",
  },
  Troy: {
    name: "Troy",
  },
  Sarah: {
    name: "Sarah",
  },
} as const;
