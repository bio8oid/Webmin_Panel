// import ionRangeSlider from '/slider';
// import monkeyList from './pagination';
// import chart from '/chart';
// import createElement from '/addLink';

  window.onload = () => {

  // Reset General Statistic Calendar \\

  if (window.location.href.indexOf('index') > -1 || window.location.href.indexOf('details') > -1 || window.location.href.indexOf('payout') > -1) {
    document.getElementById("general-calendar-reset").addEventListener('click', ()  => {
      document.getElementById("general-calendar-form").reset();
    });
  };
  
  // Hamburger menu function \\

  const toggleMenu = visible => {
    document.getElementById('sidebar-section').classList.toggle('show', visible);
  };

  document.getElementById('menu-burger').addEventListener('click', e  => {
    e.preventDefault();
    toggleMenu();
  });

  // Sidebar-burger menu function \\

  const toggleSmallMenu = visible => {
    document.getElementById('sidebar-section').classList.toggle('sidebar-small', visible);

    document.body.classList.toggle('widen');
  };

  document.getElementById('sidebar-burger').addEventListener('click', e  => {
    e.preventDefault();
    toggleSmallMenu();
  });


  // Modals \\


  const closeModal = () => {
    document.getElementById('overlay').classList.remove('show');
  }

  document.querySelectorAll('#overlay .js--close-modal').forEach(btn => {
    btn.addEventListener('click', e  => {
      e.preventDefault();
      closeModal();
    });
  });

  document.querySelector('#overlay').addEventListener('click', e  => {
    if (e.target === this) {
      closeModal();
    };
  });

  document.addEventListener('keyup', e  => {
    if (e.keyCode === 27) {
      closeModal();
    };
  });

  const openModal = modal => {
    document.querySelectorAll('#overlay > *').forEach(modal => {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  };

    document.getElementById('exit').addEventListener('click', e  => {
      e.preventDefault();
      openModal('#myModal');
    });
  
    document.getElementById('login').addEventListener('click', e  => {
      e.preventDefault();
      openModal('#loginModal');
    });

    document.getElementById('exit-sidebar').addEventListener('click', e  => {
      e.preventDefault();
      openModal('#myModal');
    });
  
    document.getElementById('login-sidebar').addEventListener('click', e  => {
      e.preventDefault();
      openModal('#loginModal');
    });

    document.getElementById('contact-manager').addEventListener('click', e  => {
      e.preventDefault();
      openModal('#manager');
    });

    document.querySelectorAll('.add-link-button').forEach(item => {
    item.addEventListener('click', e  => {
      e.preventDefault();
      openModal('#add-link');
    });
  });
};