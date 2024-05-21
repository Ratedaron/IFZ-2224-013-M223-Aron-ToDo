package wiss.todoApp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import wiss.todoApp.security.jwt.AuthEntryPointJwt;
import wiss.todoApp.security.jwt.AuthTokenFilter;
import wiss.todoApp.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
// Enables method-level security annotations. By default, it enables @Secured, @RolesAllowed, and @PreAuthorize/@PostAuthorize.
public class WebSecurityConfig { // This class configures the security settings for the application.

  @Autowired
  UserDetailsServiceImpl userDetailsService; // Custom service to load user-specific data.

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler; // Custom handler for unauthorized access attempts.

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter(); // Filter to handle JWT authentication.
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    
    authProvider.setUserDetailsService(userDetailsService); // Sets the custom user details service.
    authProvider.setPasswordEncoder(passwordEncoder()); // Sets the password encoder for authentication.

    return authProvider; // Returns the configured authentication provider.
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager(); // Retrieves the authentication manager from the configuration.
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // Configures the password encoder to use BCrypt.
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable()) // Disables CSRF protection.
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // Sets the entry point for unauthorized access.
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Configures the session management to be stateless.
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/addTask").hasAnyAuthority("ROLE_ADMIN") // Only users with ROLE_ADMIN can access /addTask.
            .requestMatchers("/home").permitAll() // Everyone can access /home.
            .requestMatchers("/myTesting").hasAnyAuthority("ROLE_ADMIN") // Only users with ROLE_ADMIN can access /myTesting.
            .requestMatchers("/delTask/*").hasAuthority("ROLE_ADMIN") // Only users with ROLE_ADMIN can delete tasks.
            .requestMatchers("/uptTask/*").hasAuthority("ROLE_ADMIN") // Only users with ROLE_ADMIN can update tasks.
            .requestMatchers("/getTasks").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER") // Everyone can access /getTasks.
            .requestMatchers("/api/auth/**").permitAll() // Everyone can access /api/auth/**.
            .requestMatchers("/api/test/**").permitAll() // Everyone can access /api/test/**.
            .anyRequest().authenticated()); // All other requests need to be authenticated.

    http.authenticationProvider(authenticationProvider()); // Adds the custom authentication provider.

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class); // Adds the JWT token filter before the username-password authentication filter.

    return http.build(); // Builds and returns the security filter chain.
  }
}
