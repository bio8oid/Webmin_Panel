
// Fetch Sidebar Topbar and modals Module \\


  fetch("../pages/top_side_bar_and_modals-module.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("#bars").innerHTML = data;
    })



window.onload = () => {


  // Top Right Window Hamburger menu function \\

  function toggleMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('show', visible)
  }

  document.getElementById('menu-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu()
  });

  // Sidebar-burger menu function \\

  function toggleSmallMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('sidebar-small', visible)

    document.body.classList.toggle('widen')
  }

  document.getElementById('sidebar-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleSmallMenu()
  });


  // Modals \\


  function closeModal() {
    document.getElementById('overlay').classList.remove('show')
  }

  document.querySelectorAll('#overlay .js--close-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      closeModal()
    })
  })

  document.querySelector('#overlay').addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal()
    }
  })

  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      closeModal()
    }
  })

  function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function (modal) {
      modal.classList.remove('show')
    })
    document.querySelector('#overlay').classList.add('show')
    document.querySelector(modal).classList.add('show')
  }

  document.getElementById('exit').addEventListener('click', function (e) {
    e.preventDefault()
    openModal('#myModal')
  });

  document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault()
    openModal('#loginModal')
  });

  document.getElementById('exit-sidebar').addEventListener('click', function (e) {
    e.preventDefault()
    openModal('#myModal')
  });

  document.getElementById('login-sidebar').addEventListener('click', function (e) {
    e.preventDefault()
    openModal('#loginModal')
  });

  document.getElementById('contact-manager').addEventListener('click', function (e) {
    e.preventDefault()
    openModal('#manager')
  });
};