package com.example.Kowen.service.dm;

import com.example.Kowen.entity.DmMessage;
import org.springframework.stereotype.Service;

@Service
public interface DmService {
    DmMessage sendMessage(DmMessage message);
}
