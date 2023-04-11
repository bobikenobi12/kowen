package com.example.Kowen.controller.Folder;

import com.example.Kowen.entity.*;
import com.example.Kowen.service.folder.FolderRepo;
import com.example.Kowen.service.folder.FolderService;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.management.BadAttributeValueExpException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/folder")
public class FolderController {

    @Autowired
    private FolderRepo folderRepo;

    @Autowired
    private FolderService folderService;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/saveTo/group/{groupId}")
    public Folder saveFolder(@PathVariable Long groupId, @RequestParam String name) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        Folder folder = new Folder();
        folder.setName(name);
        List<Folder> folderList = group.getFolders();
        folderList.add(folder);
        folderRepo.save(folder);
        group.setFolders(folderList);
        groupRepo.save(group);
        return folder;
    }

    @PostMapping("/getFoldersInGroup")
    public List<Folder> getFoldersInGroup(@RequestParam Long groupId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");

        return group.getFolders();
    }

    @PostMapping("/getFolderInGroup")
    public Folder getFolderInGroup(@RequestParam Long groupId, @RequestParam Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");

        for (Folder folder : group.getFolders()) {
            if (folder.getId() == folderId) {
                return folder;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder!");
    }

    @PostMapping("/delete")
    public Folder deleteFolder(@RequestParam Long groupId, @RequestParam Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (group.getCreator() == user) {
            return folderService.deleteFolder(groupId, folderId);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not creator of this group!");
    }

    // ================================Changes===================================

    @PostMapping("/changeName/{groupId}/{folderId}")
    public Folder changeName(@PathVariable Long groupId, @PathVariable Long folderId, @RequestParam String name)
            throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        for (Folder folder : group.getFolders()) {
            if (folder.getId() == folderId && group.getCreator() == user) {
                return folderService.changeName(folderId, name);
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such document!");
    }
}
