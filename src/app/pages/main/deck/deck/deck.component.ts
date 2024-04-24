//front/src/app/pages/main/deck/deck/deck.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeckService } from '../../../../services/deck.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Deck } from '../../../../models/deck.model';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { IconService } from '../../../../services/icon.service';
import { Clan } from '../../../../models/vtes.model';
import { FilterDecksPipe } from '../../../../pipes/filter-decks.pipe';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/card.service';
import { FilterAnyPipe } from '../../../../pipes/filter-any.pipe';

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FilterDecksPipe,
    FormsModule,
    FilterAnyPipe
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
    // cards: new FormControl([]),
    crypt: new FormControl([]),
    library: new FormControl([]),
    searchCryptCard: new FormControl(''),
    searchLibraryCard: new FormControl(''),
    author: new FormControl(''),
  });
  cardSelected: boolean = false
  deckCryptCards: any = [];
  deckLibraryCards: any = [];
  newDeckId: string = '';
  cards: any = [];
  filteredCardsCrypt: any[] = [];
  filteredCardsLibrary: any[] = [];
  user: User = this.authSvc.getCurrentUser()!;
  deck$!: Deck;

  // public searchCryptCard: string = '';

  //IMAGEN DESTACADA
  public url: string = '';
  setUrlImage(url: string): void {
    this.url = url;
  }
  clearUrlImage(): void {
    this.url = '';
  }
  public clanImages = this.iconSvc.clanImages;
  public clans = Object.values(Clan);
  public clan = '';

  //MENSAJES DE ERROR
  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMesage: string = '';

  private currentDeckId: string = '';
  private currentDeckSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private deckSvc: DeckService,
    private router: Router,
    private authSvc: AuthService,
    public iconSvc: IconService,
    public cardSvc: CardService
  ) { }

  ngOnInit(): void {
    this.currentDeckId = window.location.pathname.split('/')[2];
    this.deckSvc.setCurrentDeckId(this.currentDeckId);
    this.deckSvc.getDeckById(this.currentDeckId).subscribe((deck) => {
      this.deck$ = deck
      deck.category != '' ? this.deckForm.get('category')?.setValue(deck.category) : null
      deck.name != '' ? this.deckForm.get('name')?.setValue(deck.name) : null
      deck.crypt.length != 0 ? this.deckForm.get('crypt')?.setValue(deck.crypt) : this.deckForm.get('crypt')?.setValue(deck.crypt)
      deck.library.length != 0 ? this.deckForm.get('library')?.setValue(deck.library) : this.deckForm.get('library')?.setValue(deck.library)
      deck.description != '' ? this.deckForm.get('description')?.setValue(deck.description) : null
      this.deckForm.get('category')?.setValue(deck.category)
      deck.author != '' ? this.deckForm.get('author')?.setValue(deck.author) : this.deckForm.get('author')?.setValue(deck.author)
      // console.log(deck.cards);
    });

    this.cardSvc.getCards().subscribe((cardsToDeck) => {
      this.cards = cardsToDeck;
    });
  }


  removeCard(index: number): void {
    if (this.deckForm) {
      (this.deckForm.get('cards') as FormArray).removeAt(index);
    }
  }

  createDeck(): void {
    this.resetForm();
    this.deckForm.get('userId')!.setValue(this.authSvc.getCurrentUser()?._id);
    if (this.deckForm.get('name')?.value == '') {
      this.deckForm.get('name')!.setValue('Sin nombre');
    }
    this.deckForm.get('author')?.setValue(this.user.nick);
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

  resetForm(): void {
    this.deckForm.reset();
    if (this.deckForm.get('name')?.value == null) {
      this.deckForm.get('name')!.setValue('Sin nombre');
      this.deckForm.get('publico')!.setValue(true);
      this.deckForm.get('category')!.setValue('');
      this.deckForm.get('description')!.setValue('Descripcion');
      this.deckForm.get('cards')!.setValue([]);
      this.deckForm.get('searchCryptCard'),
        this.deckForm.get('searchLibraryCard')
    }
  }


  updateDeck(): void {
    const deck = this.deckForm.value;
    deck._id = this.currentDeckId;
    console.log('Deck to update:', deck);
    if (!deck._id) {
      console.error('Error: deck._id is undefined');
    }
    this.deckSvc.updateDeck(this.currentDeckId, deck).subscribe(
      (response) => {
        console.log('Carta personalizada actualizada:', response);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
      },
      (error) => {
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
        console.error('Error al actualizar la carta personalizada:', error);
        console.error('Error details:', error.error);
      }
    );
  }

  updateView(): void {
    this.router.navigate([`/deck/${this.newDeckId}`]);
  }

  getCurrentDeckId(): Observable<string> {
    return this.currentDeckSubject.asObservable();
  }

  public addCardToCrypt(card: any): void {
    // this.deckCryptCards.push(card)
    // (this.deckForm.get('crypt') as FormArray).push(new FormGroup({
    //   _id: new FormControl(card),
    //   quantity: new FormControl(1)
    // }));
    let valor = this.deckForm.get('crypt')?.value
    let obj = {
      quantity: 1,
      _id: card
    }
    valor.push(obj)
    this.deckForm.get('crypt')?.setValue(valor)
  }

  public addCardToLibrary(card: any): void {
    // this.deckLibraryCards.push(card)
    // (this.deckForm.get('library') as FormArray).push(new FormGroup({
    //   _id: new FormControl(card),
    //   quantity: new FormControl(1)
    // }));
    let valor = this.deckForm.get('library')?.value
    let obj = {
      quantity: 1,
      _id: card
    }
    valor.push(obj)
    this.deckForm.get('library')?.setValue(valor)
    console.log(card)
  }

  public changeQuantity(event: Event, item: any): void {
    let qty = event.target as HTMLInputElement
    item.quantity = qty.value
    console.log(qty.value, 'FUNCIONA!!!!!!!!!!!!!!', event)
  }

  filtradoCrypt(): void {
    if (this.deckForm.get('searchCryptCard')?.value === '') {
      this.filteredCardsCrypt = [];
    } else {
      this.filteredCardsCrypt = this.cards.filter((card: any) => card.name.toLowerCase().includes(this.deckForm.get('searchCryptCard')?.value.toLowerCase())
      )
    }
  }

  filtradoLibrary(): void {
    if (this.deckForm.get('searchLibraryCard')?.value === '') {
      this.filteredCardsLibrary = [];
    } else {
      this.filteredCardsLibrary = this.cards.filter((card: any) => card.name.toLowerCase().includes(this.deckForm.get('searchLibraryCard')?.value.toLowerCase())
      )
    }
  }
}
