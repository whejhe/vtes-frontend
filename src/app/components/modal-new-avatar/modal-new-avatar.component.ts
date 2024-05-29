import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-modal-new-avatar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-new-avatar.component.html',
  styleUrl: './modal-new-avatar.component.scss'
})
export class ModalNewAvatarComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ModalNewAvatarComponent>,
    public imageSvc: ImageService,
    public authSvc: AuthService
  ){}

  public image!: Image;
  file!: File;
  userId = this.authSvc.getCurrentUser()?._id;;

  apiUrl = environment.apiUrl || 'https://localhost';

  uploadAvatar() {
    try{
      if(this.userId){
        this.imageSvc.uploadAvatar(this.userId, this.file).subscribe(
          (response) => {
            console.log('Avatar uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading avatar:', error);
          }
        );
      }
    }catch(error){
      console.log('Error uploading avatar:', error);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  getCurrentUser(): User | null {
    return this.authSvc.getCurrentUser();
  }
  
  ngOnInit(): void {
    this.authSvc.getCurrentUser();
    console.log('CurrentUser en modal-new-avatar: ',this.authSvc.getCurrentUser());
  }
}
