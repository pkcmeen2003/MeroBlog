import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/BlogPost';


@Injectable({
  providedIn: 'root'
})
export class blogPostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  // Fetch all blog posts
  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  // Fetch a single blog post by ID
  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  // Fetch blog posts by author ID
  getBlogPostsByAuthorId(authorId: number): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/author/${authorId}`);
  }

  // Save a new blog post
  saveBlogPost(blogPost: BlogPost): Observable<string> {
    return this.http.post<string>(this.apiUrl, blogPost);
  }

  // Delete a blog post by ID
  deleteBlogPost(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
