package com.example.userservice.processor;

import com.example.userservice.entity.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface UserProcessor {
    public User create(User user);
    public User update(User user);
    public List<User> getAllUsers();
    public List<User> getUser(User user);
    public Optional<User> getUserBySpecification(Specification<User> userSpecification);
    public void deleteUser(User user);
    public User login(String email, String password);
}
