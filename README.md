# Hellminers website

A static page (index.html, style.css, site.js, media/) for GitHub Pages.

## Editing

Everything that changes lives in the `SITE` block at the top of `site.js`:

- `version` and `stage`
- `links`: YouTube, TikTok, Ko-fi and Patreon. An empty link shows "coming soon".
- `supporters`: patrons, added by hand as `{ name, tier }` (tier `cadet`, `helldiver`, `veteran`, `super_citizen`). Each gets its rank icon from `media/ranks/<tier>.svg`, highest rank first; Super Citizens in yellow.
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

## Versions

The version being built is one patch-note entry with `draft: true`: changes are added to it as they are made, and the site does not show it. `node release.js` publishes it: it drops the draft mark, dates the entry today, sets the site's version to it and bumps the cache stamp. Then commit and push.

## Caching

`index.html` loads `style.css` and `site.js` with a `?v=` stamp. Change the stamp whenever either file changes, or browsers keep the old copy.

## Publishing

This folder is its own git repository: https://github.com/MarekLackowski/hellminers. GitHub Pages serves `main` from the root at https://mareklackowski.github.io/hellminers/. Commit and run `git push`, and the site updates within a minute or two.

## Phones first

About 60% of visitors are on phones. Check every change at 390 px wide before publishing:

- The YouTube / TikTok buttons must be on the first screen.
- Nothing may push the page sideways.
- Tap targets are at least 44 px.
- Every `<img>` and `<video>` has `width` and `height`, so the page doesn't jump while loading.
- Big pictures get a small copy for phones: `hero-540.jpg` next to `hero.jpg`.
- `media/og.jpg` (1200×630) is the picture shown when the link is shared. Its URL in `index.html` is absolute.
- Site videos: 540×960, about 600 kb/s, `-movflags +faststart`. Posters are the episode thumbnail at 540×960.

## Hero reel and player (2026-10-15)

- `media/hero-reel.mp4` is the silent loop at the top: 1280×720, 13 moments from the shorts (a 1080×608 band at y 650, clear of the title bar and captions), about 4.4 MB. On a desktop it fills the whole top behind the title, darkened on the left. On a phone it is a 16:9 box under the buttons, with a red rec dot. `hero-reel.jpg` is its poster, and visitors with reduced motion see only the poster. When new big moments come out, rebuild it from the newest shorts.
- Videos are poster cards. On a mouse, hovering plays a muted preview. A click opens the `#player` dialog: a 9:16 frame with play/pause, seek, mute and a volume slider (remembered), prev/next with buttons and ↑/↓, and swipe up/down on phones. The next video starts on its own when one ends.
- Cards rise in as they scroll into view, once. Motion only where it has a purpose (claudedesignskills `modern-web-design`), and none for reduced motion.
