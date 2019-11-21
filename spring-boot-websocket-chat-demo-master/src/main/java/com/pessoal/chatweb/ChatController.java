package com.pessoal.chatweb;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMensagem sendMessage(@Payload ChatMensagem chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMensagem addUser(@Payload ChatMensagem chatMessage,SimpMessageHeaderAccessor headerAccessor) {
        // Adiciona nome de usuário na sessão do webSocket
        headerAccessor.getSessionAttributes().put("username", chatMessage.getUsuario());
        return chatMessage;
    }

}
