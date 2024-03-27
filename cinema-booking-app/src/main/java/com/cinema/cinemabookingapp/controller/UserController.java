package com.cinema.cinemabookingapp.controller;

import com.cinema.cinemabookingapp.model.User;
import com.cinema.cinemabookingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User userData){
        User user = userService.getUserByEmail(userData.getEmail());

        if (!Objects.isNull(user)){
            if (user.getPassword().equals(userData.getPassword())){
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Invalid user email or password", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User userData){
        User user = userService.createUser(userData);

        if (!Objects.isNull(user)){
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("Email already taken", HttpStatus.CONFLICT);
        }
    }

}
