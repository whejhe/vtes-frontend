//front/src/app/components/view-report/view-report.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Report } from '../../models/report.model';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './view-report.component.html',
  styleUrl: './view-report.component.scss'
})
export class ViewReportComponent implements OnInit{

  reports?: Report[];
  notification: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { report: Report },
    public dialogRef: MatDialogRef<ViewReportComponent>,
    public reportSvc: ReportService
  ){ }

  getReports(): void {
    this.reportSvc.getReports().subscribe(reports => {
      this.reports = reports;
    });
  }

  getReportById(id: string): void {
    this.reportSvc.getReportById(id).subscribe(
      (response) => {
        console.log('Reporte:', response);
      },
      (error) => {
        console.log('Error al obtener el reporte:', error);
      }
    );
  }

  updateReport(id: string, notification: boolean): void {
    this.reportSvc.updateReport(id, notification).subscribe(
      (response) => {
        console.log('Reporte actualizado:', response);
      },
      (error) => {
        console.log('Error al actualizar el reporte:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getReportById(this.data.report._id);
    // this.getReports();
  }

}
