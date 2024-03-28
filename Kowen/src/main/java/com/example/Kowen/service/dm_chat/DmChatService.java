package com.example.Kowen.service.dm_chat;

import com.example.Kowen.entity.DmChat;
import com.example.Kowen.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface DmChatService {

    DmChat generateChat(DmChat dmChat);

    DmChat findById(Long id);
}
