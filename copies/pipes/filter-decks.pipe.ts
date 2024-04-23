//src/app/pipes/filter-multi.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Deck } from '../models/deck.model';

@Pipe({
    name: 'filterMulti',
    standalone: true
})
export class FilterDecksPipe implements PipeTransform {
    transform(decks: Deck[], filters: any): Deck[] {
        if (!decks || !Array.isArray(decks)) return [];

        return decks.filter(deck => {
            let match = true;
            
            //Filtrar por tipo
            if (filters.selectedTypes && filters.selectedTypes.length > 0 && (!deck.type || !filters.selectedTypes.includes(deck.type))) {
                match = false;
            }

            //Filtrar por author
            if (filters.selectedAuthors && filters.selectedAuthors.length > 0 && (!deck.author || !filters.selectedAuthors.includes(deck.author))) {
                match = false;
            }

            return match;
        });
    }

}
