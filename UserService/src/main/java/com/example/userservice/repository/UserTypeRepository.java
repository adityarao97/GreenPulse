package com.example.userservice.repository;

import com.example.userservice.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserTypeRepository extends JpaRepository<UserType, Long> {
}
