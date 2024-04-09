// front/src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  rememberMe: boolean = true;

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';

  constructor(
    private authSvc: AuthService,
    private router:Router
  ){}

  login(){
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authSvc.loginUser(userData).subscribe(
      (response: any) => {
        console.log('response', response);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log('error', error);
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.errorMesage = this.authSvc.handleRegistrationError(error);
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }
}
