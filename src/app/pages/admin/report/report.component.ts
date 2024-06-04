//front/src/app/pages/admin/report/report.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { CommonModule } from '@angular/common';
import { Report } from '../../../models/report.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewReportComponent } from '../../../components/view-report/view-report.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  constructor(
    private reportSvc: ReportService,
    public dialog: MatDialog
  ) {

   }

  showSucessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  public reports: Report[] = [];
  selectedReport: Report | undefined;

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.reportSvc.getReports().subscribe(reports => {
      this.reports = reports;
    });
  }

  getReportById():void{
    this.reportSvc.getReportById('').subscribe(
      (response) =>{
        
      },
      (error) =>{
        
      }
    )
  }

  deleteReport(reportId: string):void{
    this.reportSvc.deleteReportById(reportId).subscribe(
      (response) =>{
        
        this.getReports();
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        this.message = 'Reporte eliminado correctamente';
        setTimeout(() => {
          this.showSucessMessage = false;
        }, 5000);
      },
      (error) =>{
        
        this.showErrorMessage = true;
        this.showSucessMessage = false;
        this.message = this.reportSvc.handleRegistrationError(error);
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    );
  }

  viewReport(report: Report): void {
    this.selectedReport = report;
    this.reportSvc.getReportById(report._id).subscribe(
      (reportData) => {
        this.dialog.open(ViewReportComponent, {
          data: { report: reportData },
          
        });
        
      },
      (error) => {
        
      }
    );
  }

}