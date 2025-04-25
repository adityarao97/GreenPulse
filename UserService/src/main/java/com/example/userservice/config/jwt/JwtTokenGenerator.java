package com.example.userservice.config.jwt;

import com.example.userservice.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

public class JwtTokenGenerator {

    private static final String SECRET_KEY = "WYuF+Vg2iuTOoW+ospZfifHRuQNRISCDf9Hdmbc8TCM=";

    private static Key getSigningKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateJwtToken(User user) {
        return Jwts.builder()
                .claim("name", user.getName())
                .claim("role", user.getUserType())
                .claim("email", user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token valid for 10 hours
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }
}