# Wednesday at 9PM Podcast

**Wednesday at 9PM** is a very serious research podcast about weird, local stories. It is hosted by me and my buddies. Our goal is to run a stream-lined, high quality podcast but to make it as inexpensive as possible.

This repository hosts:
- the website
- the RSS feed generation
- the podcast audio and coverart

The website and feed are built as a static website using the wonderful [Astro](https://astro.build/). It is then hosted at [wednesdayatninepm.com](https://wednesdayatninepm.com) via Netlify for free. *Nice.* The only expense is the domain name!

## Development

Requirements:
- Node
- npm

Running Locally:
- `git clone git@github.com:Apexal/wednesdayatninepm.git`
- `cd wednesdayatninepm && npm install`
- `npm run dev`

## Template

I started this from the [Blogster sleek template](https://astro.build/themes/details/blogster-sleek/), though I ended up ripping out most things except the theme.
