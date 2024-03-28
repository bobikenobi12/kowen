package com.example.Kowen.service.dm_chat;

import com.example.Kowen.entity.DmChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DmChatRepo extends JpaRepository<DmChat, Long> {
}
