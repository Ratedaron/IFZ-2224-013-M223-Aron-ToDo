package wiss.todoApp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import wiss.todoApp.models.Task;
import wiss.todoApp.repository.TaskRepository;
import wiss.todoApp.security.services.TaskService;

@RestController
public class HomeController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    @GetMapping("/home")
    public ResponseEntity<String> getHome() {
        return ResponseEntity.ok("helooooooooo home");
    }

    @PostMapping("/addTask") // Map ONLY POST Requests
    public ResponseEntity<List<String>> addNewTask(@RequestParam String taskName) {

        Task task1 = new Task();
        task1.setTaskName(taskName);
        taskRepository.save(task1); // defined in CrudRepository-Interface

        ArrayList<String> msg = new ArrayList<>();
        msg.add(Integer.toString(task1.getTaskid()));
        msg.add(task1.getTaskName());

        return ResponseEntity.ok(msg);
    }

    @DeleteMapping("/delTask/{id}")

    public ResponseEntity<String> deleteTaskById(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task " + id + " deleted");
        // if not exists pleses make a diffrent massage appear
    }
}
