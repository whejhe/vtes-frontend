import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vista-de-creacion-carta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './vista-de-creacion-carta.component.html',
  styleUrl: './vista-de-creacion-carta.component.scss'
})
export class VistaDeCreacionCartaComponent {

}
