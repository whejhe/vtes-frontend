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
import { MatDialog } from '@angular/material/dialog';
import { ChooseAvatarComponent } from '../choose-avatar/choose-avatar.component';
import { ModalNewAvatarComponent } from '../modal-new-avatar/modal-new-avatar.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  apiUrl = environment.apiUrl || 'https://localhost';
  public avatarImage:Image | null = null;
  // user: any | null = null;
  user: User | null = null;
  public defaultImage = `${this.apiUrl}/uploads/avatars/default-avatar.png`;
  selectedAvatar:Image | null = null;


  constructor(
    private authSvc: AuthService,
    private imageSvc: ImageService,
    private router: Router,
    public dialog: MatDialog
  ){
    this.user = this.authSvc.getCurrentUser();
  }

  logout(){
    this.authSvc.logoutUser();
    window.location.reload();
  }

  login(){
    this.router.navigateByUrl('/auth');
  }

  getProfileImage(){
    return this.imageSvc.getAvatarByName(this.user?.profileImage!);
  }


  getLoggedInUser(){
    this.user = this.authSvc.getCurrentUser();
  }

  openModal():void{
    this.dialog.open(ModalNewAvatarComponent, {
      data: {avatar: this.selectedAvatar },
    }).afterClosed().subscribe((avatar: Image | null) => {
      this.selectedAvatar = avatar;
    });
  }

  ngOnInit() {
    this.getLoggedInUser();
  }

}
