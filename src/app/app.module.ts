import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material Components
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule } from "@angular/material";
import { MatListModule, MatSelectModule, MatCardModule, MatTabsModule } from "@angular/material";
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ScheduleComponent } from "./schedule/schedule.component";
import { AboutComponent } from "./about/about.component";

import { AppdataService } from "./appdata.service";
import { SocketsService } from './sockets.service';
import { DashhomeComponent } from './dashhome/dashhome.component';
import { DashloginComponent } from './dashlogin/dashlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    ScheduleComponent,
    DashhomeComponent,
    DashloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [ AppdataService, SocketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
