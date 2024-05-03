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
        public dialog: MatDialog
    ) { }

    customCardForm: FormGroup = new FormGroup({
      searchByAuthor: new FormControl(''),
      searchByName: new FormControl(''),
    });

    // Paginación
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalItems: number = 0;

    user: User[] = [];
    customCards: CustomCard[] = [];

    getUsers() {
        this.authSvc.getUsers().subscribe(
            (users: User[]) => {
                this.user = users;
                console.log('Users: ', this.user);
            },
            (error) => {
                console.log('Error al obtener los usuarios: ', error);
            });
    }

    // getCustomCards() {
    //   this.customSvc.getAllCustomCards().subscribe(
    //     (cards: CustomCard[]) => {
    //       this.customCards = cards;
    //     },
    //     (error) => {
    //       console.log('Error al obtener las tarjetas personalizadas: ', error);
    //     }
    //   );
    // }

    getCustomCards(page: number = 1) {
      this.customSvc.getAllCustomCards(page, this.itemsPerPage).subscribe(
        (response: { data: CustomCard[]; total: number }) => {
          console.log('Response',response);
          this.customCards = response.data;
          this.totalItems = response.total;
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
    changePage(page: number) {
      this.currentPage = page;
      this.getCustomCards(page);
    }
    getPageNumbers():number[]{
      const pageCount = this.getPageCount();
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    getPageCount(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    ngOnInit(): void {
        this.getUsers();
        this.getCustomCards(this.currentPage);
        console.log('customCards: ', this.customCards);
    }

}
