package com.example.Kowen.service.chat;

import com.example.Kowen.entity.GroupChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepo extends JpaRepository<GroupChat, Long> {
}
