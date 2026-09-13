# Put Enugu Homes online

This folder is a static website. You do not need WordPress to launch.

## Fastest free host (about 10 minutes)

1. Create a free account at https://app.netlify.com
2. Drag the whole `enugu-homes` folder onto Netlify Drop
   or use “Add new site → Deploy manually”
3. You get a link like `something.netlify.app`
4. Share that link on WhatsApp

Optional: buy `enuguhomes.ng` later and point it to Netlify.

## Hostinger / cPanel (Nigeria-friendly)

1. Buy hosting + a domain (`.ng` or `.com`)
2. Open File Manager → `public_html`
3. Upload all files inside `enugu-homes` (index.html should sit in public_html, not inside another folder)
4. Visit your domain

## Before you share with the public

- Change every `234803000000x` sample number in `js/data.js` to real Enugu agents/owners
- Change the top-bar WhatsApp on `index.html`
- Take your own photos and replace Unsplash URLs
- Add your real name on the About page

## What this MVP does

- Search rent / buy / land by Enugu area
- Listing pages with WhatsApp + Call
- “List a property” form (saves in the visitor’s browser only)

## What to add next (when you have users)

- WordPress + Houzez, or a simple backend, so listings are stored on a server
- Photo upload
- Admin approval
- Paystack featured listings
