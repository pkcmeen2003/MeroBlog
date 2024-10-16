package com.example.meroBlogSite.Repository;

import com.example.meroBlogSite.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

   public User findUserByUserNameAndPassword(String userName, String password);
}
