package com.example.Kowen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name; //

//    @Temporal(TemporalType.TIMESTAMP)
//    private Date publishingDate;//

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User publisher; //

    @Lob
    @Column(columnDefinition="BLOB", nullable = false)
    private byte[] documentContent; //

    @Column
    private String documentExtension; //

    @ManyToMany(cascade = CascadeType.ALL)
    private List<RoleInGroup> roles; //

}
