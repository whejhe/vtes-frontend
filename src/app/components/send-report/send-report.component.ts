//front/src/app/components/send-report/send-report.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomCard } from '../../models/custom-cards.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-send-report',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './send-report.component.html',
  styleUrl: './send-report.component.scss'
})
export class SendReportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: CustomCard },
    public dialogRef: MatDialogRef<SendReportComponent>
  ) {
    this.card = data.card;
  }

  card?: CustomCard;

  ngOnInit(): void {

  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
