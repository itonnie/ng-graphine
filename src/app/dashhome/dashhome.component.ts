import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {

  username: String;
  pending: any[];
  quoted: any[];
  approved: any[];
  completed: any[];
  cancelled: any[];
  history: any[];
  add_technician: Boolean;
  generate_report: Boolean;
  view_clients: Boolean;

  constructor(private router: Router, private link: AppdataService) {
    if(window.localStorage.getItem("username") == null) {
      this.router.navigate(["/dashlogin"]);
    } else {
      this.username = window.localStorage.getItem("username");
      this.add_technician = Boolean(window.localStorage.getItem("add_technician"));
      this.generate_report = Boolean(window.localStorage.getItem("generate_report"));
      this.view_clients = Boolean(window.localStorage.getItem("view_clients"));

      this.link.getOrders("pending").subscribe(data => {
        this.pending = data.data;
      });

      this.link.getOrders("quoted").subscribe(data => {
        this.quoted = data.data;
      });

      this.link.getOrders("approved").subscribe(data => {
        this.approved = data.data;
      });

      this.link.getOrders("completed").subscribe(data => {
        this.completed = data.data;
      });

      this.link.getOrders("cancelled").subscribe(data => {
        this.cancelled = data.data;
      });

      this.link.getOrders("").subscribe(data => {
        this.history = data.data;
      });

    }
  }

  ngOnInit() {
  }

  logUserOut() {
    window.localStorage.clear();
    this.router.navigate(["/dashlogin"]);
  }

}
