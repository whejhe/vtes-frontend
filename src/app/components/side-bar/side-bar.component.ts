//front/src/app/components/side-bar/side-bar.component.ts
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  user: User | null = null;
  profileImage:string | null = '';

  constructor(
    private authSvc: AuthService
  ){}

  getProfileImage(){
    return `../../../assets/img/avatars/${this.authSvc.getProfileImage()}`;
  }

  getAvatar(){
    if(!this.user){
      this.profileImage = '../../../assets/img/avatars/default-avatar.png';
    }
    if(this.user){
      this.profileImage = `../../../assets/img/avatars/${this.user.profileImage}`;
    }
    return this.profileImage; 
  }

  getLoggedInUser(){
    this.user = this.authSvc.getCurrentUser();
  }

  ngOnInit() {
    this.getLoggedInUser();
    console.log('Usuario actual :',this.user);
    console.log('Avatar actual :',this.getAvatar());
  }

}
