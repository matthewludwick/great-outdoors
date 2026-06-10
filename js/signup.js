document.addEventListener('DOMContentLoaded', () => {
  // Render icons
  document.getElementById('ic-arrow').innerHTML      = sizeIcon('arrowLeft', 16);
  document.getElementById('ic-user-first').innerHTML = sizeIcon('user', 20);
  document.getElementById('ic-user').innerHTML       = sizeIcon('user', 20);
  document.getElementById('ic-mail').innerHTML       = sizeIcon('mail', 20);
  document.getElementById('ic-cal').innerHTML        = sizeIcon('calendar', 20);
  document.getElementById('ic-pin').innerHTML        = sizeIcon('mapPin', 20);
  document.getElementById('ic-lock').innerHTML       = sizeIcon('lock', 20);
  document.getElementById('ic-lock2').innerHTML      = sizeIcon('lock', 20);
  document.getElementById('outdoor-logo').innerHTML  = sizeIcon('mountain',32);

  // If already logged in, go home
  if (Auth.user()) {
    window.location.replace('index.html');
    return;
  }

  const form     = document.getElementById('signup-form');
  const errorBox = document.getElementById('error');

  function showError(msg) {
    errorBox.textContent   = msg;
    errorBox.style.display = 'block';
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    errorBox.style.display = 'none';

    const firstName = document.getElementById('first-name').value.trim();
    const lastName  = document.getElementById('last-name').value.trim();
    const username  = document.getElementById('username').value.trim();
    const email     = document.getElementById('email').value.trim();
    const dob       = document.getElementById('dob').value;
    const city      = document.getElementById('city').value.trim();
    const state     = document.getElementById('state').value.trim().toUpperCase();
    const password  = document.getElementById('password').value;
    const confirm   = document.getElementById('confirm-password').value;

    // Validation
    if (!firstName || !lastName)  { showError('Please enter your first and last name.'); return; }
    if (!username)                 { showError('Please choose a username.'); return; }
    if (username.length < 3)       { showError('Username must be at least 3 characters.'); return; }
    if (!email)                    { showError('Please enter your email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('Please enter a valid email address.'); return; }
    if (!dob)                      { showError('Please enter your date of birth.'); return; }

    // Must be at least 13
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear()
      - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
    if (age < 13)                  { showError('You must be at least 13 years old to create an account.'); return; }

    if (!password)                 { showError('Please create a password.'); return; }
    if (password.length < 6)       { showError('Password must be at least 6 characters.'); return; }
    if (password !== confirm)      { showError('Passwords do not match.'); return; }

    // Username uniqueness
    const existing = Auth.registeredUsers();
    if (existing.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      showError('That username is already taken. Please choose another.');
      return;
    }

    // Register + auto-login
    Auth.register({ firstName, lastName, username, email, dob, city, state, password });
    window.location.replace('index.html');
  });
});
