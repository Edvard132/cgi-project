package com.cinema.cinemabookingapp.dao;

import com.cinema.cinemabookingapp.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDAO extends JpaRepository<Movie, Long> {
}
