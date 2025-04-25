package com.example.userservice.service;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;

public interface SessionService {
    public Session createOrUpdateSession(User user);
    public Session getSessionByUser(User user);
    public void deleteSession(Session session);
}
