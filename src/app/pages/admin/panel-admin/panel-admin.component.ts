import { Component } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { ListUsersComponent } from "./list-users/list-users.component";

@Component({
    selector: 'app-panel-admin',
    standalone: true,
    templateUrl: './panel-admin.component.html',
    styleUrl: './panel-admin.component.scss',
    imports: [CalendarComponent, ListUsersComponent]
})
export class PanelAdminComponent {

}
