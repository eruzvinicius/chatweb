package com.pessoal.chatweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatApplication {

	//iniciar o servidor tomcat
	public static void main(String[] args) {
		SpringApplication.run(ChatApplication.class, args);
	}
}
