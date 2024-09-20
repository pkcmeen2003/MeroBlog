import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogPost } from '../../models/BlogPost';
import { blogPostService } from '../../services/blogPost.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  articles: (BlogPost & { showFullArticle: boolean, isEditing?: boolean })[] = [];

  constructor(private blogPostService: blogPostService) {}

  ngOnInit(): void {
    this.fetchAllPosts();
  }

  fetchAllPosts(): void {
    this.blogPostService.getAllBlogPosts().subscribe(
      (data) => {
        this.articles = data.map((post) => ({
          ...post,
          showFullArticle: false,  // Ensure 'showFullArticle' is always added
          isEditing: false          // Optionally initialize 'isEditing'
        }));

        // Sort posts by 'createdDate' in descending order (latest first)
        this.articles.sort((a, b) => {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        });
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }

  toggleFullArticle(post: BlogPost & { showFullArticle: boolean }): void {
    post.showFullArticle = !post.showFullArticle;
  }

  updatePost(post: BlogPost & { isEditing?: boolean }): void {
    this.blogPostService.updateBlogPost(post).subscribe(
      (response) => {
        console.log('Post updated', response);
        post.isEditing = false;  // Exit edit mode
        this.fetchAllPosts();
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
} 