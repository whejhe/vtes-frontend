// front/src/app/pages/main/eventos/ficha-event/ficha-event.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-event',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './ficha-event.component.html',
  styleUrl: './ficha-event.component.scss'
})
export class FichaEventComponent implements OnInit, OnDestroy {

  //MESSAGES
  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  // FECHA Y CONTADOR
  eventDate: Date | null = null;
  days: string = '';
  timeRemaining: string = '';
  private intervalId: any;

  // TORNEO
  isStarted: boolean = false;
  isFinished: boolean = false;
  isLoaded: boolean = false;

  ronda: string[][] = [];
  mesas: string[][] = []

  agregarMesa() {
    this.mesas.push([]);
  }
  agregarRonda() {
    this.ronda.push([]);
  }

  constructor(
    public eventSvc: EventService,
    public eventUserSvc: EventUserService,
    private route: ActivatedRoute,
    public authSvc: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = this.authSvc.getCurrentUser()!;
  }

  loggng(val: any, event: any, tipo: String) {
    if (tipo == 'points') {
      val.points = parseInt(event.target.value)
    }
    if (tipo == 'mesa') {
      val.tablePoints == 1 ? val.tablePoints = 0 : val.tablePoints = 1
      // val.tablePoints = parseInt(event.target.value)
    }
    
    
  }

  sumarPuntuaciones() {
    this.eventSvc.sumarPuntuaciones(this.evento._id!).subscribe(
      (response: any) => {
        this.evento.ranking = response.ranking
        
      },
      (error) => {
        
      }
    );
  }

  updateEventPoints() {
    // const eventData = this.fichaEventForm.value;
    
    if (this.evento && this.evento._id) {
      this.eventSvc.updateEvent(this.evento._id, this.evento).subscribe(
        (response: any) => {

          
          this.showSucessMessage = true;
          this.showErrorMessage = false;
          this.sumarPuntuaciones();
          this.message = 'Puntos actualizados correctamente';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
          // this.fichaEventForm.reset();
          
        },
        (error) => {
          
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = this.authSvc.handleRegistrationError(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );

    } else {
      
    }
  }

  public apiUrl = environment.apiUrl || 'https://localhost'

  evento!: Evento;
  eventUsers!: EventUser;
  avatar: Image[] = [];
  currentUser!: User;

  matchResults: {
    userId: string,
    eliminaciones: number,
    sobrevivió: boolean,
    mesaId: string
  }[] = [];

  showButtonStartEvent: boolean = false;

  ngOnInit(): void {
    this.getEventById()
    // 
    this.getCurrentUser();
    this.startCountdown();
    

    setTimeout(() => {
      this.isLoaded = true
      if (this.evento.iniciado) {
        this.isStarted = true
      }
      
    }, 1500)
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getEventById(): Evento | undefined {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventSvc.getEventById(id).subscribe(
        (newEvent) => {
          this.evento = newEvent;
          this.eventDate = new Date(`${this.evento?.fecha!} ${this.evento?.hora!}`);
          // 
          this.getUsersForEvent();
          return newEvent
        },
        (error) => {
          
        }
      )
    }
    return undefined
  }

  getUsersForEvent() {
    if (this.evento) {
      this.eventUserSvc.getUsersForEvent(this.evento._id!).subscribe(
        (eventUsers: EventUser) => {
          this.eventUsers = eventUsers;
        },
        (error) => {
          
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
          this.message = 'Usuario agregado correctamente.';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          
        }
      )
    } else {
      
    }
    this.showErrorMessage = true;
    this.showSucessMessage = false;
    this.message = 'Ya estas registrado en este evento.'
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
            this.message = 'Usuario agregado correctamente.';
            setTimeout(() => {
              this.showSucessMessage = false;
            }, 5000);
          },
          (error) => {
            
            this.showErrorMessage = true;
            this.showSucessMessage = false;
            this.message = 'Ocurrió un error al agregar el usuario.';
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 5000);
          }
        );
      }
    } else {
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Solo los administradores pueden agregar usuarios por correo electrónico.';
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
          
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.message = 'Usuario Eliminado del Evento';
          // // recargar la lista de usuarios
          // this.getUsersForEvent();
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = error.error?.error || 'Error al eliminar el usuario del evento';
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
          
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.message = 'Usuario Eliminado del Evento';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = error.error?.error || 'Error al eliminar el usuario del evento';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    }
  }


  getTotalPoints(players: any[]): number {
    let totalPoints = 0;
    players.forEach(player => {
      totalPoints += player.points;
    });
    
    return totalPoints;
  }


  // SORTEO DE MESAS
  sortearMesa() {
    if (this.evento) {
      this.eventSvc.sortearMesa(this.evento._id!).subscribe(
        (event) => {
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.message = 'Mesa sorteada';
          this.isStarted = true;
          
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          
          
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = 'Error al sortear la mesa';
          this.isStarted = false;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );

    }
  }

  // COMENZAR TORNEO
  stopEvent() {
    this.isStarted = false
    this.evento.iniciado = false
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


