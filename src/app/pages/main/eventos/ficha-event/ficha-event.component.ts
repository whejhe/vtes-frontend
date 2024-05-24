// front/src/app/pages/main/eventos/ficha-event/ficha-event.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  // fichaEventForm: FormGroup = new FormGroup({
  //   points: new FormControl(),
  //   tablePoints: new FormControl(),
  // });

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
    // this.fichaEventForm = this.formBuilder.group({
    //   points: [0, Validators.required],
    //   tablePoints: [0, Validators.required],
    // })
  }

  loggng(val: any, event: any, tipo: String) {
    if (tipo == 'points') {
      val.points = parseInt(event.target.value)
    }
    if (tipo == 'mesa') {
      val.tablePoints == 1 ? val.tablePoints = 0 : val.tablePoints = 1
      // val.tablePoints = parseInt(event.target.value)
    }
    console.log(val, event.target.value)
    console.log(this.evento.ronda![0].mesas[0].players)
  }

  updateEventPoints() {
    // const eventData = this.fichaEventForm.value;
    console.log(this.evento)
    if (this.evento && this.evento._id) {
      this.eventSvc.updateEvent(this.evento._id, this.evento).subscribe(
        (response: any) => {
          console.log('Response: ', response);
          this.showSucessMessage = true;
          this.showErrorMessage = false;
          this.message = 'Puntos actualizados correctamente';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
          // this.fichaEventForm.reset();
        },
        (error) => {
          console.log('Error: ', error);
          this.showErrorMessage = true;
          this.showSucessMessage = false;
          this.message = this.authSvc.handleRegistrationError(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      );
    } else {
      console.log('Evento o id no definido');
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
    // console.log(r, 'probando si devuelve bien')
    this.getCurrentUser();
    this.startCountdown();
    console.log('CurrentUser: ', this.getCurrentUser());

    setTimeout(() => {
      this.isLoaded = true
      if (this.evento.iniciado) {
        this.isStarted = true
      }
    }, 1500)
  }

  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }


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
          // console.log('Evento: ',this.evento);
          this.getUsersForEvent();
          return newEvent
        },
        (error) => {
          console.log('Error al obtener el evento: ', error);
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
          this.message = 'Usuario agregado correctamente.';
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
            console.log('Error al añadir usuario: ', error);
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
          console.log('Usuario eliminado del evento: ', response);
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.message = 'Usuario Eliminado del Evento';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Error al eliminar el usuario del evento: ', error);
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
          console.log('Usuario eliminado del evento: ', response);
          this.getUsersForEvent();
          this.showErrorMessage = false;
          this.showSucessMessage = true;
          this.message = 'Usuario Eliminado del Evento';
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Error al eliminar el usuario del evento: ', error);
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

  // SORTEAR POSICION EN LAS MESAS
  // tirada() {
  //   if (this.evento) {
  //     this.eventUserSvc.tirada(this.evento._id!).subscribe(
  //       (tiradas) => {
  //         this.eventUsers = tiradas;
  //         this.getUsersForEvent();
  //         this.showErrorMessage = false;
  //         this.showSucessMessage = true;
  //         this.message = 'Todas las tiradas realizadas';
  //         console.log('Tiradas:', tiradas);
  //         setTimeout(() => {
  //           this.showSucessMessage = false;
  //         }, 5000);
  //       },
  //       (error) => {
  //         this.showErrorMessage = true;
  //         this.showSucessMessage = false;
  //         this.message = 'Error al realizar las tiradas';
  //         this.isStarted = false;
  //         console.log('Error en tiradas:', error);
  //         setTimeout(() => {
  //           this.showErrorMessage = false;
  //         }, 5000);
  //       }
  //     )
  //   }
  // }

  getTotalPoints(players: any[]): number {
    let totalPoints = 0;
    players.forEach(player => {
      totalPoints += player.points;
    });
    console.log('Total de puntos: ', totalPoints);
    return totalPoints;
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
          this.message = 'Mesa sorteada';
          this.isStarted = true;
          console.log('Mesa sorteada: ', event);
          setTimeout(() => {
            this.showSucessMessage = false;
          }, 5000);
        },
        (error) => {
          console.log('Usuario Actual: ', this.currentUser);
          console.log('Error al sortear la mesa: ', error);
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
    this.evento.iniciado=false
    // this.eventSvc.sortearMesa(this.evento._id!)
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


