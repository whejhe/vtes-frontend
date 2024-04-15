//front/src/app/pages/main/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  public isLoggedIn: Boolean = false;
  public decodedToken: any;
  public user: string = 'invitado';


  constructor(
    private authSvc: AuthService,
  ) { }

}



