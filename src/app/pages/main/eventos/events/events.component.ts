// front/src/app/pages/main/eventos/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    _id: new FormControl(''),
    creatorId: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    type: new FormControl(''),
    provincia: new FormControl(''),
    localidad: new FormControl(''),
    direccion: new FormControl(''),
    description: new FormControl(''),
    fecha: new FormControl(),
    hora: new FormControl(''),
    numMaxParticipantes: new FormControl()
  });

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';


  constructor(
    private authSvc: AuthService,
    public eventSvc: EventService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      type: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      description: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      numMaxParticipantes: ['', Validators.required]
    })
  }


  // createEvent() {
  //   try {
  //     const eventForm = new FormData();
  //     eventForm.append('creatorId', this.authSvc.getCurrentUser()?._id ?? 'defaultId');
  //     eventForm.append('name', this.eventForm.get('name')?.value);
  //     eventForm.append('email', this.eventForm.get('email')?.value);
  //     eventForm.append('type', this.eventForm.get('type')?.value);
  //     eventForm.append('provincia', this.eventForm.get('provincia')?.value);
  //     eventForm.append('localidad', this.eventForm.get('localidad')?.value);
  //     eventForm.append('direccion', this.eventForm.get('direccion')?.value);
  //     eventForm.append('description', this.eventForm.get('description')?.value);
  //     eventForm.append('fecha', this.eventForm.get('fecha')?.value);
  //     eventForm.append('hora', this.eventForm.get('hora')?.value);
  //     eventForm.append('numMaxParticipantes', this.eventForm.get('numMaxParticipantes')?.value);

  //     this.eventSvc.createEvent(eventForm).subscribe({
  //       next: (res) => {
  //         this.showSucessMessage = true;
  //         setTimeout(() => this.showSucessMessage = false, 4000);
  //         this.eventForm.reset();
  //       },
  //       error: (err) => {
  //         this.showErrorMessage = true;
  //         setTimeout(() => this.showErrorMessage = false, 4000);
  //         this.errorMesage = err.error.message;
  //       }
  //     })
  //   } catch (err) {
  //     console.log('Error al crear el evento: ',err);
  //   }
  // }

  createEvent(): void{
    this.eventSvc.createEvent(this.eventForm.value).subscribe({
      next: (res) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.eventForm.reset();
      },
      error: (err) => {
        this.showErrorMessage = true;
        setTimeout(() => this.showErrorMessage = false, 4000);
        this.errorMesage = err.error.message;
      }
    })
  }


  ngOnInit(): void {
    console.log('usuario actual:', this.currentUser);
  }

}
