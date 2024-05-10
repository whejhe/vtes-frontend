//front/src/app/services/report.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl + '/reports' || 'https://localhost/reports';

  constructor(
    private hhtp: HttpClient,
    private authSvc: AuthService
  ) { }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createReport(report: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.post(this.apiUrl, report, { headers });
  }

  getReports(): Observable<Report[]> {
    // let headers = new HttpHeaders();
    // headers = this.addAuthHeader(headers);
    return this.hhtp.get<Report[]>(`${this.apiUrl}/list`);
  }
  

}
