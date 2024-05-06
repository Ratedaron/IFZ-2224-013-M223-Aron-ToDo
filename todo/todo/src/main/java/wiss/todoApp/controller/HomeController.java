package wiss.todoApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import wiss.todoApp.models.Task;
import wiss.todoApp.models.TaskRepository;

@Controller
@RequestMapping(path = "/task")
public class HomeController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/home")
    public ResponseEntity<String> getHome() {
        return ResponseEntity.ok("helooooooooo home");
    }

    @PostMapping(path = "") // Map ONLY POST Requests

    public @ResponseBody String addNewTask(@RequestParam(defaultValue = "Task1") String taskName) {

        Task task1 = new Task();
        task1.setTaskName(taskName);
        taskRepository.save(task1); // defined in CrudRepository-Interface
        return "Saved";
        // return task1.getTaskName();
    }

}