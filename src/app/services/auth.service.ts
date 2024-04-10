//front/src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  constructor(
    private http: HttpClient
  ) { }

  isToken: boolean = false;

  private apiUrl = environment.apiUrl;
  private currentUser: User | null = null;
  public token: string | null = localStorage.getItem('token');

  //TOKEN
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isToken = true;
    this.currentUser = this.decodeToken(token);
    this.token = token;
  }
  getToken(): string | null {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = null;
      this.removeToken();
      this.currentUser = null;
      this.isToken = false;
    }
    return this.token;
  }
  removeToken(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.currentUser = null;
    this.isToken = false;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.currentUser = this.decodeToken(token);
    this.isToken = true;
    this.token = token;
  }

  decodeToken(token: string): User | null {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    } else {
      return null;
    }
  }

  //REGISTRO
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, userData).pipe(
      tap((data) => {
        this.saveToken(data.token);
        this.getToken();
        this.currentUser = data.user;
      })
    );
  }

  //LOGOUT
  logoutUser(): void {
    this.removeToken();
  }

  //LOGIN
  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, userData).pipe(
      tap((data) => {
        this.saveToken(data.token);
        this.currentUser = data.user;
      })
    );
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
    } else if (error.error.error.includes('El email no es valido')) {
      return 'El email no es valido';
    } else if (error.error.error.includes('La contraseña es obligatoria')) {
      return 'La contraseña es obligatoria';
    } else if (error.error.error.includes('La contraseña debe tener al menos 8 caracteres')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    } else if (error.error.error.includes('La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*')) {
      return 'La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*';
    }
    else {
      return 'Ocurrió un error al registrar el usuario';
    }
  }

  getAvatarOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/avatar-options`);
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = this.decodeToken(this.getToken()!);
      console.log(this.currentUser);
    }
    return this.currentUser;
  }

  //Obtener imagen de Perfil
  getProfileImage(): Observable<string> {
    const nameImage = this.http.get<string>(`${this.apiUrl}/users/profile-image/${this.currentUser?._id}`);
    return nameImage;
  }


  ngOnInit(): void {
      console.log(this.getProfileImage());
  }
}
