(function () {
// ASSET: js\chart.js
var $TEwb$var$url = window.location.href;

if ($TEwb$var$url.indexOf('pages') > -1 === false || $TEwb$var$url.indexOf('index') > -1) {
  var $TEwb$var$ctx = document.getElementById('myChart');
  var $TEwb$var$chart = new Chart($TEwb$var$ctx, {
    // 1
    type: 'bar',
    data: {
      // 2
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
      // 3
      datasets: [{
        // 4
        label: "Fuckups",
        // 5
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        // 6
        data: [52, 51, 41, 94, 26, 6, 72, 9, 21, 88]
      }, {
        label: "FTD",
        backgroundColor: '#F29E4E',
        borderColor: '#F29E4E',
        data: [6, 72, 1, 0, 47, 11, 50, 44, 63, 76]
      }, {
        label: "Earned",
        backgroundColor: '#71B374',
        borderColor: '#71B374',
        data: [59, 49, 68, 90, 67, 41, 15, 38, 48, 48],
        // 7
        hidden: false
      }]
    }
  });
}

;
///   ADMIN MODAL CHAT   \\\
// Posts counter
// ASSET: js\modalChat.js
var $MrKx$var$posts = 0; // Post Element Handle Function

var $MrKx$var$chatElement = function chatElement(e) {
  e.preventDefault(); // Chat Content Element

  var chatContentElement = document.getElementById('chat'); // Chat Element

  var postElement = document.createElement('div');
  postElement.classList.add('your-post');
  var postParagraph = document.createElement('p');
  var postContent = document.getElementById('chat-input').value;
  var postValue = document.createTextNode(postContent);
  postParagraph.appendChild(postValue);
  postElement.appendChild(postParagraph);
  chatContentElement.appendChild(postElement);
  document.getElementById('chat-input').value = ""; // Admin Answeres Handle

  setTimeout(function () {
    if ($MrKx$var$posts === 1) {
      // Second Admin Post
      postElement = document.createElement('div');
      postElement.classList.add('admin-post');

      var _postParagraph = document.createElement('p');

      var _postValue = document.createTextNode('Can you tell me more about your problem?');

      _postParagraph.appendChild(_postValue);

      postElement.appendChild(_postParagraph);
      chatContentElement.appendChild(postElement);
    }

    if ($MrKx$var$posts === 2) {
      // Third Admin Post
      postElement = document.createElement('div');
      postElement.classList.add('admin-post');

      var _postParagraph2 = document.createElement('p');

      var _postValue2 = document.createTextNode('Try this solution mate: ');

      var solutionLink = document.createElement('a');
      var linkContent = document.createTextNode('Solution Link');
      solutionLink.setAttribute('href', 'https://www.google.com/');
      solutionLink.setAttribute('target', "_blank");
      solutionLink.appendChild(linkContent);
      solutionLink.style.marginLeft = '20px';

      _postParagraph2.appendChild(_postValue2);

      postElement.appendChild(_postParagraph2);
      postElement.appendChild(solutionLink);
      chatContentElement.appendChild(postElement);
      var label = document.getElementById('label');
      label.style.background = 'red';
      label.innerHTML = "offline";
      var dottie = document.getElementById('dottie');
      dottie.style.background = 'red';
    }
  }, 1000);
  $MrKx$var$posts++;
}; // Add New Post


var $MrKx$var$sendButton = document.getElementById('chat-button');
$MrKx$var$sendButton.addEventListener('click', $MrKx$var$chatElement);
// ASSET: js\addLink.js
var $eZnR$var$url = window.location.href;

if ($eZnR$var$url.indexOf('pages') > -1 === false || $eZnR$var$url.indexOf('index') > -1 || $eZnR$var$url.indexOf('links') > -1 || $eZnR$var$url.indexOf('banners') > -1) {
  var createElement = function createElement() {
    // Links Table Element
    var linkTable = document.getElementById('link-table'); // New Table Row Element

    var newTableRow = document.createElement('div'); // New Name Element

    var newNameParaghraph = document.createElement('p');
    var nameInputValue = document.getElementById('link-name-input').value;
    var nameValue = document.createTextNode(nameInputValue);
    newNameParaghraph.appendChild(nameValue);
    var newName = document.createElement('div');
    newName.appendChild(newNameParaghraph);
    newName.classList.add('name-column');
    newTableRow.appendChild(newName);
    newTableRow.classList.add('table-row'); // New Link Element

    var link = document.createElement('a');
    var linkInputValue = document.getElementById('link-value-input').value;
    var LinkText = document.createTextNode(linkInputValue);
    link.setAttribute('href', linkInputValue);
    link.setAttribute('target', "_blank");
    link.classList.add('copy-link-value');
    link.appendChild(LinkText);
    var newLink = document.createElement('div');
    newLink.appendChild(link);
    newLink.classList.add('link-column');
    newTableRow.appendChild(newLink); // New Icons Element

    var newIcons = document.createElement('div'); // Link Icon

    var linkIcon = document.createElement('i');
    linkIcon.classList.add('icon-links');
    var linkElement = document.createElement('a');
    linkElement.classList.add('copy-link');
    linkElement.addEventListener('click', copyLink);
    linkElement.appendChild(linkIcon);
    newIcons.appendChild(linkElement); // Trash Icon

    var trashIcon = document.createElement('i');
    trashIcon.classList.add('icon-trash');
    var trashElement = document.createElement('a');
    trashElement.appendChild(trashIcon);
    trashElement.classList.add('trash-button');
    trashElement.addEventListener('click', removeElement);
    newIcons.appendChild(trashElement);
    newIcons.classList.add('links-and-bin-column');
    newTableRow.appendChild(newIcons);

    if (linkInputValue.length && nameInputValue.length > 0) {
      linkTable.appendChild(newTableRow);
    } else {
      alert("Enter Name and URL");
    }

    ;
  }; // Remove Link function


  var removeElement = function removeElement(e) {
    var toRemove = e.target;
    toRemove.parentNode.parentNode.parentNode.parentNode.removeChild(toRemove.parentNode.parentNode.parentNode);
  }; // Copy Link to clipboard


  var copyLink = function copyLink(e) {
    var linkContent = e.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML;
    navigator.clipboard.writeText(linkContent);
    alert("Your Link has been copied to CLIPBOARD!");
  }; // Add New Link Element Handle


  var addLinkButton = document.getElementById('add-link-button');
  addLinkButton.addEventListener('click', createElement); // Remove Link Button

  var removeLinkButtons = document.querySelectorAll('.trash-button');
  var $eZnR$var$_iteratorNormalCompletion = true;
  var $eZnR$var$_didIteratorError = false;
  var $eZnR$var$_iteratorError = undefined;

  try {
    for (var $eZnR$var$_iterator = removeLinkButtons[Symbol.iterator](), $eZnR$var$_step; !($eZnR$var$_iteratorNormalCompletion = ($eZnR$var$_step = $eZnR$var$_iterator.next()).done); $eZnR$var$_iteratorNormalCompletion = true) {
      var button = $eZnR$var$_step.value;
      button.addEventListener('click', removeElement);
    }
  } catch (err) {
    $eZnR$var$_didIteratorError = true;
    $eZnR$var$_iteratorError = err;
  } finally {
    try {
      if (!$eZnR$var$_iteratorNormalCompletion && $eZnR$var$_iterator.return != null) {
        $eZnR$var$_iterator.return();
      }
    } finally {
      if ($eZnR$var$_didIteratorError) {
        throw $eZnR$var$_iteratorError;
      }
    }
  }

  ; // Copy Link Button

  var copyLinkButtons = document.querySelectorAll('.copy-link');
  var $eZnR$var$_iteratorNormalCompletion2 = true;
  var $eZnR$var$_didIteratorError2 = false;
  var $eZnR$var$_iteratorError2 = undefined;

  try {
    for (var $eZnR$var$_iterator2 = copyLinkButtons[Symbol.iterator](), $eZnR$var$_step2; !($eZnR$var$_iteratorNormalCompletion2 = ($eZnR$var$_step2 = $eZnR$var$_iterator2.next()).done); $eZnR$var$_iteratorNormalCompletion2 = true) {
      var _button = $eZnR$var$_step2.value;

      _button.addEventListener('click', copyLink);
    }
  } catch (err) {
    $eZnR$var$_didIteratorError2 = true;
    $eZnR$var$_iteratorError2 = err;
  } finally {
    try {
      if (!$eZnR$var$_iteratorNormalCompletion2 && $eZnR$var$_iterator2.return != null) {
        $eZnR$var$_iterator2.return();
      }
    } finally {
      if ($eZnR$var$_didIteratorError2) {
        throw $eZnR$var$_iteratorError2;
      }
    }
  }

  ;
}

// ASSET: js\pagination.js
var $o8lo$var$url = window.location.href;

if ($o8lo$var$url.indexOf('details') > -1 || $o8lo$var$url.indexOf('payout') > -1) {
  var $o8lo$var$monkeyList = new List('paginated-list', {
    page: 9,
    pagination: true
  });
}

;

// ASSET: js\slider.js
if (window.location.href.indexOf('postback') > -1) {
  $(".js-range-slider").ionRangeSlider({
    skin: "modern",
    min: 0,
    max: 168,
    from: 104,
    postfix: ' hours'
  });
}

// ASSET: js\calendarReset.js
var $pmW2$var$url = window.location.href;

if ($pmW2$var$url.indexOf('pages') > -1 === false || $pmW2$var$url.indexOf('details') > -1 || $pmW2$var$url.indexOf('payout') > -1) {
  document.getElementById("general-calendar-reset").addEventListener('click', function () {
    document.getElementById("general-calendar-form").reset();
  });
}

;

window.onload = function () {
  // Hamburger menu function \\
  var toggleMenu = function toggleMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('show', visible);
  };

  document.getElementById('menu-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  }); // Sidebar-burger menu function \\

  var toggleSmallMenu = function toggleSmallMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('sidebar-small', visible);
    document.body.classList.toggle('widen');
  };

  document.getElementById('sidebar-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleSmallMenu();
  }); // Modals \\

  var closeModal = function closeModal() {
    document.getElementById('overlay').classList.remove('show');
  };

  document.querySelectorAll('#overlay .js--close-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });
  document.querySelector('#overlay').addEventListener('click', function (e) {
    if (e.target.id === 'overlay') {
      closeModal();
    }

    ;
  });
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }

    ;
  });

  var openModal = function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function (modal) {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  }; // Quit Modal


  document.getElementById('exit').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#myModal');
  }); // Login Modal

  document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#loginModal');
  }); // Sidebar Quit Modal

  document.getElementById('exit-sidebar').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#myModal');
  }); // Sidebar Login Modal

  document.getElementById('login-sidebar').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#loginModal');
  }); // Sidebar Admin Modal

  document.getElementById('contact-manager').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#manager');
  }); // Add-Link/Banner Modal

  document.querySelectorAll('.add-link-button').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      openModal('#add-link');
    });
  }); // Create Pixel Modal

  if (window.location.href.indexOf('postback') > -1) {
    document.getElementById('create-pixel').addEventListener('click', function (e) {
      e.preventDefault();
      openModal('#pixel');
    });
  }

  ;
};
})();