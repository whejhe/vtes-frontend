//front/src/app/pages/main/main.route.ts
import { Routes } from "@angular/router";

import { InicioComponent } from "./inicio/inicio.component";

// import { CustomComponent } from "./custom-cards/custom/custom.component";
import { GalleryComponent } from "./custom-cards/gallery/gallery.component";
import { EventsComponent } from "./eventos/events/events.component";
import { ListaDecksComponent } from "./deck/lista-decks/lista-decks.component";
import { ListarEventosComponent } from "./eventos/listar-eventos/listar-eventos.component";
import { CriptaComponent } from "./list-cards/cripta/cripta.component";
import { BibliotecaComponent } from "./list-cards/biblioteca/biblioteca.component";
import { UploadCardComponent } from "./custom-cards/upload-card/upload-card.component";
import { ContactComponent } from "./contact/contact.component";
import { NewDeckComponent } from "./deck/deck/deck.component";
import { FichaEventComponent } from "./eventos/ficha-event/ficha-event.component";
import { PruebaComponent } from "./eventos/prueba/prueba.component";

export const MAIN_ROUTE:Routes = [
  {path: '', title: 'Inicio',component: InicioComponent},
  {path: 'cripta',title: 'Crypta', component: CriptaComponent},
  {path: 'biblioteca',title: 'Biblioteca', component: BibliotecaComponent},
  // {path: 'custom',title: 'Custom Cards', component: CustomComponent},
  {path: 'upload-card', title: 'Upload Card',component: UploadCardComponent},
  {path: 'gallery',title: 'Gallery', component: GalleryComponent},
  {path: 'events', title: 'Events',component: EventsComponent},
  {path: 'prueba', title: 'Prueba',component: PruebaComponent},
  {path: 'deck',title: 'Deck', component: NewDeckComponent},
  {path: 'deck/:id',title: 'Deck', component: NewDeckComponent},
  {path: 'ficha-event/:id', title: 'Ficha Event',component: FichaEventComponent},
  {path: 'lista-decks',title: 'Lista Decks', component: ListaDecksComponent},
  {path: 'listar-eventos',title: 'Lista de Eventos', component: ListarEventosComponent},
  {path: 'contact',title: 'Contact', component: ContactComponent}
]
