// Hamburger menu function \\


window.onload=function(){

 function toggleMenu(visible) {
  document.getElementById('sidebar-section').classList.toggle('show', visible)
}

document.getElementById('menu-burger').addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu()
});   

}

