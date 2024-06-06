import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dar-baja',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './dar-baja.component.html',
  styleUrl: './dar-baja.component.scss'
})
export class DarBajaComponent implements OnInit{

  darBajaForm: FormGroup = new FormGroup({
    userId: new FormControl(this.authSvc.getCurrentUser()?._id),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  userId = this.authSvc.getCurrentUser()?._id;

  rememberMe: boolean = true;

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {  },
    public dialogRef: MatDialogRef<DarBajaComponent>,
  ) { }

  closeModal() {
    this.dialogRef.close();
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

  darBaja() {
    if(this.userId){
      this.darBajaForm.get('userId')?.setValue(this.userId);
      console.log('UserId:',this.darBajaForm.get('userId')?.value)
    }
    if (this.darBajaForm.valid) {
      const userData = {
        // userId: this.userId,
        email: this.darBajaForm.get('email')?.value,
        password: this.darBajaForm.get('password')?.value,
      };

      this.authSvc.darBaja(userData, this.userId).subscribe(
        (response: any) => {
          this.showSucessMessage = true;
          this.showErrorMessage = false;
          this.message = 'Cuenta dada de baja';
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
          this.message = this.authSvc.handleRegistrationError(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }

  ngOnInit(): void {
    console.log('email',this.darBajaForm.get('email')?.value)
  }

}
