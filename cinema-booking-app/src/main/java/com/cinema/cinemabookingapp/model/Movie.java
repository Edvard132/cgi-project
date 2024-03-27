package com.cinema.cinemabookingapp.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private List<String> genres;

    @Column
    private Integer fromAge;

    @Column
    private Integer duration;

    @Column
    private String posterLink;

    @Column
    private String trailerLink;

    @Column
    private Double score;


}
