import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routes Components
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ScheduleComponent } from 'app/schedule/schedule.component';
import { DashloginComponent } from "./dashlogin/dashlogin.component";
import { DashhomeComponent } from "./dashhome/dashhome.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'dashlogin',
    component: DashloginComponent
  },
  {
    path: 'dashhome',
    component: DashhomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
