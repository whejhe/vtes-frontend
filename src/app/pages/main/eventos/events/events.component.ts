// front/src/app/pages/main/eventos/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  eventForm: FormGroup = new FormGroup({
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
    private eventSvc: EventService,
    private router: Router
  ){}

  // createEvent(){
  //   if(this.eventForm.valid){
  //     const eventData: Event = {
  //       _id: '',
  //       creatorId: this.authSvc.getCurrentUser()?._id,
  //       name: this.eventForm.get('name')?.value,
  //       email: this.eventForm.get('email')?.value,
  //       type: this.eventForm.get('type')?.value,
  //       provincia: this.eventForm.get('provincia')?.value,
  //       localidad: this.eventForm.get('localidad')?.value,
  //       direccion: this.eventForm.get('direccion')?.value, 
  //       description: this.eventForm.get('description')?.value,
  //       fecha: this.eventForm.get('fecha')?.value,
  //       hora: this.eventForm.get('hora')?.value,
  //       numMaxParticipantes: this.eventForm.get('numMaxParticipantes')?.value
  //     };
  //     this.eventSvc.createEvent(eventData).subscribe(
  //       (response: any) => {
  //         console.log('response', response);
  //         this.showSucessMessage = true;
  //         this.showErrorMessage = false;
  //         setTimeout(() => {
  //           this.showSucessMessage = false;
  //         },5000);
  //         this.router.navigate(['/listar-eventos']);
  //       },
  //       (error: any) => {
  //         console.log('error', error);
  //         this.showSucessMessage = false;
  //         this.showErrorMessage = true;
  //         setTimeout(() => {
  //           this.showErrorMessage = false;
  //         },5000);
  //       }
  //     )
  //   }
  // }

  ngOnInit(): void {
  }

}
