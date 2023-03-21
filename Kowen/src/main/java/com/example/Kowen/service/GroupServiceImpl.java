package com.example.Kowen.service;


import com.example.Kowen.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class GroupServiceImpl implements GroupService{

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserGroup create(String name, String description, User user) {
        UserGroup userGroup = new UserGroup();
        userGroup.setCreator(user);
        userGroup.setName(name);
        userGroup.setDescription(description);

        return groupRepo.save(userGroup);
    }

    @Override
    public UserGroup saveGroupRole(Long groupId, RoleInGroupEntity role) throws Exception {
        UserGroup userGroup = groupRepo.findById(groupId).orElseThrow(Exception::new);
        RoleInGroup roleInGroup = new RoleInGroup();
        roleInGroup.setRoleUser(role);
        List<RoleInGroup> rolesInGroup = userGroup.getRoleInGroup();
        rolesInGroup.add(roleInGroup);
        userGroup.setRoleInGroup(rolesInGroup);
        return groupRepo.save(userGroup);
    }

    @Override
    public UserGroup setUserGroupRole(Long userId, Long groupId, String roleName) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User user = userRepository.findById(userId).orElseThrow(Exception::new);


        List<RoleInGroup> roles = group.getRoleInGroup();
        for(RoleInGroup role : roles){
            if(Objects.equals(role.getRoleUser().getName(), roleName)){
                List<Long> ids = role.getUserId();
                ids.add(userId);
                role.setUserId(ids);
                return groupRepo.save(group);
            }
        }
        throw new ResponseStatusException(HttpStatus.CREATED, "There is no such Role!");
    }


    @Override
    public UserGroup addUserToGroup(User user, Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        List<User> users = group.getUsers();
        users.add(user);
        return groupRepo.save(group);
    }

    @Override
    public UserGroup requestGroup(User user, Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        List<Long> userIds = group.getWaitingUsersId();
        userIds.add(user.getId());
        group.setWaitingUsersId(userIds);
        return groupRepo.save(group);
    }

    @Override
    public UserGroup acceptUser(Long userId, Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (group.getWaitingUsersId().contains(userId)){
            List<Long> waitingIds = group.getWaitingUsersId();
            waitingIds.remove(userId);
            group.setWaitingUsersId(waitingIds);
            User user = userRepository.findById(userId).orElseThrow(Exception::new);
            return addUserToGroup(user, groupId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such user in waiting!");
    }
}
