const newElement = () => {
    const linkTable = document.getElementById('link-table'); 
    const newLine = document.createElement('div');
    const newName = document.createElement('div');
    const newLink = document.createElement('div');
    const newNameParaghraph = document.createElement('p');
    const nameInputValue = document.getElementById('link-name-input').value;
    const nameValue = document.createTextNode(nameInputValue);
    
    const link = document.createElement('a');
    const linkInputValue = document.getElementById('link-value-input').value;
    const LinkText = document.createTextNode(linkInputValue);

    newNameParaghraph.appendChild(nameValue);
    newName.appendChild(newNameParaghraph);
    newName.classList.add('name-column');
    newLine.appendChild(newName);
    newLine.classList.add('table-row');
    
    link.setAttribute('href', linkInputValue);
    link.setAttribute('target', "_blank");
    link.appendChild(LinkText);
    newLink.appendChild(link);
    newLink.classList.add('link-column');
    newLine.appendChild(newLink);
    
    linkTable.appendChild(newLine);


    // link.appendChild(LinkValue);
    // link.setAttribute('href', LinkValue);
    // link.setAttribute('target', "_blank");
    // newLink.appendChild(link);
    // newLink.classList.add('link-column');
    // linkTable.appendChild(newLink);
    
    // newLine.appendChild(newName);
    // newLine.classList.add('table-row');

    // div.setAttribute('class', 'note');
}

const addLinkButton = document.getElementById('add-link-button');
addLinkButton.addEventListener('click', newElement);