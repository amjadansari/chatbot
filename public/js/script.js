'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log(text);

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);
  socket.emit('chat message', text);
});

  // Custom method for text

 //creates a listener for when you press a key
  window.onkeyup = keyup;

  //creates a global Javascript variable
  var inputTextValue;

  function keyup(e) {
    inputTextValue = e.target.value;
    var name = "Me";
    if (e.keyCode == 13) {
      let text = inputTextValue;
      console.log(text);
      socket.emit('chat message', text);
        $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        $(".typed-text").val("");
    }
  }

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  console.log(text);
  if (text == '') {
    text == "I dont have any Answer for that)";
  }
  synth.speak(utterance);
  var name = "AI Bot";
    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  if(replyText == '') replyText = '(I dont have any Answer for that)';
  outputBot.textContent = replyText;
});
