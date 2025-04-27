package com.example.userservice.controller;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUser(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "id", required = false) Long id
    ) {
        if (name == null && email == null && id == null) {
            return userService.getAllUsers();
        } else {
            User user = new User();
            if (name != null) {
                user.setName(name);
            }
            if (email != null) {
                user.setEmail(email);
            }
            if (id != null) {
                user.setId(id);
            }
            return userService.getUser(user);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userService.createOrUpdate(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<Session> loginUser(@RequestParam String email, @RequestParam String password){
        Session session = userService.login(email, password);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }
}
