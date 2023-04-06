package com.example.Kowen.service.user;




import com.example.Kowen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.email=:email")
    List<User> findByEmail(@Param("email") String email);

    @Query("select u from User u where u.username=:username")
    List<User> findByUsername(@Param("username") String username);
}
