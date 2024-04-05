import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-filtro-crypt',
    standalone: true,
    templateUrl: './filtro-crypt.component.html',
    styleUrl: './filtro-crypt.component.scss',
    imports: [
      AsyncPipe, 
      CommonModule
    ]
})
export class FiltroCryptComponent{

  constructor(
  ) { }

  DisciplinesUrl = '/assets/img/icons-vtes/disciplinas/svg';

  imagenSeleccionada: string | null = null;
  inferiorSelect: boolean = false;
  superiorSelect: boolean = false;


  disciplines: string[] = [
    'abombwe',
    'animalism',
    'auspex',
    'bloodsorcery',
    'celerity',
    'chimerstry',
    'daimoinon',
    'dementation',
    'dominate',
    'fortitude',
    'melpominee',
    'mytherceria',
    'necromancy',
    'obeah',
    'obfuscate',
    'obtenebration',
    'potence',
    'presence',
    'protean',
    'quietus',
    'sanguinus',
    'serpentis',
    'spiritus',
    'temporis',
    'thanatosis',
    'valeren',
    'vicissitude',
    'visceratika',
    'defense',
    'innocence',
    'judgment',
    'martyrdom',
    'redemption',
    'vision',
    'vengeance',
  ];


  cambiarImagen(imagen: string) {
    const imagenElement = document.getElementById(imagen) as HTMLImageElement;

    if (this.imagenSeleccionada === imagen) {
      // Verifica si ya se ha aplicado la versión superior
      if (imagenElement.src.includes('sup')) {
        // Si ya tiene la versión superior, la deselecciona
        this.superiorSelect = false;
        this.inferiorSelect = false;
        imagenElement.src = `${this.DisciplinesUrl}/${imagen}.svg`;
        this.imagenSeleccionada = null;
      } else {
        // Si no tiene la versión superior, la aplica
        this.superiorSelect = true;
        imagenElement.src = `${this.DisciplinesUrl}/${imagen}sup.svg`;
      }
    } else if (this.imagenSeleccionada === null || this.imagenSeleccionada !== imagen) {
      // Si es la primera vez que se hace clic en la imagen, la selecciona
      this.inferiorSelect = true;
      this.superiorSelect = false;
      imagenElement.src = `${this.DisciplinesUrl}/${imagen}.svg`;
      this.imagenSeleccionada = imagen;
    } else {
      // Si ya se ha seleccionado la imagen y se hace clic nuevamente, aplica la versión superior
      this.superiorSelect = true;
      this.inferiorSelect = false;
      imagenElement.src = `${this.DisciplinesUrl}/${imagen}sup.svg`;
    }
  }



}
