package com.example.Kowen.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {
    private String senderUsername;
    private String receiverUsername;
    private String message;
    private LocalDateTime date;
    private Status status;
}
