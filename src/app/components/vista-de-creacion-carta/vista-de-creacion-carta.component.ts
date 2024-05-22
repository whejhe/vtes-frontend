//front/src/app/components/vista-de-creacion-carta/vista-de-creacion-carta.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateCardService } from '../../services/create-card.service';

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
  
  customCardForm: FormGroup;

  constructor(
    private CreateCardSvc: CreateCardService
  ){
    this.customCardForm = this.CreateCardSvc.getForm();
  }

}
