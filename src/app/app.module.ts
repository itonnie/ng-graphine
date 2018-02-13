import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material Components
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule } from "@angular/material";
import { MatListModule, MatSelectModule, MatCardModule, MatTabsModule, MatSnackBarModule } from "@angular/material";
import { MatExpansionModule, MatInputModule, MatCheckboxModule, MatDialogModule, MatDialogConfig} from "@angular/material";
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ScheduleComponent } from "./schedule/schedule.component";
import { AboutComponent } from "./about/about.component";

import { AppdataService } from "./appdata.service";
import { SocketsService } from './sockets.service';
import { DashboardDataService } from "./dashboard-data.service";
import { DashhomeComponent } from './dashhome/dashhome.component';
import { DashloginComponent } from './dashlogin/dashlogin.component';
import { OrderComponent } from './order/order.component';
import { StaffComponent } from './staff/staff.component';
import { StatsComponent } from './stats/stats.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientdetailsComponent } from './clientdetails/clientdetails.component';
import { StaffdetailsComponent } from './staffdetails/staffdetails.component';
import { SMSDialog } from "./order/order.component"

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    ScheduleComponent,
    DashhomeComponent,
    DashloginComponent,
    OrderComponent,
    StaffComponent,
    StatsComponent,
    ClientsComponent,
    ClientdetailsComponent,
    StaffdetailsComponent,
    SMSDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ AppdataService, SocketsService, DashboardDataService, { provide: MatDialogConfig, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent],
  entryComponents: [ SMSDialog ]
})
export class AppModule { }
