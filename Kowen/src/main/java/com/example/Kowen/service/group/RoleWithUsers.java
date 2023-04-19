package com.example.Kowen.service.group;

import com.example.Kowen.entity.RoleInGroup;
import com.example.Kowen.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleWithUsers {
    private User user;
    private List<RoleInGroup> roles;
}
