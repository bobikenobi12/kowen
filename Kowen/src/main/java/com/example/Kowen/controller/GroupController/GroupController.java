package com.example.Kowen.controller.GroupController;


import com.example.Kowen.controller.GroupRequest;
import com.example.Kowen.controller.Id;
import com.example.Kowen.controller.RoleInGroupRequest;
import com.example.Kowen.controller.SettingRoleRequest;
import com.example.Kowen.entity.RoleInGroup;
import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import com.example.Kowen.service.GroupRepo;
import com.example.Kowen.service.GroupService;
import com.example.Kowen.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

        return groupService.addUserToGroup(user, groupId.getId());
    }
}
