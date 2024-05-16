// front/src/app/pages/main/eventos/ficha-event/ficha-event.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-event',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './ficha-event.component.html',
  styleUrl: './ficha-event.component.scss'
})
export class FichaEventComponent implements OnInit, OnDestroy {

  // FECHA Y CONTADOR
  eventDate: Date | null = null;
  days: string = '';
  timeRemaining: string = '';
  private intervalId: any;

  // TORNEO
  isStarted: boolean = false;
  isFinished: boolean = false;

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

  matchResults: {
    userId: string,
    eliminaciones: number,
    sobrevivió: boolean,
    mesaId: string
  }[] = [];

  showButtonStartEvent: boolean = false;

  ngOnInit(): void {
    this.getEventById();
    this.getCurrentUser();
    this.startCountdown();
    console.log('CurrentUser: ', this.getCurrentUser());
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getEventById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventSvc.getEventById(id).subscribe(
        (newEvent) => {
          this.evento = newEvent;
          this.eventDate = new Date(`${this.evento?.fecha!} ${this.evento?.hora!}`);
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
          // this.initializeMatchResults();
        },
        (error) => {
          console.log('Error al obtener los usuarios: ', error);
        }
      )
    }
  }

  getCurrentUser(): User | null {
    let currentUser = this.authSvc.getCurrentUser();
    if (currentUser?.role == 'ADMIN' || currentUser?.role == 'SUPER_ADMIN') {
      this.showButtonStartEvent = true;
    }
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
          this.mesage = 'Usuario agregado correctamente.';
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
    if (this.currentUser && this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SUPER_ADMIN') {
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



  // ELIMINAR USUARIO DE EVENTO
  deleteUserFromEvent() {
    if (this.currentUser && this.evento) {
      this.eventUserSvc.deleteUserFromEvent(this.evento._id!, this.currentUser._id!).subscribe(
        (response) => {
          console.log('Usuario eliminado del evento: ', response);
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.mesage = 'Usuario Eliminado del Evento';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Error al eliminar el usuario del evento: ', error);
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.mesage = error.error?.error || 'Error al eliminar el usuario del evento';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }

  // ELIMINAR USUARIO DE EVENTO POR ID
  deleteUserFormEventById(id: string) {
    if (this.currentUser && this.evento) {
      this.eventUserSvc.deleteUserFromEvent(this.evento._id!, id).subscribe(
        (response) => {
          console.log('Usuario eliminado del evento: ', response);
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.mesage = 'Usuario Eliminado del Evento';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Error al eliminar el usuario del evento: ', error);
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.mesage = error.error?.error || 'Error al eliminar el usuario del evento';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }

  // SORTEO DE MESAS
  sortearMesa() {
    if (this.evento) {
      this.eventSvc.sortearMesa(this.evento._id!).subscribe(
        (event) => {
          this.evento = event;
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.mesage = 'Mesa sorteada';
          this.isStarted = true;
          console.log('Mesa sorteada: ', event);
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Usuario Actual: ',this.currentUser);
          console.log('Error al sortear la mesa: ', error);
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.mesage = 'Error al sortear la mesa';
          this.isStarted = false;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }

  // COMENZAR TORNEO
  stopEvent(){
    this.isStarted = false;
  }



  // CUENTA ATRAS
  startCountdown() {
    this.intervalId = setInterval(() => {
      this.updateTimeRemaining();
    }, 1000);
  }

  updateTimeRemaining(): void {
    if (this.eventDate) {
      const currentDate = new Date();
      const timeDiff = this.eventDate!.getTime() - currentDate.getTime();
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        this.days = `Comienza en ${days} Dias`;
        this.timeRemaining = `${hours}h:${minutes}:${seconds}s`;
      } else {
        this.timeRemaining = 'Finalizado';
        clearInterval(this.intervalId);
      }
    } else {
      this.timeRemaining = 'Finalizado';
      clearInterval(this.intervalId);
    }
  }


}


