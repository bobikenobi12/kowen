package com.example.Kowen.controller.GroupController;


import com.example.Kowen.controller.GroupRequest;
import com.example.Kowen.controller.Id;
import com.example.Kowen.controller.RoleInGroupRequest;
import com.example.Kowen.controller.SettingRoleRequest;
import com.example.Kowen.entity.Document;
import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepo groupRepo;

    @PostMapping("/create")
    public UserGroup create(@RequestBody GroupRequest groupRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();

        if (groupRequest.getName().length() < 3 || groupRequest.getName().length() > 15) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group name must contain characters between 3 and 15!");
        if (groupRequest.getDescription().length() < 10 || groupRequest.getDescription().length() > 150) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group description must contain characters between 10 and 150!");

        if (userRepository.findByEmail(principal.getUsername()).isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not loged in!");
        else{
            User creator =  userRepository.findByEmail(principal.getUsername()).get(0);
            return groupService.create(groupRequest.getName(), groupRequest.getDescription(), creator);

        }

    }

    @PostMapping("/saveGroupRole")
    public UserGroup saveRoleInGroup(@RequestBody RoleInGroupRequest roleInGroupRequest) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(roleInGroupRequest.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()){
            return groupService.saveGroupRole(roleInGroupRequest.getGroupId(), roleInGroupRequest.getRole());
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");

    }

    @PostMapping("/setGroupRoleToUser")
    public UserGroup setGroupRoleToUser(@RequestBody SettingRoleRequest settingRoleRequest) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(settingRoleRequest.getGroupId()).orElseThrow(Exception::new);
        if (user == group.getCreator()){
            return groupService.setUserGroupRole(settingRoleRequest.getUserId(), settingRoleRequest.getGroupId(), settingRoleRequest.getRoleName());
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @PostMapping("/addUserToGroup")
    public UserGroup addUserToGroup(@RequestBody Id groupId) throws Exception {//TODO: make quie for request joining group
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        User userToAdd = userRepository.findById(groupId.getUserId()).orElseThrow(Exception::new);
        UserGroup group = groupRepo.findById(groupId.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()){
            return groupService.addUserToGroup(userToAdd, groupId.getGroupId());
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group to add users!");



    }

    @PostMapping("/requestGroup")
    public UserGroup requestGroup(@RequestBody Id id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        return  groupService.requestGroup(user, id.getGroupId());
    }

    @PostMapping("/acceptUser")
    public UserGroup acceptUser(@RequestBody Id id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(id.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()){
            return groupService.acceptUser(id.getUserId(), group.getId());
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @GetMapping("/getWaiting/{groupId}")
    public List<User> getWaitingUsers(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (user == group.getCreator()){
            return groupService.getWaitingUsers(groupId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @GetMapping("/getUsersInGroup/{groupId}")
    public List<User> getUsersInGroup(@PathVariable Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        group.getUsers().add(group.getCreator());
        return groupService.getUsersInGroup(groupId);
    }

    @GetMapping("/getDocumentsInGroup/{groupId}")
    public List<Document> getDocumentsInGroup(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (group.getUsers().contains(user) || group.getCreator() == user){
            return groupService.getDocumentsInGroup(groupId);
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "You are not in this group!");

    }
}
