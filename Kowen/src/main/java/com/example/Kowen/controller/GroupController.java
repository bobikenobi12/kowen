package com.example.Kowen.controller;


import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
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
}
