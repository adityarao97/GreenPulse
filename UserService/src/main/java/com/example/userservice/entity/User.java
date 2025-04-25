package com.example.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "user_type_id")
    Long userTypeId;
    @Column(name = "name")
    String name;
    @Column(name = "email")
    String email;
    @Column(name = "password")
    String password;
    @Column(name = "created_date")
    Timestamp createdDate = new Timestamp(System.currentTimeMillis());
    @Column(name = "modified_date")
    Timestamp modifiedDate = new Timestamp(System.currentTimeMillis());
    @Column(name = "last_login")
    Timestamp lastLogin;
    @Column(name = "is_active")
    Boolean isActive = true;
    @Column(name = "profile_image")
    String profileImage;
    @Column(name = "reset_password_token")
    String resetPasswordToken;
    @Column(name = "reset_password_expires")
    Timestamp resetPasswordExpires;
    String userType;
}
