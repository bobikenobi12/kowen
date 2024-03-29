package com.example.Kowen.service.group;


import com.example.Kowen.entity.*;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.service.chat.ChatRepo;
import com.example.Kowen.service.folder.FolderRepo;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FolderRepo folderRepo;


    @Autowired
    private RoleInGroupRepo roleRepository;

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public UserGroup create(String name, String description, User user) {
        UserGroup userGroup = new UserGroup();
        userGroup.setCreator(user);
        userGroup.setName(name);
        userGroup.setDescription(description);

        GroupChat chat = new GroupChat();
        chat.setGroup(userGroup);
        userGroup.setGroupChat(chat);
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
    public UserGroup setUserGroupRole(Long userId, Long groupId, Long roleId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User user = userRepository.findById(userId).orElseThrow(Exception::new);

        if (group.getUsers().contains(user)){
            List<RoleInGroup> roles = group.getRoleInGroup();
            for(RoleInGroup role : roles){
                if(Objects.equals(role.getRoleUser().getId(), roleId)){
                    List<Long> ids = role.getUserId();
                    ids.add(userId);
                    role.setUserId(ids);
                    return groupRepo.save(group);
                }
            }
            throw new ResponseStatusException(HttpStatus.CREATED, "There is no such Role!");
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user is not in your group!");


    }


    @Override
    public UserGroup addUserToGroup(User adder, User user, Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        user.getUserGroups().add(group);
        group.getUsers().add(user);
        userRepository.save(user);
        groupRepo.save(group);

        //Email sending
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("anton.m.stankov.2021@elsys-bg.org");
//        message.setTo(user.getEmail());
//        message.setSubject("Hello " + user.getUsername() + ", new group is waiting for you!");
//        message.setText("You have been added to group: " + group.getName() + " by " + adder.getFirstName() + " " + adder.getLastName() + "!");
//        javaMailSender.send(message);
        return group;
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
            return addUserToGroup(new User(), user, groupId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such user in waiting!");
    }

    @Override
    public List<User> getWaitingUsers(Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        List<Long> ids = group.getWaitingUsersId();
        List<User> users = new ArrayList<>();

        for(Long id : ids){
            User user = userRepository.findById(id).orElseThrow(Exception::new);
            users.add(user);
        }
        return users;
    }

    @Override
    public List<User> getUsersInGroup(Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        return group.getUsers();
    }

    @Override
    public List<Document> getDocumentsInGroup(Long groupId, Long folderId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder in this group!");
        return folder.getDocuments();
    }

    @Override
    public UserGroup changeName(Long groupId, String name) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        group.setName(name);
        return groupRepo.save(group);
    }

    @Override
    public UserGroup changeDescr(Long groupId, String descr) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        group.setDescription(descr);
        return groupRepo.save(group);
    }

    @Override
    public List<RoleWithUsers> getRolesWithUsers(Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        List<RoleWithUsers> roleWithUsersList = new ArrayList<>();

        for (User user : group.getUsers()){
            RoleWithUsers roleWithUsers = new RoleWithUsers(user, null);
            roleWithUsersList.add(roleWithUsers);
        }

        for (RoleWithUsers roleWithUsers : roleWithUsersList){
            List<RoleInGroup> roles = new ArrayList<>();
            for (RoleInGroup role : group.getRoleInGroup()){
                if (role.getUserId().contains(roleWithUsers.getUser().getId())){
                    roles.add(role);
                    roleWithUsers.setRoles(roles);
                }
            }
        }
        return roleWithUsersList;
//        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
//        List<RoleWithUsers> resultList = new ArrayList<>();
//
//        for (RoleInGroup role : group.getRoleInGroup()){
//            RoleWithUsers roleWithUsers = new RoleWithUsers();
//            roleWithUsers.setRole(role);
//            List<User> users = new ArrayList<>();
//            for (Long userId : role.getUserId()){
//                User user = userRepository.findById(userId).orElseThrow(Exception::new);
//                users.add(user);
//            }
//            roleWithUsers.setUsers(users);
//            resultList.add(roleWithUsers);
//        }
//
//
//        RoleWithUsers usersWithoutRoles = new RoleWithUsers();
//        usersWithoutRoles.setRole(null);
//        usersWithoutRoles.setUsers(new ArrayList<>());
//        for (User user : group.getUsers()){
//            boolean checkContaining = true;
//            for (RoleInGroup role : group.getRoleInGroup()){
//                if (!role.getUserId().contains(user.getId())){
//                    checkContaining = false;
//                }
//                else checkContaining = true;
//            }
//            if (!checkContaining){
//
//                usersWithoutRoles.getUsers().add(user);
//            }
//        }
//        resultList.add(usersWithoutRoles);
//        return resultList;
    }

    @Override
    public List<RoleInGroup> getRolesInGroup(Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        return group.getRoleInGroup();
    }

    @Override
    public List<User> removeUserFromGroup(Long groupId, Long userId) throws Exception{
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User user = userRepository.findById(userId).orElseThrow(Exception::new);

        if (group.getUsers().contains(user) && group.getCreator() != user){
            List<User> users = group.getUsers();
            users.remove(user);
            List<UserGroup> groups = user.getUserGroups();
            groups.remove(group);
            user.setUserGroups(groups);
            userRepository.save(user);
            group.setUsers(users);

            List<RoleInGroup> roles = group.getRoleInGroup();
            List<RoleInGroup> newRoles = new ArrayList<>();
            for (RoleInGroup role : roles){
                List<Long> ids = role.getUserId();
                if (role.getUserId().contains(userId)){
                    ids.remove(userId);
                }
                role.setUserId(ids);
                newRoles.add(role);
            }
            group.setRoleInGroup(newRoles);
            groupRepo.save(group);
            return users;
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No group or user!");
    }

    @Override
    public List<RoleInGroup> removeRoleFromGroup(Long groupId, Long roleId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        RoleInGroup roleInGroup = roleRepository.findById(roleId).orElseThrow(Exception::new);

        if (group.getRoleInGroup().contains(roleInGroup)){
            List<RoleInGroup> rolesInGroup = group.getRoleInGroup();
            rolesInGroup.remove(roleInGroup);
            group.setRoleInGroup(rolesInGroup);
            groupRepo.save(group);
            return group.getRoleInGroup();
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role in this group!");
    }

    @Override
    public List<Long> removeRoleFromUser(Long groupId, Long roleId, Long userId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User user = userRepository.findById(userId).orElseThrow(Exception::new);
        RoleInGroup role = roleRepository.findById(roleId).orElseThrow(Exception::new);

        if (role.getUserId().contains(userId)){
            List<Long> ids = role.getUserId();
            ids.remove(userId);
            role.setUserId(ids);
            roleRepository.save(role);
            return ids;
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user hasn't this role!");
    }

    @Override
    public boolean checkForPermissions(Long userId, Long groupId, PermissionsEnum permission) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(Exception::new);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (group.getCreator() == user) return true;
        List<RoleInGroup> roles = group.getRoleInGroup();

        for (RoleInGroup role : roles){
            if (role.getUserId().contains(userId) && role.getRoleUser().getPermissions().contains(permission)) return true;
        }
        return false;
    }
}
