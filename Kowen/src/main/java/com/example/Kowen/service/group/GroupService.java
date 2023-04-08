package com.example.Kowen.service.group;

import com.example.Kowen.entity.*;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {
    UserGroup create(String name, String description, User user);

    UserGroup saveGroupRole(Long groupId, RoleInGroupEntity role) throws Exception;

    UserGroup setUserGroupRole(Long userId, Long groupId, Long roleId) throws Exception;

    UserGroup addUserToGroup(User user, Long groupId) throws Exception;

    UserGroup requestGroup(User user, Long groupId) throws Exception;

    UserGroup acceptUser(Long userId, Long groupId) throws Exception;

    List<User> getWaitingUsers(Long groupId) throws Exception;

    List<User> getUsersInGroup(Long groupId) throws Exception;

    List<Document> getDocumentsInGroup(Long groupId, Long folderId) throws Exception;

    UserGroup changeName(Long groupId, String name) throws Exception;

    UserGroup changeDescr(Long groupId, String descr) throws Exception;

    List<RoleWithUsers> getRolesWithUsers(Long groupId) throws Exception;

    List<RoleInGroup> getRolesInGroup(Long groupId) throws Exception;

    List<User> removeUserFromGroup(Long groupId, Long userId) throws Exception;

    List<RoleInGroup> removeRoleFromGroup(Long groupId, Long roleId) throws Exception;

    List<Long> removeRoleFromUser(Long groupId, Long roleId, Long userId) throws Exception;
}
