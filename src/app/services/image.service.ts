//front/src/app/services/image.service.ts
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

  private jsonVtesUrl = environment.apiUrl + '/data/vtes.json' || 'https://localhost/data/vtes.json';
  private apiUrl = environment.apiUrl || 'https://localhost';
  private jsonImage = environment.apiUrl + '/data/image.json' || 'https://localhost/data/image.json';
  private uploadUrl = environment.apiUrl + '/uploads/' || 'https://localhost/uploads/';
  private uploadAvatarsUrl = environment.apiUrl + '/uploads/avatars/' || 'https://localhost/uploads/avatars/';


  createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.uploadUrl, image);
  }

  getAvatars(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.uploadUrl}avatars`);
  }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.uploadUrl}/${id}`);
  }

  getImagesByUserId(userId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.uploadUrl}/avatars/${Image.prototype.name}${this.image?.extension}`);
  }

  getImageByName(name: string): Observable<Image> {
    if(this.image?.type === 'avatars') {
      return this.http.get<Image>(`${this.uploadUrl}/avatars/${name}${this.image?.extension}`);
    }
    else if(this.image?.type === 'customCards') {
      return this.http.get<Image>(`${this.uploadUrl}/customCards/${name}${this.image?.extension}`);
    }else{
      return this.http.get<Image>(`${this.uploadUrl}/${name}`);
    }
  }

  getJsonImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.jsonImage);
  }

  getAvatarByName(name: string): string{
    return `${this.uploadAvatarsUrl}${name}`;
  }

  getAvatarByUserId(userId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}images/avatars/${userId}`);
  }

  getAvatarInRegister(name: string, extension: string): string{
    return `${this.apiUrl}avatars/${name}${extension}`;
  }


  updateImage(image: Image): Observable<Image> {
    return this.http.put<Image>(`${this.uploadUrl}/${image._id}`, image);
  }

  uploadAvatar(userId: string, file: File): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}/images/upload/${userId}`, userId);
  }

  deleteImage(image: Image): Observable<Image> {
    return this.http.delete<Image>(`${this.uploadUrl}/${image._id}`);
  }

  ngOnInit() {
  }

}
