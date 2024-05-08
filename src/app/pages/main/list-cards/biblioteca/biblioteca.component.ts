//src/app/pages/main/list-cards/biblioteca/biblioteca.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Card,
  Clan,
  Combat,
  Discipline,
  Sect,
  Title,
  Traits,
  Type,
} from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsCardLibraryComponent } from '../../../../components/details-card-library/details-card-library.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { IconService } from '../../../../services/icon.service';
import { __values } from 'tslib';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { User } from '../../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { CardService } from '../../../../services/card.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    FilterPipe,
    FilterMultiPipe
  ],
})
export class BibliotecaComponent implements OnInit {
  user: User | null = null;

  constructor(
    private jsonSvc: JsonServiceService,
    public dialog: MatDialog,
    public iconSvc: IconService,
    public cardSvc: CardService
  ) {}

  libraryForm: FormGroup = new FormGroup({
    searchName : new FormControl(''),
    searchByCardText: new FormControl(''),
    selectedTypes: new FormControl([]),
    searchClan: new FormControl(''),
    searchSect: new FormControl(''),
    searchByTraits: new FormControl(''),
    searchTitle: new FormControl(''),
    searchBloodCosts: new FormControl(''),
    searchPoolCosts: new FormControl(''),
  });

  sects = Object.values(Sect);
  sect = '';

  titles = Object.values(Title);
  title = '';

  traits = Object.values(Traits);
  trait = '';

  public clans = Object.values(Clan);
  public clan = '';

  poolCosts = ['0', '1', '2', '3', '4', '5', '6'];
  poolCost = '';
  bloodCosts = ['0', '1', '2', '3', '4'];
  booldCost = '';

  private httpClient = inject(HttpClient);

  public cards!: Card[];
  public filter!: string;
  public searchName: string = '';
  public searchSect: string = '';

  public url: string = '';

  imageStyles!: { width: string; height: string };

  public disciplineImages = this.iconSvc.disciplineImages;

  // public disciplines = Object.values(Discipline);
  public disciplineSelected: { [key: string]: boolean } = {};
  public selectedDisciplines: Discipline[] = [];

  public checkTitle: string = '';


  public types = Object.values(Type).filter(
    (type) => type !== 'Vampire' && type !== 'Imbued'
  );
  public typeSelected: { [key: string]: boolean } = {};


  setUrlImage(url: string): void {
    this.url = url;
  }

  clearUrlImage(): void {
    this.url = '';
  }

  openModal(card: Card): void {
    this.dialog.open(DetailsCardLibraryComponent, {
      data: { card },
    });
  }

  //URL IMAGENES DISCIPLINAS
  getDisciplineUrl(disciplineName: string): string {
    const discipline = this.disciplineImages.find(
      (item) => item.name === disciplineName
    );
    return discipline ? discipline.url : '';
  }

  //URL IMAGENES COSTES PERSONAJES
  getCapacityCostImage(capacityCost: number | undefined) {
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  //URL IMAGENES COSTES BOOD
  getBloodCostImage(bloodCost: string | undefined) {
    this.iconSvc.getBloodCostImage(bloodCost);
    return this.iconSvc.getBloodCostImage(bloodCost);
  }

  //URL IMAGENES COSTES POOL
  getPoolCostImage(poolCost: string | undefined) {
    this.iconSvc.getPoolCostImage(poolCost);
    return this.iconSvc.getPoolCostImage(poolCost);
  }

  //FILTROS DE DISCIPLINAS

  //MODIFICAR ICONO FILTRO
  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  //SELECCIONAR DISCIPLINAS
  updateDisciplineSelection(discipline: Discipline): void {
    this.disciplineSelected[discipline] = !this.disciplineSelected[discipline];
    this.onDisciplinesChange();
  }

  //SELECCIONAR DISCIPLINAS
  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.disciplineSelected)
      .filter((discipline) => this.disciplineSelected[discipline as Discipline])
      .map((discipline) => discipline as Discipline);
  }

  //FILTRO PARA BIBLIOTECA
  onTypeChange(newValue: string): void {
    this.libraryForm.value.selectedTypes = Object.keys(this.typeSelected)
      .filter(
        (type) =>
          (this.typeSelected[type as Type] && type !== 'Vampire') ||
          type !== 'Imbued'
      )
      .map((type) => type as Type);
  }

  resetFilterType(): void {
    // this.libraryForm.value.selectedTypes = [];
    const selectedTypesControl = this.libraryForm.get('selectedTypes');
      if (selectedTypesControl) {
        selectedTypesControl.setValue([]);
      }
  }

  //FILTROS DE CLAN
  onSearchClanChange(newValue: string): void {
    // this.libraryForm.value.searchClan = newValue;
    const searchClanControl = this.libraryForm.get('searchClan');
    if (searchClanControl) {
      searchClanControl.setValue(newValue);
      searchClanControl.updateValueAndValidity();
    }
  }

  resetFiterClan(): void {
    // this.libraryForm.value.searchClan = '';
    const searchClanControl = this.libraryForm.get('searchClan');
  if (searchClanControl) {
    searchClanControl.setValue('');
    searchClanControl.updateValueAndValidity();
  }
  }

  //SEARCH BY TRAITS
  onSearchTraitsChange(newValue: string): void {
    const searchByTraitsControl = this.libraryForm.get('searchByTraits');
    if(searchByTraitsControl) {
      searchByTraitsControl.setValue(newValue);
      searchByTraitsControl.updateValueAndValidity();
    }
  }

  // RESET FILTER TRAITS
  resetFiterTraits(): void {
    const searchByTraitsControl = this.libraryForm.get('searchByTraits');
    if (searchByTraitsControl) {
      searchByTraitsControl.setValue('');
      searchByTraitsControl.updateValueAndValidity();
    }
  }

  // SEARCH TITLE
  onSearchTitleChange(newValue: string): void {
    const searchTitleControl = this.libraryForm.get('searchTitle');
    if (searchTitleControl) {
      searchTitleControl.setValue(newValue);
      searchTitleControl.updateValueAndValidity();
    }
  }

  // RESET FILTER TITLE
  resetFiterTitle(): void {
    const searchTitleControl = this.libraryForm.get('searchTitle');
    if (searchTitleControl) {
      searchTitleControl.setValue('');
      searchTitleControl.updateValueAndValidity();
    }
  }

  // SEARCH SECT
  onSearchSectChange(newValue: string): void {
    const searchSectControl = this.libraryForm.get('searchSect');
    if (searchSectControl) {
      searchSectControl.setValue(newValue);
      searchSectControl.updateValueAndValidity();
    }
  }

  // RESET FILTER SECT
  resetFiterSect(): void {
    const searchSectControl = this.libraryForm.get('searchSect');
    if (searchSectControl) {
      searchSectControl.setValue('');
      searchSectControl.updateValueAndValidity();
    }
  }

  //FILTROS POR BOOD_COST
  // onBloodCostsChange(): void {

  // }

  //FILTROS POR POOL_COST
  // onSearchPoolCostChange(){

  // }
  // resetFiterPoolCost(): void {

  // }

  loadCards(): void {
    this.cardSvc.getCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  ngOnInit(): void {
    this.loadCards();
    console.log('Cards: ',this.cards);
  }
}
