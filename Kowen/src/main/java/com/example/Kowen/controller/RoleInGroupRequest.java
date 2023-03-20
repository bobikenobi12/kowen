package com.example.Kowen.controller;

import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.RoleInGroupEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleInGroupRequest {
    Long groupId;
    RoleInGroupEntity role;
}
