package com.example.Kowen.service.dm_chat;

import com.example.Kowen.entity.DmChat;
import com.example.Kowen.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DmChatServiceImpl implements DmChatService{

    @Autowired
    private DmChatRepo dmChatRepo;
    @Override
    public DmChat generateChat(DmChat dmChat) {
        return dmChatRepo.save(dmChat);
    }

    @Override
    public DmChat findById(Long id) {
        return dmChatRepo.findById(id).orElse(null);
    }
}
