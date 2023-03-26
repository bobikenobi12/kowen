package com.example.Kowen.controller.userController;

import com.example.Kowen.controller.AuthRequest;
import com.example.Kowen.controller.AuthResponse;
import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.User;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.jwt.JwtTokenService;
import com.example.Kowen.service.role.RoleRepository;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.ErrorResponse;
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
        if(roleRepository.findByName("USER").isEmpty()){
            Role role = new Role();
            List<PermissionsEnum> permissionsEnums = new ArrayList<>();
            permissionsEnums.add(PermissionsEnum.can_add);
            role.setPermissions(permissionsEnums);
            role.setName("USER");
            roleRepository.save(role);
        }

        //Validators
        if (!user.getEmail().contains("@") || !user.getEmail().contains(".") || user.getEmail().indexOf(0) == '@' || user.getEmail().length() < 7)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email address is not valid!");
        if (user.getPassword().length() < 6 || user.getPassword().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must contain characters between 6 and 16!");
        if (user.getFirstName().length() < 3 || user.getFirstName().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "First name must contain characters between 3 and 16!");
        if (user.getLastName().length() < 3 || user.getLastName().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Last name must contain characters between 3 and 16!");
        if (user.getUsername().length() < 3 || user.getUsername().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must contain characters between 3 and 16!");
        //end of validators



        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName("USER").get(0));
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password!");
        else if (!authRequest.getEmail().contains("@") || !authRequest.getEmail().contains(".") || authRequest.getEmail().indexOf(0) == '@' || authRequest.getEmail().length() < 7)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email address is not valid!");
        else if (authRequest.getPassword().length() < 6 || authRequest.getPassword().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must contain characters between 6 and 16!");
        else {
            User user = userRepository.findByEmail(authRequest.getEmail()).get(0);
            String token = jwtTokenService.generateToken(user.getEmail());
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            return new AuthResponse("token", token);
        }
    }


    @GetMapping("/getMe")
    public User showMyData(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);
        return user;
    }
}
