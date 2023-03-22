package com.example.Kowen.controller.userController;

import com.example.Kowen.controller.AuthRequest;
import com.example.Kowen.controller.AuthResponse;
import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.User;
import com.example.Kowen.jwt.JwtTokenService;
import com.example.Kowen.service.RoleRepository;
import com.example.Kowen.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;




    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController() {
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        Role role = roleRepository.findByName("USER").get(0);
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setDateJoined(LocalDateTime.now());
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest){
        if (userRepository.findByEmail(authRequest.getEmail()).isEmpty() ||
                !passwordEncoder.matches(authRequest.getPassword(), userRepository
                        .findByEmail(authRequest.getEmail())
                        .get(0)
                        .getPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no user with this email!");
        else {
            User user = userRepository.findByEmail(authRequest.getEmail()).get(0);
            String token = jwtTokenService.generateToken(user.getEmail());
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            return new AuthResponse("token", token);
        }

    }
}
