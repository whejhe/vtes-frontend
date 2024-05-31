//front/src/app/services/image.service.ts
import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    public authSvc: AuthService
  ) { }

  image: Image | null = null;
  private tokenData: any;


  private jsonVtesUrl = environment.apiUrl + '/data/vtes.json' || 'https://localhost/data/vtes.json';
  private apiUrl = environment.apiUrl || 'https://localhost';
  private jsonImage = environment.apiUrl + '/data/image.json' || 'https://localhost/data/image.json';
  private uploadUrl = environment.apiUrl + '/uploads/' || 'https://localhost/uploads/';
  private uploadAvatarsUrl = environment.apiUrl + '/uploads/avatars/' || 'https://localhost/uploads/avatars/';


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
      console.log('No se encontro el token', token);

    }
    return headers;
  }

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
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put<Image>(`${this.apiUrl}/images/upload/${userId}`, userId, { headers });
  }

  deleteImage(image: Image): Observable<Image> {
    return this.http.delete<Image>(`${this.uploadUrl}/${image._id}`);
  }

  ngOnInit() {
  }

}
