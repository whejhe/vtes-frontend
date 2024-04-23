//front/src/app/services/event.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = environment.apiUrl + '/events/';

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}admin/}`, event);
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
