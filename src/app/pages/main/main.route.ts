
import { Routes } from "@angular/router";

import { InicioComponent } from "./inicio/inicio.component";

import { PortadaCustomCardComponent } from "./portada-custom-card/portada-custom-card.component";
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

export const MAIN_ROUTE:Routes = [
  {path: '', component: InicioComponent},
  {path: 'cripta', component: CriptaComponent},
  {path: 'biblioteca', component: BibliotecaComponent},
  {path: 'portada-custom-card', component: PortadaCustomCardComponent},
  {path: 'custom', component: CustomComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'events', component: EventsComponent},
  {path: 'ficha-deck', component: FichaDeckComponent},
  {path: 'lista-decks', component: ListaDecksComponent},
  {path: 'listar-eventos', component: ListarEventosComponent},
  {path: 'list-foros', component: ListForosComponent},
  {path: 'new-foro', component: NewForoComponent},
]
