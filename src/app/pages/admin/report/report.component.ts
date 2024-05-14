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
    // this.getReports();
    // console.log('Reports:',this.getReports())
   }

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
        console.log('Reporte:', response);
      },
      (error) =>{
        console.log('Error al obtener el reporte:', error);
      }
    )
  }

  deleteReport(reportId: string):void{
    this.reportSvc.deleteReportById(reportId).subscribe(
      (response) =>{
        console.log('Reporte eliminado:', response);
        this.getReports();
      },
      (error) =>{
        console.log('Error al eliminar el reporte:', error);
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
        console.log('Reporte:', reportData);
      },
      (error) => {
        console.log('Error al obtener el reporte:', error);
      }
    );
  }

}