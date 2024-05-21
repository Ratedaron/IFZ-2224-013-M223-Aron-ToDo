package wiss.todoApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller // @Controller wird automatisch aufgerufn und man bracuh es noicht manuel mit
// TOTO apllikation verbinfen
public class PublicController {
// public controler for pabluc ciontent
    @GetMapping("/public")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok("Public content");
    }

}
