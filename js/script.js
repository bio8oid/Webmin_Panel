import './chart';
import './modalChat';
import './addLink';
import './pagination';
import './slider';
import './calendarReset';

window.onload = () => {

  // Hamburger menu function \\

  const toggleMenu = visible => {
    document.getElementById('sidebar-section').classList.toggle('show', visible);
  };

  document.getElementById('menu-burger').addEventListener('click', e => {
    e.preventDefault();
    toggleMenu();
  });

  // Sidebar-burger menu function \\

  const toggleSmallMenu = visible => {
    document.getElementById('sidebar-section').classList.toggle('sidebar-small', visible);

    document.body.classList.toggle('widen');
  };

  document.getElementById('sidebar-burger').addEventListener('click', e => {
    e.preventDefault();
    toggleSmallMenu();
  });


  // Modals \\


  const closeModal = () => {
    document.getElementById('overlay').classList.remove('show');
  };

  document.querySelectorAll('#overlay .js--close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeModal();
    });
  });

  document.querySelector('#overlay').addEventListener('click', e => {
    if (e.target.id === 'overlay') {
      closeModal();
    };
  });

  document.addEventListener('keyup', e => {
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

  // Message Modal
  
  document.getElementById('indicator').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('orange-dot').classList.remove('orange-dot');
    openModal('#message');
  });

  // Quit Modal
  document.getElementById('exit').addEventListener('click', e => {
    e.preventDefault();
    openModal('#myModal');
  });

  // Login Modal
  document.getElementById('login').addEventListener('click', e => {
    e.preventDefault();
    openModal('#loginModal');
  });

  // Sidebar Quit Modal
  document.getElementById('exit-sidebar').addEventListener('click', e => {
    e.preventDefault();
    openModal('#myModal');
  });

  // Sidebar Login Modal
  document.getElementById('login-sidebar').addEventListener('click', e => {
    e.preventDefault();
    openModal('#loginModal');
  });

  // Sidebar Admin Modal
  document.getElementById('contact-manager').addEventListener('click', e => {
    e.preventDefault();
    openModal('#manager');
  });

  // Add-Link/Banner Modal
  document.querySelectorAll('.add-link-button').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openModal('#add-link');
    });
  });

  // Create Pixel Modal
  if (window.location.href.indexOf('postback') > -1) {
    document.getElementById('create-pixel').addEventListener('click', e => {
      e.preventDefault();
      openModal('#pixel');
    });
  };

};