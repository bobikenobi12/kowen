package com.example.Kowen.service.dm;

import com.example.Kowen.entity.DmMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DmRepo extends JpaRepository<DmMessage, Long> {
}
