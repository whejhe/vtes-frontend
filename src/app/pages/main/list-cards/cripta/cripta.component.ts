//src/app/pages/main/list-cards/cripta/cripta.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Card, Clan, Discipline, Title, Traits, Type } from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsCardVampireComponent } from '../../../../components/details-card-vampire/details-card-vampire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { IconService } from '../../../../services/icon.service';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';

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
  ],
})
export class CriptaComponent implements OnInit {

  constructor(
    private jsonSvc: JsonServiceService,
    public dialog: MatDialog,
    public iconSvc: IconService,
  ) { }

  public cards!: Card[];
  public filter!: string;
  public searchName: string = '';
  public searchSect: string = '';
  public searchGroup: string = '';

  public clans = Object.values(Clan);
  public searchClan: string = '';
  public clan = '';
  // public clanSelected: { [key: string]: boolean } = {};
  // public selectedClan: Clan[] = [];

  public disciplines = Object.values(Discipline)
  public disciplineSelected: { [key: string]: boolean } = {};
  public selectedDisciplines: Discipline[] = [];

  public disciplineImages = this.iconSvc.disciplineImages;
  public clanImages = this.iconSvc.clanImages;

  public checkTitle: string = '';
  public titles = Object.values(Title);
  public titlesSelected: { [key in Title]?: boolean } = {};
  public selectedTitles: Title[] = [];

  public traits = Object.values(Traits);
  public traitsSelected: { [key in Traits]?: boolean } = {};
  public selectedTraits: Traits[] = [];

  public url: string = '';


  public minCapacity: number = 1;
  public maxCapacity: number = 11;
  public searchCapacity = null;
  public capacity: number = 0;


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
    this.searchClan = newValue;
    console.log('Valor actual de searchClan:', this.searchClan);
  }

  resetFiterClan(): void {
    this.searchClan = '';
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
    this.selectedDisciplines = Object.keys(this.disciplineSelected)
      .filter(discipline => this.disciplineSelected[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }


  onTitlesChange(): void {
    this.selectedTitles = Object.keys(this.titlesSelected)
      .filter(title => this.titlesSelected[title as Title])
      .map(title => title as Title);
  }

  onTraitsChange(): void {
    this.selectedTraits = Object.keys(this.traitsSelected)
      .filter(trait => this.traitsSelected[trait as Traits])
      .map(trait => trait as Traits);
  }

  onChangeMinCapacity(): void {
    this.minCapacity = 1;
  }

  onChangeMaxCapacity(): void {
    this.maxCapacity = 11;
  }


  ngOnInit(): void {
    this.jsonSvc.getJsonData().subscribe((cards) => {
      this.cards = cards;
    });
    this.clanImages = this.clans.map(clan => ({
      name: clan,
      url: `https://static.krcg.org/svg/clan/${clan.toLowerCase().replace(/\s/g, '')}.svg`
    }));
    // this.clanImages = this.clans.map(clan => ({
    //   name: clan,
    //   url: `https://static.krcg.org/svg/clan/${clan.toLowerCase()}.svg`
    // }));
    console.log('clan:', this.clans)
    // console.log('Titulos: ', this.titles)
    // console.log('getClanUrl: ', this.getClanUrl(this.clans[0]))
  }
}
