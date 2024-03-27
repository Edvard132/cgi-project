package com.cinema.cinemabookingapp.controller;

import com.cinema.cinemabookingapp.model.Session;
import com.cinema.cinemabookingapp.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @GetMapping("/getSession/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Session session = sessionService.getSessionById(id);

        return ResponseEntity.ok(session);
    }

    @GetMapping("/getAllSessions")
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();

        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @GetMapping("/getSessionsByMovieId/{movieId}")
    public ResponseEntity<List<Session>> getAllSessionsByMovieId(@PathVariable Long movieId) {
        List<Session> sessions = sessionService.getSessionsByMovieId(movieId);

        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @PostMapping("/bookSeats/{sessionId}")
    public ResponseEntity<Map<String, Object>> bookSessionSeats(@PathVariable Long sessionId, @RequestBody Map<String, List<Integer>> requestMap, @RequestParam(value = "email") String email) {
        Map<String, Object> resp = sessionService.bookSessionSeats(sessionId, requestMap.get("seatIds"), email);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
}
