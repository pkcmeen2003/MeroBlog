import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Import UserService


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  // Inject FormBuilder, Router, and UserService in the constructor
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['']
    });
  }

  // Handle form submission
  signUp(): void {
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value;
      this.userService.signUp(user).subscribe(
        (response) => {
          console.log('User registered successfully');
          alert('User registered successfully');
          this.router.navigate(['/login']); // Navigate to login page
        },
        (error) => {
          console.error('Registration error:', error);
          alert('Registration failed');
        }
      );
    }
  }

  // Navigate to the login page
  navigateToLogin(): void {
    this.router.navigate(['/login']); // Navigate to login page
  }
}