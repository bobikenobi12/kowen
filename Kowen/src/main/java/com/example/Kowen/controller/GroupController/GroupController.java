package com.example.Kowen.controller.GroupController;

import com.example.Kowen.controller.GroupRequest;
import com.example.Kowen.controller.Id;
import com.example.Kowen.controller.RoleInGroupRequest;
import com.example.Kowen.controller.SettingRoleRequest;
import com.example.Kowen.entity.Document;
import com.example.Kowen.entity.Folder;
import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import com.example.Kowen.service.folder.FolderRepo;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.group.RoleWithUsers;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private FolderRepo folderRepo;

    @PostMapping("/create")
    public UserGroup create(@RequestBody GroupRequest groupRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();

        if (groupRequest.getName().length() < 3 || groupRequest.getName().length() > 15)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Group name must contain characters between 3 and 15!");
        if (groupRequest.getDescription().length() < 10 || groupRequest.getDescription().length() > 150)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Group description must contain characters between 10 and 150!");

        if (userRepository.findByEmail(principal.getUsername()).isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not loged in!");
        else {
            User creator = userRepository.findByEmail(principal.getUsername()).get(0);
            return groupService.create(groupRequest.getName(), groupRequest.getDescription(), creator);

        }

    }

    @PostMapping("/leaveGroup/{groupId}")
    public Boolean leaveGroup(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (user.getUserGroups().contains(group) || user.getGroups().contains(group)) {
            if (group.getCreator() == user) {
                List<UserGroup> groups = user.getGroups();
                groups.remove(group);
                user.setGroups(groups);
                userRepository.save(user);
                groupRepo.deleteById(group.getId());
                return true;
            } else {
                List<UserGroup> groups = user.getUserGroups();
                groups.remove(group);
                user.setUserGroups(groups);
                userRepository.save(user);
                List<User> users = group.getUsers();
                users.remove(user);
                groupRepo.save(group);
                return true;
            }
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such group!");

    }

    @GetMapping("/showGroups")
    public List<UserGroup> showGroup() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        List<UserGroup> groups = new ArrayList<>();
        for (UserGroup group : user.getGroups()) {
            groups.add(group);
        }
        for (UserGroup group : user.getUserGroups()) {
            groups.add(group);
        }
        return groups;
    }

    @GetMapping("/showGroup/{groupId}")
    public UserGroup showGroup(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (user.getUserGroups().contains(group) || user.getGroups().contains(group)) {
            return group;
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such group!");
    }

    @PostMapping("/addGroupPictire")
    public UserGroup addGroupPic(@RequestParam MultipartFile picture, @RequestParam Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User creator = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() != creator)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "You can't add group picture because you aren't the creator!");
        group.setGroupPicture(picture.getBytes());
        return groupRepo.save(group);
    }

    @PostMapping("/downloadGroupPic")
    public ResponseEntity<ByteArrayResource> downloadGroupPic(@RequestParam Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        byte[] fileBytes = group.getGroupPicture();
        ByteArrayResource resource = new ByteArrayResource(fileBytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(fileBytes.length);

        headers.setContentDispositionFormData("attachment", group.getName());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(fileBytes.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @PostMapping("/saveGroupRole")
    public UserGroup saveRoleInGroup(@RequestBody RoleInGroupRequest roleInGroupRequest) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(roleInGroupRequest.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()) {
            return groupService.saveGroupRole(roleInGroupRequest.getGroupId(), roleInGroupRequest.getRole());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");

    }

    @PostMapping("/setGroupRoleToUser")
    public UserGroup setGroupRoleToUser(@RequestBody SettingRoleRequest settingRoleRequest) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(settingRoleRequest.getGroupId()).orElseThrow(Exception::new);
        if (user == group.getCreator()) {
            return groupService.setUserGroupRole(settingRoleRequest.getUserId(), settingRoleRequest.getGroupId(),
                    settingRoleRequest.getRoleName());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @PostMapping("/addUserToGroup")
    public UserGroup addUserToGroup(@RequestBody Id groupId) throws Exception {// TODO: make quie for request joining
                                                                               // group
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (userRepository.findByUsername(groupId.getUsername()).isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "There is no user with username: " + groupId.getUsername());
        User userToAdd = userRepository.findByUsername(groupId.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()) {
            return groupService.addUserToGroup(userToAdd, groupId.getGroupId());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "You are not creator of this group to add users!");

    }

    @PostMapping("/requestGroup")
    public UserGroup requestGroup(@RequestBody Id id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        return groupService.requestGroup(user, id.getGroupId());
    }

    @PostMapping("/acceptUser")
    public UserGroup acceptUser(@RequestBody Id id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(id.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator()) {
            return groupService.acceptUser(id.getUserId(), group.getId());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @GetMapping("/getWaiting/{groupId}")
    public List<User> getWaitingUsers(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (user == group.getCreator()) {
            return groupService.getWaitingUsers(groupId);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @GetMapping("/getUsersInGroup/{groupId}")
    public List<User> getUsersInGroup(@PathVariable Long groupId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        group.getUsers().add(group.getCreator());
        return groupService.getUsersInGroup(groupId);
    }

    @GetMapping("/getDocumentsInGroup/{groupId}/{folderId}")
    public List<Document> getDocumentsInGroup(@PathVariable Long groupId, @PathVariable Long folderId)
            throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);

        if (!group.getFolders().contains(folder))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder!");
        if (group.getUsers().contains(user) || group.getCreator() == user) {
            return groupService.getDocumentsInGroup(groupId, folderId);
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "You are not in this group!");

    }

    @PostMapping("/changeName/{groupId}")
    public UserGroup changeName(@PathVariable Long groupId, @RequestParam String name) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user) {
            return groupService.changeName(groupId, name);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not able to change group name!");
    }

    @PostMapping("/changeDescr/{groupId}")
    public UserGroup changeDescr(@PathVariable Long groupId, @RequestParam String description) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user) {
            return groupService.changeDescr(groupId, description);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not able to change group description!");
    }

    @GetMapping("/getRolesWithUsers/{groupId}")
    public List<RoleWithUsers> getRolesWithUsers(@PathVariable Long groupId) throws Exception {
        return groupService.getRolesWithUsers(groupId);
    }
}
