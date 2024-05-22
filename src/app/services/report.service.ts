//front/src/app/services/report.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl + '/report' || 'https://localhost/report';

  constructor(
    private hhtp: HttpClient,
    private authSvc: AuthService
  ) { }

  // AGREGAR ENCABEZADO DE AUTENTICACION
  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.authSvc.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // CREAR UN NUEVO REPORTE
  createReport(report: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.post(this.apiUrl, report, { headers });
  }

  // OBTENER TODOS LOS REPORTES
  getReports(): Observable<Report[]> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.get<Report[]>(this.apiUrl + '/list', { headers });
  }

  // OBTENER UN REPORTE POR ID
  getReportById(id: string): Observable<Report> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.get<Report>(this.apiUrl + '/' + id, { headers });
  }

  // ACTUALIZAR ESTADO DE NOTIFICACION DE UN REPORTE
  updateReport(id: string, notification: boolean): Observable<Report> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.put<Report>(this.apiUrl + '/update/' + id, { notification }, { headers });
  }

  // ELIMINAR UN REPORTE
  deleteReportById(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.hhtp.delete(`${this.apiUrl}/${id}`, { headers });
  }

  handleRegistrationError(error: any): string {
    if (error.error.error.includes('No puedes mandar un reporte vacio')) {
      return 'No puedes mandar un reporte vacio';
    } else {
      return 'Ocurrió un error al mandar el reporte';
    }
  }
}