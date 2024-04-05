import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd'): any {
    const datePipe = new DatePipe('es-ES');
    return datePipe.transform(value, format);
  }

}
