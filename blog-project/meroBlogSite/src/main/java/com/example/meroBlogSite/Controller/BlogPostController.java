package com.example.meroBlogSite.Controller;

import com.example.meroBlogSite.Entity.BlogPost;
import com.example.meroBlogSite.Service.BlogPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class BlogPostController {
    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    //Find User
    // URL:  http://localhost:8080/api/posts/id
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        Optional<BlogPost> bp = blogPostService.getBlogPostById(id);
        return bp .map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    //Creating users
    // URL:  http://localhost:8080/api/posts
    @PostMapping
    public ResponseEntity<String>createBlogPost(@RequestBody BlogPost blogPost){
        BlogPost newbp = blogPostService.saveBlogPost(blogPost);
       return ResponseEntity.status(HttpStatus.CREATED).body("Blog post details added successfully");

    }
    // URL:  http://localhost:8080/api/posts
    @GetMapping
    public ResponseEntity<List<BlogPost>>getAllBlogPosts(){
        List<BlogPost>blogPosts = blogPostService.getAllBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    // URL:  http://localhost:8080/api/posts/author/authorId
    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<BlogPost>>getBlogPostByAuthorId(@PathVariable Long authorId) {
        List<BlogPost>blogPosts = blogPostService.getBlogPostsByAuthorId(authorId);
        return ResponseEntity.ok(blogPosts);
    }
    // URL:  http://localhost:8080/api/posts/id
    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteBlogPost(@PathVariable Long id){
        boolean isDeleted= blogPostService.deleteBlogPostById(id);
        if(isDeleted){
            return ResponseEntity.ok("ID num: "+ id + " deleted successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID "+ id + " not found");
        }
    }
}
