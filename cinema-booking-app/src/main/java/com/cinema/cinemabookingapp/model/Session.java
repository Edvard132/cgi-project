package com.cinema.cinemabookingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="sessions")
public class Session {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime startDateTime;

    @ManyToOne
    @ToString.Exclude
    private Movie movie;

    @ElementCollection
    private List<Seat> seats;

}

