package wiss.todoApp;

import java.util.ArrayList;
import wiss.todoApp.configuration.CorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
// most importand file in backend!!!!

@SpringBootApplication
@Import(CorsConfig.class)
public class TodoApplication {

	public ArrayList<String> tasks = new ArrayList<>(); // new item

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	// from here all new items
	// for memory
	@GetMapping("/")
	public String index() {
		return "Spring Boot Category REST API!";
	}

	@GetMapping("/tasks")
	public @ResponseBody Iterable<String> tasks() {
		return tasks;
	}

	@PostMapping("/task")
	public String addTask(@RequestParam String tasksName) {
		tasks.add(tasksName);
		return "saved";
	}

	@DeleteMapping("/task")
	public String deleteItem(@RequestParam String taskName) {
		return String.valueOf(tasks.remove(taskName));
	}

}
