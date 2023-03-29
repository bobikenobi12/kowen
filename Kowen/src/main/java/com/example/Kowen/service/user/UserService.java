package com.example.Kowen.service.user;

import com.example.Kowen.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    Boolean sendEmail(String email);
}
