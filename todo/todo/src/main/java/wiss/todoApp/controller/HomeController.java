package wiss.todoApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
    
    @GetMapping("/home")
    public ResponseEntity<String> getHome() {
        return ResponseEntity.ok("helooooooooo home");
    } 
}