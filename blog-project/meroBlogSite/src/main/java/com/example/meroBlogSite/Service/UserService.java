package com.example.meroBlogSite.Service;

import com.example.meroBlogSite.Entity.User;
import com.example.meroBlogSite.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }


    public User saveUser(User user){

        return userRepository.save(user);
    }


    public Optional<User>getUserById(Long id){
        return userRepository.findById(id);
    }


    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

    public List<User>getAllUsers() {

        return userRepository.findAll();
    }


    public Optional<User> updateUser(Long id, User userDetails){
        return userRepository.findById(id).map(user -> {
            // Update the fields of the existing user
            user.setFullName(userDetails.getFullName());
            user.setUserName(userDetails.getUserName());
            user.setPassword(userDetails.getPassword());
            user.setEmail(userDetails.getEmail());
            user.setProfilePicture(userDetails.getProfilePicture());
            // Save the updated user
            userRepository.save(user);
            return Optional.of(user);
        }).orElse(Optional.empty());
    }



    public String deleteUser(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()){
            userRepository.deleteById(userId);
            return "User id "+ userId + "deleted successfully!";
        }
        return "User id number "+ userId+ " Not found!";
    }

    public User checkValidUser(User user){
        User validUser = userRepository.findUserByUserNameAndPassword(user.getUserName(), user.getPassword());
        if(validUser != null){
            return validUser;
        }
        return user;
    }
}
