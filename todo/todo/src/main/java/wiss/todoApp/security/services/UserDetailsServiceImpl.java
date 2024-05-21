package wiss.todoApp.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import wiss.todoApp.models.User;
import wiss.todoApp.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService { // Implementation of UserDetailsService for loading user-specific data.
  @Autowired
  UserRepository userRepository; // Repository to interact with the User data source.

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // Loads a user based on the username.
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username)); // Throws exception if user is not found.

    return UserDetailsImpl.build(user); // Builds and returns a UserDetailsImpl object based on the user.
  }
}
