package com.example.userservice.processor;

import com.example.userservice.entity.UserType;

import java.util.List;

public interface UserTypeProcessor {
    public UserType create(UserType userType);
    public UserType update(UserType userType);
    public List<UserType> getAllUserTypes();
    public void deleteUserType(UserType userType);
    public UserType getUserTypeById(Long userTypeId);
}
