package com.example.Kowen.service.folder;

import com.example.Kowen.entity.Folder;
import org.springframework.stereotype.Service;

@Service
public interface FolderService {
    Folder changeName(Long folderId, String name) throws Exception;

    Boolean deleteFolder(Long groupId, Long folderId) throws Exception;
}
