import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Evento } from '../../../../models/evento.model';
import { EventUser } from '../../../../models/event-user.model';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {

  evento!: Evento;
  eventUsers!: EventUser;

  listaJugadores: string[] = [];

  jugadores = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5'];

  mesas: string[][] = []

  agregar() {
    this.mesas.push([])
  }

  delete(i: any) {
    console.log(this.mesas, i, 'probando 123')
    if (i?.length > 0) {
      for (let jugador of i) {
          this.jugadores.push(jugador)

      }
    }
    this.mesas.splice(this.mesas.indexOf(i), 1)
    console.log(this.mesas, 'probando 123')

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    // console.log(this.jugadores, this.mesas, 'probando 123')
  }
}

