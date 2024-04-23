import { Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { PanelAdminComponent } from "./panel-admin/panel-admin.component";
import { ListUsersComponent } from "./panel-admin/list-users/list-users.component";


export const ADMIN_ROUTE:Routes = [
  {path: '', component: PanelAdminComponent},
  {path: 'calendar', component:CalendarComponent},
  {path: 'Usuarios', component: ListUsersComponent}
]
