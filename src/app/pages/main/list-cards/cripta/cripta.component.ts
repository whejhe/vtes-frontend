//src/app/pages/main/list-cards/cripta/cripta.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
// import { Card} from '../../../../models/card.model';
import {
  Card,
  Clan,
  Discipline,
  Title,
  Traits,
  Type,
  Habilities,
} from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DetailsCardVampireComponent } from '../../../../components/details-card-vampire/details-card-vampire.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
    ReactiveFormsModule,
  ],
})
export class CriptaComponent implements OnInit {
  constructor(
    public jsonSvc: JsonServiceService,
    public dialog: MatDialog,
    public iconSvc: IconService,
    public cardSvc: CardService
  ) { }

  cryptForm: FormGroup = new FormGroup({
    searchName: new FormControl(''),
    searchByCardText: new FormControl(''),
    searchGroup: new FormControl(''),
    searchClan: new FormControl(''),
    searchTitle: new FormControl(''),
    searchHabilities: new FormControl(''),
    selectedDisciplines: new FormControl([]),
    searchMinCapacity: new FormControl(),
    searchMaxCapacity: new FormControl(),
    searchSect: new FormControl(''), // No funciona
  });

  cards: Card[] = [];
  filter: string = '';
  searchSect: string = '';

  clans = Object.values(Clan);
  clan: string = '';

  titles = Object.values(Title);
  title: string = '';

  habilities = Object.values(Habilities);
  hability: string = '';

  minCapacity: number = 1;
  newMinCapacity?: number;
  maxCapacity: number = 11;
  newMaxCapacity?: number;

  disciplines = Object.values(Discipline);
  disciplineSelected: { [key: string]: boolean } = {};

  disciplineImages = this.iconSvc.disciplineImages;
  clanImages = this.iconSvc.clanImages;

  checkTitle: string = '';
  url: string = '';

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
    const discipline = this.disciplineImages.find(
      (item) => item.name === disciplineName
    );
    return discipline ? discipline.url : '';
  }

  getClanUrl(clanName: Clan): string {
    const clan = this.clanImages.find(
      (item) => item.name.replace(/\s/g, '') === clanName.replace(/\s/g, '')
    );
    return clan ? clan.url : '';
  }

  getCapacityCostImage(capacityCost: number | undefined) {
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  // SEARCH CLAN
  onSearchClanChange(newValue: string): void {
    const searchClanControl = this.cryptForm.get('searchClan');
    if (searchClanControl) {
      searchClanControl.setValue(newValue);
      searchClanControl.updateValueAndValidity();
    }
  }

  // RESET FILTER CLAN
  resetFiterClan(): void {
    const searchClanControl = this.cryptForm.get('searchClan');
    if (searchClanControl) {
      searchClanControl.setValue('');
      searchClanControl.updateValueAndValidity();
    }
  }

  // SEARCH TITLE
  onSearchTitleChange(newValue: string): void {
    const searchTitleControl = this.cryptForm.get('searchTitle');
    if (searchTitleControl) {
      searchTitleControl.setValue(newValue);
      searchTitleControl.updateValueAndValidity();
    }
  }

  // RESET FILTER TITLE
  resetFiterTitle(): void {
    const searchTitleControl = this.cryptForm.get('searchTitle');
    if (searchTitleControl) {
      searchTitleControl.setValue('');
      searchTitleControl.updateValueAndValidity();
    }
  }

  // SEARCH HABILITIES
  onSearchHabilitiesChange(newValue: string): void {
    const searchHabilitiesControl = this.cryptForm.get('searchHabilities');
    if (searchHabilitiesControl) {
      searchHabilitiesControl.setValue(newValue);
      searchHabilitiesControl.updateValueAndValidity();
    }
  }

  // RESET FILTER HABILITIES
  resetFiterHabilities(): void {
    const searchHabilitiesControl = this.cryptForm.get('searchHabilities');
    if (searchHabilitiesControl) {
      searchHabilitiesControl.setValue('');
      searchHabilitiesControl.updateValueAndValidity();
    }
  }

  // SEARCH BY MIN CAPACITY
  onSearchMinCapacityChange(newMinCapacity?: number): void {
    const searchMinCapacityControl = this.cryptForm.get('searchMinCapacity');
    if (searchMinCapacityControl) {
      searchMinCapacityControl.setValue(newMinCapacity);
      searchMinCapacityControl.updateValueAndValidity();
    }
  }

  // SEARCH BY MAX CAPACITY
  onSearchMaxCapacityChange(newMaxCapacity?: number): void {
    const searchMaxCapacityControl = this.cryptForm.get('searchMaxCapacity');
    if (searchMaxCapacityControl) {
      searchMaxCapacityControl.setValue(newMaxCapacity);
      searchMaxCapacityControl.updateValueAndValidity();
    }
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
    this.cryptForm.value.selectedDisciplines = Object.keys(
      this.disciplineSelected
    )
      .filter((discipline) => this.disciplineSelected[discipline as Discipline])
      .map((discipline) => discipline as Discipline);
  }

  loadCards(): void {
    this.cardSvc.getCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  formSubmit() {
    console.log('Crypt Form: ', this.cryptForm.value);
  }

  ngOnInit(): void {
    this.loadCards();
    this.clanImages = this.clans.map((clan) => ({
      name: clan,
      url: `https://static.krcg.org/svg/clan/${clan
        .toLowerCase()
        .replace(/\s/g, '')}.svg`,
    }));
  }
}
