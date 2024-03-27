package com.cinema.cinemabookingapp;

import com.cinema.cinemabookingapp.service.MovieService;
import com.cinema.cinemabookingapp.service.SessionService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.io.IOException;

@SpringBootApplication
@Slf4j
public class CinemaBookingAppApplication {

	@Autowired
	private SessionService sessionService;

	@Autowired
	private MovieService movieService;

	public static void main(String[] args) {
		SpringApplication.run(CinemaBookingAppApplication.class, args);
	}
	@PostConstruct
	public void init() throws IOException {
		sessionService.generateSessions();
	}

}
