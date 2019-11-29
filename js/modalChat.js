///   ADMIN MODAL CHAT   \\\

// Posts counter
let posts = 0;

// Post Element Handle Function

const chatElement = (e) => {
    e.preventDefault();

    // Chat Content Element
    const chatContentElement = document.getElementById('chat');

    // Chat Element
    let postElement = document.createElement('div');
    postElement.classList.add('your-post');

    // Post
    const postParagraph = document.createElement('p');
    const postContent = document.getElementById('chat-input').value;
    const postValue = document.createTextNode(postContent);
    postParagraph.appendChild(postValue);
    postElement.appendChild(postParagraph);
    chatContentElement.appendChild(postElement);
    document.getElementById('chat-input').value = "";

    // Admin Answers Handle

    setTimeout(() => {
        if (posts === 1) {
            // Second Admin Post
            postElement = document.createElement('div');
            postElement.classList.add('admin-post');
            const postParagraph = document.createElement('p');
            const postValue = document.createTextNode('Can you tell me more about your problem?');
            postParagraph.appendChild(postValue);
            postElement.appendChild(postParagraph);
            chatContentElement.appendChild(postElement);
        }
        if (posts === 2) {
            // Third Admin Post
            postElement = document.createElement('div');
            postElement.classList.add('admin-post');
            const postParagraph = document.createElement('p');
            const postValue = document.createTextNode('Try this solution mate: ');
            const solutionLink = document.createElement('a');
            const linkContent = document.createTextNode('Solution Link');
            solutionLink.setAttribute('href', 'https://www.google.com/');
            solutionLink.setAttribute('target', "_blank");
            solutionLink.appendChild(linkContent);
            solutionLink.style.marginLeft='20px';
            postParagraph.appendChild(postValue);
            postElement.appendChild(postParagraph);
            postElement.appendChild(solutionLink);
            chatContentElement.appendChild(postElement);
            const label = document.getElementById('label');
            label.style.background='red';
            label.innerHTML="offline";
            const dottie = document.getElementById('dottie');
            dottie.style.background='red';
        };
 }, 1000);
    posts++
};

// Add New Post
const sendButton = document.getElementById('chat-button');
sendButton.addEventListener('click', chatElement);