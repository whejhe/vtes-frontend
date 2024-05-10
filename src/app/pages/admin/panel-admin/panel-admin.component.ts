import { Component } from '@angular/core';
import { ListUsersComponent } from "./list-users/list-users.component";
import { ReportComponent } from "../report/report.component";

@Component({
    selector: 'app-panel-admin',
    standalone: true,
    templateUrl: './panel-admin.component.html',
    styleUrl: './panel-admin.component.scss',
    imports: [
        ListUsersComponent,
        ReportComponent
    ]
})
export class PanelAdminComponent {

    constructor(
    ){}

    showReports = false;
    showUserList = false;

    showReportList(){
        this.showReports = !this.showReports;
    }
    showUserLists(){
        this.showUserList = !this.showUserList;
    }
}
