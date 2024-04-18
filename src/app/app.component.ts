//src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        HttpClientModule,
        CommonModule,
        NavBarComponent,
        HeaderComponent,
        FormsModule,
    ],
    providers: [
      AuthService
    ],
})
export class AppComponent implements OnInit {
  title = 'App-Vtes';
  user: User | null = null;

  constructor(
    public authSvc: AuthService,
    private router: Router,
    private http: HttpClient,
    ){}

  public token = this.authSvc.getToken() || null;


  //Almacenar Usuario en localStorage
  ngOnInit() {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('Usuario actual :',this.user);
      console.log(this.token);
    }
  }

}
