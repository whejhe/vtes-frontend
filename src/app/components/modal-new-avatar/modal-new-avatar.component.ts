import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

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

  newAvatarForm: FormGroup = new FormGroup({});
  selectedAvatar:Image | null = null;

  file?: File;
  currentUser = this.authSvc.getCurrentUser()?.name;
  currentId = this.authSvc.getCurrentUser()?._id;


  AvatarForm: FormGroup = new FormGroup({
    name: new FormControl(this.currentUser),
    id: new FormControl(this.currentId),
    image: new FormControl(),
  });

  uploadAvatar(): void {
    try{
      if (this.file) {
        this.imageSvc.uploadAvatar(this.AvatarForm.value).subscribe((image: Image) => {
          this.selectedAvatar = image;
          this.AvatarForm.patchValue({ image: image });
        });
      }
      console.log('Avatar: ',this.AvatarForm.value);
    }catch(error) {
      console.log('Error al actualizar la imagen de Avatar: ',error);
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
