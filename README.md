# Hellminers website

A static page (index.html, style.css, site.js, media/) for GitHub Pages.

## Editing

Everything that changes lives in the `SITE` block at the top of `site.js`:

- `version` and `stage`
- `links`: YouTube, TikTok and Patreon. An empty link shows "coming soon".
- `videos`: each one is `media/videos/<id>.mp4` with `<id>.jpg` as its poster.
- `patchNotes`: newest first.

## Publishing

This folder is its own git repository: https://github.com/MarekLackowski/hellminers. GitHub Pages serves `main` from the root at https://mareklackowski.github.io/hellminers/. Commit and run `git push`, and the site updates within a minute or two.
