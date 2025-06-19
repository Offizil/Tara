document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop default form behavior (no reload)

    const name = document.querySelector('#fname').value.trim();
    const email = document.querySelector('#email').value.trim();
    const wantsNewsletter = document.querySelector('#newsletter').checked;

    const formData = {
      name,
      email,
      wantsNewsletter
    };

    localStorage.setItem('signup-form', JSON.stringify(formData));

    // Now manually redirect to welcome.html
    window.location.href = 'welcome.html';
  });
});
