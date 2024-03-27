package com.cinema.cinemabookingapp.dao;

import com.cinema.cinemabookingapp.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionDAO extends JpaRepository<Session, Long > {

    @Query("SELECT s FROM Session s WHERE s.movie.id = :movieId")
    List<Session> findAllByMovieId(Long movieId);
}
