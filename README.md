# Supabase Auth Proof of Concept

Very small static site for register, login, email verification using Supabase.
Works on localhost and GitHub Pages or Netlify.

## Files

- `index.html` register and login
- `callback.html` handles the magic link and signs you in
- `app.html` protected page that requires a verified email

## One-time Supabase setup

1. Create a new Supabase project at https://supabase.com
2. In Project Settings, copy:
   - `Project URL` (looks like `https://xxxxx.supabase.co`)
   - `anon public key`
3. In Authentication settings:
   - Turn on "Confirm email"
   - Add redirect URLs you will use, for example:
     - `http://127.0.0.1:5500/callback.html` for local testing (or your local dev server URL)
     - `https://YOUR_GITHUB_USERNAME.github.io/REPO_NAME/callback.html` for GitHub Pages
     - remember to include the exact path
4. Optionally set "External OAuth" providers later. For now just email and password.

## Local test

You can serve these files locally with any simple server. Example using Python:

```bash
# from the folder with the html files
python -m http.server 5500
# then open http://127.0.0.1:5500
```

## Fill in your keys

In all three html files, replace:
- `PASTE_YOUR_SUPABASE_URL_HERE`
- `PASTE_YOUR_SUPABASE_ANON_KEY_HERE`

## Deploy to GitHub Pages

1. Create a repo and push these files
2. In GitHub, Settings, Pages, choose "Deploy from a branch", branch `main`, folder `/root`
3. Your public URL will be: `https://YOUR_GITHUB_USERNAME.github.io/REPO_NAME/`
4. Add the final URL `.../callback.html` to the Supabase Auth redirect list if not already present

## How it works

- `index.html` uses `supabase.auth.signUp` with `emailRedirectTo` set to `/callback.html`
- After you click the email link, `callback.html` calls `exchangeCodeForSession` which signs you in
- When signed in and verified, `app.html` shows the gated content

## Troubleshooting

- If you see 403 or CORS in the browser console, check the Supabase redirect URL list
- If `exchangeCodeForSession` shows an error, the link might be expired or the URL does not match
- Verify your URL and anon key are correct and have no stray spaces