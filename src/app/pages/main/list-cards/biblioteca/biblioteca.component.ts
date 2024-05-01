//src/app/pages/main/list-cards/biblioteca/biblioteca.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Card,
  Clan,
  Discipline,
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
    titlesSelected: new FormControl([]),
    bloodCosts: new FormControl(['1', '2', '3', '4', 'X']),
    poolCosts: new FormControl(['1', '2', '3', '4', '5', '6', 'X']),
    traitsSelected: new FormControl([]),
  });

  title: {name: string }[] = [];
  combat: {name: string }[] = [];
  action: {name: string }[] = [];
  reaction: {name: string }[] = [];
  others: {name: string }[] = [];
  bloodCost: {name: string }[] = [];
  poolCost: {name: string }[] = [];

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
  public titles = Object.values(Title);
  // public titlesSelected: { [key in Title]?: boolean } = {};
  public selectedTitles: Title[] = [];

  public types = Object.values(Type).filter(
    (type) => type !== 'Vampire' && type !== 'Imbued'
  );
  public typeSelected: { [key: string]: boolean } = {};
  // public selectedTypes: Type[] = [];

  public traits = Object.values(Traits);
  // public traitsSelected: { [key in Traits]?: boolean } = {};
  public selectedTraits: Traits[] = [];

  public clans = Object.values(Clan);
  // public searchClan: string = '';
  public clan = '';

  public searcBloodCost: string = '';
  // public bloodCosts = ['1', '2', '3', '4'];
  public bloodCostSelected: { [key: string]: boolean } = {};
  public selectedBloodCosts: string[] = [];

  public searchPoolCost: string = '';
  // public poolCosts = ['1', '2', '3', '4', '5', '6'];
  public poolCostSelected: { [key: string]: boolean } = {};
  public selectedPoolCosts: string[] = [];

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

  //FILTROS POR CARACTERISTICAS
  onTraitsChange(): void {
    this.selectedTraits = Object.keys(this.libraryForm.value.traitsSelected)
      .filter((trait) => this.libraryForm.value.traitsSelected[trait as Traits])
      .map((trait) => trait as Traits);
  }

  //FILTROS POR TITULOS
  onTitlesChange(): void {
    this.selectedTitles = Object.keys(this.libraryForm.value.titlesSelected)
      .filter((title) => this.libraryForm.value.titlesSelected[title as Title])
      .map((title) => title as Title);
  }

  //FILTROS POR COSTES
  onBloodCostsChange(): void {
    this.selectedBloodCosts = Object.keys(this.bloodCostSelected)
      .filter((bloodCost) => this.bloodCostSelected[bloodCost])
      .map((bloodCost) => bloodCost);
  }

  //FILTROS POR COSTES
  onPoolCostsChange(): void {
    this.selectedPoolCosts = Object.keys(this.poolCostSelected)
      .filter((poolCost) => this.poolCostSelected[poolCost])
      .map((poolCost) => poolCost);
  }

  loadCards(): void {
    this.cardSvc.getCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  ngOnInit(): void {
    this.loadCards();
    this.reaction = this.jsonSvc.reactionsData;
    this.others = this.jsonSvc.othersData;
    this.bloodCost = this.jsonSvc.bloodCostData;
    this.poolCost = this.jsonSvc.poolCostData;
  }
}
