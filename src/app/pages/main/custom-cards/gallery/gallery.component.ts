import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { CustomCardsService } from '../../../../services/custom-cards.service';
import { CustomCard } from '../../../../models/custom-cards.model';

@Component({
    selector: 'app-gallery',
    standalone: true,
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    imports: [
        FormsModule,
        FilterMultiPipe
    ]
})
export class GalleryComponent implements OnInit {

    constructor(
        public authSvc: AuthService,
        public customSvc: CustomCardsService
    ) { }

    user: User[] = [];
    card: CustomCard[] = [];

    // getAllCustomCards(){
    //     this.customSvc.getAllImages().subscribe(
    //         (cards: CustomCard[]) => {
    //             this.card = cards;
    //             console.log('Cards: ', this.card);
    //         },
    //         (error) => {
    //             console.log('Error al obtener las cartas: ', error);
    //         }
    //     )
    // }

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



    ngOnInit(): void {
        this.getUsers();
        // this.getAllCustomCards();
    }

}
