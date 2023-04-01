package com.example.Kowen.mapper;

import com.example.Kowen.dto.UserDto;
import com.example.Kowen.entity.User;

public class UserMapper {

    public UserDto UserToDto(User user, String token){
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setToken(token);
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setDateJoined(user.getDateJoined());
        dto.setLastLogin(user.getLastLogin());

        return dto;
    }
}
