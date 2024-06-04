//src/app/pages/main/list-cards/biblioteca/biblioteca.component.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Card,
  Clan,
  Discipline,
  Title,
  Sect,
  Traits,
  Type,
} from '../../../../models/vtes.model';
import { JsonServiceService } from '../../../../services/json-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsCardLibraryComponent } from '../../../../components/details-card-library/details-card-library.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { IconService } from '../../../../services/icon.service';
import { CardService } from '../../../../services/card.service';
import { Deck } from '../../../../models/deck.model';
import { AuthService } from '../../../../services/auth.service';
import { ModalAgregarCartaComponent } from '../../../../components/modal-agregar-carta/modal-agregar-carta.component';

// import { __values } from 'tslib';
// import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipe,
    FilterMultiPipe,
  ],
})
export class BibliotecaComponent implements OnInit {
decks: any;
  constructor(
    private jsonSvc: JsonServiceService,
    public dialog: MatDialog,
    public iconSvc: IconService,
    public cardSvc: CardService,
    public authSvc: AuthService
  ) {}

  libraryForm: FormGroup = new FormGroup({
    searchName: new FormControl(''),
    selectedTypes: new FormControl([]),
    selectedDisciplines: new FormControl([]),
    searchClan: new FormControl(''),
    searchTitle: new FormControl(''),
    searchByCardText: new FormControl(''),
    searchSect: new FormControl(''),
    searchByTraits: new FormControl(''),
  });

  userDecks: Deck[] = []; 
  currentUser = this.authSvc.getCurrentUser();

  isLoading: boolean = true;
  agregar:boolean = false;

  sects = Object.values(Sect);
  sect = '';

  titles = Object.values(Title);
  title = '';

  traits = Object.values(Traits);
  trait = '';

  types = Object.values(Type);
  type = '';

  public clans = Object.values(Clan);
  public clan = '';

  public cards!: Card[];
  public filter!: string;
  public searchName: string = '';
  public searchSect: string = '';

  public url: string = '';

  imageStyles!: { width: string; height: string };

  public disciplineImages = this.iconSvc.disciplineImages;

  public disciplineSelected: { [key: string]: boolean } = {};
  public selectedDisciplines: Discipline[] = [];

  public checkTitle: string = '';

  // public types = Object.values(Type).filter(
  //   (type) => type !== 'Vampire' && type !== 'Imbued'
  // );
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

  // openModalListDecks(decks: Deck): void {
  //   this.dialog.open(ModalAgregarCartaComponent, {
  //     data: { decks: this.userDecks },
  //   });
  // }

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
  onDisciplinesChange(): void {
    this.libraryForm.value.selectedDisciplines = Object.keys(this.disciplineSelected)
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
    if (searchByTraitsControl) {
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

  loadCards(): void {
    this.cardSvc.getCards().subscribe((cards) => {
      this.cards = cards;
      
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }
}
