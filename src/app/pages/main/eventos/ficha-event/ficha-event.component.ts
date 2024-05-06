import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../../../../models/evento.model';

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
    private route: ActivatedRoute
  ) { }

  event?: Evento;

  ngOnInit(): void {
    this.getEventById();
    console.log('oninit:',this.event)
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
