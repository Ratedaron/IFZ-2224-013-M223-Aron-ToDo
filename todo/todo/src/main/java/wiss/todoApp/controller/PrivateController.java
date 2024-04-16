package wiss.todoApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrivateController {
    
    @GetMapping("/private")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok("Private content");
    } 
}
