package com.example.Kowen.service.dm;

import com.example.Kowen.entity.DmChat;
import com.example.Kowen.entity.DmMessage;
import com.example.Kowen.service.dm_chat.DmChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DmServiceImpl implements DmService{

    @Autowired
    private DmRepo dmRepo;

    @Autowired
    private DmChatService dmChatService;

    @Override
    public DmMessage sendMessage(DmMessage message) {
        return dmRepo.save(message);
    }
}
