package com.example.Kowen.controller.GroupController;

import com.example.Kowen.controller.GroupRequest;
import com.example.Kowen.controller.Id;
import com.example.Kowen.controller.RoleInGroupRequest;
import com.example.Kowen.controller.SettingRoleRequest;
import com.example.Kowen.entity.*;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.service.document.DocumentRepo;
import com.example.Kowen.service.folder.FolderRepo;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.group.RoleInGroupRepo;
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
import org.springframework.web.servlet.HandlerAdapter;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin()
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

    @Autowired
    private RoleInGroupRepo roleInGroupRepo;

    @Autowired
    private DocumentRepo documentRepo;

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
                group.setCreator(null);

                groupRepo.delete(group);
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
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_group))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "You can't add group picture because you don't have permissions!");
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

        if (user == group.getCreator() || groupService.checkForPermissions(user.getId(), group.getId(), PermissionsEnum.add_role)) {
            return groupService.saveGroupRole(roleInGroupRequest.getGroupId(), roleInGroupRequest.getRole());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");

    }
    // @GetMapping("/showGroupRoles/{groupId}")
    // public List<Role> showGroupRoles(@PathVariable Long groupId) throws Exception
    // {
    // Authentication authentication =
    // SecurityContextHolder.getContext().getAuthentication();
    // UserDetails principal = (UserDetails) authentication.getPrincipal();
    // User user = userRepository.findByEmail(principal.getUsername()).get(0);
    // UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

    // if (user.getUserGroups().contains(group) || user.getGroups().contains(group))
    // {
    // return group.getRoles();
    // } else
    // throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such
    // group!");
    // }

    @PostMapping("/setGroupRoleToUser")
    public UserGroup setGroupRoleToUser(@RequestBody SettingRoleRequest settingRoleRequest) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(settingRoleRequest.getGroupId()).orElseThrow(Exception::new);
        if (user == group.getCreator() || groupService.checkForPermissions(user.getId(), group.getId(), PermissionsEnum.apply_role)) {
            return groupService.setUserGroupRole(settingRoleRequest.getUserId(), settingRoleRequest.getGroupId(),
                    settingRoleRequest.getRoleId());
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    @PostMapping("/addUserToGroup")
    public UserGroup addUserToGroup(@RequestBody Id groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (userRepository.findByUsername(groupId.getUsername()).isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "There is no user with username: " + groupId.getUsername());
        User userToAdd = userRepository.findByUsername(groupId.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId.getGroupId()).orElseThrow(Exception::new);

        if (user == group.getCreator() || groupService.checkForPermissions(user.getId(), group.getId(), PermissionsEnum.add_user)) {
            return groupService.addUserToGroup(user, userToAdd, groupId.getGroupId());
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

        if (group.getCreator() == user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_group)) {
            return groupService.changeName(groupId, name);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions to change group name!");
    }

    @PostMapping("/changeDescr/{groupId}")
    public UserGroup changeDescr(@PathVariable Long groupId, @RequestParam String description) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_group)) {
            return groupService.changeDescr(groupId, description);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not able to change group description!");
    }

    @GetMapping("/getRolesWithUsers/{groupId}")
    public List<RoleWithUsers> getRolesWithUsers(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user || group.getUsers().contains(user)){
            return groupService.getRolesWithUsers(groupId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the creator of this group!");
    }

    @GetMapping("getRoles/{groupId}")
    public List<RoleInGroup> getRolesInGroup(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (user.getUserGroups().contains(group) || user.getGroups().contains(group)){
            return groupService.getRolesInGroup(groupId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
    }

    @PostMapping("/removeUser")
    public List<User> removeUser(@RequestParam Long groupId, @RequestParam Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.remove_user)){
            return groupService.removeUserFromGroup(groupId, userId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
    }


    @PostMapping("/removeRole")
    public List<RoleInGroup> removeRoleFromGroup(@RequestParam Long groupId, Long roleId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.remove_role)){
            return groupService.removeRoleFromGroup(groupId, roleId);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the creator of this group!");
    }

    @PostMapping("/removeRoleFromUser")
    public List<Long> removeRoleFromUser(@RequestParam Long groupId, @RequestParam Long roleId, @RequestParam Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User userInGroup = userRepository.findById(userId).orElseThrow(Exception::new);
        RoleInGroup role = roleInGroupRepo.findById(roleId).orElseThrow(Exception::new);

        if (group.getCreator() == user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.remove_role)){
            if (group.getUsers().contains(userInGroup)){
                if (group.getRoleInGroup().contains(role)){
                    return groupService.removeRoleFromUser(groupId, roleId, userId);
                }
                else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role in this group!");
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such user in this group!");
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the creator of this group!");
    }

    @GetMapping("/getUnassignedRoles/{groupId}/{userId}")
    public List<RoleInGroup> getUnassignedRoles(@PathVariable Long groupId, @PathVariable Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        User userInGroup = userRepository.findById(userId).orElseThrow(Exception::new);

        if (group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "you are not the creator of this group!");
        if (!group.getUsers().contains(userInGroup)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such user in this group@!");

        List<RoleInGroup> roleInGroupList = new ArrayList<>();
        for (RoleInGroup role : group.getRoleInGroup()){
            if (!role.getUserId().contains(userId)) roleInGroupList.add(role);
        }
        return roleInGroupList;
    }

    @PostMapping("removePermissionFromRole/{groupId}/{roleId}")
    public RoleInGroup removePermissionsFromRole(@PathVariable Long groupId, @PathVariable Long roleId, @RequestParam String permission) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        RoleInGroup role = roleInGroupRepo.findById(roleId).orElseThrow(Exception::new);

        if (group.getCreator() != user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_role)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
        if (!group.getRoleInGroup().contains(role)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role in this group!");
        for(PermissionsEnum permissionEnum : role.getRoleUser().getPermissions()){
            if (Objects.equals(permissionEnum.toString(), permission)){
                Collection<PermissionsEnum> permissions = role.getRoleUser().getPermissions();
                permissions.remove(permissionEnum);
                role.getRoleUser().setPermissions(permissions);
                roleInGroupRepo.save(role);
                return role;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such permission in this role!");

    }


    @PostMapping("addPermissionToRole/{groupId}/{roleId}")
    public RoleInGroup addPermissionsToRole(@PathVariable Long groupId, @PathVariable Long roleId, @RequestParam PermissionsEnum permission) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        RoleInGroup role = roleInGroupRepo.findById(roleId).orElseThrow(Exception::new);

        if (group.getCreator() != user || groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_role)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
        if (!group.getRoleInGroup().contains(role)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role in this group!");
        role.getRoleUser().getPermissions().add(permission);
        return roleInGroupRepo.save(role);
    }

    @GetMapping("/checkCreation/{groupId}")
    public boolean checkCreation(@PathVariable Long groupId) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        return group.getCreator() == user;
    }

    @GetMapping("/getAvailableRoles/{groupId}/{userId}")
    public List<RoleInGroup> getAvailableRoles(@PathVariable Long groupId, @PathVariable Long userId) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "you are not the creator of this group!");

        List<RoleInGroup> resultList = new ArrayList<>();
        for(RoleInGroup role : group.getRoleInGroup()){
            if (!role.getUserId().contains(userId)) resultList.add(role);
        }
        return resultList;
    }

    @GetMapping("/getPermissionsInGroup/{groupId}")
    public List<PermissionsEnum> getPermissionsInGroup(@PathVariable Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        List<PermissionsEnum> resultList = new ArrayList<>();

        for (RoleInGroup role : group.getRoleInGroup()){
            if (role.getUserId().contains(user.getId())){
                resultList.addAll(role.getRoleUser().getPermissions());
            }
        }

        return  resultList;
    }
}
