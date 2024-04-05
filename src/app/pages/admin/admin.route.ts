import { Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { PanelAdminComponent } from "./panel-admin/panel-admin.component";


export const ADMIN_ROUTE:Routes = [
  {path: '', component: PanelAdminComponent},
  {path: 'calendar', component:CalendarComponent}
]
