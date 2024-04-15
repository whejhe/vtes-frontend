import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from '../models/vtes.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  // private apiUrl = 'https://static.krcg.org/data/vtes.json';
  private apiUrl = environment.apiUrl + '/cards';
  // private apiUrl = environment.apiUrl + '/data/vtes.json';

  constructor(
    private http: HttpClient
  ) { }

  getJsonData():Observable<Card[]>{
    const data = this.http.get<Card[]>(this.apiUrl);
    return data;
  }

  clans = [
  { name: "Abomination"},
  { name: "Ahrimane"},
  { name: "Akunanse"},
  { name: "Avenger"},
  { name: "Baali"},
  { name: "Banu Haim"},
  { name: "Blod Brother"},
  { name: "Brujha"},
  { name: "Brujh antitribu"},
  { name: "Caitiff"},
  { name: "Daughter of Cacophony"},
  { name: "Defender"},
  { name: "Gangrel"},
  { name: "Gangrel antitribu"},
  { name: "Gargoyle"},
  { name: "Giovani"},
  { name: "Guruhi"},
  { name: "Harbinger of Skulls"},
  { name: "Innocent"},
  { name: "Ishtrri"},
  { name: "Judge"},
  { name: "Kiasyd"},
  { name: "Lasombra"},
  { name: "Malkavian"},
  { name: "Malkavian antitribu"},
  { name: "Martyr"},
  { name: "Ministry"},
  { name: "Nagaraja"},
  { name: "Noseratu"},
  { name: "Nosferatu antitribu"},
  { name: "Osebo"},
  { name: "Pander"},
  { name: "Ravnos"},
  { name: "Reeemer"},
  { name: "Salubi"},
  { name: "Salubri antitribu"},
  { name: "Samedi"},
  { name: "Toreador"},
  { name: "Toreador antitribu"},
  { name: "Tremere"},
  { name: "Tremere antitribu"},
  { name: "True Brujah"},
  { name: "Tzimisce"},
  { name: "Ventrue"},
  { name: "Ventre antitribu"},
  { name: "Visionay"}
  ]

}
