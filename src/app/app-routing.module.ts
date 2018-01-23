import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routes Components
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ScheduleComponent } from 'app/schedule/schedule.component';
import { DashloginComponent } from "./dashlogin/dashlogin.component";
import { DashhomeComponent } from "./dashhome/dashhome.component";
import { OrderComponent } from "./order/order.component";
import { ClientsComponent } from "./clients/clients.component";
import { StaffComponent } from "./staff/staff.component";
import { StatsComponent } from "./stats/stats.component";
import { StaffdetailsComponent } from "./staffdetails/staffdetails.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'dashlogin', component: DashloginComponent },
  { path: 'dashhome', component: DashhomeComponent },
  { path: 'order', component: OrderComponent },
  { path: "clients", component: ClientsComponent },
  { path: "staff", component: StaffComponent },
  { path: "stats", component: StatsComponent },
  { path: "staffdetail", component: StaffdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
