//front/src/app/pages/main/custom-cards/gallery/gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CustomCard } from '../../../../models/custom-cards.model';
import { CommonModule } from '@angular/common';
import { DetailsCustomCardComponent } from '../../../../components/details-custom-card/details-custom-card.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterCustomCardsPipe } from '../../../../pipes/filter-custom-cards.pipe';
import { environment } from '../../../../../environments/environment.development';
import { SendReportComponent } from '../../../../components/send-report/send-report.component';
import { RouterLink } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilterCustomCardsPipe,
    RouterLink
  ]
})
export class GalleryComponent implements OnInit {

  constructor(
    public authSvc: AuthService,
    public customSvc: CustomCardsService,
    public dialog: MatDialog,
  ) { }


  customCardForm: FormGroup = new FormGroup({
    searchByAuthor: new FormControl(''),
    searchByName: new FormControl(''),
  });

  filteredCards: any[] = [];

  apiUrl = environment.apiUrl || 'https://localhost';


  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  paginatedCards: any[] = [];

  user: User[] = [];
  customCards: any[] = [];

  getUsers() {
    this.authSvc.getUsers().subscribe(
      (users: User[]) => {
        this.user = users;
        // 
      },
      (error) => {
        
      });
  }

  //RESET FILTER AUTHOR
  resetFilterAuthor() {
    this.customCardForm.get('searchByAuthor')?.setValue('');
    this.getCustomCards();
  }

  getCustomCards() {
    this.customSvc.getAllCustomCards().subscribe(
      (response) => {
        this.customCards = response;
        this.filteredCards = response;
        this.totalItems = response.length;
        
        this.paginate();
      },
      (error) => {
        
      }
    );
  }

  openModal(card: CustomCard): void {
    this.dialog.open(DetailsCustomCardComponent, {
      data: { card },
    });
  }

  openModalReport(card: CustomCard): void {
    this.dialog.open(SendReportComponent, {
      data: { card },
    });
  }

  // Metodos para la paginación
  paginate() {
    const searchByName = this.customCardForm.get('searchByName')?.value;
    const searchByAuthor = this.customCardForm.get('searchByAuthor')?.value;

    this.filteredCards = this.customCards.filter((card) => {
      const nameMatch = searchByName
        ? card.name.toLowerCase().includes(searchByName.toLowerCase())
        : true;
      const authorMatch = searchByAuthor
        ? card.author.toLowerCase().includes(searchByAuthor.toLowerCase())
        : true;
      return nameMatch && authorMatch;
    });

    this.totalItems = this.filteredCards.length;

    const indiceInicial = (this.currentPage - 1) * this.itemsPerPage;
    const indiceFinal = indiceInicial + this.itemsPerPage;
    this.paginatedCards = this.filteredCards.slice(indiceInicial, indiceFinal);
  }


  changePage(page: number) {
    this.currentPage = page;
    this.paginate()
    // 
  }
  getPageNumbers(): number[] {
    const pageCount = this.getPageCount();
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  getPageCount(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCustomCards();
  }

}