
import { Routes } from "@angular/router";

import { InicioComponent } from "./inicio/inicio.component";

import { CustomComponent } from "./custom-cards/custom/custom.component";
import { GalleryComponent } from "./custom-cards/gallery/gallery.component";
import { EventsComponent } from "./eventos/events/events.component";
import { FichaDeckComponent } from "./deck/ficha-deck/ficha-deck.component";
import { ListaDecksComponent } from "./deck/lista-decks/lista-decks.component";
import { ListarEventosComponent } from "./eventos/listar-eventos/listar-eventos.component";
import { CriptaComponent } from "./list-cards/cripta/cripta.component";
import { BibliotecaComponent } from "./list-cards/biblioteca/biblioteca.component";
import { ListForosComponent } from "./foro/list-foros/list-foros.component";
import { NewForoComponent } from "./foro/new-foro/new-foro.component";
import { UploadCardComponent } from "./custom-cards/upload-card/upload-card.component";
import { ContactComponent } from "./contact/contact.component";

export const MAIN_ROUTE:Routes = [
  {path: '', title: 'Inicio',component: InicioComponent},
  {path: 'cripta',title: 'Crypta', component: CriptaComponent},
  {path: 'biblioteca',title: 'Biblioteca', component: BibliotecaComponent},
  {path: 'custom',title: 'Custom Cards', component: CustomComponent},
  {path: 'upload-card', title: 'Upload Card',component: UploadCardComponent},
  {path: 'gallery',title: 'Gallery', component: GalleryComponent},
  {path: 'events', title: 'Events',component: EventsComponent},
  {path: 'ficha-deck/:id',title: 'Ficha Deck', component: FichaDeckComponent},
  {path: 'ficha-deck',title: 'Ficha Deck', component: FichaDeckComponent},
  {path: 'lista-decks',title: 'Lista Decks', component: ListaDecksComponent},
  {path: 'listar-eventos',title: 'Lista de Eventos', component: ListarEventosComponent},
  {path: 'list-foros',title: 'Lista de Foros', component: ListForosComponent},
  {path: 'new-foro',title: 'New Foro', component: NewForoComponent},
  {path: 'contact',title: 'Contact', component: ContactComponent}
]
