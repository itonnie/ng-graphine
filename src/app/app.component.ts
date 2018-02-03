import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SocketsService } from "./sockets.service";
import { AppdataService } from "./appdata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  dashboard: Boolean = false;
  constructor(private router: Router, private io: SocketsService, private app: AppdataService) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.app.saveUserInfo(pos.coords.accuracy, pos.coords.altitude, pos.coords.altitudeAccuracy, pos.coords.heading, pos.coords.latitude, pos.coords.longitude, pos.coords.speed).subscribe(response => {
        if(response.ok == true) {
          console.log(response);
        }
      })
    });

    setInterval(() => {
      this.dashboard = this.dashboard;
      switch(this.router.url) {
        case "/dashhome":
          this.dashboard = true;
        break;

        case "/dashlogin":
          this.dashboard = true;
        break;

        case "/order":
          this.dashboard = true;
        break;

        case "/clients":
          this.dashboard = true;
        break;

        case "/staff":
          this.dashboard = true;
        break;

        case "/stats":
          this.dashboard = true;
        break;

        case "/staffdetail":
          this.dashboard = true;
        break;

        default:
          this.dashboard = false;
        break;
      }
    }, 1000);
  }

  toAdmin() {
    this.dashboard == true;
    this.router.navigate(['/dashhome']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  openMap() {
    var url = "https://www.google.com.sa/maps/search/-1.229343,36.879184,12.21z?h1=en";
    window.open(url, '_blank');
  }

}
