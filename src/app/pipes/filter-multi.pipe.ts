//src/app/pipes/filter-multi.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Card, Discipline, Type } from '../models/vtes.model';
// import { Card } from '../models/card.model';


@Pipe({
  name: 'filterMulti',
  standalone: true
})
export class FilterMultiPipe implements PipeTransform {
  transform(cards: Card[], filters: any): Card[] {
    if (!cards || !Array.isArray(cards)) return [];

    return cards.filter(card => {
      let match = true;

      // Filtrar por nombre
      if (filters.searchName && !card.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
        match = false;
      }

      // Filter by traits
      if (filters.searchByTraits && !card.card_text.toLowerCase().includes(filters.searchByTraits.toLowerCase())) {
        match = false;
      }

      // Filtar por texto de cartas
      if (filters.searchByCardText && !card.card_text.toLowerCase().includes(filters.searchByCardText.toLowerCase())) {
        match = false;
      }

      //Filtrar entre capacidad minima y maxima
      if (!(filters.searchMinCapacity <= card.capacity! && card.capacity! <= filters.searchMaxCapacity)) {
        match = false;
      }

      // // Filtrar por capacidad minima
      // if (filters.searchMinCapacity !== undefined && filters.searchMinCapacity !== null && card.capacity !== undefined && card.capacity !== null && card.capacity !== filters.searchMinCapacity) {
      //   match = false;
      // }

      // // Filtrar por capacidad maxima
      // if (filters.searchMaxCapacity !== undefined && filters.searchMaxCapacity !== null && card.capacity !== undefined && card.capacity !== null && card.capacity !== filters.searchMaxCapacity) {
      //   match = false;
      // }

      // Filtrar por grupo
      if (filters.searchGroup && filters.searchGroup !== '*' && card.group !== filters.searchGroup) {
        match = false;
      }

      // Filtrar por clan
      if (filters.searchClan && filters.searchClan !== '*' && card.clans && !card.clans.includes(filters.searchClan)) {
        match = false;
      }

      // Filtrar por SECTA
      if (filters.searchSect && filters.searchSect !== '*' && !card.card_text.toLowerCase().includes(filters.searchSect.toLowerCase())) {
        match = false;
      }

      // Filtrar por título
      if (filters.searchTitle && filters.searchTitle !== '*' && !card.card_text.toLowerCase().includes(filters.searchTitle.toLowerCase())) {
        match = false;
      }

      // Filtrar por Habilidades
      if (filters.searchHabilities && filters.searchHabilities !== '*' && !card.card_text.toLowerCase().includes(filters.searchHabilities.toLowerCase())) {
        match = false;
      }

      // Filtrar por disciplina seleccionada
      if (filters.selectedDisciplines && filters.selectedDisciplines.length > 0) {
        const cardDisciplines = card.disciplines?.map(discipline => discipline) || [];
        if (!filters.selectedDisciplines.every((discipline: Discipline) => cardDisciplines.includes(discipline))) {
          match = false;
        }
      }


      //Filtrar por tipo
      if (filters.selectedTypes && filters.selectedTypes !== '*' && filters.selectedTypes.length > 0 && (!card.types || !card.types.includes(filters.selectedTypes))) {
        match = false;
      }

      //Filtar por Coste en Blood
      if (filters.selectedCosts && filters.selectedCosts.length > 0 && (!card.blood_cost || !filters.selectedCosts.includes(card.blood_cost))) {
        match = false;
      }

      // Filtrar por Coste en Pool
      if (filters.selectedPoolCosts && filters.selectedPoolCosts.length > 0 && (!card.pool_cost || !filters.selectedPoolCosts.includes(card.pool_cost))) {
        match = false;
      }

      return match;
    });
  }

}
