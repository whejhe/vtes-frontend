//front/src/app/pages/main/eventos/listar-eventos/listar-eventos.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Evento } from '../../../../models/evento.model';
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

  getEvents(){
    console.log(this.eventSvc.getEvents());
    this.eventSvc.getEvents().subscribe(
      (events: Evento[]) => {
      this.event = events;
    },
    (error) => {
      console.log('Error al obtener los eventos: ', error);
    });
  }

  event: Evento[] = [];
  user: User[] = [];

  ngOnInit(): void {
    this.eventSvc.getEvents();
    this.getEvents();
    console.log('Lista de Eventos: ', this.event);
  }

}
