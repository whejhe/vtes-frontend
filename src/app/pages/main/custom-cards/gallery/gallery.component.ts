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
// import { FirebaseStorageService } from '../../../../services/firebase-storage.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilterCustomCardsPipe
  ]
})
export class GalleryComponent implements OnInit {

  constructor(
    public authSvc: AuthService,
    public customSvc: CustomCardsService,
    public dialog: MatDialog,
    // public firebaseSvc: FirebaseStorageService
  ) { }

  customCardForm: FormGroup = new FormGroup({
    searchByAuthor: new FormControl(''),
    searchByName: new FormControl(''),
  });

  apiUrl = environment.apiUrl || 'https://localhost:3000';


  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  user: User[] = [];
  customCards: any[] = [];
  paginatedCards: any[] = [];

  getUsers() {
    this.authSvc.getUsers().subscribe(
      (users: User[]) => {
        this.user = users;
        // console.log('Users: ', this.user);
      },
      (error) => {
        console.log('Error al obtener los usuarios: ', error);
      });
  }

  getCustomCards() {
    this.customSvc.getAllCustomCards().subscribe(
      (response) => {
        this.customCards = response;
        this.totalItems = response.length;
        this.paginate();
      },
      (error) => {
        console.log('Error al obtener las tarjetas personalizadas: ', error);
      }
    );
  }

  openModal(card: CustomCard): void {
    this.dialog.open(DetailsCustomCardComponent, {
      data: { card },
    });
  }

  // Metodos para la paginación
  paginate() {
    const searchByName = this.customCardForm.get('searchByName')?.value;
    const searchByAuthor = this.customCardForm.get('searchByAuthor')?.value;

    let filteredCards = this.customCards;

    if (searchByName) {
      filteredCards = filteredCards.filter((card) =>
        card.name.toLowerCase().includes(searchByName.toLowerCase())
      );
    }

    if (searchByAuthor) {
      filteredCards = filteredCards.filter((card) =>
        card.author.toLowerCase().includes(searchByAuthor.toLowerCase())
      );
    }

    const indiceInicial = (this.currentPage - 1) * this.itemsPerPage;
    const indiceFinal = indiceInicial + this.itemsPerPage;
    this.paginatedCards = filteredCards.slice(indiceInicial, indiceFinal);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate()
    // console.log(page)
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
    // this.firebaseSvc.getImages();
  }

}
