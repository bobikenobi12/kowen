package com.example.Kowen.service;


import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupServiceImpl implements GroupService{

    @Autowired
    private GroupRepo groupRepo;
    @Override
    public UserGroup create(String name, String description, User user) {
        UserGroup userGroup = new UserGroup();
        userGroup.setCreator(user);
        userGroup.setName(name);
        userGroup.setDescription(description);

        return groupRepo.save(userGroup);
    }
}
