package com.example.Kowen.service.role;

import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("select u from Role u where u.name=:name")
    List<Role> findByName(@Param("name") String name);
}
