package com.example.Kowen.dto;

import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.UserGroup;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String token;

    private Long id;

    private String password;

    private String username;

    private String confirmPassword;

    private String newPassword;


    private String email;

    private String firstName;

    private String lastName;

    private LocalDateTime lastLogin;

    private byte[] profilePicture;

    private LocalDateTime dateJoined;
    
}
