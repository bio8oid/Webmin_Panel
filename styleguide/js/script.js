// Hamburger menu function \\

function toggleMenu(visible) {
  document.getElementById('kutas').classList.add('show', visible)
}

document.querySelector('component-sidebar-hamburger-link').addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu()
});