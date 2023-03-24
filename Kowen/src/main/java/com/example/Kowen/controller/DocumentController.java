package com.example.Kowen.controller;

import com.example.Kowen.entity.*;
import com.example.Kowen.service.document.DocumentRepo;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.group.RoleInGroupRepo;
import com.example.Kowen.service.role.RoleRepository;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private RoleInGroupRepo roleInGroupRepo;

    @Autowired
    private DocumentRepo documentRepo;

    @PostMapping("/save")
    public Document save(@RequestParam(name = "file") MultipartFile file,@RequestParam Long groupId,@RequestParam List<Long> roleIds) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setPublisher(user);
//        document.setPublishingDate(new Date());
        document.setDocumentContent(file.getBytes());
        document.setDocumentExtension(file.getContentType());
        List<RoleInGroup> roles = new ArrayList<>();
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        for(Long id : roleIds){
            RoleInGroup role = roleInGroupRepo.findById(id).orElseThrow(Exception::new);
            if (group.getRoleInGroup().contains(role)){
                roles.add(role);
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role!");

        }
        document.setRoles(roles);


        return documentRepo.save(document);
    }
}
