import { Component } from '@angular/core';
import { ListUsersComponent } from "./list-users/list-users.component";
import { ReportComponent } from "../report/report.component";
import { ListarEventosComponent } from "../../main/eventos/listar-eventos/listar-eventos.component";
import { CustomCardsListComponent } from "../custom-cards-list/custom-cards-list.component";
import { ListaDecksComponent } from "../../main/deck/lista-decks/lista-decks.component";

@Component({
    selector: 'app-panel-admin',
    standalone: true,
    templateUrl: './panel-admin.component.html',
    styleUrl: './panel-admin.component.scss',
    imports: [
        ListUsersComponent,
        ReportComponent,
        ListarEventosComponent,
        CustomCardsListComponent,
        ListaDecksComponent
    ]
})
export class PanelAdminComponent {

    constructor(
    ){}

    showReports = false;
    showUserList = false;
    showEventos = false;
    showCustomCards = false;
    showDecks = false;


    showReportList(){
        this.showReports = !this.showReports;
    }
    showUserLists(){
        this.showUserList = !this.showUserList;
    }
    showEventList(){
        this.showEventos = !this.showEventos;
    }
    showCustomCardList(){
        this.showCustomCards = !this.showCustomCards
    }
    showDeckList(){
        this.showDecks = !this.showDecks
    }

}
