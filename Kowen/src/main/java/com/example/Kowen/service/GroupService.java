package com.example.Kowen.service;

import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import org.springframework.stereotype.Service;

@Service
public interface GroupService {
    UserGroup create(String name, String description, User user);
}
