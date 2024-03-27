package com.cinema.cinemabookingapp.service;

import com.cinema.cinemabookingapp.dao.MovieDAO;
import com.cinema.cinemabookingapp.dao.SessionDAO;
import com.cinema.cinemabookingapp.model.Movie;
import com.cinema.cinemabookingapp.model.Seat;
import com.cinema.cinemabookingapp.model.Session;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SessionService {

    @Autowired
    private SessionDAO sessionDAO;

    @Autowired
    private MovieService movieService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private MovieDAO movieDAO;

    @Autowired
    private UserService userService;


    public Session getSessionById(Long id) {
        return sessionDAO.findById(id).orElseThrow(() -> new RuntimeException("Session with this id does not exist."));
    }

    public Map<String, Object> bookSessionSeats(Long sessionId, List<Integer> seatIds, String email){
        Session session = getSessionById(sessionId);
        List<Seat> seats = session.getSeats();

        List<String> responseSeats = new ArrayList<>();
        for (int i = 0; i < seats.size(); i++) {
            Seat seat = seats.get(i);
            if (seatIds.contains(i)) {
                seat.setOccupied(true);
                responseSeats.add(seat.getRowNumber() + "-" + seat.getSeatNumber());
            }
        }
        if (!userService.addPreferences(email, session.getMovie().getGenres())){
            return null;
        };
        sessionDAO.save(session);

        Map<String, Object> response = new HashMap<>();
        response.put("title", session.getMovie().getTitle());
        response.put("seats", responseSeats);
        response.put("start", session.getStartDateTime());
        return response;
    }

    public void generateSessions() throws IOException {
        List<Movie> movies = movieService.createMovies();
        log.info("Movies: {}", movieDAO.findAll());

        List<LocalDateTime> sessionsStartTimes = generateSessionStartTimes(LocalDateTime.now());

        int movieId = 0;
        for (LocalDateTime sessionsStartTime : sessionsStartTimes) {
            if (movieId > 9) {
                movieId = 0;
            }
            Session session = new Session();

            session.setMovie(movies.get(movieId++));
            session.setStartDateTime(sessionsStartTime);

            session.setSeats(seatService.createSeats());
            sessionDAO.save(session);

        }
    }

    public List<Session> getAllSessions() {

        return sessionDAO.findAll();
    }

    public List<Session> getSessionsByMovieId(Long movieId){
        return sessionDAO.findAllByMovieId(movieId);
    }

    private static List<LocalDateTime> generateSessionStartTimes(LocalDateTime today) {

        List<LocalDateTime> times = new ArrayList<>();

        LocalDateTime ninePM = today.with(LocalTime.of(21, 0));

        if (today.plusHours(1).isAfter(ninePM)) {
            return generateTimesForWeek(today, true, times);

        } else {
            return generateTimesForWeek(today.plusHours(1), false, times);
        }
    }

    private static List<LocalDateTime> generateTimesForWeek(LocalDateTime today, boolean sinceTomorrow, List<LocalDateTime> times) {
        if (sinceTomorrow) {
            today = today.plusDays(1);
            for (int i = 0; i < 7; i++) {
                times.add(today.with(LocalTime.of(13, 0)));
                times.add(today.with(LocalTime.of(14, 0)));
                times.add(today.with(LocalTime.of(15, 0)));
                times.add(today.with(LocalTime.of(16, 0)));
                times.add(today.with(LocalTime.of(17, 0)));
                times.add(today.with(LocalTime.of(18, 0)));
                times.add(today.with(LocalTime.of(19, 0)));
                times.add(today.with(LocalTime.of(20, 0)));
                times.add(today.with(LocalTime.of(21, 0)));
                today = today.plusDays(1);
            }
        } else {
            today = today.withMinute(0).withSecond(0).withNano(0);
            int sessionToday = 21 - today.getHour();
            times.add(today);

            for (int i = 0; i < sessionToday; i++) {
                today = today.plusHours(1);
                times.add(today);
            }

            today = today.plusDays(1);
            for (int i = 0; i < 6; i++) {
                times.add(today.with(LocalTime.of(13, 0)));
                times.add(today.with(LocalTime.of(14, 0)));
                times.add(today.with(LocalTime.of(15, 0)));
                times.add(today.with(LocalTime.of(16, 0)));
                times.add(today.with(LocalTime.of(17, 0)));
                times.add(today.with(LocalTime.of(18, 0)));
                times.add(today.with(LocalTime.of(19, 0)));
                times.add(today.with(LocalTime.of(20, 0)));
                times.add(today.with(LocalTime.of(21, 0)));
                today = today.plusDays(1);
            }
        }
        return times;
    }
}
