package com.example.Kowen.service;

import com.example.Kowen.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepo extends JpaRepository<UserGroup, Long> {
}
