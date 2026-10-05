# Hellminers website

A static page (index.html, style.css, site.js, media/) for GitHub Pages.

## Editing

Everything that changes lives in the `SITE` block at the top of `site.js`:

- `version` and `stage`
- `links`: YouTube, TikTok and Patreon. An empty link shows "coming soon".
- `videos`: each one is `media/videos/<id>.mp4` with `<id>.jpg` as its poster.
- `patchNotes`: newest first.

## Publishing on GitHub Pages

1. On github.com, create a public repository, for example `hellminers`.
2. Upload the contents of this folder (not the folder itself) with "Add file > Upload files".
3. Go to Settings > Pages > Build and deployment. Set Source to "Deploy from a branch" and Branch to `main` / `(root)`, then Save.
4. After a minute or two the site is live at `https://<your-github-name>.github.io/hellminers/`.

To use your own domain later, set it under Settings > Pages > Custom domain.
