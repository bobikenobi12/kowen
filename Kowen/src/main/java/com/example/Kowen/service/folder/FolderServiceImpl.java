package com.example.Kowen.service.folder;

import com.example.Kowen.entity.Document;
import com.example.Kowen.entity.Folder;
import com.example.Kowen.entity.UserGroup;
import com.example.Kowen.service.document.DocumentRepo;
import com.example.Kowen.service.group.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService{

    @Autowired
    private FolderRepo folderRepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private DocumentRepo documentRepo;

    @Override
    public Folder changeName(Long folderId, String name) throws Exception {
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        folder.setName(name);
        return folderRepo.save(folder);
    }

    @Override
    public Boolean deleteFolder(Long groupId, Long folderId) throws Exception {
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);

        if (group.getFolders().contains(folder)){
            List<Folder> folders = group.getFolders();
            folders.remove(folder);
            group.setFolders(folders);
            for(Document document : folder.getDocuments()){
                documentRepo.delete(document);
            }
            folderRepo.delete(folder);
            groupRepo.save(group);
            return Boolean.TRUE;
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no such folder in this group!");
    }
}
