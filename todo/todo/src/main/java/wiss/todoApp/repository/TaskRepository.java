package wiss.todoApp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import wiss.todoApp.models.Task;
// dies verbindet und hilft mit der verbindung mit db
@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
    // Hier können bei Bedarf benutzerdefinierte Methoden hinzugefügt werden
    void deleteByTaskid(int taskId);
}
