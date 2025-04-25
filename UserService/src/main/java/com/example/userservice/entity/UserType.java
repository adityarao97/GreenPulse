package com.example.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "name")
    String name;
    @Column(name = "is_active")
    Boolean isActive = true;
    @Column(name = "created_date")
    Timestamp createdDate = new Timestamp(System.currentTimeMillis());
    @Column(name = "modified_date")
    Timestamp modifiedDate = new Timestamp(System.currentTimeMillis());
}
