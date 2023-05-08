import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// function to load our messages
function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        element.textContent += '.';

        if(element.textContent === '....'){
            element.textContent = '';
        }
    }, 300);

}

// function to type text character by character
function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() =>{
        if(index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

// function to generate a unique id for every single message to map
function generateUniqueId() {
    const timestamp = Date.now();
    // to make it even random
    const randomNumber = Math.random();
    // to make it even more random by adding hexadecimal string
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`
}

// function for chat stripe [for AI and user] - template
function chatStripe(isAi, value, uniqueId) {
    return (
      `
        <div class="wrapper" ${isAi && 'ai'}>
            <div class="chat">
              <div class="profile">
                <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
              </div>
              <div class="message" id="${uniqueId}">${value}</div>
            </div>
        </div>
      `
    );
}

// function to trigger and get the AI generated response
const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default behavior of the browser

    // get the data
    const data = new FormData(form);

    // generate user's chat stripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    form.reset();

    // generate bot's chat stripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight; // put the message in view

    // Now, we want to fetch newly created message
    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);

    //fetch data from the server -> bot's response
    const response = await fetch('https://codex-web-service.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if(response.ok) {
        const data = await response.json(); //actual response from BE
        const parsedData = data.bot.trim();

        typeText(messageDiv, parsedData);
    } else {
        const err = await response.text();

        messageDiv.innerHTML = "Something went wrong!";
        alert(err);
    }
}

// to be able to see the changes we made to our handleSubmit, call it
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        handleSubmit(e);
    }
})
