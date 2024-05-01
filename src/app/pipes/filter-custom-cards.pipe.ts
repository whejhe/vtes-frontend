import { Pipe, PipeTransform } from '@angular/core';
import { CustomCard } from '../models/custom-cards.model';

@Pipe({
  name: 'filterCustomCards',
  standalone: true
})
export class FilterCustomCardsPipe implements PipeTransform {

  transform(cards: CustomCard[], filters: any): CustomCard[] {
    if (!cards || !Array.isArray(cards)) return [];

    return cards.filter(card => {
      let match = true;

      // Filtrar por Author
      if (filters.searchByAuthor && !card.author.toLowerCase().includes(filters.searchByAuthor.toLowerCase())) {
        match = false;
      }

      // Filtar por Nombre
      if (filters.searchByName && !card.name.toLowerCase().includes(filters.searchByName.toLowerCase())) {
        match = false;
      }

      return match;
    });
  }

}
