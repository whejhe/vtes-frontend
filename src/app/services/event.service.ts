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
  event!: Evento;

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) { }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }else{
      console.error('No hay token');

    }
    return headers;
  }

  private apiUrl = environment.apiUrl + '/events/' || 'https://localhost/events/';


  createEvent(event: Evento): Observable<Evento> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<Evento>(`${this.apiUrl}admin/`, event, { headers });
  }


  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}`);
  }

  getEventById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}users/${id}`);
  }

  updateEvent(id: string, event: Evento): Observable<Evento> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put<Event>(`${this.apiUrl}admin/${id}`, event, { headers });
  }


  deleteEvent(id: string): Observable<Evento> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.delete<Evento>(`${this.apiUrl}admin/${id}`, { headers });
  }

  sortearMesa(eventId:string):Observable<Evento>{
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post<Evento>(`${this.apiUrl}admin/sort-tables/${eventId}`,{}, {headers});
  }

  reordenarMesa(eventId:string):Observable<Evento>{
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put<Evento>(`${this.apiUrl}admin/sort-tables/${eventId}/reordenar`,{}, {headers});
  }

  handleRegistrationError(error: any): string {
    if (error.error.error.includes('El nombre debe tener al menos 3 caracteres')) {
      return 'El nombre debe tener al menos 3 caracteres';
    } else if('El nombre debe tener un maximo de 30 caracteres'){
      return 'El nombre debe tener un maximo de 30 caracteres';
    } else if('El email es obligatorio'){
      return 'El email es obligatorio';
    } else if('El email no es valido'){
      return 'El email no es valido';
    } else if('El tipo de torneo es obligatorio'){
      return 'El tipo de torneo es obligatorio';
    } else if('El precio del torneo es obligatorio'){
      return 'El precio del torneo es obligatorio';
    } else if('El precio del torneo no es valido, Ejemplo: 0.00'){
      return 'El precio del torneo no es valido, Ejemplo: 0.00';
    } else if('La provincia es obligatoria'){
      return 'La provincia es obligatoria';
    } else if('La localidad es obligatoria'){
      return 'La localidad es obligatoria';
    } else if('La fecha es obligatoria'){
      return 'La fecha es obligatoria';
    } else if('La hora es obligatoria'){
      return 'La hora es obligatoria';
    } else if('El formato de la hora no es valido. Ejemplo: 00:00'){
      return 'El formato de la hora no es valido. Ejemplo: 00:00';
    } else {
      return 'Ocurrió un error al mandar el reporte';
    }
  }

}
