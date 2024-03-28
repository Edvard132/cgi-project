package com.cinema.cinemabookingapp.controller;

import com.cinema.cinemabookingapp.model.Movie;
import com.cinema.cinemabookingapp.model.User;
import com.cinema.cinemabookingapp.service.MovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/getMovie/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id){
        Movie movie = movieService.getMovieById(id);

        return ResponseEntity.ok(movie);
    }

    @GetMapping("/getAllMovies")
    public ResponseEntity<Map<String, Object>> getAllMovies(@RequestParam(value = "userEmail", required = false) String email){
        if (email != null) {
            Map<String, Object> userMovies = movieService.getAllMovies(email);

            if (userMovies != null){
                return ResponseEntity.ok(userMovies);
            }
            return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.CONFLICT);
        } else {
            return ResponseEntity.ok(movieService.getAllMovies());
        }
    }

}
