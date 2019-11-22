package com.pessoal.chatweb;


public class ChatMensagem {
    private TipoMensagem tipo;
    private String conteudo;
    private String usuario;

    public enum TipoMensagem {
        CHAT,
        ENTRAR,
        SAIR
    }

    public TipoMensagem getTipo() {
        return tipo;
    }

    public void setTipo(TipoMensagem tipo) {
        this.tipo = tipo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}