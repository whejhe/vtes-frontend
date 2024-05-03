//front/src/app/services/event.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) { }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private apiUrl = environment.apiUrl + '/events/' || environment.localUrl + '/events/';

  // createEvent(event: FormData): Observable<Event> {
  //   let headers = new HttpHeaders();
  //   headers = this.addAuthHeader(headers);
  //   return this.http.post<any>(`${this.apiUrl}admin/`, event, { headers });
  // }

  createEvent(event: FormData): Observable <Event> {
    const eventData = new FormData();
    eventData.append('name', event.get('name') as string);
    eventData.append('email', event.get('email') as string);
    eventData.append('type', event.get('type') as string);
    eventData.append('provincia', event.get('provincia') as string);
    eventData.append('localidad', event.get('localidad') as string);
    eventData.append('direccion', event.get('direccion') as string);
    eventData.append('description', event.get('description') as string);
    eventData.append('fecha', event.get('fecha') as string);
    eventData.append('hora', event.get('hora') as string);
    eventData.append('numMaxParticipantes', event.get('numMaxParticipantes') as string);
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<any>(`${this.apiUrl}admin/`, eventData, { headers });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}users`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}users/${id}`);
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}admin/${id}`, event);
  }

  deleteEvent(id: string): Observable<Event> {
    return this.http.delete<Event>(`${this.apiUrl}admin/${id}`);
  }

}
