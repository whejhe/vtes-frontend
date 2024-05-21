//front/src/app/pages/main/custom-cards/custom/custom.component.ts
import { Component } from '@angular/core';
import { Card, Clan, Discipline, DisciplineName } from '../../../../models/vtes.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconService } from '../../../../services/icon.service';
import { VistaDeCreacionCartaComponent } from "../../../../components/vista-de-creacion-carta/vista-de-creacion-carta.component";

@Component({
    selector: 'app-custom',
    standalone: true,
    templateUrl: './custom.component.html',
    styleUrl: './custom.component.scss',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        VistaDeCreacionCartaComponent
    ]
})
export class CustomComponent {

  customCardForm: FormGroup;
  clans = Object.values(Clan);
  clan:string = '';
  disciplines = Object.values(DisciplineName);
  discipline:string = '';
  logoColors = ['red', 'green', 'blue', 'black', 'white'];
  imageUrl: string = '';

  public disciplineImages = this.iconSvc.disciplineImages;
  public clanImages = this.iconSvc.clanImages;

  constructor(
    private formBuilder: FormBuilder,
    private customCardsService: CustomCardsService,
    private iconSvc: IconService
  ) {
    this.customCardForm = this.formBuilder.group({
      name: ['Choose a name', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1), Validators.max(11)]],
      image: ['', Validators.required],
      clan: ['', Validators.required],
      disciplines: [[], Validators.required],
      group: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      logoColor: ['red', Validators.required],
      description: ['Sect. Your description here', Validators.required]
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
    return `assets/img/icons-vtes/clans/svg/${clanIcon}.svg`;
  }

  getDisciplinesNames(disciplines: string[]): string {
    return disciplines.join(', ');
  }

  getClansNames(clans: string[]): string {
    return clans.join(', ');
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
