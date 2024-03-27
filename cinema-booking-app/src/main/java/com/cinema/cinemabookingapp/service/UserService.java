package com.cinema.cinemabookingapp.service;

import com.cinema.cinemabookingapp.dao.UserDAO;
import com.cinema.cinemabookingapp.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public User getUserByEmail(String email){
        return userDAO.findByEmail(email);
    }
    public User createUser(User user){
        User u = getUserByEmail(user.getEmail());

        if (Objects.isNull(u)){
            return userDAO.save(user);
        }
        else {
            return null;
        }
    }

    public boolean addPreferences(String email, List<String> preferences){
        User user = getUserByEmail(email);

        if (user == null){
            return false;
        }
        HashSet<String> pref = user.getGenrePreferences();

        HashSet<String> newSet = new HashSet<>(preferences);

        if (pref != null){
            pref.addAll(newSet);
            user.setGenrePreferences(pref);
        }
        else {
            user.setGenrePreferences(newSet);
        }
        userDAO.save(user);

        return true;
    }
}