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
        alert("Enter Name and URL")
    }
}

const removeElement = (e) => {
    const toRemove = e.target;
    toRemove.parentNode.parentNode.parentNode.parentNode.removeChild(toRemove.parentNode.parentNode.parentNode);
}

// Add New Link Button
const addLinkButton = document.getElementById('add-link-button');
addLinkButton.addEventListener('click', createElement);

// Remove Link Button
const removeLinkButtons = document.querySelectorAll('.trash-button');
for (const button of removeLinkButtons) {
    button.addEventListener('click', removeElement);
}