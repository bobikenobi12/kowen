package com.example.Kowen.controller.roleController;


import com.example.Kowen.entity.Role;
import com.example.Kowen.service.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/save")
    public Role save(@RequestBody Role role){
        return roleRepository.save(role);
    }
}
