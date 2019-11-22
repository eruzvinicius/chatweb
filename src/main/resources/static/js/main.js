'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function conectar(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUsuario",
        {},
        JSON.stringify({usuario: username, tipo: 'ENTRAR'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Conexão não pode ser realizada. Por favor, atualize a página para tentar novamente!';
    connectingElement.style.color = 'red';
}


function enviarMensagem(event) {
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var mensagem = {
            usuario: username,
            conteudo: messageInput.value,
            tipo: 'CHAT'
        };

        stompClient.send("/app/chat.enviarMensagem", {}, JSON.stringify(mensagem));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.tipo === 'ENTRAR') {
        messageElement.classList.add('event-message');
        message.conteudo = message.usuario + ' entrou!';
    } else if (message.tipo === 'SAIR') {
        messageElement.classList.add('event-message');
        message.conteudo = message.usuario + ' saiu!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.usuario[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.usuario);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.usuario);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.conteudo);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', conectar, true)
messageForm.addEventListener('submit', enviarMensagem, true)
