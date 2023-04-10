package com.example.Kowen.controller.userController;

import com.example.Kowen.controller.AuthRequest;
import com.example.Kowen.controller.AuthResponse;
import com.example.Kowen.dto.UserDto;
import com.example.Kowen.entity.Role;
import com.example.Kowen.entity.User;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.jwt.BlackListService;
import com.example.Kowen.jwt.JwtTokenService;
import com.example.Kowen.mapper.UserMapper;
import com.example.Kowen.service.role.RoleRepository;
import com.example.Kowen.service.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Autowired
    private JwtTokenService jwtTokenUtil;

    @Autowired
    private BlackListService blackListService;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController() {
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (roleRepository.findByName("USER").isEmpty()) {
            Role role = new Role();
            List<PermissionsEnum> permissionsEnums = new ArrayList<>();
            permissionsEnums.add(PermissionsEnum.can_add);
            role.setPermissions(permissionsEnums);
            role.setName("USER");
            roleRepository.save(role);
        }

        // Validators
        if (!user.getEmail().contains("@") || !user.getEmail().contains(".") || user.getEmail().indexOf(0) == '@'
                || user.getEmail().length() < 7)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email address is not valid!");
        if (user.getPassword().length() < 6 || user.getPassword().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must contain characters between 6 and 16!");
        if (user.getFirstName().length() < 3 || user.getFirstName().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "First name must contain characters between 3 and 16!");
        if (user.getLastName().length() < 3 || user.getLastName().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Last name must contain characters between 3 and 16!");
        if (user.getUsername().length() < 3 || user.getUsername().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username must contain characters between 3 and 16!");
        // end of validators

        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName("USER").get(0));
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setDateJoined(LocalDateTime.now());
        return userRepository.save(user);
    }

    @PostMapping("/setProfilePic")
    public User setProfilePic(@RequestParam MultipartFile picture) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        user.setProfilePicture(picture.getBytes());
        return userRepository.save(user);
    }

    @GetMapping("/downloadProfilePic")
    public ResponseEntity<ByteArrayResource> downloadProfilePic() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        byte[] fileBytes = user.getProfilePicture();
        ByteArrayResource resource = new ByteArrayResource(fileBytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(fileBytes.length);

        headers.setContentDispositionFormData("attachment", user.getFirstName());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(fileBytes.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        if (userRepository.findByEmail(authRequest.getEmail()).isEmpty() ||
                !passwordEncoder.matches(authRequest.getPassword(), userRepository
                        .findByEmail(authRequest.getEmail())
                        .get(0)
                        .getPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password!");
        else if (!authRequest.getEmail().contains("@") || !authRequest.getEmail().contains(".")
                || authRequest.getEmail().indexOf(0) == '@' || authRequest.getEmail().length() < 7)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email address is not valid!");
        else if (authRequest.getPassword().length() < 6 || authRequest.getPassword().length() > 16)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must contain characters between 6 and 16!");
        else {
            User user = userRepository.findByEmail(authRequest.getEmail()).get(0);
            String token = jwtTokenService.generateToken(user.getEmail());
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            UserMapper mapper = new UserMapper();
            return new AuthResponse("token", token, user);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String authToken = jwtTokenUtil.getTokenFromRequest(request);
        blackListService.addTokenToBlacklist(authToken);
        return ResponseEntity.ok("Logout successful.");
    }

    @PostMapping("/refresh")
    public AuthResponse refreshToken(@RequestBody UserDto user){
        User user1 = userRepository.findByEmail(user.getEmail()).get(0);
//        System.out.println(user.getToken());
        if (jwtTokenService.isTokenExpired(user.getToken())){
            String refreshToken = jwtTokenService.generateToken(user.getEmail());

            return new AuthResponse("token", refreshToken, user1);
        }
        else{
            return new AuthResponse("Already logged in", user.getToken(), user1);
        }
    }

    @GetMapping("/getMe")
    public User showMyData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        return user;
    }

    // =================================Changes===================================

    @PostMapping("/changeUsername")
    public User changeUsername(@RequestBody UserDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            user.setUsername(dto.getUsername());
            return userRepository.save(user);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password!");
    }

    @PostMapping("/changeFirstName")
    public User changeFirstName(@RequestBody UserDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            user.setFirstName(dto.getFirstName());
            return userRepository.save(user);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password!");
    }

    @PostMapping("/changeLastName")
    public User changeLastName(@RequestBody UserDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            user.setLastName(dto.getLastName());
            return userRepository.save(user);
        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password!");
    }

    @PostMapping("/changeEmail")
    public AuthResponse changeEmail(@RequestBody UserDto dto, HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            user.setEmail(dto.getEmail());
            userRepository.save(user);
            String newToken = jwtTokenService.generateToken(user.getEmail());
            String oldToken = jwtTokenService.getTokenFromRequest(request);
            blackListService.addTokenToBlacklist(oldToken);
            return new AuthResponse("token", newToken, user);

        } else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password!");
    }

    @PostMapping("/changePassword")
    public User changePassword(@RequestBody UserDto dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user =  userRepository.findByEmail(principal.getUsername()).get(0);

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword()) && Objects.equals(dto.getNewPassword(), dto.getConfirmNewPassword())){
            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            return userRepository.save(user);
        }
        else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password!");
    }
}
