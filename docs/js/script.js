fetch("./spare_topbar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#bars").innerHTML = data;
  });
  
  fetch("./general_content.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("#general-content").innerHTML = data;
    });












    

  window.onload = () => {

    
      fetch("./details_content.html")
      .then(response => {
        return response.text()
      })
      .then(data => {
        document.querySelector("#details-content").innerHTML = data;
      });

    fetch("./links_content.html")
      .then(response => {
        return response.text()
      })
      .then(data => {
        document.querySelector("#links-content").innerHTML = data;
      });


const showPage = function(id){
      document.getElementById(id).classList.remove('dissapear')
    };
    

  const buttons = document.querySelectorAll('.component-sidebar-menu-link')


  for (const button of buttons) {
    button.addEventListener('click', function(event) {

      const id = this.getAttribute('data')
      console.log(id)

      const hideOtherPages = event => {
        const pages = document.querySelectorAll('.link')
        const pagesID = [];

        pages.forEach(function (page) {
          pagesID.push(page.id);
        });

        const filteredPagesID = pagesID.filter(item => item !== id)

        for( const page of filteredPagesID ){
          document.getElementById(page).classList.add('dissapear');
          }
       };

           showPage(id)
          hideOtherPages()
    });
  }






  // Hamburger menu function \\

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
      console.log('iam clicked')
    });
  };