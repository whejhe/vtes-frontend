import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  image: Image | null = null;

  // private apiUrl = 'http://localhost:3000/vtes-backend/uploads/';
  private jsonVtesUrl = 'http://localhost:3000/vtes-backend/public/data/vtes.json';
  private apiUrl = 'http://localhost:3000/vtes-backend/uploads/';
  private jsonImage = 'http://localhost:3000/data/image.json';

  createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, image);
  }

  getAvatars(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}avatars`);
  }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/${id}`);
  }

  getImagesByUserId(userId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/users/${userId}`);
  }

  getImageByName(name: string): Observable<Image> {
    if(this.image?.type === 'avatars') {
      return this.http.get<Image>(`${this.apiUrl}/avatars/${name}${this.image?.extension}`);
    }
    else if(this.image?.type === 'customCards') {
      return this.http.get<Image>(`${this.apiUrl}/customCards/${name}${this.image?.extension}`);
    }else{
      return this.http.get<Image>(`${this.apiUrl}/${name}`);
    }
  }

  getJsonImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.jsonImage);
  }

  getAvatarByName(name: string): string{
    return `http://localhost:3000/vtes-backend/uploads/avatars/${name}`;
  }

  getAvatarInRegister(name: string, extension: string): string{
    return `${this.apiUrl}avatars/${name}${extension}`;
  }


  updateImage(image: Image): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}/${image._id}`, image);
  }

  deleteImage(image: Image): Observable<Image> {
    return this.http.delete<Image>(`${this.apiUrl}/${image._id}`);
  }

  ngOnInit() {
  }

}
