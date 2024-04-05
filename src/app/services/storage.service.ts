// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveImage(key: string, image: string | null | undefined): void {
    localStorage.setItem(key, image || '');
  }

  getImage(key: string): string | null | undefined {
    return localStorage.getItem(key);
  }
}
