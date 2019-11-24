const chatElement = (e) => {
    e.preventDefault();

    // Chat Content Element
    const chatContentElement = document.getElementById('chat');

    // Chat Element
    const postElement = document.createElement('div');
    postElement.classList.add('your-post');

    // Post
    const postParagraph = document.createElement('p');
    const postContent = document.getElementById('chat-input').value;
    const postValue = document.createTextNode(postContent);
    postParagraph.appendChild(postValue);
    postElement.appendChild(postParagraph);
    chatContentElement.appendChild(postElement);
};

// Add New Post
const sendButton = document.getElementById('chat-button');
sendButton.addEventListener('click', chatElement);