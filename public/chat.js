const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
  socket.emit('sendMessage', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
});

socket.on('message', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
