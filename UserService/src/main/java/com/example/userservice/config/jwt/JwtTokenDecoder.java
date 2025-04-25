package com.example.userservice.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtTokenDecoder {

    private static final String SECRET_KEY = "your-256-bit-secret"; // Same key used for signing

    public Claims decodeJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
