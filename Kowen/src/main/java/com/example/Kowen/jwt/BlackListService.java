package com.example.Kowen.jwt;

public interface BlackListService {
    public void addTokenToBlacklist(String token);
    public boolean isTokenBlacklisted(String token);
}
