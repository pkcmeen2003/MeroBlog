package com.example.meroBlogSite.Repository;

import com.example.meroBlogSite.Entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost>findByAuthorId(Long authorId);

}
