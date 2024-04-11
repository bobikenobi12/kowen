package com.example.Kowen.controller.Document;

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
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public Document save(@RequestParam(name = "file") MultipartFile file, @RequestParam Long groupId,
            @RequestParam Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        byte[] fileBytes = file.getBytes();

        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setPublisher(user);
        // document.setPublishingDate(new Date());

        // document.se  tDocumentContent(fileBytes);
        DocumentVersion version = new DocumentVersion();
//        version.setDocumentContent(fileBytes); //TODO: check if I should comment it
        version.setType(file.getContentType());
        version.setVersion(1L);
        version.setDocument(document);

        List<DocumentVersion> versions = new ArrayList<>();
        versions.add(version);
        document.setVersions(versions);


        List<RoleInGroup> roles = new ArrayList<>();
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Boolean continueFlag = Boolean.FALSE;

        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tou are not in this group!");
        if (group.getCreator() == user) {
            continueFlag = Boolean.TRUE;
        } else {
            for (int i = 0; i < group.getRoleInGroup().size(); i++) {
                if (group.getRoleInGroup().get(i).getRoleUser().getPermissions().contains(PermissionsEnum.add_document)
                        && group.getRoleInGroup().get(i).getUserId().contains(user.getId())) {
                    continueFlag = Boolean.TRUE;
                    break;
                }
            }
            if (continueFlag == Boolean.FALSE)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "You don't have permissions to save add new document!");
        }



        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        if (!group.getFolders().contains(folder))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "there is no such folder in this group");


        try {
            byte[] bytes = file.getBytes();

            String originalFileName = file.getOriginalFilename();
            int lastIndex = originalFileName.lastIndexOf('.');
            String fileNameWithoutExtension = originalFileName.substring(0, lastIndex);
            String fileExtension = originalFileName.substring(lastIndex);
            String newFileName = fileNameWithoutExtension + "_" + documentRepo.save(document).getId() + "_1" + fileExtension;

            Path path = Paths.get("/var/www/html/" + newFileName);


            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error uploading the document!");
        }
         //TODO: check if I should comment it

        List<Document> docs = folder.getDocuments();
        docs.add(document);
        folder.setDocuments(docs);
        folderRepo.save(folder);
        groupRepo.save(group);
        return document;
    }

    @GetMapping("/download/{groupId}/{folderId}/{documentId}/{version}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long groupId, @PathVariable("documentId") Long documentId,
            @PathVariable("version") Long version, @PathVariable("folderId") Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);

        if (!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder in this group!");
        if (!folder.getDocuments().contains(document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such document in this folder!");

        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.download_document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
        byte[] fileBytes = document.getVersions().get((int) (version - 1)).getDocumentContent();
//        ByteArrayResource resource = new ByteArrayResource(fileBytes);
        HttpHeaders headers = new HttpHeaders();
        Resource resource;
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//        headers.setContentLength(fileBytes.length);

        headers.setContentDispositionFormData("attachment", document.getName());

        String originalFileName = document.getName();
        int lastIndex = originalFileName.lastIndexOf('.');
        String fileNameWithoutExtension = originalFileName.substring(0, lastIndex);
        String fileExtension = originalFileName.substring(lastIndex);
        String newFileName = fileNameWithoutExtension + "_" + documentId + "_" + version.toString() + fileExtension;

        Path path = Paths.get("/var/www/html/" + newFileName);


        try {
            resource = new UrlResource(path.toUri());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);




    }

    @GetMapping("/remove/{groupId}/{folderId}/{documentId}")
    public void downloadFile(@PathVariable Long groupId, @PathVariable("documentId") Long documentId, @PathVariable("folderId") Long folderId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);

        if (!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder in this group!");
        if (!folder.getDocuments().contains(document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such document in this folder!");

        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.remove_document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");

        folder.getDocuments().remove(document);
        folderRepo.save(folder);
        documentRepo.delete(document);


    }

    @PostMapping("/saveNewVersion")
    public DocumentVersion saveNewVersion(@RequestParam(name = "file") MultipartFile file, @RequestParam Long groupId,
            @RequestParam Long documentId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        byte[] fileBytes = file.getBytes();
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);
        Boolean continueFlag = Boolean.FALSE;

        if (!group.getUsers().contains(user) && group.getCreator() != user)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tou are not in this group!");
        if (group.getCreator() == user) {
            continueFlag = Boolean.TRUE;
        } else {
            for (int i = 0; i < group.getRoleInGroup().size(); i++) {
                if (group.getRoleInGroup().get(i).getRoleUser().getPermissions().contains(PermissionsEnum.save_new_document_version)
                        && group.getRoleInGroup().get(i).getUserId().contains(user.getId())) {
                    continueFlag = Boolean.TRUE;
                    break;
                }
            }
            if (continueFlag == Boolean.FALSE)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "You don't have permissions to save new version if this document!");
        }
        DocumentVersion version = new DocumentVersion();
        version.setVersion(document.getVersions().get(document.getVersions().size() - 1).getVersion() + 1);

//        version.setDocumentContent(fileBytes); //TODO: check if I should commnt it
        try {
            byte[] bytes = file.getBytes();

            String originalFileName = document.getName();
            int lastIndex = originalFileName.lastIndexOf('.');
            String fileNameWithoutExtension = originalFileName.substring(0, lastIndex);
            String fileExtension = originalFileName.substring(lastIndex);
            String newFileName = fileNameWithoutExtension + "_" + documentId + "_" + version.getVersion().toString() + fileExtension;

            Path path = Paths.get("/var/www/html/" + newFileName);

            Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }

        version.setVersion(document.getVersions().get(document.getVersions().size() - 1).getVersion() + 1);
        version.setType(file.getContentType());
        version.setDocument(document);

        List<DocumentVersion> versions = document.getVersions();
        versions.add(version);
        versionRepo.save(version);
        document.setVersions(versions);
        documentRepo.save(document);

        return version;
    }

    @GetMapping("getContent/{groupId}/{folderId}/{documentId}/{version}")
    public String getContent(@PathVariable Long groupId, @PathVariable Long folderId, @PathVariable Long documentId, @PathVariable Long version) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);

        if (!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder!");
        if (!folder.getDocuments().contains(document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no folder in this group!");
        boolean errorFlag = false;
        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.preview_document)) errorFlag = true;



        if (errorFlag) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");
        for (DocumentVersion documentVersion : document.getVersions()){
            if (documentVersion.getVersion().longValue() == version){
                return "hello";
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such version 2");


    }

    // ==============================================================================================================

    @PostMapping("/changeName/{groupId}/{folderId}/{documentId}")
    public Document changeName(@PathVariable Long groupId,@PathVariable Long folderId, @PathVariable Long documentId, @RequestParam String name)
            throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        Document document = documentRepo.findById(documentId).orElseThrow(Exception::new);

        if (!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        if (!group.getFolders().contains(folder)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder in this group!");
        if (!folder.getDocuments().contains(document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such document in this folder!");
        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.edit_document)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");

        document.setName(name);
        return documentRepo.save(document);

    }

}
