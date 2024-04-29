//front/src/app/pages/main/custom-cards/custom/custom.component.ts
import { Component } from '@angular/core';
import { Card, Clan, Discipline, DisciplineName } from '../../../../models/vtes.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss'
})
export class CustomComponent {

  customCardForm: FormGroup;
  clans = Object.values(Clan);
  disciplines = Object.values(DisciplineName);
  discipline:string = '';
  logoColors = ['red', 'green', 'blue', 'black', 'white'];
  imageUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private customCardsService: CustomCardsService
  ) {
    this.customCardForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1), Validators.max(11)]],
      image: ['', Validators.required],
      clan: ['', Validators.required],
      disciplines: [[], Validators.required],
      group: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      logoColor: ['red', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.customCardForm.get('image')?.setValue(file);
    this.imageUrl = URL.createObjectURL(file);
  }

  getDisciplineIcon(discipline: string): string {
    const disciplineIcon = DisciplineName[discipline as keyof typeof DisciplineName];
    return `assets/img/icons-vtes/disciplinas/svg/${disciplineIcon}.svg`;
  }

  getClanIcon(clan: string): string {
    const clanIcon = Clan[clan as keyof typeof Clan];
    return `assets/img/icons-vtes/clans/${clanIcon}.gif`;
  }

  getDisciplinesNames(disciplines: string[]): string {
    return disciplines.join(', ');
  }

  getDisciplinePosition(discipline: string): string {
  const disciplines = this.customCardForm.get('disciplines')?.value || [];
  const index = disciplines.indexOf(discipline);
  return `${48 - (index * 8)}%`;
}

  onSubmit(): void {
    if (this.customCardForm.valid) {
      this.customCardsService.createCustomCard(this.customCardForm.value).subscribe(
        (response) => {
          console.log('Carta personalizada creada:', response);
        },
        (error) => {
          console.error('Error al crear la carta personalizada:', error);
        }
      );
    }
  }
}
