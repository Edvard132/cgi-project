package com.cinema.cinemabookingapp.service;

import com.cinema.cinemabookingapp.dao.MovieDAO;
import com.cinema.cinemabookingapp.dao.UserDAO;
import com.cinema.cinemabookingapp.model.Movie;
import com.cinema.cinemabookingapp.model.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
public class MovieService {

    @Autowired
    private MovieDAO movieDAO;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDAO userDAO;

    public Movie getMovieById(Long id){
        return movieDAO.findById(id).orElseThrow(() -> new RuntimeException("Movie with this id does not exist."));
    }

    public Map<String, Object> getAllMovies(){
        Map<String, Object> map = new HashMap<>();
        List<Movie> movies = movieDAO.findAll();
        Map<String, Boolean> genres = new HashMap<>();

        for (Movie movie : movies) {
            List<String> movieGenres = movie.getGenres();
            for (String g : movieGenres) {
                genres.putIfAbsent(g, true);
            }
        }
        map.put("movies", movieDAO.findAll());
        map.put("genres", genres);
        return map;
    }

    public Map<String, Object> getAllMovies(String email){
        Map<String, Object> map = getAllMovies();
        User user = userDAO.findByEmail(email);
        Set<String> preferences = user.getGenrePreferences();

        map.put("preferences", preferences);

        return map;
    }

    public List<Movie> createMovies() throws IOException {

        List<Movie> movies = readMoviesFromJsonFile();

        return movieDAO.saveAll(movies);
    }


    public List<Movie> readMoviesFromJsonFile() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();

        File file = new File(Objects.requireNonNull(classLoader.getResource("movies.json")).getFile());

        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.readValue(file, new TypeReference<>() {
        });
    }
}
