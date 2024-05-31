//front/src/app/pages/main/deck/deck/deck.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeckService } from '../../../../services/deck.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Deck } from '../../../../models/deck.model';
import { BehaviorSubject, Observable, filter, of } from 'rxjs';
import { IconService } from '../../../../services/icon.service';
import { Clan } from '../../../../models/vtes.model';
import { FilterDecksPipe } from '../../../../pipes/filter-decks.pipe';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/card.service';
import { FilterAnyPipe } from '../../../../pipes/filter-any.pipe';
import { FilterPipe } from '../../../../pipes/filter.pipe';

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
    FilterAnyPipe,
    FilterPipe
  ],
})
export class NewDeckComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private deckSvc: DeckService,
    private router: Router,
    private authSvc: AuthService,
    public iconSvc: IconService,
    public cardSvc: CardService
  ) { }

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
    author: new FormControl('anonimo'),
    isPublic: new FormControl(true),
  });

  cardSelected: boolean = false;
  deckCryptCards: any = [];
  deckLibraryCards: any = [];
  newDeckId: string = '';
  cards: any = [];
  filteredCardsCrypt: any[] = [];
  filteredCardsLibrary: any[] = [];
  user: User = this.authSvc.getCurrentUser()!;
  deck$!: Deck;
  url: string = '';


  //IMAGEN DESTACADA
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
  message: string = '';

  private currentDeckId: string = '';
  private currentDeckSubject: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.deckForm.get('searchCryptCard')?.valueChanges.subscribe(() => {
      this.filtradoCrypt();
    });
    this.deckForm.get('searchLibraryCard')?.valueChanges.subscribe(() => {
      this.filtradoLibrary();
    });
    this.currentDeckId = window.location.pathname.split('/')[2];
    this.deckSvc.setCurrentDeckId(this.currentDeckId);
    this.deckSvc.getDeckById(this.currentDeckId).subscribe((deck) => {
      this.deck$ = deck;
      deck.category != ''
        ? this.deckForm.get('category')?.setValue(deck.category)
        : null;
      deck.name != '' ? this.deckForm.get('name')?.setValue(deck.name) : null;
      deck.crypt.length != 0
        ? this.deckForm.get('crypt')?.setValue(deck.crypt)
        : this.deckForm.get('crypt')?.setValue(deck.crypt);
      deck.library.length != 0
        ? this.deckForm.get('library')?.setValue(deck.library)
        : this.deckForm.get('library')?.setValue(deck.library);
      deck.description != ''
        ? this.deckForm.get('description')?.setValue(deck.description)
        : null;
      this.deckForm.get('category')?.setValue(deck.category);
      deck.author != ''
        ? this.deckForm.get('author')?.setValue(deck.author)
        : this.deckForm.get('author')?.setValue(deck.author);
        deck.isPublic ? this.deckForm.get('isPublic')?.setValue(true) : this.deckForm.get('isPublic')?.setValue(false);
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
        this.deckSvc.setCurrentDeckId(this.newDeckId);
        this.router.navigate([`/deck/${this.newDeckId}`]);
        this.showErrorMessage = false;
        this.showSucessMessage = true;
        this.message = 'Mazo creado correctamente';
        setTimeout(() => {
        }, 5000);
        // console.log('Id deck: ', this.newDeckId);
        // console.log('CurrentDeck: ', this.deckSvc.getCurrentDeck());
        // console.log('Response: ', response);
      },
      (error) =>{
        console.error(error);
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = 'Error al crear el mazo';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }

  copyDeck(): void {
    this.resetForm();
    this.deckForm.get('userId')!.setValue(this.authSvc.getCurrentUser()?._id);
    if (this.deckForm.get('name')?.value == '') {
      this.deckForm.get('name')!.setValue('Sin nombre');
    }
    this.deckForm.get('name')?.setValue(`Copy of ${this.deck$.name}`);
    this.deckForm.get('author')?.setValue(this.user.nick);
    this.deckForm.get('description')?.setValue(`${this.deck$.description}`);
    this.deckForm.get('category')?.setValue(this.deck$.category);
    this.deckForm.get('isPublic')?.setValue(this.deck$.isPublic);
    this.deckForm.get('crypt')?.setValue(this.deck$.crypt);
    this.deckForm.get('library')?.setValue(this.deck$.library);
    const deck = this.deckForm.value;
    this.deckSvc.createDeck(deck).subscribe(
      (response: any) => {
        this.newDeckId = response.id;
        this.deckSvc.setCurrentDeckId(this.newDeckId);
        this.router.navigate([`/deck/${this.newDeckId}`]);
      },
      (error) => {
        console.error(error);
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = 'Error al generar la copia del mazo';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }

  resetForm(): void {
    if(this.deckForm){
      this.deckForm.get('author')!.setValue(this.user.nick);
      this.deckForm.get('name')!.setValue('Sin nombre');
      this.deckForm.get('isPublic')!.setValue(true);
      this.deckForm.get('category')!.setValue('');
      this.deckForm.get('description')!.setValue('Descripcion');
      this.deckForm.get('crypt')!.setValue([]);
      this.deckForm.get('library')!.setValue([]);
      this.deckForm.get('searchCryptCard')!.setValue('')
      this.deckForm.get('searchLibraryCard')!.setValue('');
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
        this.showErrorMessage = false;
        this.showSucessMessage = true;
        this.message = 'Carta personalizada actualizada correctamente';
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
      },
      (error) => {
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = 'Error al actualizar la carta personalizada';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
        console.error('Error al actualizar la carta personalizada:', error);
        console.error('Error details:', error.error);
      }
    );
  }

  deleteDeck(): void {
    this.deckSvc.deleteDeck(this.currentDeckId).subscribe(
      (response) => {
        console.log('Mazo eliminado:', response);
        this.router.navigate(['/lista-decks']);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.message = 'Mazo eliminado correctamente';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      },
      (error) => {
        if (error.status === 401) {
          this.showSucessMessage = false;
          this.showErrorMessage = true;
          this.message = 'No tienes permiso para eliminar este mazo.';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        } else {
          console.error('Error al eliminar el Mazo:', error);
          console.error('Error details:', error.error);
        }
      }
    );
  }

  // CAMBIAR ESTADO DE MAZO PUBLICO O PRIVADO
  public changeDeckVisibility(): void {
    console.log('isPublic: ', this.deckForm.get('isPublic')?.value, ' Opuesto:', !this.deckForm.get('isPublic')?.value);
    this.deckSvc.updateDeckVisibility(this.currentDeckId, !this.deckForm.get('isPublic')?.value).subscribe(
      (response) => {
        console.log('Mazo actualizado:', response);
        this.deckForm.get('isPublic')?.setValue(!this.deckForm.get('isPublic')?.value);
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.message = 'Visibilidad del mazo actualizada correctamente';
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
      },
      (error) => {
        console.error(error);
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = 'Error al actualizar la visibilidad del mazo';
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }

  updateView(): void {
    this.router.navigate([`/deck/${this.newDeckId}`]);
  }

  getCurrentDeckId(): Observable<string> {
    return this.currentDeckSubject.asObservable();
  }

  // AGREGAR CARTAS A LA CRYPT
  public addCardToCrypt(card: any): void {
    try{
      let valor = this.deckForm.get('crypt')?.value;
      let obj = {
        quantity: 1,
        _id: card,
      };
      valor.push(obj);
      this.deckForm.get('crypt')?.setValue(valor);
      this.showSucessMessage = true;
      this.showErrorMessage = false;
      this.message = 'Carta agregada correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;
      },5000);
    }catch(error){
      console.log(error);
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al agregar la carta';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }

  // AGREGAR CARTAS A LA LIBRERIA
  public addCardToLibrary(card: any): void {
    try{
      let valor = this.deckForm.get('library')?.value;
    let obj = {
      quantity: 1,
      _id: card,
    };
    valor.push(obj);
    this.deckForm.get('library')?.setValue(valor);
    console.log(card);
    this.showSucessMessage = true;
    this.showErrorMessage = false;
    this.message = 'Carta agregada correctamente';
    setTimeout(() => {
      this.showSucessMessage = false;
    },5000);
    }catch(error){
      console.log(error);
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al agregar la carta';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }


  // ELIMINAR CARTAS
  deleteCardCrypt(card: any) {
    const index = this.deckForm.get('crypt')?.value.indexOf(card);
    if (index !== -1) {
      this.deckForm.get('crypt')?.value.splice(index, 1);
      this.showSucessMessage = true;
      this.showErrorMessage = false;
      this.message = 'Carta eliminada correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;   
      },5000)
    }else{
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al eliminar la carta';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }
  deleteCardLibrary(card: any) {
    const index = this.deckForm.get('library')?.value.indexOf(card);
    if (index !== -1) {
      this.deckForm.get('library')?.value.splice(index, 1);
      this.showSucessMessage = true;
      this.showErrorMessage = false;
      this.message = 'Carta eliminada correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;   
      },5000)
    }else{
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al eliminar la carta';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }


  // MODIFICAR CANTIDAD
  public changeQuantity(event: Event, item: any): void {
    let qty = event.target as HTMLInputElement;
    item.quantity = qty.value;
    console.log(qty.value, 'FUNCIONA!!!!!!!!!!!!!!', event);
  }

  // FILTRADO DE CARTAS CRYPT
  filtradoCrypt(): void {
    const searchValue = this.deckForm.get('searchCryptCard')?.value.toLowerCase();
    if (!searchValue) {
      this.filteredCardsCrypt = [];
    } else {
      this.filteredCardsCrypt = this.cards.filter((card: any) =>
        card.name.toLowerCase().includes(searchValue)
      );
    }
  }
  
  
  // FILTRADO DE CARTAS LIBRERIA
  filtradoLibrary(): void {
    const searchValue = this.deckForm.get('searchLibraryCard')?.value.toLowerCase();
    if (!searchValue) {
      this.filteredCardsLibrary = [];
    } else {
      this.filteredCardsLibrary = this.cards.filter((card: any) =>
        card.name.toLowerCase().includes(searchValue)
      );
    }
  }

  // OBTENER ICONOS DE CLAN
  getClanUrl(clanName: string): string {
    const clan = this.clanImages.find(item => item.name.replace(/\s/g, '') === clanName.toLowerCase().replace(/\s/g, ''));
    return clan ? clan.url : '';
  }

  printTxt() {
    try{
      this.deckSvc.printTxt(this.currentDeckId, this.deckForm.get('name')?.value, this.deckForm.get('author')?.value);
      this.showSucessMessage = true;
      this.showErrorMessage = false;
      this.message = 'Lista de Cartas agregada correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;
      },5000);
    }catch(error){
      console.log(error);
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al agregar la lista de cartas';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }

  printPDF(){
    try{
      this.deckSvc.printPDF(this.currentDeckId, this.deckForm.get('name')?.value, this.deckForm.get('author')?.value);
      this.showSucessMessage = true;
      this.showErrorMessage = false;
      this.message = 'Imagenes de Cartas descargadas correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;
      }, 5000);
    }catch(error){
      console.log(error);
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = 'Error al descargar las imagenes de las cartas';
      setTimeout(() => {
        this.showErrorMessage = false;
      },5000)
    }
  }
}
