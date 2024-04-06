//front/src/app/services/deck.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private apiUrl = 'https://vtesapp.duckdns.org/users/libraries/decks';

  constructor(private http: HttpClient) {}

  // Crear un nuevo mazo
  createDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck);
  }

  // Obtener todos los mazos
  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.apiUrl);
  }

  // Obtener un mazo por ID
  getDeckById(id: string): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los mazos de un usuario
  getDecksByUserId(userId: string): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Actualizar un mazo
  updateDeck(id: string, deck: Deck): Observable<Deck> {
    return this.http.put<Deck>(`${this.apiUrl}/${id}`, deck);
  }

  // Actualizar la visibilidad de un mazo
  updateDeckVisibility(id: string, publico: boolean): Observable<Deck> {
    return this.http.patch<Deck>(`${this.apiUrl}/${id}/visibility`, { publico });
  }

  // Agregar una carta a un mazo
  addCardToDeck(deckId: string, cardId: string): Observable<Deck> {
    return this.http.post<Deck>(`${this.apiUrl}/${deckId}/cards`, { cardId });
  }

  // Eliminar una carta de un mazo
  deleteCardFromDeck(deckId: string, cardId: string): Observable<Deck> {
    return this.http.delete<Deck>(`${this.apiUrl}/${deckId}/cards/${cardId}`);
  }

  // Eliminar un mazo
  deleteDeck(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
