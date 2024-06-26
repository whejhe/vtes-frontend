//front/src/app/services/deck.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Deck } from '../models/deck.model';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private apiUrl = environment.apiUrl + '/decks' || 'https://localhost/decks';
  private currentDeckId: string = '';
  private currentDeckSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private tokenData: any;

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) {
    // this.getTokenData();
  }

  getTokenData(): void {
    const token = this.authSvc.getToken();
    if (token) {
      this.tokenData = jwtDecode(token);
    }
  }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }else{
      

    }
    return headers;
  }


  // Crear un nuevo mazo
  createDeck(deck: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    // deck.userId = this.tokenData.userId;
    return this.http.post(this.apiUrl, deck, { headers });
  }

  getCurrentDeck(): Observable<Deck | null> {
    const currentDeckId = localStorage.getItem('currentDeckId');
    if (currentDeckId) {
      return this.getDeckById(currentDeckId);
    } else {
      return of(null);
    }
  }


  getDecks(): Observable<Deck[]> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.get<Deck[]>(this.apiUrl, { headers });
  }

  // Obtener un mazo por ID
  getDeckById(id: string): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  setCurrentDeckId(id: string): void {
    this.currentDeckId = id;
    this.setLastDeckId(this.currentDeckId);
    this.currentDeckSubject.next(id);
  }

  getCurrentDeckId(): Observable<string> {
    return this.currentDeckSubject.asObservable();
  }

  getLastDeckId(): String {
    return localStorage.getItem('lastDeck')!;
  }

  setLastDeckId(id: string): String {
    localStorage.setItem('lastDeck', id);
    return localStorage.getItem('lastDeck')!;
  }

  // Obtener todos los mazos de un usuario
  getDecksByUserId(userId: string): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Obtener todas las cartas de un mazo
  getCardsByDeckId(deckId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deckId}/cards`);
  }

  // Actualizar un mazo
  updateDeck(id: string, deck: Deck): Observable<Deck> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    
    return this.http.put<Deck>(`${this.apiUrl}/${id}`, deck, { headers });
  }

  // Actualizar la visibilidad de un mazo
  updateDeckVisibility(id: string, isPublic: boolean): Observable<Deck> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put<Deck>(`${this.apiUrl}/${id}/visibility`, { isPublic }, { headers });
  }

  // Agregar una carta a un mazo
  addCardToDeck(deckId: string, cardId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${deckId}/cards`, { cardId });
  }

  // Eliminar una carta de un mazo
  deleteCardFromDeck(deckId: string, cardId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${deckId}/cards/${cardId}`);
  }

  // Eliminar un mazo
  deleteDeck(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.addAuthHeader(new HttpHeaders()) });
  }

  printTxt(id: string, deckName: string, author: string): any {
    id = this.currentDeckId;

    return fetch(`${this.apiUrl}/printTxt/${id}`, { method: 'POST', headers: { 'Authorization': `Bearer ${this.authSvc.getToken()}` } }).then(res => res.blob()).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = `${deckName} - ${author}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

  printPDF(id: string, deckName: string, author: string): any {
    id = this.currentDeckId;
    return fetch(`${this.apiUrl}/printPDF/${id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${this.authSvc.getToken()}` } }).then(res => res.blob()).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = `${deckName} - ${author}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }


  handleRegistrationError(error: any): string {
    if (error.error.error.includes('El identificador de usuario es obligatorio')) {
      return 'El identificador de usuario es obligatorio';
    } else if('El nombre del mazo es obligatorio') {
      return 'El nombre del mazo es obligatorio';
    }else if('El autor del mazo es obligatorio'){
      return 'El autor del mazo es obligatorio';
    }else if('El estado del mazo es obligatorio'){
      return 'El estado del mazo es obligatorio';
    }
    else{
      return 'Ocurrio un error al crear el mazo';
    }
  }

  deleteDeckError(error: any): string {
    if (error.status === 400) {
      return 'No tienes permiso para eliminar este mazo.';
    } else {
      return 'Ocurrio un error al eliminar el mazo.';
    }
  }
}


