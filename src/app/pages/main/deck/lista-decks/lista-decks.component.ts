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
        public authSvc: AuthService,
    ) { }

    decks: Deck[] = [];
    user: User[] = [];
    CurrentUser: User = this.authSvc.getCurrentUser()!;

    showSucessMessage: boolean = false;
    showErrorMessage: boolean = false;
    message: string = '';

    listDeckForm: FormGroup = new FormGroup({
        category: new FormControl('*'),
        author: new FormControl('*'),
    })

    getUsers(): void {
        this.authSvc.getUsers().subscribe(
            (users: User[]) => {
                this.user = users;
                
            },
            (error) => {
                
            });
    }

    //CONTAR TOTAL DE CAARTAS Y SU CANTIDAD
    countTotal(deck: Deck): number {
        let total = 0;
        deck.crypt.forEach(card => {
            total += card.quantity;
        });
        deck.library.forEach(card => {
            total += card.quantity;
        });
        return total
    }

    getDecks(): void {
        this.deckSvc.getDecks().subscribe(
            (decks: Deck[]) => {
                this.decks = decks;
                console.log(this.decks);
            },
            (error) => {
                
            });
    }

    // ELIMINAR DECK
    deleteDeck(id: string): void {
        this.deckSvc.deleteDeck(id).subscribe(
            (response) => {
                this.getDecks();
                
                
                this.showSucessMessage = true;
                this.showErrorMessage = false;
                this.message = 'Deck eliminado correctamente';
                setTimeout(() => {
                    this.showSucessMessage = false;
                }, 5000);
            },
            (error) => {
                
                this.showErrorMessage = true;
                this.showSucessMessage = false;
                this.message = this.deckSvc.deleteDeckError(error);
                setTimeout(() => {
                    this.showErrorMessage = false;
                }, 5000);
            }
        )
    }

    //FILTRAR POR CATEGORIA
    filterByCategory(): void {
        let selectedCategory: string = '*';
        selectedCategory = this.listDeckForm.get('category')?.value;
        if (selectedCategory === '*') {
            this.getDecks();
        } else if (selectedCategory !== '*') {
            this.decks = this.decks.filter(deck => deck.category === selectedCategory);
            
        }
    }

    //FILTRAR POR AUTHOR
    filterByAuthor(): void {
        let selectedAuthor: string = '*';
        selectedAuthor = this.listDeckForm.get('author')?.value;
        if (selectedAuthor === '*') {
            this.getDecks();
        } else if (selectedAuthor !== '*') {
            this.decks = this.decks.filter(deck => deck.author === selectedAuthor);
            
        }
    }

    // Limita el texto de la descripción
    truncateDescription(text: string, maxLength: number = 100): string {
        if (text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`;
        }
        return text;
    }




    ngOnInit(): void {
        this.getDecks();
        this.getUsers();
    }

}
