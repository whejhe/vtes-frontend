//front/src/app/pages/admin/panel-admin/list-users/list-users.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';
import { Router } from '@angular/router';

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

  user: User[] =[];
  avatar: Image[] = [];

  getUsers(){
    this.authSvc.getUsers().subscribe(
      (users: User[]) => {
      this.user = users;
      console.log('Users: ', this.user);
    },
    (error) => {
      console.log('Error al obtener los usuarios: ', error);
    });
  }

  deleteUser(id: string){
    if(confirm('¿Estas seguro de eliminar este usuario?')){
      this.authSvc.deleteUser(id).subscribe(
        () => {
          console.log('Usuario eliminado');
          this.getUsers();
        },
        (error) => {
          console.log('Error al eliminar el usuario: ', error);
        }
      );
    }
  }

  blockUser(id: string){
    if(confirm('¿Estas seguro de bloquear este usuario?')){
      this.authSvc.blockUser(id).subscribe(
        () => {
          console.log('Usuario bloqueado');
          this.getUsers();
        },
        (error) => {
          console.log('Error al bloquear el usuario: ', error);
        }
      );
    }
  }

  unblockUser(user: User){
    if(confirm('¿Estas seguro de desbloquear este usuario?')){
      this.authSvc.unblockUser(user._id).subscribe(
        () => {
          this.user = this.user.filter(u => u._id !== user._id);
          console.log('Usuario desbloqueado');
          this.getUsers();
        },
        (error) => {
          console.log('Error al desbloquear el usuario: ', error);
        }
      );
    }
  }

  updateUser(){
    this.authSvc.updateUser(this.user[this.user.length - 1]._id).subscribe(
      (updateUser) => {
        console.log('Usuario actualizado: ', updateUser);
        this.getUsers();
      },
      (error) => {
        console.log('Error al actualizar el usuario: ', error);
      }
    )
  }

  ngOnInit(): void {
    this.getUsers();
    console.log('Users: ');
  }


}
