import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { avatar: Image },
    public dialogRef: MatDialogRef<ChooseAvatarComponent>
  ){}

  closeModal(): void {
    this.dialogRef.close();
  }

}
