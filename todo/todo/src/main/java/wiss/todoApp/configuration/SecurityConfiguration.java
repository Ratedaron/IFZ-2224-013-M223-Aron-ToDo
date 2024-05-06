package wiss.todoApp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    @Bean
    public UserDetailsService users(@Autowired PasswordEncoder pwEnc) {
        UserDetails user = User.withUsername("user")
                .password(pwEnc.encode("user"))
                .roles("USER")
                .build();
        UserDetails admin = User.withUsername("admin")
                .password(pwEnc.encode("admin"))
                .roles("USER", "ADMIN") 
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain authenticatedAndFreePagesWithLoginRedundant(
            HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests()
                .requestMatchers("/private").hasRole("ADMIN")
                .requestMatchers("/public").permitAll()
                .requestMatchers("/home").permitAll()
                .requestMatchers("").permitAll()
    	    .and().formLogin()
	    .and().build();
    }

    
}
