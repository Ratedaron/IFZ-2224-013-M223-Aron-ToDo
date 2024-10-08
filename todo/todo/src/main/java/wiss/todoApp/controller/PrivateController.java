package wiss.todoApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PrivateController {
    
    // private controller I made in testing 
    // didnt really teach me anything
    @GetMapping("/private")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok("Private content");
    } 
}
