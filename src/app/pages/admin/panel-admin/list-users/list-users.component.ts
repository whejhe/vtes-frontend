//front/src/app/pages/admin/panel-admin/list-users/list-users.component.ts
import { Component, OnInit } from '@angular/core';
import { Role, User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  constructor(
    public authSvc : AuthService,
    public imageSvc: ImageService,
    private router: Router
  ){}

  roles = Object.values(Role);
  roleOptions = [
    {value: Role.ADMIN, label : 'ADMIN'},
    {value: Role.COLLABORATOR, label : 'COLLABORATOR'},
    {value: Role.USER, label : 'USER'},
  ]
  rol?:string = '';

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  apiUrl = environment.apiUrl || 'https://localhost';

  user: User[] =[];
  avatar: Image[] = [];

  getUsers(){
    this.authSvc.getUsers().subscribe(
      (users: User[]) => {
      this.user = users;
      
    },
    (error) => {
      
    });
  }

  deleteUser(id: string){
    if(confirm('¿Estas seguro de eliminar este usuario?')){
      this.authSvc.deleteUser(id).subscribe(
        () => {
          
          this.showSucessMessage = true;
          this.showErrorMessage = false;
          this.message = 'Usuario eliminado correctamente';
          this.getUsers();
          setTimeout(() => {
            this.showSucessMessage = false;
          },5000);
        },
        (error) => {
          
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = this.authSvc.handleRegistrationError(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          },5000)
        }
      );
    }
  }

  changeRole(email:string, event:Event){
    const newRole = (event.target as HTMLSelectElement).value;
    this.authSvc.changeRole(email, newRole).subscribe(
      (updateUser) => {
        
        this.getUsers();
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.message = 'Usuario actualizado correctamente';
        setTimeout(() => {
          this.showSucessMessage = false;
        },5000)
      },
      (error) => {
        if(error.status === 404){
          
          return error.message;
        }else if(error.status === 403){
          
          return error.message;
        }else{
          
          return error.message;
        }
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = this.authSvc.handleRegistrationError(error);
        setTimeout(() => {
          this.showErrorMessage = false;
        },5000)
      }
    );
  }



  blockUser(id: string){
    if(confirm('¿Estas seguro de bloquear este usuario?')){
      this.authSvc.blockUser(id).subscribe(
        () => {
          
          this.getUsers();
        },
        (error) => {
          
        }
      );
    }
  }

  unblockUser(user: User){
    if(confirm('¿Estas seguro de desbloquear este usuario?')){
      this.authSvc.unblockUser(user._id).subscribe(
        () => {
          this.user = this.user.filter(u => u._id !== user._id);
          
          this.getUsers();
        },
        (error) => {
          
        }
      );
    }
  }

  updateUser(){
    this.authSvc.updateUser(this.user[this.user.length - 1]._id).subscribe(
      (updateUser) => {
        
        this.getUsers();
      },
      (error) => {
        
      }
    )
  }

  ngOnInit(): void {
    this.getUsers();
    
  }


}
