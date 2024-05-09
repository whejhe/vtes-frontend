// front/src/app/components/perfil/perfil.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  closeModal():void{
    window.close();
  }

  openModal(): void {
    window.open();
  }

}
