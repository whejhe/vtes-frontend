//src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { AuthService } from './services/auth.service';

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
        FooterComponent,
        FormComponent,
        FormsModule,
    ],
    providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'App-Vtes';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private http: HttpClient,
    ){}

  ngOnInit(): void {
  }


}
