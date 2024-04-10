// src/app/services/local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //Set value in local storage
  setItem(key: string, value: string):void {
    localStorage.setItem(key, value);
  }

  //Get value from local storage
  getItem(key: string):string | null {
    return localStorage.getItem(key);
  }

  //Eliminar value de local storage
  removeItem(key: string):void {
    localStorage.removeItem(key);
  }

  //Limpiar local storage
  clear():void {
    localStorage.clear();
  }
}
