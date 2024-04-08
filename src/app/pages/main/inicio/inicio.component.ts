//front/src/app/pages/main/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import textWeb from '../../../models/es/textWeb';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  public decodedToken: any;
  public user: string = 'invitado';

  public text: any = textWeb;

  constructor(
    private authSvc: AuthService,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}



