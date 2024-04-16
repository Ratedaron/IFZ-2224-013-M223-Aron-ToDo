package wiss.todoApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // @Controller wird automatisch aufgerufn und man bracuh es noicht manuel mit
// TOTO apllikation verbinfen
public class PublicController {

    @RequestMapping("/public")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok("Public content");
    }

}
