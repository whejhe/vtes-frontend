//front/src/app/components/choose-avatar/choose-avatar.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { avatar: Image },
    public dialogRef: MatDialogRef<ChooseAvatarComponent>,
    public imageSvc: ImageService
  ){
  }

  avatars: Image[] = [];
  selectedAvatar: Image | null = null;

  closeModal(): void {
    this.dialogRef.close();
  }

  selectAvatar(avatar: Image): void {
    this.selectedAvatar = avatar;
  }


  saveAvatar(): void {
    if (this.selectedAvatar) {
      this.dialogRef.close(this.selectedAvatar);
    }
  }

  ngOnInit(): void {
    this.imageSvc.getJsonImages().subscribe((images)=>{
      this.avatars = images;
    })
    console.log('Avatars: ',this.avatars);
  }

}
