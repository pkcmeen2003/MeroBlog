package com.example.meroBlogSite.Controller;

import com.example.meroBlogSite.Entity.User;
import com.example.meroBlogSite.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register User
    // URL: http://localhost:8080/api/users/register
    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        try {
            User newUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // User Login
   // http://localhost:8080/api/users
    @PostMapping("/login")
    public ResponseEntity<?> checkValidUser(@RequestBody User user) {
        System.out.println("Checking Login....");
        User validUser = userService.checkValidUser(user);
        if (validUser != null) {
            return ResponseEntity.ok(validUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    // Get User by ID
    // URL: http://localhost:8080/api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> ur = userService.getUserById(id);
        return ur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    //Get all users
    //http://localhost:8080/api/users
    @GetMapping
    public ResponseEntity<List<User>>getAllUsers(){
        List<User>users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    //User Update
    //http://localhost:8080/api/users/8
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        Optional<User>updatedUser = userService.updateUser(id, userDetails);
        return updatedUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete User by ID
    //http://localhost:8080/api/users/8
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            userService.deleteUserById(id);
            return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID " + id + " not found.");
        }
    }
}