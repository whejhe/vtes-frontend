//front/src/app/services/card.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = environment.apiUrl + '/cards' || 'https://localhost/cards';

  constructor(
    private http: HttpClient
  ) { }

  // Crear una nueva carta
  createCard(card: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, card);
  }

  // Obtener todas las cartas
  getCards(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //Paginación
  // getCards(page: number = 1, pageSize: number = 10): Observable<any> {
  //   const params = {
  //     page: page.toString(),
  //     pageSize: pageSize.toString()
  //   };
  //   return this.http.get<any>(this.apiUrl, { params });
  // }


  // Obtener una carta por ID
  getCardById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar la información de una carta
  updateCard(id: string, card: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, card);
  }

  // Eliminar una carta
  deleteCard(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
