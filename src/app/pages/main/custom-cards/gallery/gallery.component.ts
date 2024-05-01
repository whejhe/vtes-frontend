import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CustomCard } from '../../../../models/custom-cards.model';
import { CommonModule } from '@angular/common';
import { DetailsCustomCardComponent } from '../../../../components/details-custom-card/details-custom-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-gallery',
    standalone: true,
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    imports: [
        FormsModule,
        FilterMultiPipe,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class GalleryComponent implements OnInit {

    constructor(
        public authSvc: AuthService,
        public customSvc: CustomCardsService,
        public dialog: MatDialog
    ) { }

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

    getCustomCards() {
      this.customSvc.getAllCustomCards().subscribe(
        (cards: CustomCard[]) => {
          this.customCards = cards;
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

    ngOnInit(): void {
        this.getUsers();
        this.getCustomCards();
    }

}
