package com.example.Kowen.service.document;

import com.example.Kowen.entity.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl implements DocumentService{

    @Autowired
    private DocumentRepo documentRepo;

    @Override
    public Document save(Document document) {
        return documentRepo.save(document);
    }
}
