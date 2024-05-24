//front/src/app/components/vista-de-creacion-carta/vista-de-creacion-carta.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateCardService } from '../../services/create-card.service';
import { Clan, Discipline, DisciplineName } from '../../models/vtes.model';
import { IconService } from '../../services/icon.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-vista-de-creacion-carta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageCropperComponent
  ],
  templateUrl: './vista-de-creacion-carta.component.html',
  styleUrl: './vista-de-creacion-carta.component.scss'
})
export class VistaDeCreacionCartaComponent {

  customCardForm: FormGroup;

  constructor(
    private CreateCardSvc: CreateCardService,
    private iconSvc: IconService,
    private sanitizer: DomSanitizer
  ) {
    this.customCardForm = this.CreateCardSvc.getForm();
  }

  public selectedDisciplines: Discipline[] = [];
  public disciplineImages = this.iconSvc.disciplineImages;
  public disciplineSelected: { [key: string]: boolean } = {};

  public lowerCaseIcon?: string = '';

  getClanIcon(clan: keyof typeof Clan): string {
    let nombreCompuesto = '';
    let clanIcon
    if (clan.split(' ').length > 1) {
      for (let palabra of clan.split(' ')) {
        nombreCompuesto += palabra.charAt(0).toUpperCase() + palabra.slice(1);
      }
      clanIcon = Clan[nombreCompuesto as keyof typeof Clan];
      clanIcon = clanIcon.split(' ').join('');
    } else {
      clanIcon = Clan[clan]
    }
    this.lowerCaseIcon = clanIcon.toLowerCase();
    // console.log('ClanIcon: ', lowerCaseIcon);
    return `assets/img/icons-vtes/clans/svg/${this.lowerCaseIcon}.svg`;
  }

  getDisciplineIcon(discipline: string): string {
    const disciplineIcon = DisciplineName[discipline as keyof typeof DisciplineName];
    return `assets/img/icons-vtes/disciplinas/svg/${disciplineIcon}.svg`;
  }

  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      // console.log('Discipline:', target.alt)
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  // updateDisciplineSelection(discipline: Discipline): void {
  //   this.customCardForm.value.disciplines[discipline] = !this.customCardForm.value.disciplines[discipline];
  //   this.onDisciplinesChange();
  // }
  updateDisciplineSelection(discipline: Discipline): void {
    this.customCardForm.get('disciplines')?.get(discipline)?.setValue(!this.customCardForm.get('disciplines')?.get(discipline)?.value);
    this.onDisciplinesChange();
  }
  

  // onDisciplinesChange(): void {
  //   this.selectedDisciplines = Object.keys(this.customCardForm.value.disciplines)
  //     .filter(discipline => this.customCardForm.value.disciplines[discipline as Discipline])
  //     .map(discipline => discipline as Discipline);
  // }
  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.customCardForm.get('disciplines')?.value || {})
      .filter(discipline => this.customCardForm.get('disciplines')?.get(discipline)?.value)
      .map(discipline => discipline as Discipline);
  }
  

}
