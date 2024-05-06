import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { User } from '../../../../models/user.model';
import { Image } from '../../../../models/image.model';
import { AuthService } from '../../../../services/auth.service';
import { EventUserService } from '../../../../services/event-user.service';
import { EventUser } from '../../../../models/event-user.model';

@Component({
  selector: 'app-ficha-event',
  standalone: true,
  imports: [
    RouterLink
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
  ) { }

  event?: Evento;
  eventUsers: EventUser[] = [];
  user:User[] = [];
  avatar: Image[] = [];

  ngOnInit(): void {
    this.getEventById();
    this.getUsers();
    console.log('oninit:',this.event)
  }

  getUsers(){
    this.authSvc.getUsers().subscribe(
      (users: User[]) => {
        this.user = users;
        console.log('Users: ', this.user);
      },
      (error) => {
        console.log('Error al obtener los usuarios: ', error);
      }
    )
  }

  getUsersForEvent(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.eventUserSvc.getUsersForEvent(id).subscribe(
        (eventUsers) => {
          this.eventUsers = eventUsers;
          console.log('Users: ', this.user);
        },
        (error) => {
          console.log('Error al obtener los usuarios: ', error);
        }
      )
    }
  }

  getEventById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventSvc.getEventById(id).subscribe(
        (event) => {
          this.event = event;
          console.log('Evento: ',this.event);
        },
        (error) => {
          console.log('Error al obtener el evento: ', error);
        }
      )
    }
  }
}
