// Reads Supabase settings from <body data-*> and initializes client
(function () {
  const body = document.body;
  const url = body.dataset.supabaseUrl;
  const anon = body.dataset.supabaseAnonKey;

  if (!url || !anon) {
    alert('Please set SUPABASE_URL and SUPABASE_ANON_KEY in index.html');
    return;
  }

  // Save for callback page
  localStorage.setItem('SB_URL', url);
  localStorage.setItem('SB_ANON', anon);

  const { createClient } = window.supabase;
  const client = createClient(url, anon);

  // ✅ Automatically detect correct path for GitHub Pages (e.g. /test-site/)
  const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
  const emailRedirectTo = window.location.origin + basePath + 'auth/callback.html';

  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    const { error } = await client.auth.signUp({
      email,
      password,
      options: { emailRedirectTo } // 👈 ensures correct redirect for GitHub Pages
    });

    if (error) return alert(error.message);
    alert('Check your email for a verification link.');
  });

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    location.href = 'dashboard.html';
  });
})();
