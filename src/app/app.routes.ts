import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    // Default route for Login
    { path: 'login', component: LoginComponent },
    
    // Route for Signup
    { path: 'signup', component: SignupComponent },

    // Redirect to '/signin' if no other route matches
    { path: '', redirectTo: '/login', pathMatch: 'full' },  

    // Wildcard route for unknown paths
    { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }