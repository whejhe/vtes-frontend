// front/src/app/services/create-card.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateCardService {

  private customCardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.customCardForm = this.formBuilder.group({
      name: ['Choose a name', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1), Validators.max(11)]],
      image: ['', Validators.required],
      clan: ['Abomination', Validators.required],
      disciplines: [[], Validators.required],
      group: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      logoColor: ['black', Validators.required],
      description: ['Sect. Your description here', Validators.required]
    });
  }

  getForm(): FormGroup {
    return this.customCardForm;
  }

  updateForm(data: any): void {
    this.customCardForm.patchValue(data);
  }
}
