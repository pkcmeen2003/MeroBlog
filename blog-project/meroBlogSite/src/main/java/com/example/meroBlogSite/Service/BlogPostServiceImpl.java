package com.example.meroBlogSite.Service;

import com.example.meroBlogSite.Entity.BlogPost;
import com.example.meroBlogSite.Repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogPostServiceImpl implements BlogPostService{

    private final BlogPostRepository blogPostRepository;

    public BlogPostServiceImpl(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @Override
    public BlogPost saveBlogPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    @Override
    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPostRepository.findById(id);
    }

    @Override
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    @Override
    public List<BlogPost> getBlogPostsByAuthorId(Long authorId) {
        return blogPostRepository.findByAuthorId(authorId);
    }

    @Override
    public boolean deleteBlogPostById(Long id) {
        Optional<BlogPost>blogPostOptional = blogPostRepository.findById(id);
        if (blogPostOptional.isPresent()){
            blogPostRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public String deleteBlogPostByAuthorId(Long authorId) {
        Optional<BlogPost> blogPostOptional = blogPostRepository.findById(authorId);
        if (blogPostOptional.isEmpty()){
            blogPostRepository.deleteById(authorId);
            return "blog post id"+ authorId + "deleted successfully";
        }
    return "Blogger with id"+ authorId + "is not found";
    }
}
