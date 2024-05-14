import { Component, OnInit } from '@angular/core';
import { CustomCardsService } from '../../../services/custom-cards.service';
import { CustomCard } from '../../../models/custom-cards.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cards-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './custom-cards-list.component.html',
  styleUrl: './custom-cards-list.component.scss'
})
export class CustomCardsListComponent implements OnInit {

  customCards: CustomCard[] = [];

  constructor(
    public customCardsSvc: CustomCardsService
  ) { }

  getCustomCards(){
    this.customCardsSvc.getAllCustomCards().subscribe(customCards => {
      this.customCards = customCards
    })
  }

  deleteCustomCard(id: string){
    this.customCardsSvc.deleteCustomCard(id).subscribe(() => {
      this.getCustomCards();
    })
  }
  ngOnInit(): void {
      this.getCustomCards();
  }
}
