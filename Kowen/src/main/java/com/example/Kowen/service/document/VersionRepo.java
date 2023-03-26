package com.example.Kowen.service.document;

import com.example.Kowen.entity.DocumentVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VersionRepo extends JpaRepository<DocumentVersion, Long> {
}
