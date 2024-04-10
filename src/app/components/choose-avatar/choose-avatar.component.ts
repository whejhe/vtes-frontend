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
    // this.loadAvatars();
  }

  avatars: Image[] = [];

  closeModal(): void {
    this.dialogRef.close();
  }

  // loadAvatars(){
  //   this.imageSvc.getAvatars().subscribe((avatars)=>{
  //     this.avatars = avatars;
  //   })
  // }

  ngOnInit(): void {
    // this.loadAvatars();
    this.imageSvc.getJsonImages().subscribe((images)=>{
      this.avatars = images;
    })
    console.log('Avatars: ',this.avatars);
  }

}
