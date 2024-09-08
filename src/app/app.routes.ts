import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent }, 
    { path: 'signup', component: SignupComponent }, // Route for Signup 
    { path: 'home', component: HomePageComponent }, //Redirect to home page. 
    { path: '', redirectTo: '/login', pathMatch: 'full' },   // Redirect to '/signin' if no other route matches
    { path: '**', redirectTo: '/login' }
    
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }