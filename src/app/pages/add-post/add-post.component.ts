import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  // Add ReactiveFormsModule
import { Router, RouterModule } from '@angular/router';
import { blogPostService } from '../../services/blogPost.service';
import { BlogPost } from '../../models/BlogPost';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],  // Add ReactiveFormsModule here
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
onAddPost() {
throw new Error('Method not implemented.');
}
  addPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogPostService: blogPostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      id: [0],
      picture: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      createdDate: [new Date()],
      authorId: [0, Validators.required],
      fullName: ['', Validators.required]
    });
  }

  // Store the image as a data URL
  imageSrc: string | ArrayBuffer | null = null;

  // Function to handle image upload
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;  // Convert file to base64 and store in imageSrc
      };
      reader.readAsDataURL(input.files[0]);  // Read the uploaded file as a Data URL
    }
  }
  onSubmit(): void {
    if (this.addPostForm.valid) {
      const newPost: BlogPost = this.addPostForm.value;
  
      this.blogPostService.saveBlogPost(newPost).subscribe({
        next: (response: BlogPost) => {
          console.log('Backend Response:', response);  // Log the response for debugging
          if (response && response.id) {
            alert('Post added successfully!');
            this.router.navigate(['/home']); // this will navigate the page to home
          } else {
            alert('Failed to add post.');  // This should ideally not be reached if the post is saved correctly
          }
        },
        error: (err) => {
          console.error('Error adding post:', err);
          alert('Failed to add post.');
        }
      });
    }
  }
}