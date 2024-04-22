// front/src/app/pages/main/deck/ficha-deck/ficha-deck.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconService } from '../../../../services/icon.service';
import { JsonServiceService } from '../../../../services/json-service.service';
import { Card, Discipline } from '../../../../models/vtes.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { DeckService } from '../../../../services/deck.service';
import { Deck } from '../../../../models/deck.model';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-ficha-deck',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPipe,
    FilterMultiPipe
  ],
  templateUrl: './ficha-deck.component.html',
  styleUrl: './ficha-deck.component.scss'
})
export class FichaDeckComponent implements OnInit {

  @Input() currentUser: User | null = null;
  @Input() decks: Deck[] = [];
  user: User = this.authSvc.getCurrentUser()!;

  cards!: Card[];
  cardsInDeck: Card[] = [];
  numCardsInDeck: number = 0;
  showErrorMessage: boolean = false;
  searchName: string = '';
  filteredCards: Card[] = [];

  title: string = '';
  author: string = '';
  description: string = '';
  category: string = '';


  public currentDeckId: string = '';

  public card = {} as Card;

  public disciplines = Object.values(Discipline);
  public disciplineImages = this.iconSvc.disciplineImages;


  public filter!: string;


  constructor(
    private iconSvc: IconService,
    private jsonSvc: JsonServiceService,
    private deckSvc: DeckService,
    private authSvc: AuthService,
    private route: ActivatedRoute,
  ) {}

  loadCards(): void {
    this.jsonSvc.getJsonData().subscribe((cards) => {
      this.cards = cards;
    },(error) =>{
      console.log('Error al cargar las cartas:',error);
    })
  }

  filterCards(): void {
    this.filteredCards = this.cards.filter(card =>
      card._name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  getCurrentUser() {
    this.authSvc.getCurrentUser()
  }

  // ACTUALIZAR UN MAZO
  saveDeck(): void {

  }

  getNumCardsInDeck(): number {
    if (this.numCardsInDeck < 60) {
      this.showErrorMessage = true;
    } else if (this.numCardsInDeck > 90) {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
    }
    return this.numCardsInDeck;
  }

  addCardToDeck(card: Card): void {
    this.cardsInDeck.push(card);
    this.numCardsInDeck++;
    this.updateErrorMessage();
    this.searchName = '';
    this.filteredCards = [];
  }

  updateErrorMessage(): void {
    if (this.numCardsInDeck < 60 || this.numCardsInDeck > 90) {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
    }
  }

  //URL IMAGENES DISCIPLINAS
  getDisciplineUrl(disciplineName: string): string {
    const discipline = this.disciplineImages.find(item => item.name === disciplineName);
    return discipline ? discipline.url : '';
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

  //URL IMAGENES COSTES PERSONAJES
  getCapacityCostImage(capacityCost: number | undefined) {
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  removeCardFromDeck(card: Card): void {
    const index = this.cardsInDeck.indexOf(card);
    if (index !== -1) {
      this.cardsInDeck.splice(index, 1);
      this.numCardsInDeck--;
      this.updateErrorMessage();
    }
  }

  getDecks() {
    this.deckSvc.getDecks().subscribe(
      (decks: Deck[]) => {
        this.decks = decks;
        console.log('Decks: ', this.decks);
      },
      (error) => {
        console.log('Error al obtener los decks: ', error);
      });
  }

  ngOnInit(): void {
    this.loadCards();
    this.getDecks();
    console.log(this.decks);
  }

}
