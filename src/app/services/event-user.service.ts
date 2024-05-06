// front/src/app/services/event-user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { EventUser } from '../models/event-user.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventUserService {

  private apiUrl = environment.apiUrl + '/event-users' || 'http://localhost:3000/event-users';

  constructor(
    public http: HttpClient,
    private authSvc: AuthService
  ) { }

  // Añadir Usuario a un evento
  addUserToEvent(eventId: string, userId: string):Observable<any> {
    return this.http.post<EventUser>(`${this.apiUrl}/users/${eventId}`, { userId });;
  }

  // Obtener todos los usuarios asignados a un evento
  getUsersForEvent(eventId: string):Observable<EventUser[]> {
    return this.http.get<EventUser[]>(`${this.apiUrl}/users/${eventId}`);
  }

}
