// front/src/app/pages/main/eventos/ficha-event/ficha-event.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { Image } from '../../../../models/image.model';
import { AuthService } from '../../../../services/auth.service';
import { EventUserService } from '../../../../services/event-user.service';
import { EventUser } from '../../../../models/event-user.model';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ficha-event',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './ficha-event.component.html',
  styleUrl: './ficha-event.component.scss'
})
export class FichaEventComponent implements OnInit {

  constructor(
    public eventSvc: EventService,
    public eventUserSvc: EventUserService,
    private route: ActivatedRoute,
    public authSvc: AuthService
  ) {
    this.currentUser = this.authSvc.getCurrentUser()!;
  }

  public apiUrl = environment.apiUrl || 'https://localhost'

  evento!: Evento;
  eventUsers!: EventUser;
  avatar: Image[] = [];
  currentUser!: User;

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  mesage: string = '';

  ngOnInit(): void {
    this.getEventById();
    this.getCurrentUser();
    console.log('CurrentUser: ', this.getCurrentUser());
  }

  getEventById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventSvc.getEventById(id).subscribe(
        (newEvent) => {
          this.evento = newEvent;
          // console.log('Evento: ',this.evento);
          this.getUsersForEvent();
        },
        (error) => {
          console.log('Error al obtener el evento: ', error);
        }
      )
    }
  }

  getUsersForEvent() {
    if (this.evento) {
      this.eventUserSvc.getUsersForEvent(this.evento._id!).subscribe(
        (eventUsers: EventUser) => {
          this.eventUsers = eventUsers;
        },
        (error) => {
          console.log('Error al obtener los usuarios: ', error);
        }
      )
    }
  }

  getCurrentUser(): User | null {
    let currentUser = this.authSvc.getCurrentUser();
    return currentUser;
  }

  addUserToEvent() {
    if (this.currentUser) {
      this.eventUserSvc.addUserToEvent(this.evento._id!, this.currentUser._id!).subscribe(
        (eventUsers: EventUser) => {
          this.eventUsers = eventUsers;
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.mesage = 'User added successfully.'
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Error al añadir usuario: ', error);
        }
      )
    } else {
      console.log('No hay usuario', this.currentUser);
    }
    this.showErrorMessage = true;
    this.showSucessMessage = false;
    this.mesage = 'Ya estas registrado en este evento.'
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 5000);
  }


  addUserByEmail() {
    // Verifica si el usuario actual es un administrador
    if (this.currentUser && this.currentUser.role === 'ADMIN') {
      const email = prompt('Ingresa el correo electrónico del usuario a agregar:');
      if (email) {
        this.eventUserSvc.addUserByEmail(this.evento._id!, email).subscribe(
          (eventUsers: EventUser) => {
            this.eventUsers = eventUsers;
            this.getUsersForEvent();
            this.showErrorMessage = false;
            this.showSucessMessage = true;
            this.mesage = 'Usuario agregado correctamente.';
            setTimeout(() => {
              this.showSucessMessage = false;
            }, 5000);
          },
          (error) => {
            console.log('Error al añadir usuario: ', error);
            this.showErrorMessage = true;
            this.showSucessMessage = false;
            this.mesage = 'Ocurrió un error al agregar el usuario.';
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000);
          }
        );
      }
    } else {
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.mesage = 'Solo los administradores pueden agregar usuarios por correo electrónico.';
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 5000);
    }
  }
  

  deleteUserFromEvent() {
    if (this.currentUser) {
      this.eventUserSvc.deleteUserFromEvent(this.evento._id!, this.currentUser._id).subscribe(
        (eventUsers: EventUser) => {
          this.eventUsers = eventUsers;
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.mesage = 'Usuario Eliminado del Evento'
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.mesage = 'Error al Eliminar el Usuario del Evento'
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      )
    }
  }
}

