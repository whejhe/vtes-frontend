//front/src/app/services/auth.service.ts
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  isToken: boolean = false;

  private apiUrl = environment.apiUrl || 'https://localhost';
  private currentUser: User | null = null;
  private newImage: Boolean = false;
  public avatarUrl: string = '';
  public token: string | null = localStorage.getItem('token');


  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.getToken();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  newAvatar(id: string, profileImage: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profileImage', profileImage);
    this.setAvatar(profileImage);
    this.newImage = true;
    const req = new HttpRequest('PUT', `${this.apiUrl}/users/newAvatar/${id}`, formData, {
      headers: this.addAuthHeader(new HttpHeaders()),
      reportProgress: true,
      responseType: 'text'
    })
    return this.http.request(req);
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    // return this.http.put(`${this.apiUrl}/users/newAvatar/${id}`, { profileImage }, { headers });
  }

  setAvatar(profileImage: string): void {
    this.avatarUrl = profileImage;
  }

  //TOKEN
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isToken = true;
    this.currentUser = this.decodeToken(token);
    console.log(this.decodeToken(token), 'tokean decodeado');

    this.avatarUrl = this.currentUser?.profileImage || '';
    this.token = token;
  }
  getToken(): string | null {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.token = null;
      this.removeToken();
      this.currentUser = null;
      this.isToken = false;
    } else {
      if (!this.newImage) {
        let decoded = this.decodeToken(localStorage.getItem("token")!)
        this.avatarUrl = decoded?.profileImage!
      }
    }
    return this.token;
  }
  removeToken(): void {
    localStorage.removeItem('token');
    this.avatarUrl = '';
    this.token = null;
    this.currentUser = null;
    this.isToken = false;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.currentUser = this.decodeToken(token);
    console.log(this.decodeToken(token), 'tokean decodeado');
    this.avatarUrl = this.currentUser?.profileImage || '';
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
      tap(() => {
        this.getToken();
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
        this.avatarUrl = data.user.profileImage;
      })
    );
  }

  //RECUPERAR CONTRASEÑA
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  //MENSAJES DE ERROR
  handleRegistrationError(error: any): string {
    //USER
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
    } else if (error.error.error.includes('Las contraseñas no coinciden')) {
      return 'Las contraseñas no coinciden'
    } else if (error.error.error.includes('La contraseña debe tener al menos 8 caracteres')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    } else if (error.error.error.includes('La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*')) {
      return 'La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial de entre !@#$%^&*';
    } else if (error.error.error.includes('El email ya está registrado')) {
      return 'El email ya está registrado';
    } else if (error.error.error.includes('La hora es obligatoria')) {
      return 'La hora es obligatoria';
    } else if (error.error.error.includes('El formato de la hora no es valido. Ejemplo: 00:00')) {
      return 'El formato de la hora no es valido. Ejemplo: 00:00';
    } else if (error.error.error.includes('La fecha es obligatoria')) {
      return 'La fecha es obligatoria';
    } else if (error.error.error.includes('La provincia es obligatoria')) {
      return 'La provincia es obligatoria';
    } else if (error.error.error.includes('La localidad es obligatoria')) {
      return 'La localidad es obligatoria';
    } else if (error.error.error.includes('El precio del torneo es obligatorio')) {
      return 'El precio del torneo es obligatorio';
    } else if (error.error.error.includes('El precio del torneo no es valido, Ejemplo: 0.00')) {
      return 'El precio del torneo no es valido, Ejemplo: 0.00';
    } else if (error.error.error.includes('El tipo de torneo es obligatorio')) {
      return 'El tipo de torneo es obligatorio';
    } else if (error.error.error.includes('El email no coincide')) {
      return 'El email no coincide';
    }
    else {
      return 'Ocurrió un error al registrar el usuario';
    }
  }

  loginError(error: any): string {
    const errorMessage = error?.error.error;

    if (typeof errorMessage === 'string') {
      if (errorMessage.includes('El email no es válido')) {
        return 'El email no es válido';
      } else if (errorMessage.includes('La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial de entre !@#$%^&*')) {
        return 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial de entre !@#$%^&*';
      } else if (errorMessage.includes('El usuario no existe')) {
        return 'El usuario no existe';
      } else if (errorMessage.includes('Contraseña incorrecta')) {
        return 'Contraseña incorrecta';
      }
    }

    return 'Ocurrió un error al iniciar sesión';
  }


  getAvatarOptions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/vtes-backend/uploads/avatars/${name}`);
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = this.decodeToken(this.getToken()!);

    }
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }


  //Obtener imagen de Perfil
  getProfileImage(): Observable<string> {
    const nameImage = this.http.get<string>(`${this.apiUrl}/users/profile-image/${this.currentUser?._id}`);
    return nameImage;
  }

  // LISTAR USUARIOS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // OBTENER USUARIO POR ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // ELIMINAR USUARIOS
  deleteUser(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }

  // BLOQUEAR USUARIOS
  blockUser(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/blockUser/${id}`, { headers: { 'Authorization': `Bearer ${this.getToken()}` } });
  }

  // DESBLOQUEAR USUARIOS
  unblockUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/unblockUser/${userId}`, { headers: { 'Authorization': `Bearer ${this.getToken()}` } });
  }

  // CAMBIAR ROL DE USUARIO
  changeRole(email: string, newRole: string): Observable<any> {
    const body = { email, newRole };
    return this.http.put(`${this.apiUrl}/admin/permisos`, body, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  // ACTUALIZAR USUARIOS
  updateUser(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, { headers: { 'Authorization': `Bearer ${this.getToken()}` } });
  }

  updateUserProfile(userId: string, profileImage: string): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    const body = { profileImage };
    return this.http.put<User>(url, body);
  }

  darBaja(userId: string, email: string, password: string): Observable<User> {
    let headers = new HttpHeaders();
    const userData = { email, password };
    headers = this.addAuthHeader(headers);
    const url = `${this.apiUrl}/users/darBaja/${userId}`;
    return this.http.post<User>(url, userData, { headers });
  }
  ngOnInit(): void {

  }
}
