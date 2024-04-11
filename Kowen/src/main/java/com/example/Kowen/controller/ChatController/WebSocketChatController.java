//package com.example.Kowen.controller.ChatController;
//
////import com.example.Kowen.config.kafka.ChatService;
//import com.example.Kowen.model.Message;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.messaging.support.ExecutorSubscribableChannel;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//
//@Controller
//public class WebSocketChatController {
//
//
//
////    @Autowired
////    private SimpMessagingTemplate simpMessagingTemplate;
//
////    @Autowired
////    private ChatService chatService;
//
//    @MessageMapping("/message")
//    @SendTo("/topic/messages")
//    public Message receiveMessage(@Payload Message message){
//        simpMessagingTemplate.convertAndSend("/topic/public", message);
//        System.out.println("hello there!");
//        return message;
//    }
//
//    @MessageMapping("/topic/public") // Endpoint to listen for messages sent to /topic/public
//    @SendTo("/topic/public") // Broadcast received messages to the same destination
//    public Message receiveMessage1(Message message) {
//        // Process the received message if needed
//        return message;
//    }
//
//
//
//}
