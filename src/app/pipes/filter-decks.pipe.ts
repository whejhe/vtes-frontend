//src/app/pipes/filter-decks.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Deck } from '../models/deck.model';

@Pipe({
    name: 'filterDeck',
    standalone: true
})
export class FilterDecksPipe implements PipeTransform {
    transform(card: any[], filters: any): any[] {
        if (!card || !Array.isArray(card)) return [];
        return card.filter(card => {
            let match = true;

            // Filtrar por nombre
            if (filters.searchNameCard && !card.card.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
                match = false;
            }
        })
    }
}
