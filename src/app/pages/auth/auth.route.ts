//front/src/app/pages/auth/auth.route.ts
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


export const AUTH_ROUTE:Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginComponent},
]
