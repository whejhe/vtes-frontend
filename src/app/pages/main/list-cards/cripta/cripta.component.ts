//src/app/pages/main/list-cards/cripta/cripta.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
// import { Card} from '../../../../models/card.model';
import {Card, Clan, Discipline, Title, Traits, Type } from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsCardVampireComponent } from '../../../../components/details-card-vampire/details-card-vampire.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { IconService } from '../../../../services/icon.service';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { CardService } from '../../../../services/card.service';

@Component({
  selector: 'app-cripta',
  standalone: true,
  templateUrl: './cripta.component.html',
  styleUrl: './cripta.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    FormsModule,
    FilterPipe,
    FilterMultiPipe,
    ReactiveFormsModule
  ],
})
export class CriptaComponent implements OnInit {

  constructor(
    private jsonSvc: JsonServiceService,
    public dialog: MatDialog,
    public iconSvc: IconService,
    public cardSvc: CardService
  ) { }

  cryptForm: FormGroup = new FormGroup({
    searchName: new FormControl(''),
    searchGroup: new FormControl(''),
    searchClan: new FormControl(''),
    selectedDisciplines: new FormControl([]),
    selectedTitles: new FormControl([]),// No funciona
    selectedTraits: new FormControl([]),// No funciona
    capacityMax: new FormControl(''), // No funciona
    capacityMin: new FormControl(''), // No funciona
    sect: new FormControl(''), // No funciona
  });


  cards: Card[] = [];
  filter: string = '';
  searchSect: string = '';
  clans = Object.values(Clan);
  clan: string = '';

  disciplines = Object.values(Discipline)
  disciplineSelected: { [key: string]: boolean } = {};

  disciplineImages = this.iconSvc.disciplineImages;
  clanImages = this.iconSvc.clanImages;

  checkTitle: string = '';
  titles = Object.values(Title);
  titlesSelected: { [key in Title]?: boolean } = {};
  // selectedTitles: Title[] = [];
  traits = Object.values(Traits);
  traitsSelected: { [key in Traits]?: boolean } = {};
  // selectedTraits: Traits[] = [];
  url: string = '';


  minCapacity: number = 1;
  maxCapacity: number = 11;
  searchCapacity = null;
  capacity: number = 0;

  setUrlImage(url: string): void {
    this.url = url;
  }

  clearUrlImage(): void {
    this.url = '';
  }

  openModal(card: Card): void {
    this.dialog.open(DetailsCardVampireComponent, {
      data: { card },
    });
  }

  getDisciplineUrl(disciplineName: Discipline): string {
    const discipline = this.disciplineImages.find(item => item.name === disciplineName);
    return discipline ? discipline.url : '';
  }

  getClanUrl(clanName: Clan): string {
    const clan = this.clanImages.find(item => item.name.replace(/\s/g, '') === clanName.replace(/\s/g, ''));
    return clan ? clan.url : '';
  }

  getCapacityCostImage(capacityCost: number | undefined){
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  onSearchClanChange(newValue: string): void {
    this.cryptForm.value.searchClan = newValue;
    console.log('Valor actual de searchClan:', this.cryptForm.value.searchClan);
  }

  resetFiterClan(): void {
    this.cryptForm.value.searchClan = '';
  }

  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  updateDisciplineSelection(discipline: Discipline): void {
    this.disciplineSelected[discipline] = !this.disciplineSelected[discipline];
    this.onDisciplinesChange();
  }

  onDisciplinesChange(): void {
    this.cryptForm.value.selectedDisciplines = Object.keys(this.disciplineSelected)
      .filter(discipline => this.disciplineSelected[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }


  onTitlesChange(): void {
    this.cryptForm.value.selectedTitles = Object.keys(this.titlesSelected)
      .filter(title => this.titlesSelected[title as Title])
      .map(title => title as Title);
  }

  onTraitsChange(): void {
    this.cryptForm.value.selectedTraits = Object.keys(this.traitsSelected)
      .filter(trait => this.traitsSelected[trait as Traits])
      .map(trait => trait as Traits);
  }

  onChangeMinCapacity(): void {
    this.minCapacity = 1;
  }

  onChangeMaxCapacity(): void {
    this.maxCapacity = 11;
  }

  loadCards(): void {
    this.cardSvc.getCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  formSubmit() {
    console.log('Crypt Form: ',this.cryptForm.value);
  }


  ngOnInit(): void {
    this.loadCards();
    // this.jsonSvc.getJsonData().subscribe((cards) => {
    //   this.cards = cards;
    // });
    this.clanImages = this.clans.map(clan => ({
      name: clan,
      url: `https://static.krcg.org/svg/clan/${clan.toLowerCase().replace(/\s/g, '')}.svg`
    }));
  }
}
