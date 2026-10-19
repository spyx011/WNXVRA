# WNXVRA — Beyond Limits 超越极限

A personal portfolio website with an imperial **Chinese red-and-gold theme**: palace gates that swing open, a dragon on a hanging scroll, a fire-breathing cursor, background music, and a skill-unlocking "Upgrade" meter.

> **Dream. Build. Create. Conquer.** 梦想 · 构建 · 创造 · 征服

Built with plain **HTML, CSS and JavaScript**. No frameworks, no build step, no dependencies to install.

---

## Quick start

**Easiest:** open `index.html` in a browser. It is fully self-contained (CSS, JS, dragon picture and music are built in).

**Three-file version:** open `three-file-version/index.html`. Keep these four files together in the same folder:

```
three-file-version/
├── index.html    page structure and all the text
├── style.css     the theme, layout and animations
├── script.js     gates, music, fire cursor, popups, Upgrade meter
└── music.mp3     background music
```

To run it through a local server instead (recommended while editing):

```bash
cd three-file-version
python3 -m http.server 8000
# then open http://localhost:8000
```

> The brush-style Chinese lettering and the headings load from **Google Fonts**, so you need an internet connection to see them as designed. Without it the page still works and uses fallback fonts.

---

## What's on the page

| Section | What it shows |
| --- | --- |
| **Palace gates** | Red gates with gold studs open when the page loads. A 龙 seal stamps in above "WNXVRA". |
| **Home** | Shimmering gold **WNXVRA** title, *BEYOND LIMITS* / 超越极限, your tagline, and the dragon picture hanging on a scroll. |
| **Chinese band** | A red strip of gold writing scrolling under the title. |
| **About** | Developer · Creator · Innovator in the making. |
| **Focus** (专注领域) | Four cards that open popups: Game development, Artificial intelligence, Software engineering, Creative technology. |
| **How I work** (我的工作方式) | Your working principles and the "WNXVRA — HOW I WORK" block. |
| **The path** (四步之路) | Four steps: Dream, Build, Create, Conquer. |
| **Still at the beginning** | The **Upgrade** meter: every press unlocks a skill tag (Godot, Unity, C#, AI & LLM APIs, Blender, CAD, and more). Tags open their own popups. After the last one it says more comes as time goes by. |
| **Closing** | The name in Chinese (维恩薇拉), the four words lighting up one by one, and the proverb 千里之行，始于足下。 |

### Effects and extras

- **Fire cursor** — realistic flames, smoke and sparks follow the mouse. **Hold the mouse button** to breathe fire.
- **Dragon's mouth** — move the cursor to the dragon's mouth and the dragon blows fire like crazy; the eye glows and the picture rumbles.
- **Background music** — plays on load when the browser allows it. Otherwise the gates show *点击进入 · CLICK TO ENTER* and the first click starts it. The **乐** seal (bottom-left) turns it on and off. It fades in, loops, and pauses when you switch tabs.
- **Lucky characters** — clicking anywhere floats up 福 龙 梦 创 勇 or 运.
- **Falling petals**, swaying lanterns, a faint 龙 watermark and a gold frame around the screen.
- **Red seals** on each section divider (我 专 工 路 始 龙).
- **Scroll progress** bar with a dragon seal riding along it, a **上** back-to-top seal, nav highlighting for the section in view, and sections that rise into view as you scroll.

### Accessibility and devices

- Anyone with **"reduce motion"** turned on gets no gates, fire, petals, shimmer or scrolling band, and the content shows immediately.
- The fire cursor only appears on devices with a mouse (`pointer: fine`). Phones and tablets skip it.
- Popups use the native `<dialog>` element, so **Esc** closes them and focus returns to the button you used.
- Buttons are real `<button>` elements and work with the keyboard. Decorative items are hidden from screen readers.

---

## Customizing

### Change the text
Everything is in `index.html`.
- Section text sits in the `<section>` blocks.
- The popup text for the four Focus cards lives in `<template id="t-game">`, `t-ai`, `t-software` and `t-creative`.
- Chinese text is in `<span class="zh" lang="zh-Hans">…</span>` elements.

### Change the colors
At the top of `style.css`, the `:root` block:

```css
--bg: #8a0f1a;        /* red */
--bg-deep: #4a060c;   /* dark red */
--accent: #ffc83d;    /* gold */
--ink: #fff4dc;       /* main text */
--muted: #f3d29a;     /* softer text */
```

### Change the Upgrade skills
In `script.js`, find the Upgrade meter code:
- `skills` is the list of unlockable tags.
- `info` holds the popup text for each tag (a tag without an entry says it is still being explored).
- `lines` and `zhLines` are the English and Chinese messages shown after each press.

### Change the music
- Three-file version: replace `music.mp3` with your own file.
- Single file: replace the `<audio id="bgm" src="…">` source.
- Volume is set by the number in `fade(.4)` (0 to 1).

### Change the dragon picture
Replace the `<img>` inside `<figure class="dragonfig">`. The fire-at-the-mouth effect is positioned with fractions of the picture's size, in the fire code in `script.js`:

```js
mX = rc.left + rc.width * .425;  mY = rc.top + rc.height * .44;   // mouth
eX = rc.left + rc.width * .35;   eY = rc.top + rc.height * .365;  // eye
R  = rc.width * .24;                                              // how close counts as "at the mouth"
```

If you use a different picture, adjust these numbers so the blast comes out of the right spot.

### Tune the fire
In the fire code in `script.js`: `STOPS` is the flame colour ramp, `pts.length < …` caps the number of flame particles, and `rage` controls the dragon-mouth blast.

---

## Fonts and libraries

| Used for | Font |
| --- | --- |
| Big headings | Big Shoulders Display |
| Body text | Hanken Grotesk |
| Chinese text | Noto Sans SC |
| Chinese brush lettering | Ma Shan Zheng |

All fonts come from Google Fonts. There are no JavaScript libraries.

---

## Deploying

Because it's static, it works on any host: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any plain web server. Upload `index.html` (single file) or the whole `three-file-version` folder.

---

## Notes and honest limits

- **Music autoplay:** browsers block sound until the visitor interacts with the page. That is why the gates may wait for a click. This is a browser rule, not a bug.
- **File size:** the single-file version is about 3.3 MB because the music and dragon picture are embedded. The three-file version keeps the music separate.
- **Testing:** the page was built and checked in a headless Chromium browser. Test it on your own devices, especially phones, and report anything that looks off.
- **Performance:** the fire cursor draws on a canvas every frame. On older computers you can lower the particle caps.

---

## Credits and rights

- **Music:** "Chinese Lunar New Year" by viacheslavstarostin (file supplied by the site owner). Check the licence and any attribution requirements of the source before publishing publicly.
- **Dragon artwork:** supplied by the site owner. Make sure you have the right to use it on a public website.
- **Chinese text:** the translations and the sound-based Chinese name **维恩薇拉** were written by an AI assistant. Please have a native speaker review them, and replace the name if you prefer a different one.
- **Site content:** the WNXVRA text and branding belong to the site owner.

---

*Dream. Build. Create. Conquer.*
