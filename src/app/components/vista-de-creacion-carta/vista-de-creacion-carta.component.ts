//front/src/app/components/vista-de-creacion-carta/vista-de-creacion-carta.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateCardService } from '../../services/create-card.service';
import { Clan, Discipline, DisciplineName } from '../../models/vtes.model';
import { IconService } from '../../services/icon.service';

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
    private CreateCardSvc: CreateCardService,
    private iconSvc: IconService
  ){
    this.customCardForm = this.CreateCardSvc.getForm();
  }

  public selectedDisciplines: Discipline[] = [];
  public disciplineImages = this.iconSvc.disciplineImages;
  public disciplineSelected: { [key: string]: boolean } = {};


  getClanIcon(clan: string): string {
    const clanIcon = Clan[clan as keyof typeof Clan];
    // console.log('ClanIcon: ',clanIcon);
    return `assets/img/icons-vtes/clans/svg/${clanIcon}.svg`;
  }

  getDisciplineIcon(discipline: string): string {
    const disciplineIcon = DisciplineName[discipline as keyof typeof DisciplineName];
    return `assets/img/icons-vtes/disciplinas/svg/${disciplineIcon}.svg`;
  }

  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      console.log('Discipline:',target.alt)
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  updateDisciplineSelection(discipline: Discipline): void {
    this.customCardForm.value.disciplines[discipline] = !this.customCardForm.value.disciplines[discipline];
    this.onDisciplinesChange();
  }

  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.customCardForm.value.disciplines)
      .filter(discipline => this.customCardForm.value.disciplines[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }

}
