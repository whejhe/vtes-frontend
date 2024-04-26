import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor() { }

  // todo = this.todoSvc.getMessage();

  // title = '';
  // name = '';
  // email = '';
  // message = '';

  sendForm():void{
    // console.log(this.title, this.name, this.email, this.message);
  }


  // FORMULARIO REACTIVO
  contactForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    name: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  formSubmit():void{
    console.log('Datos Formulario: ',this.contactForm.value);
  }
}
