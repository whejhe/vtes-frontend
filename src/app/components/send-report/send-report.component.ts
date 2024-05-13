//front/src/app/components/send-report/send-report.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomCard } from '../../models/custom-cards.model';
import { User } from '../../models/user.model';
import { ReportService } from '../../services/report.service';

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
    public dialogRef: MatDialogRef<SendReportComponent>,
    public reportSvc: ReportService
  ) {
    this.card = data.card;
  }

  newReport: Report = new Report();

  card?: CustomCard;

  ngOnInit(): void {

  }

  sendReport(): void {
    this.reportSvc.createReport(this.newReport).subscribe();
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
