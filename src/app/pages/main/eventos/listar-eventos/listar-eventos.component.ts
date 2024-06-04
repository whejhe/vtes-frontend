//front/src/app/pages/main/eventos/listar-eventos/listar-eventos.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Evento } from '../../../../models/evento.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';

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

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  private apiUrl = environment.apiUrl + '/events' || 'http://localhost:3000/events';

  constructor(
    public eventSvc: EventService,
    public authSvc: AuthService,
  ) { }
  
  public events: Evento[] = [];
  user: User[] = [];
  
  getEvents(){
    
    this.eventSvc.getEvents().subscribe(
      (events: Evento[]) => {
      this.events = events;
    },
    (error) => {
      
    });
  }

  deleteEvent(eventId: string): void {
    this.eventSvc.deleteEvent(eventId).subscribe(
      (response) => {
        
        this.getEvents();
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.message = 'Evento eliminado correctamente';
        setTimeout(() => {
          this.showSucessMessage = false;
        },5000);
      },
      (error) => {
        
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = this.eventSvc.handleRegistrationError(error);
        setTimeout(() => {
          this.showErrorMessage = false;
        },5000);
      }
    );
  }


  ngOnInit(): void {
    this.eventSvc.getEvents();
    this.getEvents();
    
  }

}
