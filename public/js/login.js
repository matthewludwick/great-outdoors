document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ic-arrow').innerHTML = sizeIcon('arrowLeft', 16);
  document.getElementById('ic-logo').innerHTML  = sizeIcon('shield', 32);
  document.getElementById('ic-user').innerHTML  = sizeIcon('user', 20);
  document.getElementById('ic-lock').innerHTML  = sizeIcon('lock', 20);

  // If already logged in, route appropriately
  const u = Auth.user();
  if (u) {
    window.location.replace(u.role === 'admin' ? 'admin.html' : 'index.html');
    return;
  }

  const form = document.getElementById('login-form');
  const errorBox = document.getElementById('error');
  form.addEventListener('submit', e => {
    e.preventDefault();
    errorBox.style.display = 'none';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (Auth.login(username, password)) {
      if (username === 'admin') {
        window.location.replace('admin.html');
      } else {
        window.location.replace('index.html');
      }
    } else {
      errorBox.textContent = 'Invalid username or password';
      errorBox.style.display = 'block';
    }
  });
});
