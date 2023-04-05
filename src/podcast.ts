import { z } from "zod";

export const PODCAST_TITLE = "Wednesday at 9PM";
export const PODCAST_LOGO_URL = "/logo.png";
export const PODCAST_TAGLINE =
  "A very serious research podcast about weird, local stories.";
export const PODCAST_EMAIL = "wednesdayatninepm@gmail.com";
export const PODCAST_DESCRIPTION =
  "Join Frank, Nick, and Aaron as they research and present local strange stories that will make you question the validity of their STEM degrees.";
export const EPISODE_PREFACE =
  "This Wednesday night at 9pm at midnight at 3am in a cemetery... ";
export const PODCAST_PRODUCERS = ["Frank Matranga"];
export const PODCAST_HOSTS = [
  "Aaron Reers",
  "Frank Matranga",
  "Nicholas Oertel",
];

export type Person = {
  name: string;
  imgUrl?: string;
  url?: string;
};

export const PEOPLE_NAMES = ["Frank", "Nick", "Aaron"] as const;
export const PEOPLE: Record<(typeof PEOPLE_NAMES)[number], Person> = {
  Frank: {
    name: "Frank Matranga",
    imgUrl:
      "https://media.licdn.com/dms/image/C5603AQHdtGL8FmSkWg/profile-displayphoto-shrink_800_800/0/1576113529974?e=2147483647&v=beta&t=TepOSCt5JIqrq5dYN_jFmi16KB9iXK6eh_Kt8mlegPw",
    url: "https://www.linkedin.com/in/frank-matranga/",
  },
  Aaron: {
    name: "Aaron Reers",
  },
  Nick: {
    name: "Nicholas Oertel",
  },
} as const;

const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
