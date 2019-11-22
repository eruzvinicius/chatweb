package com.pessoal.chatweb;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.enviarMensagem")
    @SendTo("/topic/public")
    public ChatMensagem sendMessage(@Payload ChatMensagem mensagem) {
        return mensagem;
    }

    @MessageMapping("/chat.addUsuario")
    @SendTo("/topic/public")
    public ChatMensagem addUser(@Payload ChatMensagem mensagem,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Adiciona nome de usuário na sessão do webSocket
        headerAccessor.getSessionAttributes().put("username", mensagem.getUsuario());
        return mensagem;
    }

}
