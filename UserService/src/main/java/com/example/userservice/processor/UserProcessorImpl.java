package com.example.userservice.processor;

import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.repository.UserTypeRepository;
import com.example.userservice.specification.UserSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserProcessorImpl implements UserProcessor {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User create(User user) {
        userTypeRepository.findById(user.getUserTypeId()).orElseThrow(() -> new NoSuchElementException("User type id is not found with id " + user.getUserTypeId()));
        try {
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new BadRequestException("user with email id : " + user.getEmail() + " already exists!");
            }
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        User userUpdate = userRepository.findById(user.getId())
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + user.getId()));
        userUpdate.setName(user.getName());
        userUpdate.setEmail(user.getEmail());
        userUpdate.setModifiedDate(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(userUpdate);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUser(User user) {
        Specification<User> spec = Specification.where(UserSpecification.hasName(user.getName()))
                .and(UserSpecification.hasEmail(user.getEmail()))
                .and(UserSpecification.hasId(user.getId()));
        return userRepository.findAll(spec);
    }

    @Override
    public void deleteUser(User user) {

    }

    @Override
    public Optional<User> getUserBySpecification(Specification<User> userSpecification) {
        return userRepository.findOne(userSpecification);
    }

    @Override
    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            try {
                if (!passwordEncoder.matches(password, user.getPassword())) {
                    throw new BadRequestException("Incorrect password");
                }
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new EntityNotFoundException("user not found");
        }
        return optionalUser.get();
    }
}
