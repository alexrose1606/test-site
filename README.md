# GitHub Pages + Supabase Auth Starter

- Static hosting on **GitHub Pages**
- **Supabase Auth** with email verification
- Protected **dashboard** that checks `email_confirmed_at`

## 1) Supabase settings
- Project Settings → **Auth** → turn **Confirm email** ON
- **Site URL**: `https://<username>.github.io/<repo>/`
- **Redirect URLs**: `https://<username>.github.io/<repo>/auth/callback.html`

## 2) Put your keys
Open `index.html` and `dashboard.html` and replace:
- `__SUPABASE_URL__`
- `__SUPABASE_ANON_KEY__`

## 3) Deploy on GitHub Pages
- Push this folder to a repo
- Settings → **Pages** → Deploy from branch → `main` / `root`
- Visit your site, sign up, verify email, then log in

_Date: 2025-10-23_
