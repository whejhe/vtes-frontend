//front/src/app/components/side-bar/side-bar.component.ts
import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { Observable } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  public avatarImage:Image | null = null;
  user: User | null = null;

  constructor(
    private authSvc: AuthService,
    private imageSvc: ImageService
  ){
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

  getProfileImage(){
    this.imageSvc.getImageByName('Avatar-1');
  }

  getLoggedInUser(){
    this.user = this.authSvc.getCurrentUser();
  }

  ngOnInit() {
    this.getLoggedInUser();
    console.log('Usuario actual :',this.user);
  }

}
