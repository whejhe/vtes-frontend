import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  user!: User;
  

  ngOnInit() {}

  getNewAvatar(){
    
  }
}
