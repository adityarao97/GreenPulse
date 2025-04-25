package com.example.userservice.service;

import com.example.userservice.entity.UserType;

import java.util.List;

public interface UserTypeService {
    public UserType createOrUpdate(UserType userType);
    public List<UserType> getAllUserTypes();
    public void deleteUserType(UserType userType);
    public UserType getUserTypeByUserTypeId(Long userId);
}
