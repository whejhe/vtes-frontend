import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  // transform(item:any[], searchText:string): any[] {
  //   if(!item) return [];
  //   if(!searchText) return item;
  //   searchText = searchText.toLowerCase();
  //   return item.filter((item:any) => {
  //     return item.name.toLowerCase().includes(searchText);
  //   })
  // }
  transform(items: any[], filtro:string, campoFiltrado:string =''): any[] {
    if(!items || (!filtro && !campoFiltrado)){
      return items;
    }
    filtro = filtro.toLowerCase();
    return items.filter(item => {
      if (campoFiltrado && item[campoFiltrado]) {
        return item[campoFiltrado].toLowerCase().includes(filtro);
      } else {
        for (const key in item) {
          if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
            if (item[key].toLowerCase().includes(filtro)) {
              return true;
            }
          }
        }
        return false;
      }
    });
  }

}
