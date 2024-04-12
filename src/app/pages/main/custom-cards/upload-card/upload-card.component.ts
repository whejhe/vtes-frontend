import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-upload-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './upload-card.component.html',
  styleUrl: './upload-card.component.scss'
})
export class UploadCardComponent implements OnInit {

  constructor(
    public authSvc: AuthService) {}

  user:User[] = []

  getCurrentUser(): User | null {
    return this.authSvc.getCurrentUser();
  }


  ngOnInit(): void {
    this.getCurrentUser();
  }
}
