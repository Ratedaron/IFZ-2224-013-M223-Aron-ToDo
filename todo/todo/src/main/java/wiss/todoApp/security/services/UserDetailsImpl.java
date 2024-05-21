package wiss.todoApp.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import wiss.todoApp.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails { // Implementation of UserDetails interface for Spring Security.
  private static final long serialVersionUID = 1L; // Serial version UID for Serializable interface.

  private Integer id; // User ID.

  private String username; // Username of the user.

  private String email; // Email of the user.

  @JsonIgnore
  private String password; // Password of the user, annotated to be ignored in JSON serialization.

  private Collection<? extends GrantedAuthority> authorities; // Authorities granted to the user.

  public UserDetailsImpl(Integer id, String username, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    // Constructor to initialize UserDetailsImpl object.
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(User user) {
    // Static method to build UserDetailsImpl object from a User object.
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList()); // Converts roles to GrantedAuthority.

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    // Returns the authorities granted to the user.
    return authorities;
  }

  public Integer getId() {
    return id; // Returns the user ID.
  }

  public String getEmail() {
    return email; // Returns the user email.
  }

  @Override
  public String getPassword() {
    return password; // Returns the user password.
  }

  @Override
  public String getUsername() {
    return username; // Returns the username.
  }

  @Override
  public boolean isAccountNonExpired() {
    return true; // Indicates if the account is non-expired.
  }

  @Override
  public boolean isAccountNonLocked() {
    return true; // Indicates if the account is non-locked.
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true; // Indicates if the credentials are non-expired.
  }

  @Override
  public boolean isEnabled() {
    return true; // Indicates if the user is enabled.
  }

  @Override
  public boolean equals(Object o) {
    // Compares the current object with another object.
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id); // Compares user IDs.
  }
}
