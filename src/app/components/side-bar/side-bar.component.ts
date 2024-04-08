import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  user: User | null = null;

  constructor(){}

  getAvatar(){
    return this.user?.profileImage
  }

  ngOnInit() {}

}
