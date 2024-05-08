//front/src/app/services/custom-cards.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomCard } from '../models/custom-cards.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomCardsService {

  private apiUrl = environment.apiUrl + '/custom-cards' || 'https://localhost:3000/custom-cards';

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createCustomCard(customCard: CustomCard): Observable<CustomCard> {
    const formData = new FormData();
    formData.append('name', customCard.name);
    formData.append('author', customCard.author);
    formData.append('capacity', customCard.capacity!.toString());
    formData.append('image', customCard.image);
    formData.append('clan', customCard.clan);
    formData.append('disciplines', customCard.disciplines.join(','));
    formData.append('group', customCard.group.toString());
    formData.append('type', customCard.type.join(','));
    formData.append('logoColor', customCard.logoColor);
    formData.append('description', customCard.description);
    formData.append('publico', String(customCard.publico));
    formData.append('costBlood', customCard.costBlood.toString());
    formData.append('costPool', customCard.costPool.toString());
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);

    return this.http.post<CustomCard>(this.apiUrl, formData, { headers });
  }

  uploadCustomCardImage(customCard: FormData): Observable<CustomCard> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    console.log('Esto es apiUrl 🤣🤣 ==> ', this.apiUrl);

    return this.http.put<CustomCard>(`${this.apiUrl}/upload`, customCard, { headers });
  }

  // getAllCustomCards(): Observable<CustomCard[]> {
  //   return this.http.get<CustomCard[]>(this.apiUrl);
  // }
  getAllCustomCards(page: number = 1, itemsPerPage: number = 10) {
    const params = {
      page: page,
      limit: itemsPerPage,
    };
    console.log('Params: ', params);
    return this.http.get<any>(this.apiUrl);
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
