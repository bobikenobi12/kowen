package com.example.Kowen.controller;


import com.example.Kowen.entity.User;
import com.example.Kowen.jwt.JwtTokenService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @GetMapping("/test")
    public Boolean hello(@RequestBody User user, String userToken){
        return jwtTokenService.isTokenExpired(userToken);
    }
}
