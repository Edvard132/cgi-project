package com.cinema.cinemabookingapp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Seat {

    private Integer seatNumber;

    private Integer rowNumber;

    private Boolean occupied;

}

