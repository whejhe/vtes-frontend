//front/src/app/pages/main/deck/deck/deck.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../../../models/card.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FilterPipe } from "../../../../pipes/filter.pipe";
import { FilterMultiPipe } from "../../../../pipes/filter-multi.pipe";
import { DeckService } from '../../../../services/deck.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Deck } from '../../../../models/deck.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FilterPipe,
    FilterMultiPipe
  ]
})
export class NewDeckComponent implements OnInit {

  apiUrl = 'http://localhost:3000/decks';
  deckForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    name: new FormControl('Mazo nuevo'),
    description: new FormControl('Descripcion'),
    category: new FormControl(''),
    publico: new FormControl(true),
    cards: new FormControl([]),
  });
  newDeckId: string = '';
  cards: any[] = [];
  user: User = this.authSvc.getCurrentUser()!;
  deck$!: Deck;

  private currentDeckId: string = '';
  private currentDeckSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private deckSvc: DeckService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.currentDeckId = window.location.pathname.split('/')[2];
    this.deckSvc.setCurrentDeckId(this.currentDeckId);
    this.deckSvc.getDeckById(this.currentDeckId).subscribe((deck) => {
      this.deck$ = deck
      deck.category != '' ? this.deckForm.get('category')?.setValue(deck.category) : null
      deck.name != '' ? this.deckForm.get('name')?.setValue(deck.name) : null
      deck.cards.length != 0 ? this.deckForm.get('cards')?.setValue(deck.cards) : this.deckForm.get('cards')?.setValue(deck.cards)
      deck.description != '' ? this.deckForm.get('description')?.setValue(deck.description) : null
      this.deckForm.get('category')?.setValue(deck.category)
      this.cards = deck.cards;
      console.log(deck.cards);
    });
  }

  addCard(): void {
    const cardForm = new FormGroup({
      card: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required)
    });
    if (this.deckForm) {
      (this.deckForm.get('cards') as FormArray).push(cardForm);
    }
  }

  removeCard(index: number): void {
    if (this.deckForm) {
      (this.deckForm.get('cards') as FormArray).removeAt(index);
    }
  }

  createDeck(): void {
    this.deckForm.get('userId')!.setValue(this.authSvc.getCurrentUser()?._id);
    if (this.deckForm.get('name')?.value == '') {
      this.deckForm.get('name')!.setValue('Sin nombre');
    }
    const deck = this.deckForm.value;
    this.deckSvc.createDeck(deck).subscribe(
      (response: any) => {
        this.newDeckId = response.id;
        this.deckSvc.setCurrentDeckId(this.newDeckId); // <--- Agregué esta línea
        this.router.navigate([`/deck/${this.newDeckId}`]);
        console.log('Id deck: ', this.newDeckId);
        console.log('CurrentDeck: ', this.deckSvc.getCurrentDeck());
      },
      (error) => console.error(error)
    )
  }


  updateDeck(): void {
    const deck = this.deckForm.value;
    this.deckSvc.updateDeck(this.currentDeckId, deck).subscribe(
      (response) => {
        console.log('Carta personalizada actualizada:', response);
      },
      (error) => {
        console.error('Error al actualizar la carta personalizada:', error);
      }
    );
  }

  updateView(): void {
    this.router.navigate([`/deck/${this.newDeckId}`]);
  }

  getCurrentDeckId(): Observable<string> {
    return this.currentDeckSubject.asObservable();
  }
}
