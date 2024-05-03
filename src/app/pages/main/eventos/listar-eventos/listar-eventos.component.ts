//front/src/app/pages/main/eventos/listar-eventos/listar-eventos.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Event } from '../../../../models/event.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.scss'
})
export class ListarEventosComponent implements OnInit {

  constructor(
    public eventSvc: EventService,
    public authSvc: AuthService
  ) { }

  event: Event[] = [];
  user: User[] = [];


  // getEvents(){
  //   this.eventSvc.getEvents().subscribe(
  //     (events: Event[]) => {
  //       this.event = events;
  //       console.log('Eventos: ', this.event);
  //     },
  //     (error) => {
  //       console.log('Error al obtener los eventos: ', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.eventSvc.getEvents();
    console.log('Lista de Eventos: ', this.event);
  }

}
