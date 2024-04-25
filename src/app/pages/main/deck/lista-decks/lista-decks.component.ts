//front/src/app/pages/main/deck/lista-decks/lista-decks.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeckService } from '../../../../services/deck.service';
import { Deck } from '../../../../models/deck.model';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { FilterDecksPipe } from '../../../../pipes/filter-decks.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-lista-decks',
    standalone: true,
    templateUrl: './lista-decks.component.html',
    styleUrl: './lista-decks.component.scss',
    imports: [
        RouterLink,
        CommonModule,
        FilterDecksPipe,
        ReactiveFormsModule
    ]
})
export class ListaDecksComponent implements OnInit {

    constructor(
        public deckSvc: DeckService,
        public authSvc: AuthService
    ) { }

    decks: Deck[] = [];
    user: User[] = [];


    listDeckForm: FormGroup = new FormGroup({
      category: new FormControl('*'),
    })

    getUsers():void {
        this.authSvc.getUsers().subscribe(
            (users: User[]) => {
                this.user = users;
                console.log('Users: ', this.user);
            },
            (error) => {
                console.log('Error al obtener los usuarios: ', error);
            });
    }

    //CONTAR TOTAL DE CAARTAS Y SU CANTIDAD
    countTotal(deck: Deck):number {
        let total = 0;
        deck.crypt.forEach(card => {
            total += card.quantity;
        });
        deck.library.forEach(card => {
            total += card.quantity;
        });
        return total
    }

    getDecks():void {
        this.deckSvc.getDecks().subscribe(
            (decks: Deck[]) => {
                this.decks = decks;
                console.log('Decks: ', this.decks);
            },
            (error) => {
                console.log('Error al obtener los decks: ', error);
            });
    }


    //FILTRAR POR CATEGORIA
    filterByCategory(): void {
      let selectedCategory: string = '*';
      selectedCategory = this.listDeckForm.get('category')?.value;
      if (selectedCategory === '*') {
          this.getDecks();
      } else if(selectedCategory !== '*'){
        this.decks = this.decks.filter(deck => deck.category === selectedCategory);
        console.log('Categoria Actual: ',selectedCategory);
      }
  }



    ngOnInit(): void {
        this.getDecks();
        this.getUsers();
    }

}
