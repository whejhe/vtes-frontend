import { Component, OnInit } from '@angular/core';
import { SearchImputComponent } from "../../../../components/search-imput/search-imput.component";
import { FormsModule } from '@angular/forms';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
    selector: 'app-gallery',
    standalone: true,
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    imports: [
        SearchImputComponent,
        FormsModule,
        FilterMultiPipe
    ]
})
export class GalleryComponent implements OnInit {

    constructor(
        public authSvc: AuthService
    ) {}

    user:User[] = [];

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
  }

}
