/* ══ IIFE — runs before page paint, no flash ══ */
(function () {
  if (localStorage.getItem('nodus_theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
})();

/* ══ TOGGLE LOGIC ══ */
document.addEventListener('DOMContentLoaded', function () {

  const toggleBtn = document.getElementById('toggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  updateIcon(themeIcon);

  toggleBtn.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark-mode');

    if (document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('nodus_theme', 'dark');
    } else {
      localStorage.setItem('nodus_theme', 'light');
    }

    updateIcon(themeIcon);
  });

});

/* ══ ICON SWAP ══ */
function updateIcon(icon) {
  if (document.documentElement.classList.contains('dark-mode')) {
    icon.src = '../files/assets/lightmode.png';
  } else {
    icon.src = '../files/assets/darkmode.png';
  }
}