//package com.example.Kowen.config.kafka;
//
//import com.example.Kowen.model.Message;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.kafka.clients.producer.ProducerRecord;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaProducerService {
//
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    private final ObjectMapper objectMapper;
//
//    @Autowired
//    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
//        this.kafkaTemplate = kafkaTemplate;
//        this.objectMapper = objectMapper;
//    }
//
//    public void sendMessage(String topic, Message message) {
//        try {
//            String jsonMessage = objectMapper.writeValueAsString(message);
//            kafkaTemplate.send(new ProducerRecord<>(topic, jsonMessage));
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//    }
//}
