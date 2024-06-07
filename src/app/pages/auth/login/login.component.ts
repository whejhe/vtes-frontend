// front/src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // email: string = '';
  // password: string = '';
  rememberMe: boolean = true;

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authSvc.loginUser(userData).subscribe(
        (response: any) => {

          this.showSucessMessage = true;
          this.showErrorMessage = false;
          this.message = 'Login exitoso';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        },
        (error: any) => {

          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = this.authSvc.loginError(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }


changeVisibilityPassword() {
  try{
    const input = document.querySelector(".input__field");
    const inputIcon = document.querySelector(".input__icon");

    if(input?.getAttribute("type") == "password"){
      input.setAttribute("type", "text");
      inputIcon?.setAttribute("src", "assets/img/eye.svg");
    }else{
      input?.setAttribute("type", "password");
      inputIcon?.setAttribute("src", "assets/img/eye-off.svg");
    }

  }catch(error){

  }
}

}
