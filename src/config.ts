// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const PODCAST_TITLE = "Wednesday at 9PM";
export const PODCAST_LOGO_URL = "/logo.jpg";
export const PODCAST_TAGLINE= "A very serious research podcast about weird, local stories."
export const PODCAST_EMAIL = "wednesdayatninepm@gmail.com";
export const PODCAST_DESCRIPTION = PODCAST_TAGLINE + " Join Frank, Nick, and Aaron as they research and present local strange stories that will make you question the validity of their STEM degrees.";
export const EPISODE_PREFACE = "This Wednesday night at 9pm at midnight at 3am in a cemetery... ";

export const PODCAST_HOSTS = [
  "Aaron Reers",
  "Frank Matranga",
  "Nicholas Oertel"
];

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
