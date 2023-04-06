package com.example.Kowen.service.group;

import com.example.Kowen.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {
    UserGroup create(String name, String description, User user);
    UserGroup saveGroupRole(Long groupId, RoleInGroupEntity role) throws Exception;

    UserGroup setUserGroupRole(Long userId, Long groupId, String role) throws Exception;
    UserGroup addUserToGroup(User user, Long groupId) throws Exception;

    UserGroup requestGroup(User user, Long groupId) throws Exception;

    UserGroup acceptUser(Long userId, Long groupId) throws Exception;

    List<User> getWaitingUsers(Long groupId) throws Exception;

    List<User> getUsersInGroup(Long groupId) throws Exception;

    List<Document> getDocumentsInGroup(Long groupId, Long folderId) throws Exception;

    UserGroup changeName(Long groupId, String name) throws Exception;
    UserGroup changeDescr(Long groupId, String descr) throws Exception;

    List<RoleWithUsers> getRolesWithUsers(Long groupId) throws Exception;
}
