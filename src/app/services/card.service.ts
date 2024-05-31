//front/src/app/services/card.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Card } from '../models/vtes.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = environment.apiUrl + '/cards' || 'https://localhost/cards';
  private cardsCache:Card[] | null = null;
  private localJsonCads = 'assets/cards.json'

  constructor(
    private http: HttpClient
  ) { }

  // Crear una nueva carta
  createCard(card: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, card);
  }

  // Obtener todas las cartas
  // getCards(): Observable<any> {
  //   if(this.cardsCache){
  //     return of(this.cardsCache);
  //   }
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     tap((cards)=>{
  //       this.cardsCache = cards;
  //     })
  //   )
  // }
  getCards(): Observable<any> {
    if(this.cardsCache){
      return of(this.cardsCache);
    }
    return this.http.get<any>(this.localJsonCads).pipe(
      tap((cards)=>{
        this.cardsCache = cards;
      })
    )
  }

  // Obtener una carta por ID
  getCardById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar la información de una carta
  updateCard(id: string, card: any): Observable<any> {
    this.cardsCache = null;
    return this.http.put<any>(`${this.apiUrl}/${id}`, card);
  }

  // Eliminar una carta
  deleteCard(id: string): Observable<any> {
    this.cardsCache = null;
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
