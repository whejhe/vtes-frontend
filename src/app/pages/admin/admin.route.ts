import { Routes } from "@angular/router";
import { PanelAdminComponent } from "./panel-admin/panel-admin.component";
import { ListUsersComponent } from "./panel-admin/list-users/list-users.component";
import { ReportComponent } from "./report/report.component";


export const ADMIN_ROUTE:Routes = [
  {path: '', component: PanelAdminComponent},
  {path: 'Usuarios', component: ListUsersComponent},
  {path: 'Report', component: ReportComponent},
]
