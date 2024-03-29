package com.example.Kowen.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.ExecutorSubscribableChannel;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.nio.channels.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final static String CHAT_ENDPOINT = "/chat/send/message/**";

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(getChatWebSocketHandler(), CHAT_ENDPOINT)
                .setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler getChatWebSocketHandler(){
        return new ChatWebSocketHandler();
    }

    @Bean
    public MessageChannel messageChannel() {
        return new ExecutorSubscribableChannel();
    }

    @Bean
    public SimpMessagingTemplate messagingTemplate() {
        return new SimpMessagingTemplate(messageChannel());
    }
}
