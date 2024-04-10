//front/src/app/pages/auth/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../models/image.model';
import { ImageService } from '../../../services/image.service';
import { ChooseAvatarComponent } from '../../../components/choose-avatar/choose-avatar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public image!: Image[];

  name: string = '';
  nick: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';

  constructor(
    private authSvc: AuthService,
    private router:Router,
    private imageSvc: ImageService,
    public dialog: MatDialog
    ) {}

  getImages(){
  }

  register() {
    const userData = {
      name: this.name,
      nick: this.nick,
      email: this.email,
      password: this.password,
      role: 'USER',
      image: this.image
    };

    this.authSvc.registerUser(userData).subscribe(
      (response: any) => {
        console.log('response', response);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
        this.router.navigate(['/auth']);
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

  openModal():void{
    this.dialog.open(ChooseAvatarComponent, {
      data: { },
    })
  }


  ngOnInit(): void {
    console.log('this.image', this.image);
  }

}
