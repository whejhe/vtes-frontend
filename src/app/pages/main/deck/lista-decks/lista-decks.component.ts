//front/src/app/pages/main/deck/lista-decks/lista-decks.component.ts
import { Component, OnInit } from '@angular/core';
import { FichaDeckComponent } from "../ficha-deck/ficha-deck.component";
import { RouterLink } from '@angular/router';
import { DeckService } from '../../../../services/deck.service';
import { Deck } from '../../../../models/deck.model';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { FilterDecksPipe } from '../../../../pipes/filter-decks.pipe';

@Component({
    selector: 'app-lista-decks',
    standalone: true,
    templateUrl: './lista-decks.component.html',
    styleUrl: './lista-decks.component.scss',
    imports: [
        FichaDeckComponent,
        RouterLink,
        CommonModule,
        FilterDecksPipe
    ]
})
export class ListaDecksComponent implements OnInit {

    constructor(
        public deckSvc: DeckService,
        public authSvc: AuthService
    ) { }

    decks: Deck[] = [];
    user: User[] = [];

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
        deck.cards.forEach(card => {
            total += card.cantidad;
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

    ngOnInit(): void {
        this.getDecks();
        this.getUsers();
    }

}
