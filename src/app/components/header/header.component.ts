import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [SideBarComponent]
})
export class HeaderComponent {
  constructor(
    private authSvc: AuthService
  ) {
  }

  user!: User;

  //Almacenar Usuario en localStorage
  ngOnInit() {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('Usuario actual :',this.user);
    }
  }

}
