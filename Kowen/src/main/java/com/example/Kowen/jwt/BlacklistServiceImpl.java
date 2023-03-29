package com.example.Kowen.jwt;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BlacklistServiceImpl implements BlackListService {

    private Set<String> blacklistedTokens = new HashSet<>();

    @Override
    public void addTokenToBlacklist(String token) {
        blacklistedTokens.add(token);
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
