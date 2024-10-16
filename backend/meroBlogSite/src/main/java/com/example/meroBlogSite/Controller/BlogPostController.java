package com.example.meroBlogSite.Controller;

import com.example.meroBlogSite.Entity.BlogPost;
import com.example.meroBlogSite.Service.BlogPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
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
    //Save posts
    // URL:  http://localhost:8080/api/posts
    @PostMapping
    public ResponseEntity<BlogPost> saveBlogPost(@RequestBody BlogPost blogPost) {
        if (blogPost.getCreatedDate() == null) {
            blogPost.setCreatedDate(LocalDateTime.now());
        }
        BlogPost newbp = blogPostService.saveBlogPost(blogPost);
        System.out.println("Saved BlogPost: " + newbp);  // Log the new BlogPost
        return ResponseEntity.status(HttpStatus.CREATED).body(newbp);

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
    // URL:  http://localhost:8080/api/posts/{id}
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBlogPost(@PathVariable Long id, @RequestBody BlogPost updatedBlogPost) {
        Optional<BlogPost> existingBlogPost = blogPostService.getBlogPostById(id);

        if (existingBlogPost.isPresent()) {
            BlogPost existingPost = existingBlogPost.get();
            existingPost.setTitle(updatedBlogPost.getTitle());
            existingPost.setContent(updatedBlogPost.getContent());
            existingPost.setFullName(updatedBlogPost.getFullName());
            existingPost.setAuthorId(updatedBlogPost.getAuthorId());
            existingPost.setCreatedDate(updatedBlogPost.getCreatedDate());
            blogPostService.updateBlogPost(id, existingPost);
            return ResponseEntity.ok("BlogPost updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog post with id " + id + " not found");
        }
    }
}
