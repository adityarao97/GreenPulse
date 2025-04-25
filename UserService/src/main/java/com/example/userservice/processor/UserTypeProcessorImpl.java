package com.example.userservice.processor;

import com.example.userservice.entity.UserType;
import com.example.userservice.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserTypeProcessorImpl implements UserTypeProcessor{

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Override
    public UserType create(UserType userType) {
        return userTypeRepository.save(userType);
    }

    @Override
    public UserType update(UserType userType){
        UserType userTypeUpdate = userTypeRepository.findById(userType.getId())
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userType.getId()));
        userTypeUpdate.setName(userType.getName());
        userTypeUpdate.setModifiedDate(new Timestamp(System.currentTimeMillis()));
        return userTypeRepository.save(userTypeUpdate);
    }

    @Override
    public List<UserType> getAllUserTypes() {
        return userTypeRepository.findAll();
    }

    @Override
    public void deleteUserType(UserType userType) {

    }

    @Override
    public UserType getUserTypeById(Long userTypeId) {
        return userTypeRepository.findById(userTypeId).orElseThrow(()-> new NoSuchElementException("User type with id " + userTypeId + " not found"));
    }
}
