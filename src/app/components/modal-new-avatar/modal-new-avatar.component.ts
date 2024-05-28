import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-new-avatar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-new-avatar.component.html',
  styleUrl: './modal-new-avatar.component.scss'
})
export class ModalNewAvatarComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalNewAvatarComponent>,
    public imageSvc: ImageService
  ){}

  public image!: Image;

  newAvatarForm: FormGroup = new FormGroup({});
  selectedAvatar:Image | null = null;

  closeModal(): void {
    this.dialogRef.close();
  }

  uploadAvatar() {
    if(this.newAvatarForm.valid){
      const avatarData = {
        profileImage: this.selectedAvatar?.name! + this.selectedAvatar?.extension!
      }
    };
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedAvatar = {
        _id: 'some_id',
        type: 'some_type',
        imageUrl: 'some_url',
        public: true,
        name: file.name,
        extension: file.type,
      };
    };
  }

}
