package com.example.Kowen.controller;

import com.example.Kowen.entity.*;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.service.document.DocumentRepo;
import com.example.Kowen.service.document.VersionRepo;
import com.example.Kowen.service.folder.FolderRepo;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.group.RoleInGroupRepo;
import com.example.Kowen.service.role.RoleRepository;
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

    @Autowired
    private VersionRepo versionRepo;

    @Autowired
    private FolderRepo folderRepo;

    @PostMapping("/save")
    public Document save(@RequestParam(name = "file") MultipartFile file,@RequestParam Long groupId,@RequestParam Long folderId, @RequestParam List<Long> roleIds) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        byte[] fileBytes = file.getBytes();

        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setPublisher(user);
//        document.setPublishingDate(new Date());


//        document.setDocumentContent(fileBytes);
        DocumentVersion version = new DocumentVersion();
        version.setDocumentContent(fileBytes);
        version.setVersion(1L);
        version.setDocument(document);


        List<DocumentVersion> versions = new ArrayList<>();
        versions.add(version);
        document.setVersions(versions);


        document.setDocumentExtension(file.getContentType());
        List<RoleInGroup> roles = new ArrayList<>();
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Boolean continueFlag = Boolean.FALSE;

        if(!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tou are not in this group!");
        if (group.getCreator() == user){
            continueFlag = Boolean.TRUE;
        }
        else {
            for (int i = 0; i < group.getRoleInGroup().size(); i++){
                if (group.getRoleInGroup().get(i).getRoleUser().getPermissions().contains(PermissionsEnum.can_add) && group.getRoleInGroup().get(i).getUserId().contains(user.getId())){
                    continueFlag = Boolean.TRUE;
                    break;
                }
            }
            if (continueFlag == Boolean.FALSE) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions to save add new document!");
        }


        for(Long id : roleIds){
            RoleInGroup role = roleInGroupRepo.findById(id).orElseThrow(Exception::new);
            if (group.getRoleInGroup().contains(role)){
                roles.add(role);
            }
            else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such role!");

        }


        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "there is no such folder in this group");

        document.setRoles(roles);
        documentRepo.save(document);
        List<Document> docs = folder.getDocuments();
        docs.add(document);
        folder.setDocuments(docs);
        folderRepo.save(folder);
        groupRepo.save(group);
        return document;
    }

    @GetMapping("/download/{folderId}/{documentId}/{version}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("documentId") Long documentId, @PathVariable("version") Long version, @PathVariable("folderId") Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);

        for (int i = 0; i < user.getUserGroups().size(); i++){
            if (!user.getUserGroups().get(i).getFolders().contains(folder) && i == user.getUserGroups().size() - 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder");

            if (user.getUserGroups().get(i).getFolders().get(user.getUserGroups().get(i).getFolders().indexOf(folder)).getDocuments().contains(document)){
                for (int j = 0; j < document.getRoles().size(); j++){
                    if (document.getRoles().get(j).getUserId().contains(user.getId())){
                        byte[] fileBytes = document.getVersions().get((int)(version - 1)).getDocumentContent();
                        ByteArrayResource resource = new ByteArrayResource(fileBytes);
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                        headers.setContentLength(fileBytes.length);

                        headers.setContentDispositionFormData("attachment", document.getName());

                        return ResponseEntity.ok()
                                .headers(headers)
                                .contentLength(fileBytes.length)
                                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                .body(resource);
                    }
                }
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions to download this document!");
            }

        }
        for (int i = 0; i < user.getGroups().size(); i++){
            if (user.getGroups().get(i).getFolders().get(user.getGroups().get(i).getFolders().indexOf(folder)).getDocuments().contains(document)){
                byte[] fileBytes = document.getVersions().get((int)(version - 1)).getDocumentContent();
                ByteArrayResource resource = new ByteArrayResource(fileBytes);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentLength(fileBytes.length);

                headers.setContentDispositionFormData("attachment", document.getName());

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(fileBytes.length)
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no document!");
    }

    @PostMapping("/saveNewVersion")
    public DocumentVersion saveNewVersion(@RequestParam(name = "file") MultipartFile file,@RequestParam Long groupId, @RequestParam Long documentId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        byte[] fileBytes = file.getBytes();
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        Boolean continueFlag = Boolean.FALSE;

        if(!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tou are not in this group!");
        if (group.getCreator() == user){
            continueFlag = Boolean.TRUE;
        }
        else {
            for (int i = 0; i < group.getRoleInGroup().size(); i++){
                if (group.getRoleInGroup().get(i).getRoleUser().getPermissions().contains(PermissionsEnum.can_add) && group.getRoleInGroup().get(i).getUserId().contains(user.getId())){
                    continueFlag = Boolean.TRUE;
                    break;
                }
            }
            if (continueFlag == Boolean.FALSE) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions to save new version if this document!");
        }
        DocumentVersion version = new DocumentVersion();
        version.setDocumentContent(fileBytes);
        version.setVersion(document.getVersions().get(document.getVersions().size() - 1).getVersion() + 1);
        version.setDocument(document);


        List<DocumentVersion> versions = document.getVersions();
        versions.add(version);
        versionRepo.save(version);
        document.setVersions(versions);
        documentRepo.save(document);



        return version;
    }

    //==============================================================================================================

    @PostMapping("/changeName/{groupId}/{documentId}")
    public Document changeName(@PathVariable Long groupId, @PathVariable Long documentId, @RequestParam String name) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        for (Folder folder : group.getFolders()){
            if (folder.getDocuments().contains(document)){
                for (RoleInGroup roleInGroup : group.getRoleInGroup()){
                    if(roleInGroup.getUserId().contains(user.getId()) || group.getCreator() == user){
                        document.setName(name);
                        return documentRepo.save(document);
                    }
                }
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such document!");
    }



}
