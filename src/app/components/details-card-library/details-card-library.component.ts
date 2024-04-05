import { Component, Inject } from '@angular/core';
import { Card } from '../../models/vtes.model';
import { Observable, of } from 'rxjs';
import { JsonServiceService } from '../../services/json-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-card-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-card-library.component.html',
  styleUrl: './details-card-library.component.scss',
})
export class DetailsCardLibraryComponent {
  constructor(
    private jsonSvc: JsonServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card },
    public dialogRef: MatDialogRef<DetailsCardLibraryComponent>
  ) {}

  ngOnInit(): void {
    this.jsonSvc.getJsonData().subscribe((data) => {});
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getBloodCostImage(bloodCost: string): string {
    switch (bloodCost) {
      case '1':
        return 'assets/img/icons-vtes/others/costBlood-1.png';
      case '2':
        return 'assets/img/icons-vtes/others/costBlood-2.png';
      case '3':
        return 'assets/img/icons-vtes/others/costBlood-3.png';
      case '4':
        return 'assets/img/icons-vtes/others/costBlood-4.png';
      default:
        return '';
    }
  }

  getPoolCostImage(poolCost: string): string {
    switch (poolCost) {
      case '1':
        return 'https://static.krcg.org/svg/icon/pool1.svg';
      case '2':
        return 'https://static.krcg.org/svg/icon/pool2.svg';
      case '3':
        return 'https://static.krcg.org/svg/icon/pool3.svg';
      case '4':
        return 'https://static.krcg.org/svg/icon/pool4.svg';
      case '5':
        return 'https://static.krcg.org/svg/icon/pool5.svg';
      case '6':
          return 'https://static.krcg.org/svg/icon/pool6.svg';
      default:
        return '';
    }
  }

}
