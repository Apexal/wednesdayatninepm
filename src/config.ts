// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const PODCAST_TITLE = "Wednesday at 9PM";
export const PODCAST_LOGO_URL = "/logo.jpg";
export const PODCAST_TAGLINE= "A very serious research podcast about weird, local stories."
export const PODCAST_EMAIL = "fakeemail@email.com";
export const PODCAST_DESCRIPTION =
  "Beep boop write stuff here one day";

export const PODCAST_AUTHOR = "Frank & Nick & Aaron";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
