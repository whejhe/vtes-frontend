//front/src/app/components/side-bar/side-bar.component.ts
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  public avatarImage:Image | null = null;
  user: any | null = null;

  constructor(
    private authSvc: AuthService,
    private imageSvc: ImageService,
    private router: Router,
  ){
    this.user = this.authSvc.getCurrentUser();
    console.log(this.user)
    // this.getAvatarImage();
  }

  // getAvatarImage(){
  //   const userId = this.user?._id;
  //   this,this.imageSvc.getImagesByUserId(userId).subscribe((images){
  //     this.avatarImage? = images.find((image)=>{
  //       image.type === 'avatars'
  //     });
  //   })
  // }

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
    console.log('Usuario actual :',this.user);
  }

}
