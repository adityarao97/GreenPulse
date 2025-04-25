package com.example.userservice.service;

import com.example.userservice.entity.UserType;
import com.example.userservice.processor.UserTypeProcessor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeServiceImpl implements UserTypeService {

    @Autowired
    private UserTypeProcessor userTypeProcessor;

    @Override
    public UserType createOrUpdate(UserType userType) {
        if (userType.getId() != null) {
            return userTypeProcessor.update(userType);
        }
        try {
            if (userType.getName() == null) {
                throw new BadRequestException("name is mandatory while creating user type");
            }
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
        return userTypeProcessor.create(userType);
    }

    @Override
    public List<UserType> getAllUserTypes() {
        return userTypeProcessor.getAllUserTypes();
    }

    @Override
    public void deleteUserType(UserType userType) {

    }

    @Override
    public UserType getUserTypeByUserTypeId(Long userTypeId){
        return userTypeProcessor.getUserTypeById(userTypeId);
    }
}
