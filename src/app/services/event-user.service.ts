// front/src/app/services/event-user.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { EventUser } from '../models/event-user.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventUserService {

  private apiUrl = environment.apiUrl + '/events-users' || 'https://localhost:3000/event-users';

  constructor(
    public http: HttpClient,
    private authSvc: AuthService
  ) { }



  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Añadir Usuario a un evento
  addUserToEvent(eventId: string, userId: string):Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<EventUser>(`${this.apiUrl}/users/${eventId}`, { userId }, { headers });;
  }

  // Obtener todos los usuarios asignados a un evento
  getUsersForEvent(eventId: string):Observable<EventUser> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.get<EventUser>(`${this.apiUrl}/${eventId}`, { headers });
  }

  // Eliminar usuario de un evento
  deleteUserFromEvent(eventId: string, userId: string ):Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.delete(`${this.apiUrl}/${eventId}`, { headers });
  }

}
