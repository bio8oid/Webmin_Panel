///     ADD NEW LINK HANDLE    \\\

const url = window.location.href;

if (url.indexOf('pages') > -1 === false ||
    url.indexOf('index') > -1 ||
    url.indexOf('links') > -1 || url.indexOf('banners') > -1) {

    const createElement = () => {

        // Links Table Element
        const linkTable = document.getElementById('link-table');

        // New Table Row Element
        const newTableRow = document.createElement('div');

        // New Name Element
        const newNameParaghraph = document.createElement('p');
        const nameInputValue = document.getElementById('link-name-input').value;
        const nameValue = document.createTextNode(nameInputValue);
        newNameParaghraph.appendChild(nameValue);
        const newName = document.createElement('div');
        newName.appendChild(newNameParaghraph);
        newName.classList.add('name-column');
        newTableRow.appendChild(newName);
        newTableRow.classList.add('table-row');

        // New Link Element
        const link = document.createElement('a');
        const linkInputValue = document.getElementById('link-value-input').value;
        const LinkText = document.createTextNode(linkInputValue);
        link.setAttribute('href', linkInputValue);
        link.setAttribute('target', "_blank");
        link.classList.add('copy-link-value');
        link.appendChild(LinkText);
        const newLink = document.createElement('div');
        newLink.appendChild(link);
        newLink.classList.add('link-column');
        newTableRow.appendChild(newLink);

        // New Icons Element
        const newIcons = document.createElement('div');

        // Link Icon
        const linkIcon = document.createElement('i');
        linkIcon.classList.add('icon-links');
        const linkElement = document.createElement('a');
        linkElement.classList.add('copy-link');
        linkElement.addEventListener('click', copyLink);
        linkElement.appendChild(linkIcon);
        newIcons.appendChild(linkElement);

        // Trash Icon
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('icon-trash');
        const trashElement = document.createElement('a');
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
        };
    };

    // Remove Link function
    const removeElement = (e) => {
        const toRemove = e.target;
        toRemove.parentNode.parentNode.parentNode.parentNode.removeChild(toRemove.parentNode.parentNode.parentNode);
    };

    // Copy Link to clipboard
    const copyLink = (e) => {
        const linkContent = e.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML;
        navigator.clipboard.writeText(linkContent);
        alert("Your Link has been copied to CLIPBOARD!");
    };

    // Add New Link Element Handle
    const addLinkButton = document.getElementById('add-link-button');
    addLinkButton.addEventListener('click', createElement);

    // Remove Link Button
    const removeLinkButtons = document.querySelectorAll('.trash-button');
    for (const button of removeLinkButtons) {
        button.addEventListener('click', removeElement);
    };

    // Copy Link Button
    const copyLinkButtons = document.querySelectorAll('.copy-link');
    for (const button of copyLinkButtons) {
        button.addEventListener('click', copyLink);
    };
    
};