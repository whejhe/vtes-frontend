//front/src/app/services/custom-cards.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomCard } from '../models/custom-cards.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomCardsService {
  private apiUrl = 'http://localhost:3000/customCards';

  constructor(private http: HttpClient) {}

  createCustomCard(customCard: CustomCard): Observable<CustomCard> {
    const formData = new FormData();
    formData.append('name', customCard.name);
    formData.append('capacity', customCard.capacity.toString());
    formData.append('image', customCard.image);
    formData.append('clan', customCard.clan);
    formData.append('disciplines', customCard.disciplines.join(','));
    formData.append('group', customCard.group.toString());
    formData.append('logoColor', customCard.logoColor);
    formData.append('description', customCard.description);

    return this.http.post<CustomCard>(this.apiUrl, formData);
  }

  getAllCustomCards(): Observable<CustomCard[]> {
    return this.http.get<CustomCard[]>(this.apiUrl);
  }

  getCustomCardById(id: string): Observable<CustomCard> {
    return this.http.get<CustomCard>(`${this.apiUrl}/${id}`);
  }

  getCustomCardsByDeckId(deckId: string): Observable<CustomCard[]> {
    return this.http.get<CustomCard[]>(`${this.apiUrl}/${deckId}`);
  }

  updateCustomCard(id: string, customCard: CustomCard): Observable<CustomCard> {
    return this.http.put<CustomCard>(`${this.apiUrl}/${id}`, customCard);
  }

  deleteCustomCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
