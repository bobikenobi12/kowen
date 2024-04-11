//package com.example.Kowen.config.kafka;
//import com.example.Kowen.model.Message;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.kafka.clients.consumer.Consumer;
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.apache.kafka.clients.consumer.ConsumerRecords;
//import org.apache.kafka.clients.consumer.KafkaConsumer;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.kafka.core.ConsumerFactory;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Component;
//
//import java.time.Duration;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//
//@Component
//public class KafkaConsumerService {
//    @Autowired
//    private SimpMessagingTemplate messagingTemplate;
//    @KafkaListener(topics = "private-chat", groupId = "my-consumer-group")
//    public void receiveMessage(Message message) {
//        messageStore.add(message);
//        messagingTemplate.convertAndSend("/topic/public", message);
//    }
//
//    private List<Message> messageStore = new ArrayList<>();
//
//    // This method is called by KafkaListener to store messages
//    public void receiveMessage1(Message message) {
//        messageStore.add(message);
//    }
//
//    public List<Message> getMessagesForRecipient(String recipient) {
//        List<Message> messagesForRecipient = new ArrayList<>();
//        for (Message message : messageStore) {
//            System.out.println(message);
//            if (message.getReceiverUsername().equals(recipient)) {
//                messagesForRecipient.add(message);
//                System.out.println("In here again");
//            }
//        }
//        return messagesForRecipient;
//    }
//
//
//
//}
