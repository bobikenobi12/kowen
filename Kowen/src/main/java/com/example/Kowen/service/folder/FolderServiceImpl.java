package com.example.Kowen.service.folder;

import com.example.Kowen.entity.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FolderServiceImpl implements FolderService{

    @Autowired
    private FolderRepo folderRepo;

    @Override
    public Folder changeName(Long folderId, String name) throws Exception {
        Folder folder = folderRepo.findById(folderId).orElseThrow(Exception::new);
        folder.setName(name);
        return folderRepo.save(folder);
    }
}
