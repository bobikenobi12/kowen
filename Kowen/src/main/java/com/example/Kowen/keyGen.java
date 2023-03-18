package com.example.Kowen;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;

public class keyGen {
    public static void main(String[] args) throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA512");
        SecureRandom random = new SecureRandom();
        keyGen.init(512, random); // key size is set to 512 bits
        SecretKey secretKey = keyGen.generateKey();
        System.out.println( Base64.getEncoder().encodeToString(secretKey.getEncoded()));

    }

}
