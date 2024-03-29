package com.example.Kowen.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "kowen")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String description;


    @ManyToMany
    @JoinTable(name = "user_kowen",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();

    @ElementCollection
    @Column(nullable = true)
    private List<Long> waitingUsersId;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Lob //TODO: JsonIgnore this field
    @Column(columnDefinition="BLOB", nullable = true)
    private byte[] groupPicture;


    @OneToMany(cascade = CascadeType.ALL)
    private List<RoleInGroup> roleInGroup;



    @OneToMany(cascade = CascadeType.ALL)
    private List<Folder> folders;


    @OneToOne(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private GroupChat groupChat;
}
