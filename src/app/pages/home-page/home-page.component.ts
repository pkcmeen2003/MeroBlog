import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogPost } from '../../models/BlogPost';
import { blogPostService } from '../../services/blogPost.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  articles: (BlogPost & { showFullArticle: boolean })[] = [];  // Ensure 'showFullArticle' is required

  constructor(private blogPostService: blogPostService) {}

  ngOnInit(): void {
    this.fetchAllPosts();
  }
  fetchAllPosts(): void {
    this.blogPostService.getAllBlogPosts().subscribe(
      (data) => {
        this.articles = data.map((post) => ({
          ...post,
          showFullArticle: false // Ensure 'showFullArticle' is always added
        }));
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }

  toggleFullArticle(post: BlogPost & { showFullArticle: boolean }): void {
    post.showFullArticle = !post.showFullArticle;
  }
}