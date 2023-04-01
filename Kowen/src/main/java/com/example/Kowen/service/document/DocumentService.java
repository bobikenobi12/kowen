package com.example.Kowen.service.document;

import com.example.Kowen.entity.Document;
import org.springframework.stereotype.Service;

@Service
public interface DocumentService {
    Document save(Document document);

    Document changeName(Long groupId, String name) throws Exception;
}
