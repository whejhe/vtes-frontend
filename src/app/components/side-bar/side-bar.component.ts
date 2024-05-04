//front/src/app/components/side-bar/side-bar.component.ts
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  apiUrl = environment.apiUrl || 'http://localhost:3000';
  public avatarImage:Image | null = null;
  user: any | null = null;
  // public defaultImage = "http://localhost:3000/vtes-backend/uploads/avatars/default-avatar.png";
  public defaultImage = `${this.apiUrl}/vtes-backend/uploads/avatars/default-avatar.png`;

  constructor(
    private authSvc: AuthService,
    private imageSvc: ImageService,
    private router: Router,
  ){
    this.user = this.authSvc.getCurrentUser();
    // console.log(this.user)
    // this.getAvatarImage();
  }

  logout(){
    this.authSvc.logoutUser();
    window.location.reload();
  }

  login(){
    this.router.navigateByUrl('/auth');
  }

  getProfileImage(){
    return this.imageSvc.getAvatarByName(this.user?.image!);
  }

  getLoggedInUser(){
    this.user = this.authSvc.getCurrentUser();
  }

  ngOnInit() {
    this.getLoggedInUser();
    // console.log('Usuario actual :',this.user);
  }

}
