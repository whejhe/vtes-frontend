//front/src/app/pages/main/deck/new-deck/new-deck.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../../../models/card.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FilterPipe } from "../../../../pipes/filter.pipe";
import { FilterMultiPipe } from "../../../../pipes/filter-multi.pipe";
import { DeckService } from '../../../../services/deck.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';

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
export class NewDeckComponent {

  apiUrl = 'http://localhost:3000/decks';
  deckForm: FormGroup<any> = new FormGroup({});
  newDeckId: string = '';
  cards: Card[] = [];
  user: User = this.authSvc.getCurrentUser()!;

  constructor(
    private http: HttpClient,
    private deckSvc: DeckService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {

    this.deckForm = new FormGroup({
      userId: new FormControl(''),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl(''),
      publico: new FormControl(true),
      cards: new FormControl([])
    });
    console.log('Id deck: ', this.newDeckId);
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
    this.deckForm.get('userId')!.setValue(this.authSvc.getCurrentUser()?._id);
    if (this.deckForm.get('name')?.value == '') {
      this.deckForm.get('name')!.setValue('Sin nombre');
    }
    const deck = this.deckForm.value;
    this.deckSvc.createDeck(deck).subscribe(
      (response: any) => {
        this.newDeckId = response.id;
        this.router.navigate([`/ficha-deck/${this.newDeckId}`]);
        // this.updateView();
      },
      (error) => console.error(error)
    )
  }

  updateView(): void {
    this.router.navigate([`/ficha-deck/${this.newDeckId}`]);
  }
}
