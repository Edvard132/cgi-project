package com.cinema.cinemabookingapp.service;


import com.cinema.cinemabookingapp.model.Seat;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SeatService {

    public List<Seat> createSeats(){
        List<Seat> seats = new ArrayList<>();
        Random isOccupied = new Random();
        for (int i = 1; i < 6; i++) {
            for (int j = 1; j < 11; j++) {
                Seat seat = new Seat();

                seat.setSeatNumber(j);
                seat.setRowNumber(i);
                seat.setOccupied(isOccupied.nextBoolean());

                seats.add(seat);
            }
        }
        return seats;
    }

}
