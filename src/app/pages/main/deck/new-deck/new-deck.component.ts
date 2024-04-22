//front/src/app/pages/main/deck/new-deck/new-deck.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../../../models/card.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilterPipe } from "../../../../pipes/filter.pipe";
import { FilterMultiPipe } from "../../../../pipes/filter-multi.pipe";
import { DeckService } from '../../../../services/deck.service';

@Component({
    selector: 'app-new-deck',
    standalone: true,
    templateUrl: './new-deck.component.html',
    styleUrl: './new-deck.component.scss',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        FilterPipe,
        FilterMultiPipe
    ]
})
export class NewDeckComponent {

  apiUrl = 'http://localhost:3000/decks';
  deckForm: FormGroup<any> = new FormGroup({});
  newDeckId:string = '';
  cards: Card[] = [];

  constructor(
    private http: HttpClient,
    private deckSvc: DeckService
  ) { }

  ngOnInit(): void {
    this.deckForm = new FormGroup({
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      author: new FormControl(''),
      category: new FormControl(''),
      publico: new FormControl(true),
      cards: new FormControl([])
    });
  }

  addCard(): void {
    const cardForm = new FormGroup({
      card: new FormControl('', Validators.required),
      cantidad: new FormControl(1, Validators.required)
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
    const deck = this.deckForm.value;
    this.deckSvc.createDeck(deck).subscribe(
      (deck) => {
        console.log(deck);
        this.newDeckId = deck._id;
        this.updateView();
      },
      (error) => console.error(error)
    )
  }

  updateView(): void {
    this.router.navigate(['/ficha-deck/', this.newDeckId]);
  }
}
