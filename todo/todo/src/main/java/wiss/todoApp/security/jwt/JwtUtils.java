package wiss.todoApp.security.jwt;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import wiss.todoApp.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils { // Utility class for handling JWT operations.
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class); // Logger for logging information and errors.

  @Value("${bezkoder.app.jwtSecret}")
  private String jwtSecret; // Secret key for signing the JWT.

  @Value("${bezkoder.app.jwtExpirationMs}")
  private int jwtExpirationMs; // Expiration time for the JWT.

  public String generateJwtToken(Authentication authentication) {
    // Generates a JWT token based on the user authentication details.
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getUsername())) // Sets the username as the subject of the token.
        .setIssuedAt(new Date()) // Sets the current date as the issue date.
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // Sets the expiration date.
        .signWith(key(), SignatureAlgorithm.HS256) // Signs the token with the secret key using HS256 algorithm.
        .compact(); // Builds and compacts the token.
  }

  private Key key() {
    // Decodes the secret key and returns a Key object.
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    // Extracts the username (subject) from the JWT token.
    return Jwts.parserBuilder().setSigningKey(key()).build()
               .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    // Validates the JWT token.
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true; // Token is valid.
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage()); // Token is malformed.
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage()); // Token is expired.
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage()); // Token is unsupported.
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage()); // Claims string is empty.
    }

    return false; // Token is invalid.
  }
}
