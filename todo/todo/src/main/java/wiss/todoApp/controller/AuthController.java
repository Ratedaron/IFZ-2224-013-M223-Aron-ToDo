package wiss.todoApp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import wiss.todoApp.models.*;
import wiss.todoApp.request.*;
import wiss.todoApp.response.*;
import wiss.todoApp.repository.RoleRepository;
import wiss.todoApp.repository.UserRepository;
import wiss.todoApp.security.jwt.JwtUtils;
import wiss.todoApp.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth") // Base URL for all authentication-related endpoints.
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager; // Manages authentication.

  @Autowired
  UserRepository userRepository; // Repository for user data.

  @Autowired
  RoleRepository roleRepository; // Repository for role data.

  @Autowired
  PasswordEncoder encoder; // Encodes passwords.

  @Autowired
  JwtUtils jwtUtils; // Utility class for working with JWT.

  @PostMapping("/signin") // Endpoint for user login.
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    // Authenticates the user.
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    // Sets the authentication in the security context.
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication); // Generates a JWT token.

    // Retrieves user details and roles.
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    // Returns the JWT token and user details in the response.
    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         roles));
  }

  @PostMapping("/signup") // Endpoint for user registration.
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    // Checks if the username is already taken.
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    // Checks if the email is already in use.
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Creates a new user account.
    User user = new User(signUpRequest.getUsername(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword())); // Encodes the password.

    Set<String> strRoles = signUpRequest.getRole(); // Gets the roles from the request.
    Set<Role> roles = new HashSet<>();

    // Assigns roles to the new user.
    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found.")); //uses the message model to send costom message error
          roles.add(adminRole);
          break;
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);
          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles); // Sets the roles for the user.
    userRepository.save(user); // Saves the new user to the repository.

    return ResponseEntity.ok(new MessageResponse("User registered successfully!")); // Returns a success response.
  }
}
