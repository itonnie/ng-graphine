import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SocketsService } from "./sockets.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  dashboard: Boolean = false;
  constructor(private router: Router, private io: SocketsService) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.io.sendLocation(pos);
      console.log(pos);
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

}
