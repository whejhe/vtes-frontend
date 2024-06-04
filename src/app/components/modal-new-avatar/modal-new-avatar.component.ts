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
export class ModalNewAvatarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { avatar: Image },
    public dialogRef: MatDialogRef<ChooseAvatarComponent>,
    public imageSvc: ImageService,
    public authSvc: AuthService,
    public dialog: MatDialog
  ) { }

  public apiUrl = environment.apiUrl || 'https://localhost'
  public avatarUrl = `${this.apiUrl}/uploads/avatars/`;
  selectedAvatar: Image | null = null;
  avatars: Image[] = [];
  userId = this.authSvc.getCurrentUser()?._id;
  profileImage?: string = '';


  openModal(): void {
    this.dialog.open(ChooseAvatarComponent, {
      data: { avatar: this.selectedAvatar },
    }).afterClosed().subscribe((avatar: Image | null) => {
      this.selectedAvatar = avatar;
    });
  }

  newAvatar(): void {
    this.profileImage = this.selectedAvatar?.name + this.selectedAvatar!.extension;
    
    if (this.profileImage) {
      this.authSvc.newAvatar(this.userId || '', this.profileImage).subscribe(
        response => {
          
          window.location.reload();
          this.closeModal();
        },
        error => {
          console.error('Error al actualizar el avatar', error);
        }
      );
    }
  }


  closeModal(): void {
    this.dialogRef.close();
  }


  getCurrentUser(): User | null {
    return this.authSvc.getCurrentUser();
  }

  ngOnInit(): void {
    this.authSvc.getCurrentUser();
    this.imageSvc.getJsonImages().subscribe((images) => {
      this.avatars = images;
    })
    // 
    // 
  }
}
