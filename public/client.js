const socket = io('https://chatapp-jtv9.onrender.com'); // Use your actual deployed server URL

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const submitButton = document.querySelector('.btn'); // Get the submit button

var audio = new Audio('tingmp3.mp3');

// Disable the submit button initially
submitButton.disabled = true;

// Function to append messages to the chat container
const append = (message, position, isJoinOrLeave) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);

  // If the message is related to joining or leaving
  if (isJoinOrLeave) {
    messageElement.classList.add(isJoinOrLeave); // Add class for join or leave

    // Apply background color based on join or leave
    if (isJoinOrLeave === 'join') {
      messageElement.style.backgroundColor = 'green'; // Green for join
    } else if (isJoinOrLeave === 'leave') {
      messageElement.style.backgroundColor = 'red'; // Red for leave
    }

    // Center the message for join/leave
    messageElement.classList.add('center-message'); // Add class for centering

    // Reset background color after a short delay (to make the color visible)
    setTimeout(() => {
      messageElement.style.backgroundColor = ''; // Reset to default
    }, 2000); // 2 seconds for the background color to stay
  }

  // Append the message to the container
  messageContainer.append(messageElement);

  // Play sound when a message is received from others
  if (position === 'left') {
    audio.play();
  }
};

// Handle message form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message.trim() === '') {
    return; // Prevent form submission if message is empty
  }
  append(`you: ${message}`, 'right'); // Show user's message on the right
  socket.emit('send', message); // Send the message to the server
  messageInput.value = ''; // Clear the input field
  submitButton.disabled = true; // Disable submit button again after sending the message
});

// Enable submit button if the input is not empty
messageInput.addEventListener('input', () => {
  if (messageInput.value.trim() !== '') {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true; // Disable submit button if the input is empty
  }
});

// Get user's name
const name = prompt("Enter your name");

// Emit event for new user joining
socket.emit('new-user-joined', name);

// Event listener for when a user joins
socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right', 'join');
});

// Event listener for receiving messages
socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'left');
});

// Event listener for when a user leaves
socket.on('leave', (name) => {
  append(`${name} left the chat`, 'left', 'leave');
});
