//front/src/app/services/event.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: any;

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

  private apiUrl = environment.apiUrl + '/events/' || 'https://localhost/events/';


  createEvent(event: any): Observable<Event> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<Event>(`${this.apiUrl}admin/`, event, { headers });
  }


  getEvents(): Observable<Event[]> {
    // console.log(`${this.apiUrl}/users`);
    return this.http.get<Event[]>(`${this.apiUrl}`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}users/${id}`);
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put<Event>(`${this.apiUrl}admin/${id}`, event, { headers });
  }


  deleteEvent(id: string): Observable<Event> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.delete<Event>(`${this.apiUrl}admin/${id}`, { headers });
  }

  sortearMesa(eventId:string):Observable<Event>{
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<Event>(`${this.apiUrl}admin/sort-tables/${eventId}`,{}, {headers});
  }

}
