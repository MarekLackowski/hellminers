# Hellminers website

A static page (index.html, style.css, site.js, media/) for GitHub Pages.

## Editing

Everything that changes lives in the `SITE` block at the top of `site.js`:

- `version` and `stage`
- `links`: YouTube, TikTok and Patreon. An empty link shows "coming soon".
- `videos`: each one is `media/videos/<id>.mp4` with `<id>.jpg` as its poster.
- `patchNotes`: newest first. Each entry has `sections` (`New stratagems`, `Added`, `Changes`, `Fixes`), each a list of lines.

## Writing patch notes

Written the way Helldivers 2, Minecraft, Terraria, Deep Rock Galactic and Modrinth mods (Sodium, Lithium, Create, Alex's Mobs, Waystones) write theirs:

- Group by section: **New stratagems** / **Added**, **Changes**, **Fixes**. Leave out empty sections.
- One change per line, short. Most lines are one clause.
- New things are listed by their name alone: `MD-8 Gas Mines`. No description of what they are or do.
- Changes to one thing: `Name: what changed.`, as in `HMG Emplacement: range increased from 40 m to 300 m.`
- Numbers as `from X to Y`, with units.
- Fixes start with `Fixed` and say what was wrong: `Fixed flickering textures on Terminids.`
- Use plain verbs: added, increased, reduced, now, no longer, fixed, removed.
- No selling and no adjectives. Avoid "like the game's", "come with", "all-new" and anything written to impress.
- Don't explain why something changed unless a player needs it to understand the line.
- Never mark an entry "in progress".

## Publishing

This folder is its own git repository: https://github.com/MarekLackowski/hellminers. GitHub Pages serves `main` from the root at https://mareklackowski.github.io/hellminers/. Commit and run `git push`, and the site updates within a minute or two.
