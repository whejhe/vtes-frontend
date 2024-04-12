import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FichaDeckComponent } from '../../pages/main/deck/ficha-deck/ficha-deck.component';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
      SideBarComponent,
      FichaDeckComponent
    ]
})
export class HeaderComponent {
fichaDeckComponent: any;
  constructor(
    private authSvc: AuthService,
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
