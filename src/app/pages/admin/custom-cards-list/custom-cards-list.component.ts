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

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  constructor(
    public customCardsSvc: CustomCardsService
  ) { }

  getCustomCards(){
    this.customCardsSvc.getAllCustomCards().subscribe(customCards => {
      this.customCards = customCards
    })
  }

  deleteCustomCard(id: string){
    this.customCardsSvc.deleteCustomCard(id).subscribe(
      (response) => {
      this.getCustomCards();
      
      this.showErrorMessage = false;
      this.showSucessMessage = true;
      this.message = 'Carta personalizada eliminada correctamente';
      setTimeout(() => {
        this.showSucessMessage = false;
      },5000);
    },
    (error) => {
      
      this.showErrorMessage = true;
      this.showSucessMessage = false;
      this.message = this.customCardsSvc.handleRegistrationError(error);
      setTimeout(()=>{
        this.showErrorMessage = false;
      },5000);
    })
  }
  ngOnInit(): void {
      this.getCustomCards();
  }
}
