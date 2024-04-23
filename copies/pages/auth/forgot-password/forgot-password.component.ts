import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  password: string = '';

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';
  successMessage: string = '';

  constructor(
    private authSvc: AuthService,
    private router:Router
  ){}

  forgotPassword() {
    this.authSvc.forgotPassword(this.email).subscribe(
      (response) => {
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.successMessage = response.message;
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
      },
      (error) => {
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.errorMesage = error.error.error;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }


}
