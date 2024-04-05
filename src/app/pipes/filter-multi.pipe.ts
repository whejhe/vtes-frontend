//src/app/pipes/filter-multi.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Card, Discipline, Type } from '../models/vtes.model';

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
      if (filters.searchName && !card._name.toLowerCase().includes(filters.searchName.toLowerCase())) {
        match = false;
      }

      // Filtrar por capacidad minima
      if (filters.searchCapacity !== undefined && filters.searchCapacity !== null && card.capacity !== undefined && card.capacity !== null && card.capacity !== filters.searchCapacity) {
        match = false;
      }

      // Filtrar por grupo
      if (filters.searchGroup && filters.searchGroup !== '*' && card.group !== filters.searchGroup) {
        match = false;
      }

      // Filtrar por SECTA
      if (filters.searchSect && filters.searchSect.length > 0 && (!card.card_text || !filters.searchSect.some((sect: string) => card.card_text.toLowerCase().includes(sect.toLowerCase())))) {
        match = false;
      }

      // Filtrar por clan
      if (filters.searchClan && card.clans && !card.clans.includes(filters.searchClan)) {
        match = false;
      }

      // Filtrar por disciplina seleccionada
      if (filters.selectedDisciplines && filters.selectedDisciplines.length > 0) {
        const cardDisciplines = card.disciplines?.map(discipline => discipline) || [];
        if (!filters.selectedDisciplines.every((discipline: Discipline) => cardDisciplines.includes(discipline))) {
          match = false;
        }
      }

      // Filtrar por título
      if (filters.selectedTitles && filters.selectedTitles.length > 0 && (!card.title || !filters.selectedTitles.includes(card.title))) {
        match = false;
      }

      // Filtrar por titulo en libreria
      if (filters.checkTitle && filters.checkTitle !== '*' && !card.card_text.toLowerCase().includes(filters.checkTitle.toLowerCase())) {
        match = false;
      }
      // Filtrar por rasgos
      if (filters.selectedTraits && filters.selectedTraits.length > 0 && (!card.card_text || !filters.selectedTraits.some((trait: string) => card.card_text.toLowerCase().includes(trait.toLowerCase())))) {
        match = false;
      }

      //Filtrar por tipo
      if (filters.selectedTypes && filters.selectedTypes.length > 0 && (!card.types || !filters.selectedTypes.includes(card.types))) {
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
