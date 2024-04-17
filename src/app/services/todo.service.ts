import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getMessage(): string {
    return 'Hello World!';
  }
}
