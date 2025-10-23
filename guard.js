(async function () {
  const body = document.body;
  const { createClient } = window.supabase;
  const client = createClient(body.dataset.supabaseUrl, body.dataset.supabaseAnonKey);

  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    location.href = 'index.html';
    return;
  }

  const { data: { user } } = await client.auth.getUser();
  document.getElementById('user-email').textContent = 'Signed in as ' + (user?.email || '');

  const verified = !!user?.email_confirmed_at;
  const pill = document.getElementById('email-status');
  pill.textContent = verified ? 'Email verified' : 'Email not verified yet';
  pill.className = 'pill ' + (verified ? 'ok' : 'bad');

  document.getElementById('logout').addEventListener('click', async () => {
    await client.auth.signOut();
    location.href = 'index.html';
  });
})();