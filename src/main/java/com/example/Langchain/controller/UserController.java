package com.example.Langchain.controller;

import com.example.Langchain.entity.User;
import com.example.Langchain.repository.UserRepository;
import com.example.Langchain.service.AuthResponse;
import com.example.Langchain.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")

public class UserController {
    @Autowired
    private AuthService authService;


//    private final AuthenticationManager authenticationManager;

    //check mssv va password
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User userData){
        String token  = authService.login(userData.getMssv(), userData.getPassword());
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println("Generated token: " + token); // Debugging output
        return ResponseEntity.ok(new AuthResponse(token, userData));

    }
    @GetMapping("/auto-login")
    public ResponseEntity<?> autologin(@RequestParam String token){
        System.out.println("Received token: " + token);  // Debug print
        String user = authService.getUserBySessionToken(token);
        System.out.println("User: " + user);// Debug print
        if(user!= null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @GetMapping("/home")
    public ResponseEntity<String> homePage(){
        return ResponseEntity.ok("home");
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("Logged out successfully");
    }
}
