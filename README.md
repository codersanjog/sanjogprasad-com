# theamazonmanager.com: Setup and Deploy Guide

This is a plain HTML/CSS/JS site. No build tools, no framework. That makes it fast
and simple to deploy on Vercel.

Before you go live, a couple of things to finish:

- WhatsApp and Call number: already set to +91 89206 31606 across the whole site (WhatsApp links, Call buttons, and the sticky bottom bar). No further action needed unless the number changes.
- Brand logos: the scrolling strip on the homepage uses the 8 logo files in `assets/brands/`. Every file is the same size (360x120, white on transparent) so all logos look equal. To add a brand, make a file the same way, add an `<img class="brand-logo">` line in both copies of the list in `index.html` (the second copy is there for the seamless loop), and keep both copies identical.

---

## Part 1: One-time setup on your MacBook

Open the **Terminal** app (Cmd + Space, type "Terminal", hit Enter) and run these one at a time.

### 1. Install Homebrew (Mac package manager), if you don't have it

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If it says Homebrew is already installed, skip to the next step.

### 2. Install Git

```bash
brew install git
git --version
```

### 3. Install VS Code

```bash
brew install --cask visual-studio-code
```

This installs the VS Code app in your Applications folder, and also adds the
`code` command so you can open folders from Terminal.

### 4. Set your Git identity (only needed once)

```bash
git config --global user.name "Sanjog Prasad"
git config --global user.email "your-email@example.com"
```

### 5. Create a free GitHub account

Go to [github.com](https://github.com) and sign up if you don't already have an account.

### 6. Install the GitHub CLI (makes creating repos from Terminal easy)

```bash
brew install gh
gh auth login
```

Follow the prompts: choose **GitHub.com**, **HTTPS**, and log in through the browser
when it opens.

---

## Part 2: Get the project onto your Mac

1. Unzip the project file you downloaded from Claude (`sanjogprasad-site.zip`) into
   your Documents folder, or wherever you keep projects.
2. Open Terminal and go into that folder:

```bash
cd ~/Documents/sanjogprasad-site
```

3. Open it in VS Code to look around and make edits (like the phone number and photos):

```bash
code .
```

---

## Part 3: Push it to GitHub

Still in Terminal, inside the `sanjogprasad-site` folder:

```bash
git init
git add .
git commit -m "Initial commit: theamazonmanager.com website"
```

Now create the GitHub repo and push in one step using the GitHub CLI:

```bash
gh repo create sanjogprasad-com --public --source=. --remote=origin --push
```

This creates a repo called `sanjogprasad-com` under your GitHub account, connects it,
and pushes your code. When it finishes, you can check it by running:

```bash
gh repo view --web
```

That opens the repo in your browser so you can see the files are there.

**If you'd rather do it without the GitHub CLI**, create a new repo manually at
github.com/new (don't add a README there), then run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/sanjogprasad-com.git
git branch -M main
git push -u origin main
```

---

## Part 4: Deploy to Vercel

### Option A: Vercel dashboard (easiest, no install needed)

1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
2. Click **Add New → Project**.
3. Select the `sanjogprasad-com` repo from the list and click **Import**.
4. Framework preset: choose **Other** (it's a plain static site, no framework).
5. Leave build settings empty and click **Deploy**.
6. In under a minute you'll get a live URL like `sanjogprasad-com.vercel.app`.

### Option B: Vercel CLI (from Terminal)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts (link to existing project = no, first time; then confirm the
folder settings). It will give you a live URL when done.

---

## Part 5: Connect your custom domain (theamazonmanager.com)

1. In the Vercel dashboard, open your project → **Settings → Domains**.
2. Add `theamazonmanager.com` and `www.theamazonmanager.com`.
3. If sanjogprasad.com should also work, add it in the same place and set it to redirect to theamazonmanager.com.
4. Vercel will show you DNS records (usually an A record and a CNAME record).
5. Go to wherever you bought the domain (GoDaddy, Namecheap, Google Domains, etc.),
   open DNS settings, and add the records Vercel gave you.
6. DNS changes can take anywhere from a few minutes to a few hours to go live.
   Vercel will show a green checkmark once it detects the domain is connected,
   and will issue a free HTTPS certificate automatically.

---

## Making future changes

Whenever you edit a file (in VS Code) and want to update the live site:

```bash
git add .
git commit -m "describe what you changed"
git push
```

Vercel is connected to your GitHub repo, so every push to `main` automatically
redeploys the live site within a minute or two. No need to touch Vercel again
after the first setup.

---

## File structure

```
sanjogprasad-site/
  index.html          Home page (all sections, jump links)
  case-studies.html    Case studies and testimonials
  blog.html            Blog / SEO+AEO articles
  css/style.css        All styling
  js/script.js         Mobile nav, FAQ accordion, footer year
  favicon.svg          Simple placeholder favicon
  robots.txt           Search engine crawling rules
  sitemap.xml           Sitemap for search engines
  vercel.json          Vercel config (clean URLs)
```
