//front/src/app/pages/main/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IntroComponent } from "../../../components/intro/intro.component";


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [
        RouterModule,
        IntroComponent
    ]
})
export class InicioComponent {
  public isLoggedIn: Boolean = false;
  public decodedToken: any;
  public user: string = 'invitado';

  


  constructor(
    private authSvc: AuthService,
  ) { }

}



