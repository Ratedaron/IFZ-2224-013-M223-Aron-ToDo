package wiss.todoApp.todo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import wiss.todoApp.models.*;
public class TodoApplicationTests {

    @Test
    void testGetTaskid() {
        // Create a Task object
        Task task = new Task();
        // Set taskid to 1
        task.setTaskid(1);
        // Check if getTaskid returns 1
        assertEquals(1, task.getTaskid());
    }

    @Test
    void testSetTaskid() {
        // Create a Task object
        Task task = new Task();
        // Set taskid to 1
        task.setTaskid(1);
        // Check if taskid is set correctly
        assertEquals(1, task.getTaskid());
    }

    @Test
    void testGetTaskName() {
        // Create a Task object
        Task task = new Task();
        // Set taskName
        task.setTaskName("Test Task");
        // Check if getTaskName returns "Test Task"
        assertEquals("Test Task", task.getTaskName());
    }

    @Test
    void testSetTaskName() {
        // Create a Task object
        Task task = new Task();
        // Set taskName
        task.setTaskName("Test Task");
        // Check if taskName is set correctly
        assertEquals("Test Task", task.getTaskName());
    }

    @Test
    void testGetTaskDescription() {
        // Create a Task object
        Task task = new Task();
        // Set taskDescription
        task.setTaskDescription("Test Task Description");
        // Check if getTaskDescription returns "Test Task Description"
        assertEquals("Test Task Description", task.getTaskDescription());
    }

    @Test
    void testSetTaskDescription() {
        // Create a Task object
        Task task = new Task();
        // Set taskDescription
        task.setTaskDescription("Test Task Description");
        // Check if taskDescription is set correctly
        assertEquals("Test Task Description", task.getTaskDescription());
    }
	// user tests
	
	@Test
    void testGetId() {
        // Create a User object
        User user = new User();
        // Set id to 1
        user.setId(1);
        // Check if getId returns 1
        assertEquals(1, user.getId());
    }

    @Test
    void testSetId() {
        // Create a User object
        User user = new User();
        // Set id to 1
        user.setId(1);
        // Check if id is set correctly
        assertEquals(1, user.getId());
    }

    @Test
    void testGetUsername() {
        // Create a User object
        User user = new User();
        // Set username
        user.setUsername("testUser");
        // Check if getUsername returns "testUser"
        assertEquals("testUser", user.getUsername());
    }

    @Test
    void testSetUsername() {
        // Create a User object
        User user = new User();
        // Set username
        user.setUsername("testUser");
        // Check if username is set correctly
        assertEquals("testUser", user.getUsername());
    }

    @Test
    void testGetEmail() {
        // Create a User object
        User user = new User();
        // Set email
        user.setEmail("test@example.com");
        // Check if getEmail returns "test@example.com"
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    void testSetEmail() {
        // Create a User object
        User user = new User();
        // Set email
        user.setEmail("test@example.com");
        // Check if email is set correctly
        assertEquals("test@example.com", user.getEmail());
    }

    @Test
    void testGetPassword() {
        // Create a User object
        User user = new User();
        // Set password
        user.setPassword("testPassword");
        // Check if getPassword returns "testPassword"
        assertEquals("testPassword", user.getPassword());
    }

    @Test
    void testSetPassword() {
        // Create a User object
        User user = new User();
        // Set password
        user.setPassword("testPassword");
        // Check if password is set correctly
        assertEquals("testPassword", user.getPassword());
    }
}
