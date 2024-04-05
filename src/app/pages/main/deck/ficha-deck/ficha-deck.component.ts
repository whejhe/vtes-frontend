// front/src/app/pages/main/deck/ficha-deck/ficha-deck.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconService } from '../../../../services/icon.service';
import { JsonServiceService } from '../../../../services/json-service.service';
import { Card, Discipline } from '../../../../models/vtes.model';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';

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

  constructor(
    private iconSvc: IconService,
    private jsonSvc: JsonServiceService
  ) { }

  public cards!: Card[];
  public cardsInDeck: Card[] = [];
  public numCardsInDeck: number = 0;
  public card = {} as Card;

  public disciplines = Object.values(Discipline);
  public disciplineImages = this.iconSvc.disciplineImages;


  public searchNameCrypt: string = '';
  public searchNameLibrary: string = '';
  public filteredCards: Card[] = [];
  public filter!: string;

  public showErrorMessage: boolean = false;

  loadCards(): void {
    this.jsonSvc.getJsonData().subscribe((cards) => {
      this.cards = cards;
    })
  }

  filterCards(): void {
    this.filteredCards = this.cards.filter(card =>
      card._name.toLowerCase().includes(this.searchNameLibrary.toLowerCase())
    );
  }


  getNumCardsInDeck(): number {
    if(this.numCardsInDeck < 60){
      this.showErrorMessage = true;
    }else if(this.numCardsInDeck > 90){
      this.showErrorMessage = true;
    }else{
      this.showErrorMessage = false;
    }
    return this.numCardsInDeck;
  }

  addCardToDeck(card: Card): void {
    this.cardsInDeck.push(card);
    this.numCardsInDeck++;
    if(this.numCardsInDeck > 90){
      this.showErrorMessage = true;
    }else{
      this.showErrorMessage = false;
    }
    this.searchNameLibrary = '';
    this.filteredCards = [];
  }

  //URL IMAGENES DISCIPLINAS
  getDisciplineUrl(disciplineName: string): string {
    const discipline = this.disciplineImages.find(item => item.name === disciplineName);
    return discipline ? discipline.url : '';
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

  //URL IMAGENES COSTES PERSONAJES
  getCapacityCostImage(capacityCost: number | undefined){
    this.iconSvc.getCapacityCostImage(capacityCost);
    return this.iconSvc.getCapacityCostImage(capacityCost);
  }

  removeCardsInDeck(card: Card): void {
    const index = this.cardsInDeck.indexOf(card);
    if(index !== -1) {
      this.cardsInDeck.splice(index, 1);
      this.numCardsInDeck--;
      if(this.numCardsInDeck < 60){
        this.showErrorMessage = true;
      }else if(this.numCardsInDeck > 90){
        this.showErrorMessage = true;
      }else{
        this.showErrorMessage = false;
      }
    }
  }

  ngOnInit(): void {
    this.loadCards();
  }

}
