# WNXVRA

My personal website. I built it around a red and gold Chinese theme because I wanted
something that didn't look like every other portfolio.

It's plain HTML, CSS and JavaScript. No framework and no build step.

## Why I made it

WNXVRA is the name I use for the things I build: games, AI projects and software. I'm
still at the beginning, and I wanted one place that shows where I am now and has room
to grow as I learn more. The tagline sums it up: Dream. Build. Create. Conquer.

## Built with

- Plain HTML, CSS and JavaScript, split into a few small files
- CSS custom properties for the colours, so the whole theme can change from one place
- The native `<dialog>` element for the popups
- Canvas for the fire cursor and the falling petals
- `IntersectionObserver` for the effects that happen as you scroll
- Google Fonts for the lettering

## What's next

Things I want to add as the site:

- A projects section for Verxxor, my 2D platformer, and for the car game I'm planning
- A contact section
- A switch between English and Chinese
- More skills on the Upgrade button as I learn them

## Things to know

Browsers block music until you've interacted with the page. That's why the gates
sometimes wait for a click: the click is what lets the music start. If the browser does
allow autoplay, the gates open by themselves.

The cursor effects only run when there's a mouse, so phones and tablets don't get them.
Anyone with reduced motion turned on gets no gates, fire, petals or scrolling band.

I've only tested it in Chromium. Try it on your phone and in other browsers before you
rely on it.
