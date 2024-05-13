//front/src/app/pages/admin/report/report.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { CommonModule } from '@angular/common';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  constructor(private reportSvc: ReportService) {}

<<<<<<< HEAD
  constructor(
    private reportSvc: ReportService
  ) { 
    this.reportSvc.getReports();
  }

  reports?: Report[];
  reportData = '';

  ngOnInit(): void {
    console.log('Reports: ', this.reports);
    console.log(this.reportSvc.getReports())
   }

=======
  reports: Report[] = [];

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.reportSvc.getReports().subscribe(reports => reports = reports);
  }
>>>>>>> 8f19dd838ae60daa0a136f675a28e4a89e61fb7e

}
