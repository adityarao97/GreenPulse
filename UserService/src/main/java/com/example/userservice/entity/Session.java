package com.example.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "user_id")
    Long userId;
    String jwtToken;
    String refreshToken;
    Timestamp createdDate;
    Timestamp modifiedDate;
    Timestamp expiresAt;
}
