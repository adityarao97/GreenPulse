package com.example.userservice.service;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;

import java.util.List;

public interface UserService {
    public User createOrUpdate(User user);
    public List<User> getAllUsers();
    public List<User> getUser(User user);
    public void deleteUser(User user);
    public Session login(String email, String password);
}
