package wiss.todoApp.security.jwt;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import wiss.todoApp.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter { // Filter that executes once per request to handle JWT authentication.

  @Autowired
  private JwtUtils jwtUtils; // Utility class for JWT operations.

  @Autowired
  private UserDetailsServiceImpl userDetailsService; // Service to load user-specific data.

  private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class); // Logger for logging information and errors.

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String jwt = parseJwt(request); // Extracts the JWT from the request.
      if (jwt != null && jwtUtils.validateJwtToken(jwt)) { // Validates the JWT.
        String username = jwtUtils.getUserNameFromJwtToken(jwt); // Retrieves the username from the JWT.

        UserDetails userDetails = userDetailsService.loadUserByUsername(username); // Loads the user details using the username.
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()); // Creates an authentication token.
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // Sets additional details.

        SecurityContextHolder.getContext().setAuthentication(authentication); // Sets the authentication in the security context.
      }
    } catch (Exception e) {
      logger.error("Cannot set user authentication: {}", e); // Logs any errors that occur during the authentication process.
    }

    filterChain.doFilter(request, response); // Continues the filter chain.
  }

  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization"); // Gets the Authorization header from the request.

    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) { // Checks if the header contains a Bearer token.
      return headerAuth.substring(7); // Extracts the JWT token from the header.
    }

    return null; // Returns null if no valid JWT is found.
  }
}
