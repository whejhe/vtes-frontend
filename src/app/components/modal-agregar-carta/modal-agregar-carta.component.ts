import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../models/vtes.model';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { Deck } from '../../models/deck.model';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-modal-agregar-carta',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-agregar-carta.component.html',
  styleUrl: './modal-agregar-carta.component.scss'
})
export class ModalAgregarCartaComponent {

  decks: Deck[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {decks: Deck},
    public dialogRef: MatDialogRef<ModalAgregarCartaComponent>,
    public cardSvc: CardService,
    public deckSvc: DeckService
  ){}

  getDecks(): void{
    this.deckSvc.getDecksByUserId(this.data.decks.userId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
