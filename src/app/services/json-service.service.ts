//front/src/app/services/json-service.service.ts
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
  private apiUrl = environment.apiUrl + '/cards' || 'https://localhost:3000/cards';
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

  reactionsData = [
    { name: "intercept"},
    { name: "reduce bleed"},
    { name: "unlock"},
    { name: "wake"}
  ]

  othersData = [
    { name: "banned"},
    { name: "advancement"},
    { name: "flight"},
    { name: "striga"},
    { name: "meleficia"},
    { name: "seraph"},
    { name: "multi-dicipline"}
  ]

  bloodCostData = [
    { name: "1"},
    { name: "2"},
    { name: "3"},
    { name: "4"},
    { name: "X"},
  ]

  poolCostData = [
    { name: "1"},
    { name: "2"},
    { name: "3"},
    { name: "4"},
    { name: "5"},
    { name: "6"},
    { name: "X"},
  ]

}
