import { Component, OnInit } from '@angular/core';
import { FichaDeckComponent } from "../ficha-deck/ficha-deck.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lista-decks',
    standalone: true,
    templateUrl: './lista-decks.component.html',
    styleUrl: './lista-decks.component.scss',
    imports: [
        FichaDeckComponent,
        RouterLink,    
    ]
})
export class ListaDecksComponent implements OnInit{

    constructor(
    ) { }

    ngOnInit(): void {}

}
