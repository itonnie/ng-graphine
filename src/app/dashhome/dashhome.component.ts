import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";
import { MatSnackBar } from "@angular/material";
import { DashboardDataService } from "../dashboard-data.service";

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {

  pending: any[];
  quoted: any[];
  approved: any[];
  completed: any[];
  cancelled: any[];
  history: any[];
  
  username: String;
  accesslevel: String;

  add_technician: Boolean;
  view_clients: Boolean;

  constructor(private router: Router, private link: AppdataService, private snack: MatSnackBar,
  private applive: DashboardDataService) {
    this.applive.username.subscribe(username => {
      if(username == "") {
        this.router.navigate(["/dashlogin"]);
      } else {
        this.username = username;

        //set the access level
        this.applive.accesslevel.subscribe(access => {
          this.accesslevel = access;
        });
        //set add_tech level
        this.applive.addtechnician.subscribe(boo => {
          this.add_technician = boo;
        });
        //set if user can see client details
        this.applive.viewclients.subscribe(boo => {
          this.view_clients = boo;
        });

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

        this.link.getOrders("blank").subscribe(data => {
          this.history = data.data;
        });
      }
    });

  }

  ngOnInit() {
  }

  logUserOut() {
    this.applive.setUsername("");
    this.router.navigate(["/dashlogin"]);
  }

  viewOrder(id) {   
    this.link.viewOrderById(id);
    this.router.navigate(['/order']);
  }

  approveOrder(id) {
    this.link.approveOrder(id).subscribe(data => {
      this.quoted = data.quoted;
      this.approved = data.approved;
    })
  }

  completeOrder(id) {
    this.link.completeOrder(id).subscribe(data => {
      this.approved = data.approved;
      this.completed = data.completed;
    })
  }

  cancelOrder(id) {
    this.link.cancelOrder(id).subscribe(data => {
      this.pending = data.pending;
      this.quoted = data.quoted;
      this.approved = data.approved;
      this.completed = data.completed;
    })
  }

  navigate(where) {
    switch(where) {
      case "orders":
        this.router.navigate(['/dashhome']);
      break;

      case "staff":
        this.router.navigate(['/staff']);
      break;

      case "stats":
        this.router.navigate(['/stats']);
      break;

      case "clients":
        this.router.navigate(['/clients']);
      break;

      default:
        this.router.navigate(['/dashhome']);
      break;
    }
  }

  changePassword() {
    var currentPassword = prompt("Enter current password", "");
    var newPassword = prompt("Enter new password", "");
    var confirmPassword = prompt("Re enter new password", "");

    if(newPassword != confirmPassword) {
      this.snack.open("Please confirm your new password and try again", "okay", {
        duration: 3000,
        verticalPosition: "top"
      });
    } else if(currentPassword == "" || newPassword == "" || confirmPassword == "" || newPassword == null || currentPassword == null || confirmPassword == null) {
      this.snack.open("Passwords aren't allowed to be empty", "Alright", {
        duration: 3000,
        verticalPosition: "top"
      })
    } else {
      this.link.changepassword(window.localStorage.getItem("username"), currentPassword, newPassword).subscribe(data => {
        if(data.ok == false) {
          this.snack.open(data.message, "too bad", {
            duration: 3000,
            verticalPosition: "top"
          });
        } else {
          this.snack.open(data.message, "Aw yeah!", {
            duration: 3000,
            verticalPosition: "top"
          });
        }
      });
    }
  }

}
