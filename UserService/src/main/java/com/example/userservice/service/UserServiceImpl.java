package com.example.userservice.service;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;
import com.example.userservice.entity.UserType;
import com.example.userservice.processor.UserProcessor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserProcessor userProcessor;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UserTypeService userTypeService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User createOrUpdate(User user) {
        if (user.getId() != null) {
            return userProcessor.update(user);
        }
        try {
            if (user.getName() == null) {
                throw new BadRequestException("name is mandatory while creating user");
            }
            if (user.getEmail() == null) {
                throw new BadRequestException("email is mandatory while creating user");
            }
            if (user.getPassword() == null) {
                throw new BadRequestException("password is mandatory while creating user");
            }

            if (user.getUserTypeId() == null) {
                throw new BadRequestException("user type id is mandatory while creating user");
            }
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userProcessor.create(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userProcessor.getAllUsers();
    }

    @Override
    public List<User> getUser(User user) {
        return userProcessor.getUser(user);
    }

    @Override
    public void deleteUser(User user) {

    }

    @Override
    public Session login(String email, String password) {
        User user = userProcessor.login(email, password);
        UserType userType = userTypeService.getUserTypeByUserTypeId(user.getUserTypeId());
        user.setUserType(userType.getName());
        return sessionService.createOrUpdateSession(user);
    }
}
