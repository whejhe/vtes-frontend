import { Component } from '@angular/core';
import { SearchImputComponent } from "../../../../components/search-imput/search-imput.component";
import { FormsModule } from '@angular/forms';
import { FilterMultiPipe } from '../../../../pipes/filter-multi.pipe';

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
export class GalleryComponent {

    constructor(
        
    ) {}


}
