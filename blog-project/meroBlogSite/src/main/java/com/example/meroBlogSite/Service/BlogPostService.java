package com.example.meroBlogSite.Service;

import com.example.meroBlogSite.Entity.BlogPost;

import java.util.List;
import java.util.Optional;

public interface BlogPostService {
    BlogPost saveBlogPost(BlogPost blogPost);
    Optional<BlogPost> getBlogPostById(Long id);
    List<BlogPost>getAllBlogPosts();
    List<BlogPost> getBlogPostsByAuthorId(Long authorId);
    boolean deleteBlogPostById(Long id);

    String deleteBlogPostByAuthorId(Long authorId);
}
