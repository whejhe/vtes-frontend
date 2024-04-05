//front/src/app/pages/main/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  public isLoggedIn: Boolean = false;

  constructor() { }
  // token: String | null = localStorage.getItem('token');

  // isLoggedIn = this.token === null ? false : true;
  // decodedToken = JSON.parse(window.atob(this.token!.split('.')[1]));
  // id = this.decodedToken._id;

  ngOnInit(): void {
  }
}
