import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Removed FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;  

  constructor(private formBuilder: FormBuilder, private router:  Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],  // Added Validators
      password: ['', Validators.required]
    });
  }

  login(): void {
    const user = this.loginForm.value;
    console.log(user);
    this.userService.login(user).subscribe({
      next: (user: User) => {
        if (user.id) {  
          alert('Login success');
          // Navigate to another page if necessary
        } else {
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error('Login failed', err); 
      }
    });
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }
} 
 /* 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signin',
  standalone: true, // Declare as a standalone component
  imports: [ReactiveFormsModule],  // Include ReactiveFormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const user: User = this.loginForm.value;
    this.userService.login(user).subscribe(
      response => {
        console.log('Login successful');
        alert('Login successful');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        alert('Invalid username or password');
      }
    );
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}  */