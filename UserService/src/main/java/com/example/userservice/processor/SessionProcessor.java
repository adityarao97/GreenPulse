package com.example.userservice.processor;

import com.example.userservice.entity.Session;
import com.example.userservice.entity.User;

public interface SessionProcessor {
    public Session createOrUpdateSession(User user);
    public Session getSessionByUser(User user);
    public void deleteSession(Session session);
}
