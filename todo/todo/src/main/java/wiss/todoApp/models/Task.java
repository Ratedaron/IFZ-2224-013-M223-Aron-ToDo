package wiss.todoApp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Die Annotation @GeneratedValue(strategy=GenerationType.IDENTITY) wird
    // verwendet, um die automatische Generierung von Primärschlüsselwerten in einer
    // Datenbanktabelle anzugeben. In diesem Fall wird die Strategie
    // GenerationType.IDENTITY verwendet, um zu signalisieren, dass die Datenbank
    // selbst die Generierung der Primärschlüsselwerte übernehmen soll.
    // Models
    private Integer taskid;

    private String taskName;

    private String taskDescription;

    // Getters & Setters (Methoden)
    public Integer getTaskid() {
        return taskid;
    }

    public void setTaskid(Integer taskid) {
        this.taskid = taskid;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescriptionk() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
}
