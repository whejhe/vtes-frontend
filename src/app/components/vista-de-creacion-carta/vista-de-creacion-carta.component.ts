//front/src/app/components/vista-de-creacion-carta/vista-de-creacion-carta.component.ts

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateCardService } from '../../services/create-card.service';
import { Clan, Discipline, DisciplineName } from '../../models/vtes.model';
import { IconService } from '../../services/icon.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import html2canvas from 'html2canvas';

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
  @Input() selectedDisciplines: Discipline[] = [];
  @Input() colorLogo: string = 'black';
  @Output() imageSelected = new EventEmitter<string>();

  // public selectedDisciplines: Discipline[] = [];
  public disciplineImages = this.iconSvc.disciplineImages;
  public disciplineSelected: { [key: string]: boolean } = {};

  public logoColors = ['red', 'green', 'blue', 'black', 'white'];
  // public lowerCaseIcon: string = '';

  getClanIcon(clan: keyof typeof Clan): string {
    let nombreCompuesto = '';
    let lowerCaseIcon = '';
    let clanIcon;
    if (clan.split(' ').length > 1) {
      for (let palabra of clan.split(' ')) {
        nombreCompuesto += palabra.charAt(0).toUpperCase() + palabra.slice(1);
      }
      clanIcon = Clan[nombreCompuesto as keyof typeof Clan];
      clanIcon = clanIcon.split(' ').join('');
      if (clanIcon === 'DaughterofCacophony') {
        clanIcon = 'daughtersofcacophony';
      } else if (clanIcon === 'HarbingerofSkulls') {
        clanIcon = 'harbingersofskulls';
      }
    } else {
      clanIcon = Clan[clan]
    }
    lowerCaseIcon = clanIcon.toLowerCase();
    if (lowerCaseIcon === 'abomination') {
      lowerCaseIcon = 'abominations';
    } else if (lowerCaseIcon === 'gargoyle') {
      lowerCaseIcon = 'gargoyles';
    }
    // 
    return `assets/img/icons-vtes/clans/svg/${lowerCaseIcon}.svg`;
  }

  getDisciplineIcon(discipline: string): string {
    
    if (/[A-Z]/.test(discipline[0])) {
      return `assets/img/icons-vtes/disciplinas/svg/sup/${discipline}.svg`;
    } else {
      return `assets/img/icons-vtes/disciplinas/svg/inf/${discipline}.svg`;
    }
    // const disciplineIcon = DisciplineName[discipline as keyof typeof DisciplineName];
  }

  setLogoColor(color: string): string {
    if (color === 'white') {
      return "assets/img/icons-vtes/logo/logo-white.svg";
    } else if (color === 'black') {
      return "assets/img/icons-vtes/logo/logo-black.svg";
    } else if (color === 'blue') {
      return "assets/img/icons-vtes/logo/logo-blue.svg";
    } else if (color === 'green') {
      return "assets/img/icons-vtes/logo/logo-green.svg";
    } else if (color === 'red') {
      return "assets/img/icons-vtes/logo/logo-red.svg";
    }
    return `assets/img/icons-vtes/logo/logo-black.svg`;
  }

  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      // 
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  updateDisciplineSelection(discipline: Discipline): void {
    this.customCardForm.get('disciplines')?.get(discipline)?.setValue(!this.customCardForm.get('disciplines')?.get(discipline)?.value);
    this.onDisciplinesChange();
  }


  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.customCardForm.get('disciplines')?.value || {})
      .filter(discipline => this.customCardForm.get('disciplines')?.get(discipline)?.value)
      .map(discipline => discipline as Discipline);
  }

}
