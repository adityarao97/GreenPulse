package com.example.userservice.controller;

import com.example.userservice.entity.UserType;
import com.example.userservice.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userType")
public class UserTypeController {

    @Autowired
    private UserTypeService userTypeService;

    @GetMapping
    public List<UserType> getAllUserTypes() {
        return userTypeService.getAllUserTypes();
    }

    @PostMapping
    public ResponseEntity<UserType> saveUser(@RequestBody UserType userType) {
        UserType savedUserType = userTypeService.createOrUpdate(userType);
        return new ResponseEntity<>(savedUserType, HttpStatus.OK);
    }

}
