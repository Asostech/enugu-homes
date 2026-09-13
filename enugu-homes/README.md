# Enugu Homes — source code

Static website for landlords/agents to list Enugu property and for tenants/buyers to search.

## Edit in VS Code

1. Unzip `enugu-homes.zip`
2. Install [VS Code](https://code.visualstudio.com)
3. File → Open Folder → choose `enugu-homes`
4. Open `js/data.js` first

### Change site number and email

At the top of `js/data.js`:

```js
window.SITE = {
  name: "Enugu Homes",
  phoneDisplay: "0803 123 4567",
  phoneIntl: "2348031234567",
  email: "yourname@gmail.com",
  ...
};
```

- `phoneDisplay` = what people see
- `phoneIntl` = WhatsApp link (234, no + or 0)

### Change listing pictures

Option A — image link:

```js
photo: "https://your-image-url.jpg"
```

Option B — file in this project:

1. Copy a photo into the `images` folder
2. Set:

```js
photo: "images/transekulu-3bed.jpg"
```

Also change each listing `phone` to a real Enugu WhatsApp number.

### Sign up

- `signup.html` — landlord, agent, or tenant/buyer
- `login.html`
- `account.html` — profile + your listings
- Listing a property requires login as landlord or agent

Accounts are stored in the browser (`localStorage`). GitHub Pages has no server database. Everyone can still browse. For accounts that work on every phone, add Firebase later.

## Host on GitHub Pages (free)

1. Create a GitHub account at https://github.com
2. New repository, name it `enugu-homes`, Public
3. In VS Code terminal inside the folder:

```bash
git init
git add .
git commit -m "Enugu Homes MVP"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/enugu-homes.git
git push -u origin main
```

4. On GitHub: repo → Settings → Pages
5. Source: **Deploy from a branch**
6. Branch: **main** / folder: **/ (root)** → Save
7. After a minute your site is:

`https://YOURUSERNAME.github.io/enugu-homes/`

If links break because of the extra `/enugu-homes/` path, either:

- keep using relative links (already used), or
- Settings → Pages → use a custom domain later

## Local preview

In VS Code, install the “Live Server” extension, right-click `index.html` → Open with Live Server.
