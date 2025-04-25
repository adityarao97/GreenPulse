package com.example.userservice.repository;

import com.example.userservice.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SessionRepository extends JpaRepository<Session, Long> {
}
