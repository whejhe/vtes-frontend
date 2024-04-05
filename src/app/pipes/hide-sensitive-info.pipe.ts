import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideSensitiveInfo',
  standalone: true
})
export class HideSensitiveInfoPipe implements PipeTransform {

  transform(value: string, visibleCharacters: number = 4): string {
    if (!value) return ''; // Manejar valores nulos o indefinidos

    const visiblePart = value.slice(-visibleCharacters); // Obtener los últimos caracteres visibles
    const hiddenPart = '*'.repeat(value.length - visibleCharacters); // Ocultar el resto con asteriscos

    return hiddenPart + visiblePart;
  }

}
