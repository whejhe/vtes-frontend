//src/app/pages/main/list-cards/biblioteca/biblioteca.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Card, Clan, Discipline, Title, Traits, Type } from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsCardLibraryComponent } from '../../../../components/details-card-library/details-card-library.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../pipes/filter.pipe';
// import { ImageStoreService } from '../../../../services/image-store.service';
import { IconService } from '../../../../services/icon.service';
import { __values } from 'tslib';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';

@Component({
    selector: 'app-biblioteca',
    standalone: true,
    templateUrl: './biblioteca.component.html',
    styleUrl: './biblioteca.component.scss',
    imports: [
      AsyncPipe,
      CommonModule,
      FormsModule,
      FilterPipe,
      FilterMultiPipe
    ]
  })
  export class BibliotecaComponent implements OnInit {

    constructor(
      private jsonSvc: JsonServiceService,
      public dialog: MatDialog,
      public iconSvc : IconService
    ) {}

  public cards!: Card[];
  public filter!: string;
  public searchName:string = '';
  public searchSect: string = '';

  public url: string = '';

  imageStyles!: { width: string; height: string; };

  public disciplineImages = this.iconSvc.disciplineImages;

  public disciplines = Object.values(Discipline)
  public disciplineSelected: { [key: string]: boolean } = {};
  public selectedDisciplines: Discipline[] = [];

  public checkTitle: string = '';
  public titles = Object.values(Title);
  public titlesSelected: { [key in Title]?: boolean } = {};
  public selectedTitles: Title[] = [];

  public types = Object.values(Type).filter(type => type !== 'Vampire' && type !== 'Imbued');
  public typeSelected: { [key: string]: boolean } = {};
  public selectedTypes: Type[] = [];

  public traits = Object.values(Traits);
  public traitsSelected: { [key in Traits]?: boolean } = {};
  public selectedTraits: Traits[] = [];

  public clans = Object.values(Clan);
  public searchClan: string = '';
  public clan = '';

  public searcBloodCost: string = '';
  public bloodCosts = ['1', '2', '3', '4'];
  public bloodCostSelected: { [key: string]: boolean } = {};
  public selectedBloodCosts: string[] = [];

  public searchPoolCost: string = '';
  public poolCosts = ['1', '2', '3', '4', '5', '6'];
  public poolCostSelected: { [key: string]: boolean } = {};
  public selectedPoolCosts: string[] = [];


  setUrlImage(url: string):void {
    this.url = url;
  }

  clearUrlImage():void{
    this.url = '';
  }


  openModal(card:Card):void{
    this.dialog.open(DetailsCardLibraryComponent, {
      data: {card}
    });
  }

  //URL IMAGENES DISCIPLINAS
  getDisciplineUrl(disciplineName: string): string {
    const discipline = this.disciplineImages.find(item => item.name === disciplineName);
    return discipline ? discipline.url : '';
  }

  //URL IMAGENES COSTES PERSONAJES
  getCapacityCostImage(capacityCost: number | undefined){
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  //URL IMAGENES COSTES BOOD
  getBloodCostImage(bloodCost: string | undefined){
    this.iconSvc.getBloodCostImage(bloodCost);
    return this.iconSvc.getBloodCostImage(bloodCost);
  }

  //URL IMAGENES COSTES POOL
  getPoolCostImage(poolCost: string | undefined){
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
      .filter(discipline => this.disciplineSelected[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }


  //FILTRO PARA BIBLIOTECA
  onTypeChange(newValue: string): void {
    this.selectedTypes = Object.keys(this.typeSelected)
      .filter(type => this.typeSelected[type as Type] && type !== 'Vampire' || type !== 'Imbued')
      .map(type => type as Type)
    }

  resetFilterType(): void {
    this.selectedTypes = [];
  }


  //FILTROS DE CLAN
  onSearchClanChange(newValue: string): void {
    this.searchClan = newValue;
    console.log('Valor actual de searchClan:', this.searchClan);
  }

  resetFiterClan(): void {
    this.searchClan = '';
  }


  //FILTROS POR CARACTERISTICAS
  onTraitsChange(): void {
    this.selectedTraits = Object.keys(this.traitsSelected)
      .filter(trait => this.traitsSelected[trait as Traits])
      .map(trait => trait as Traits);
  }

  //FILTROS POR TITULOS
  onTitlesChange(): void {
    this.selectedTitles = Object.keys(this.titlesSelected)
      .filter(title => this.titlesSelected[title as Title])
      .map(title => title as Title);
  }


  //FILTROS POR COSTES
  onBloodCostsChange(): void {
    this.selectedBloodCosts = Object.keys(this.bloodCostSelected)
      .filter(bloodCost => this.bloodCostSelected[bloodCost])
      .map(bloodCost => bloodCost);
  }

  //FILTROS POR COSTES
  onPoolCostsChange(): void {
    this.selectedPoolCosts = Object.keys(this.poolCostSelected)
      .filter(poolCost => this.poolCostSelected[poolCost])
      .map(poolCost => poolCost);
  }

  ngOnInit(): void {
    this.jsonSvc.getJsonData().subscribe((cards) => {
      this.cards = cards;
    });
  }
}
