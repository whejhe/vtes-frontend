import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    SideBarComponent,
  ]
})
export class HeaderComponent {
  fichaDeckComponent: any;
  constructor(
    private authSvc: AuthService,
    public deckSvc: DeckService,
    private router: Router
  ) {
  }

  user!: User;
  deckForm: FormGroup<any> = new FormGroup({});
  lastDeckId: string = localStorage.getItem('lastDeck') || '';


  navigateToLastDeck(): void {
    const lastDeckId = localStorage.getItem('lastDeck');
    if (lastDeckId && lastDeckId != undefined) {
      console.log('HOLA!!!!!!!!!!')
      this.router.navigateByUrl(`/deck/${lastDeckId}`);
    }
  }

  //Almacenar Usuario en localStorage
  ngOnInit() {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('Usuario actual :', this.user);
    }
    console.log('hol!!!!', this.lastDeckId)
    this.deckForm = new FormGroup({
      userId: new FormControl(''),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl(''),
      publico: new FormControl(true),
      cards: new FormControl([])
    });

  }

}
