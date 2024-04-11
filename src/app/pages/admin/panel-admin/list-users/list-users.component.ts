//front/src/app/pages/admin/panel-admin/list-users/list-users.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';

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
    public imageSvc: ImageService
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

  unblockUser(id: string){
    if(confirm('¿Estas seguro de desbloquear este usuario?')){
      this.authSvc.unblockUser(id).subscribe(
        () => {
          console.log('Usuario desbloqueado');
          this.getUsers();
        },
        (error) => {
          console.log('Error al desbloquear el usuario: ', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getUsers();
    console.log('Users: ');
  }


}
