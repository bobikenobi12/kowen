package com.example.Kowen.controller.ChatController;

import com.example.Kowen.entity.Message;
import com.example.Kowen.entity.User;
import com.example.Kowen.entity.UserGroup;
import com.example.Kowen.enums.PermissionsEnum;
import com.example.Kowen.service.MessageRepo;
import com.example.Kowen.service.chat.ChatRepo;
import com.example.Kowen.service.group.GroupRepo;
import com.example.Kowen.service.group.GroupService;
import com.example.Kowen.service.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private GroupService groupService;

    @PostMapping("/sendMessage/{groupId}")
    public List<Message> sendMessage(@PathVariable Long groupId, @RequestParam String message) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername()).get(0);
        UserGroup group = groupRepo.findById(groupId).orElseThrow(Exception::new);

        if (!group.getUsers().contains(user) && group.getCreator() != user) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not in this group!");
        if (!groupService.checkForPermissions(user.getId(), groupId, PermissionsEnum.access_chat)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You don't have permissions!");

        Message chatMessage = new Message();
        chatMessage.setChat(group.getGroupChat());
        chatMessage.setContent(message);
        chatMessage.setSender(user);
        messageRepo.save(chatMessage);
        List<Message> messages = group.getGroupChat().getMessages();
        messages.add(chatMessage);
        group.getGroupChat().setMessages(messages);
        groupRepo.save(group);
        return messages;
    }

}
