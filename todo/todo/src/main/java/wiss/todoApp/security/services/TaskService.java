package wiss.todoApp.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import wiss.todoApp.repository.TaskRepository;
import wiss.todoApp.models.Task;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional
    public void deleteTask(int taskId) {
        taskRepository.deleteByTaskid(taskId);
    }

    
    public void updateTask(int id, Task newTask) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTaskName(newTask.getTaskName());
        task.setTaskDescription(newTask.getTaskDescription()); //dont get why you use the getters here lol
        taskRepository.save(task);
    }
}