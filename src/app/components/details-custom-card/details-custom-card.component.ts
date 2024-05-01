import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomCard } from '../../models/custom-cards.model';
import { CommonModule } from '@angular/common';
import { CustomCardsService } from '../../services/custom-cards.service';

@Component({
  selector: 'app-details-custom-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './details-custom-card.component.html',
  styleUrl: './details-custom-card.component.scss'
})
export class DetailsCustomCardComponent {
  constructor(
    private customSvc: CustomCardsService,
    @Inject(MAT_DIALOG_DATA) public data: {card: CustomCard},
    public dialogRef: MatDialogRef<DetailsCustomCardComponent>
  ) {}

  ngOnInit(): void {
      this.customSvc.getAllCustomCards().subscribe(data => {
      })
  }

  closeModal():void{
    this.dialogRef.close();
  }

}
