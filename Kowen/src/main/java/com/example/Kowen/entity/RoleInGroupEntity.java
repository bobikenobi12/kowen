package com.example.Kowen.entity;

import com.example.Kowen.enums.PermissionsEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class RoleInGroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @JoinTable(name = "Permissions_of_users_of_groups")
    @Column(name = "permissions", nullable = false)
    @Enumerated(EnumType.STRING)
    Collection<PermissionsEnum> permissions;
}
