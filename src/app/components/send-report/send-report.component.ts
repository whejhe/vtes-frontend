//front/src/app/components/send-report/send-report.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomCard } from '../../models/custom-cards.model';
import { User } from '../../models/user.model';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomCardsService } from '../../services/custom-cards.service';

@Component({
  selector: 'app-send-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './send-report.component.html',
  styleUrl: './send-report.component.scss'
})
export class SendReportComponent implements OnInit {

  user: User | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: CustomCard },
    public dialogRef: MatDialogRef<SendReportComponent>,
    public reportSvc: ReportService,
    public authSvc: AuthService,
    public customCardSvc: CustomCardsService
  ) {
    this.card = data.card;
  }

  public report!: Report[];
  currentUser = this.authSvc.getCurrentUser()?.name;
  currentEmail = this.authSvc.getCurrentUser()?.email;

  reportForm: FormGroup = new FormGroup({
    name: new FormControl(this.currentUser),
    email: new FormControl(this.currentEmail),
    comment: new FormControl(''),
    authorOfCard: new FormControl(''),
    nameOfCard: new FormControl(''),
    notification: new FormControl(true)
  })

  card?: CustomCard;

  ngOnInit(): void {
    this.authSvc.getCurrentUser();
    console.log('CurrentUser: ',this.authSvc.getCurrentUser());
    this.reportForm.get('authorOfCard')?.setValue(this.card?.author);
    this.reportForm.get('nameOfCard')?.setValue(this.card?.name);
  }


  sendReport(){
    if(this.reportForm.valid){
      const reportData = {
        name: this.reportForm.get('name')?.value,
        email: this.reportForm.get('email')?.value,
        comment: this.reportForm.get('comment')?.value,
        authorOfCard: this.reportForm.get('authorOfCard')?.value,
        nameOfCard: this.reportForm.get('nameOfCard')?.value,
        notification: this.reportForm.get('notification')?.value
      };

      this.reportSvc.createReport(reportData).subscribe(
        (response: any) => {
          console.log('response', response);
          this.closeModal();
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    }
  }

  getCurrentUser(): User | null {
    return this.authSvc.getCurrentUser();
  }

  getCustomCardById(id: string){
    this.customCardSvc.getCustomCardById(id).subscribe(
      (response) => {
        this.reportForm.get('nameOfCard')?.setValue(response.name);
        this.reportForm.get('authorOfCard')?.setValue(response.author);
        console.log('response', response);
      },
      (error) => {
        console.log('Error al obtener la tarjeta personalizada:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}