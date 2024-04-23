import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAny',
  standalone: true
})
export class FilterAnyPipe implements PipeTransform {

  transform(arr: any[], filters: {searchNameCard: string}): any[] {
    if (!arr || !Array.isArray(arr)) return [];

    return arr.filter(item => {
      if (filters.searchNameCard) {
        return item.name.toLowerCase().includes(filters.searchNameCard.toLowerCase());
      }
      return true;
    });
  }
}
