import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts = [
    {
      title: 'Welcome to My Blog',
      summary: 'This is the first post on my blog. Stay tuned for more!',
      author: 'John Doe',
      date: 'September 10, 2024'
    },
    {
      title: 'Understanding Angular Basics',
      summary: 'Angular is a powerful framework for building single-page applications.',
      author: 'Jane Smith',
      date: 'September 5, 2024'
    },
    {
      title: 'Building Your First Application with Angular',
      summary: 'Let’s walk through the steps to build your first Angular application.',
      author: 'John Doe',
      date: 'August 30, 2024'
    }
  ];
categories: any;

  ngOnInit(): void {
    // Initialization logic for the home page
  }
}