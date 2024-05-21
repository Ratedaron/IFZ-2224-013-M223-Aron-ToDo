package wiss.todoApp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// imports lol
import wiss.todoApp.models.Task;
import wiss.todoApp.repository.TaskRepository;
import wiss.todoApp.security.services.TaskService;

@RestController
public class HomeController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    // get all tasks mapping , its acually really ez I learned it all in a day
    @GetMapping("/getTasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        Iterable<Task> taskItems = taskRepository.findAll();
        List<Task> tasks = new ArrayList<>();
        taskItems.forEach(tasks::add);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/addTask") // Map ONLY POST Requests
    public ResponseEntity<List<String>> addNewTask(@RequestParam String taskName, String taskDescription) {

        Task task1 = new Task();
        task1.setTaskName(taskName);
        task1.setTaskDescription(taskDescription);
        taskRepository.save(task1); // defined in CrudRepository-Interface

        //i wanted to display multible mesaages so i made an array lol
        ArrayList<String> msg = new ArrayList<>();
        msg.add(Integer.toString(task1.getTaskid()));
        msg.add(task1.getTaskName());
        msg.add(task1.getTaskDescription());

        return ResponseEntity.ok(msg);
    }
 // delete here
    @DeleteMapping("/delTask/{id}")

    public ResponseEntity<String> deleteTaskById(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task " + id + " deleted");
        // if not exists pleses make a diffrent massage appear <- i forgot why i put this here
    }

    // build update employee REST API
    @PutMapping("/uptTask/{id}")
    public ResponseEntity<String> updateTask(@PathVariable int id,
            @RequestBody Task task) {
        taskService.updateTask(id, task);
        return ResponseEntity.ok("task " + id + " has been updated");
    }
}
