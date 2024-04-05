import { Component } from '@angular/core';
import { SearchImputComponent } from "../search-imput/search-imput.component";

@Component({
    selector: 'app-filtro-library',
    standalone: true,
    templateUrl: './filtro-library.component.html',
    styleUrl: './filtro-library.component.scss',
    imports: [SearchImputComponent]
})
export class FiltroLibraryComponent {

}
