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

  constructor(
    private formBuilder: FormBuilder, 
    private router:  Router, 
    private userService: UserService) {}

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
          // Navigate to the home page
          this.router.navigate(['/home'])
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
