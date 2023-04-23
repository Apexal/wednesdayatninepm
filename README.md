# Wednesday at 9PM Podcast

**Wednesday at 9PM** is a very serious research podcast about weird, local stories. It is hosted by me and my buddies. Our goal is to run a stream-lined, high quality podcast but to make it as inexpensive as possible.

This repository hosts:
- the website
- the RSS feed generation
- episode metadata (coverart, images, description, etc.)

The actual episode audio is hosted in a Digital Ocean Space (I don't wanna learn S3).

The website and feed are built as a static website using the wonderful [Astro](https://astro.build/). It is then hosted at [wednesdayatninepm.com](https://wednesdayatninepm.com) via Netlify for free. *Nice.*

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

## Scripts

### Generate Episode Transcript

```bash
$ whisper episode.wav --model small.en --output_dir public/episodes/transcripts/
```