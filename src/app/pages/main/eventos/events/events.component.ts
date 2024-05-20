// front/src/app/pages/main/eventos/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Hora } from '../../../../models/evento.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  currentUser = this.authSvc.getCurrentUser();

  eventForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(this.currentUser?.email),
    type: new FormControl(''),
    precio: new FormControl(''),
    provincia: new FormControl(''),
    localidad: new FormControl(''),
    direccion: new FormControl(''),
    description: new FormControl(''),
    fecha: new FormControl(),
    hora: new FormControl(''),
    numMaxParticipantes: new FormControl(),
    participantesInscritos: new FormControl()
  });

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  mesage: string = '';

  constructor(
    private authSvc: AuthService,
    public eventSvc: EventService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    //aqui se cambian los valores predeterminados del formulario
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [this.currentUser?.email, Validators.required],
      type: ['', Validators.required],
      precio: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      description: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', [Validators.required, Validators.pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)]],
      numMaxParticipantes: [, Validators.required],
      participantesInscritos: [, Validators.required]
    })
  }

  createEvent() {
    try {
      const eventData = {
        userId: this.authSvc.getCurrentUser()!._id ?? 'defaultId',
        name: this.eventForm.get('name')?.value,
        email: this.eventForm.get('email')?.value,
        type: this.eventForm.get('type')?.value,
        precio: this.eventForm.get('precio')?.value,
        provincia: this.eventForm.get('provincia')?.value,
        localidad: this.eventForm.get('localidad')?.value,
        direccion: this.eventForm.get('direccion')?.value,
        description: this.eventForm.get('description')?.value,
        fecha: this.eventForm.get('fecha')?.value,
        hora: this.eventForm.get('hora')?.value,
        numMaxParticipantes: this.eventForm.get('numMaxParticipantes')?.value,
        participantesInscritos: this.eventForm.get('participantesInscritos')?.value
      };

    this.eventSvc.createEvent(eventData).subscribe(
      (response: any) => {
        console.log('response', response);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.mesage = 'Evento creado con exito';
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.eventForm.reset();
      },
      (error: any) => {
        console.log('error', error);
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.mesage = this.authSvc.handleRegistrationError(error);
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
      
    } catch (err) {
      console.log('Error al crear el evento: ', err);
    }
  }


  ngOnInit(): void {
  }

}
