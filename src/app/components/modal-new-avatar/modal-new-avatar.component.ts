import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.development';
import { ChooseAvatarComponent } from '../choose-avatar/choose-avatar.component';

@Component({
  selector: 'app-modal-new-avatar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './modal-new-avatar.component.html',
  styleUrl: './modal-new-avatar.component.scss'
})
export class ModalNewAvatarComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { avatar: Image },
    public dialogRef: MatDialogRef<ChooseAvatarComponent>,
    public imageSvc: ImageService,
    public authSvc: AuthService,
    public dialog: MatDialog
  ){}

  public apiUrl = environment.apiUrl || 'https://localhost'
  public avatarUrl = `${this.apiUrl}/uploads/avatars/`;
  selectedAvatar:Image | null = null;
  avatars: Image[] = [];
  // public image!: Image;
  file!: File;
  userId = this.authSvc.getCurrentUser()?._id;;


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

  selectAvatar(avatar: Image): void {
    this.selectedAvatar = avatar;
    // this.avatars.userId = this.authSvc.getCurrentUser()?._id
    console.log("SelectedAvatar",this.selectedAvatar);
  }

  openModal():void{
    this.dialog.open(ChooseAvatarComponent, {
      data: {avatar: this.selectedAvatar },
    }).afterClosed().subscribe((avatar: Image | null) => {
      this.selectedAvatar = avatar;
    });
  }

  saveAvatar(): void {
    if (this.selectedAvatar) {
      this.dialogRef.close(this.selectedAvatar);
    }
    console.log("SelectedAvatar",this.selectedAvatar);
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
    this.imageSvc.getJsonImages().subscribe((images)=>{
      this.avatars = images;
    })
    console.log('Avatars: ',this.avatars);
    console.log('CurrentUser en modal-new-avatar: ',this.authSvc.getCurrentUser());
  }
}
