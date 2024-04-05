import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-ficha-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './ficha-card.component.html',
  styleUrl: './ficha-card.component.scss'
})
export class FichaCardComponent {

}

