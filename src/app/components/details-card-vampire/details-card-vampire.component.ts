import { Component, Inject, OnInit } from '@angular/core';
import { Card } from '../../models/vtes.model';
import { Observable, of } from 'rxjs';
import { JsonServiceService } from '../../services/json-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-card-vampire',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './details-card-vampire.component.html',
  styleUrl: './details-card-vampire.component.scss'
})
export class DetailsCardVampireComponent implements OnInit{


  constructor(
    private jsonSvc: JsonServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {card: Card},
    public dialogRef: MatDialogRef<DetailsCardVampireComponent>
  ) {}

  ngOnInit(): void {
      this.jsonSvc.getJsonData().subscribe(data => {
      })
  }

  closeModal():void{
    this.dialogRef.close();
  }

}
