//front/src/app/pages/main/custom-cards/custom/custom.component.ts
import { Component, OnInit } from '@angular/core';
import { Card, Clan, Discipline, DisciplineName } from '../../../../models/vtes.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconService } from '../../../../services/icon.service';
import { VistaDeCreacionCartaComponent } from "../../../../components/vista-de-creacion-carta/vista-de-creacion-carta.component";
import { CreateCardService } from '../../../../services/create-card.service';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Icon } from '../../../../models/icon.model';

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
        VistaDeCreacionCartaComponent,
        ImageCropperComponent
    ]
})
export class CustomComponent implements OnInit {

  customCardForm: FormGroup;
  clans = Object.values(Clan);
  clan:string = '';
  disciplines = Object.values(DisciplineName);
  discipline:string = '';
  logoColors = ['red', 'green', 'blue', 'black', 'white'];
  imageUrl: string = '';

  public disciplineImages = this.iconSvc.disciplineImages;
  public clanImages = this.iconSvc.clanImages;
  public selectedDisciplines: Discipline[] = [];
  public disciplineSelected: { [key: string]: boolean } = {};
  iconsClans: Icon[] = [];
  iconName:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private customCardsService: CustomCardsService,
    private iconSvc: IconService,
    private CreateCardSvc: CreateCardService,
    private sanitizer: DomSanitizer

  ) {
    this.customCardForm = this.CreateCardSvc.getForm();
  }

  // getIconByType(type:string, name:string):void{
  //   this.iconSvc.getIconsByType('clans',name).subscribe(
  //     (icons: Icon[]) => {
  //       console.log('Icons: ',icons)
  //       this.iconsClans = icons;
  //       console.log(this.iconsClans)
  //     },
  //     (error) => {
  //       console.error('Error al obtener los iconos:', error);
  //     }
  //   )
  // }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.customCardForm.get('image')?.setValue(file);
    this.imageUrl = URL.createObjectURL(file);
  }

  getDisciplineIcon(discipline: string): string {
    const disciplineIcon = DisciplineName[discipline as keyof typeof DisciplineName];
    return `assets/img/icons-vtes/disciplinas/svg/${disciplineIcon}.svg`;
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

toggleOpacity(event: MouseEvent): void {
  const target = event.target as HTMLImageElement;
  if (target.classList.contains('icon-filter')) {
    // console.log('Discipline:',target.alt)
    target.classList.toggle('clicked');
    this.updateDisciplineSelection(target.alt as Discipline);
  }
}

updateDisciplineSelection(discipline: Discipline): void {
  this.customCardForm.value.disciplines[discipline] = !this.customCardForm.value.disciplines[discipline];
  this.onDisciplinesChange();
  // console.log('Disciplinas seleccionadas:',this.customCardForm.value.disciplines)
}

onDisciplinesChange(): void {
  this.selectedDisciplines = Object.keys(this.customCardForm.value.disciplines)
    .filter(discipline => this.customCardForm.value.disciplines[discipline as Discipline])
    .map(discipline => discipline as Discipline);

  console.log('Disciplinas seleccionadas:',this.selectedDisciplines)
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

  ngOnInit(): void {
  }
}
