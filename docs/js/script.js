
// Fetch Pages Modules \\

const modules = [
  { id: "#bars", url: "./side-top-bar-modules_content.html" },
  { id: "#general-content", url: "./general_content.html" },
  { id: "#details-content", url: "./details_content.html" },
  { id: "#links-content", url: "./links_content.html" },
  { id: "#banners-content", url: "./banners_content.html" },
  { id: "#personal-content", url: "./personal_content.html" },
  { id: "#payout-content", url: "./payout_content.html" },
  { id: "#postback-content", url: "./postback_content.html" }
]


modules.map(page => (

  fetch(page.url)
    .then(response => {
      console.log(page.url)
      return response.text()
    })
    .then(data => {
      console.log(page.id)
      document.querySelector(page.id).innerHTML = data;
    })

))



window.onload = () => {


  //  Handle Sidebar Menu Buttons to load Modules  \\

  const showPageContent = function (id) {
    document.getElementById(id).classList.remove('dissapear')
  };

  const buttons = document.querySelectorAll('.component-sidebar-menu-link')


  for (const button of buttons) {
    button.addEventListener('click', function (event) {

      const id = this.getAttribute('data-id')
      console.log(id)

      const hideOtherPages = event => {
        const pages = document.querySelectorAll('.link')
        const pagesID = [];

        pages.forEach(function (page) {
          pagesID.push(page.id);
        });

        const filteredPagesID = pagesID.filter(item => item !== id)

        for (const page of filteredPagesID) {
          document.getElementById(page).classList.add('dissapear');
        }
      };

      showPageContent(id)
      hideOtherPages()
    });
  }



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