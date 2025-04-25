package com.example.userservice.specification;

import com.example.userservice.entity.User;
import org.springframework.data.jpa.domain.Specification;


public class UserSpecification {
    public static Specification<User> hasName(String name) {
        return (root, query, criteriaBuilder) -> name == null ? null : criteriaBuilder.equal(root.get("name"), name);
    }

    public static Specification<User> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> email == null ? null : criteriaBuilder.equal(root.get("email"), email);
    }

    public static Specification<User> hasId(Long id) {
        return (root, query, criteriaBuilder) -> id == null ? null : criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<User> hasPassword(String password) {
        return (root, query, criteriaBuilder) -> password == null ? null : criteriaBuilder.equal(root.get("password"), password);
    }
}
