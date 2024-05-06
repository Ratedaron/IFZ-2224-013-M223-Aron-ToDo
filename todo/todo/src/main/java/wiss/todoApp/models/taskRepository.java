package wiss.todoApp.models;
import org.springframework.data.repository.CrudRepository;


public interface taskRepository extends CrudRepository<Task, Integer> {
    // Hier können bei Bedarf benutzerdefinierte Methoden hinzugefügt werden
}
