//front/src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  // private apiUrl = 'https://vtesapp.duckdns.org';
  private apiUrl = environment.apiUrl;
  private token:string | null = localStorage.getItem('token');

  // OBTENER USUARIO ACTUAL
  getCurrentUser(): Observable<User> {
    const userId = this.getUserIdFromToken();
    return this.http.get<any>(`${this.apiUrl}/users/${{userId}}`);
  }

  private getUserIdFromToken(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken._id;
    }
    return '';
  }

  //TOKEN
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken():void {
    localStorage.removeItem('token');
    this.token = null;
  }
  setToken(token: string) {
    this.token = token;
  }

  //REGISTRO
  registerUser(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/users/register`, userData);
  }

  //LOGIN
  loginUser(userData: any) {
    let token = this.http.post<any>(`${this.apiUrl}/users/login`, userData);
    token.subscribe((data: any) => {
      this.saveToken(data);
    })
    return token;
  }

  //RECUPERAR CONTRASEÑA
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  //MENSAJES DE ERROR
  handleRegistrationError(error: any): string {
    if (error.error.error.includes('El nombre debe tener al menos 3 caracteres')) {
      return 'El nombre debe tener al menos 3 caracteres';
    } else if (error.error.error.includes('El nombre debe tener un maximo de 30 caracteres')) {
      return 'El nombre debe tener un maximo de 30 caracteres';
    } else if (error.error.error.includes('El nick de usuario es obligatorio')) {
      return 'El nick de usuario es obligatorio';
    } else if (error.error.error.includes('El nick debe tener al menos 3 caracteres')) {
      return 'El nick debe tener al menos 3 caracteres';
    } else if (error.error.error.includes('El nick debe tener un maximo de 20 caracteres')) {
      return 'El nick debe tener un maximo de 20 caracteres';
    } else if (error.error.error.includes('El email es obligatorio')) {
      return 'El email es obligatorio';
    }else if(error.error.error.includes('El email no es valido')){
      return 'El email no es valido';
    }else if(error.error.error.includes('La contraseña es obligatoria')){
      return 'La contraseña es obligatoria';
    }else if(error.error.error.includes('La contraseña debe tener al menos 8 caracteres')){
      return 'La contraseña debe tener al menos 8 caracteres';
    }else if(error.error.error.includes('La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*')){
      return 'La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*';
    }
    else {
      return 'Ocurrió un error al registrar el usuario';
    }
  }


}
