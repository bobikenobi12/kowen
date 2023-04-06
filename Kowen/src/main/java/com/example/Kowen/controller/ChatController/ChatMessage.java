package com.example.Kowen.controller.ChatController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;

    public ChatMessage(String sender, String content) {
        this.sender = sender;
        this.content = content;
    }

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}
