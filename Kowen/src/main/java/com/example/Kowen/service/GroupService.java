package com.example.Kowen.service;

import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.RoleInGroupEntity;
import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import org.springframework.stereotype.Service;

@Service
public interface GroupService {
    UserGroup create(String name, String description, User user);
    UserGroup saveGroupRole(Long groupId, RoleInGroupEntity role) throws Exception;

    UserGroup setUserGroupRole(Long userId, Long groupId, String role) throws Exception;
    UserGroup addUserToGroup(User user, Long groupId) throws Exception;
}
