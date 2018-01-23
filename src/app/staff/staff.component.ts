import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  username: String;
  add_technician: Boolean;
  generate_report: Boolean;
  view_clients: Boolean;

  technicians: any[];
  managers: any[];

  add_tech: FormGroup;
  add_man: FormGroup;

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private snack: MatSnackBar,
    private appdata: AppdataService
  ) {

    if(window.localStorage.getItem("username") == null) {
      this.router.navigate(["/dashlogin"]);
    } else {
      this.username = window.localStorage.getItem("username");
      this.add_technician = Boolean(window.localStorage.getItem("add_technician"));
      this.generate_report = Boolean(window.localStorage.getItem("generate_report"));
      this.view_clients = Boolean(window.localStorage.getItem("view_clients"));
    }

    this.add_tech = this.fb.group({
      "username": [null, Validators.compose([ Validators.minLength(3) ])],
      "phone": [null, Validators.compose([Validators.min(10), Validators.maxLength(14)])],
      "email": [null, Validators.compose([ Validators.email])],
      "staff_id": [null],
      "title": [null]
    });

    this.add_man = this.fb.group({
      "username": [null, Validators.compose([ Validators.minLength(3) ])],
      "phone": [null, Validators.compose([Validators.min(10), Validators.maxLength(14)])],
      "email": [null, Validators.compose([ Validators.email])],
      "staff_id": [null]
    });

    this.appdata.getTechnicians().subscribe(techs => {
      this.technicians = techs.data;
    });

    this.appdata.getManagers().subscribe(mans => {
      this.managers = mans.data;
    });
  }

  ngOnInit() {
  }

  logUserOut() {
    window.localStorage.clear();
    this.router.navigate(["/dashlogin"]);
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

  addtechnician(value) {
    if(!this.add_tech.valid) {
      this.snack.open("Invalid data", "dismiss", {
        duration: 3000,
        verticalPosition: "top"
      });
    } else {
      this.appdata.addTechnician(value.username, value.email, value.phone, value.staff_id, value.title).subscribe(response => {
        this.technicians = response.data;

        this.add_tech.reset();

        this.snack.open(response.info.username + " has been added as a " + response.info.title, "dismiss", {
          duration: 3000
        });
      });
    }
  }

  addmanager(value) {
    if(!this.add_man.valid) {
      this.snack.open("Invalid data", "dismiss", {
        duration: 3000,
        verticalPosition: "top"
      });
    } else {
      this.appdata.addManager(value.username, value.email, value.phone, value.staff_id).subscribe(response => {
        this.managers = response.data;

        this.add_man.reset();

        this.snack.open(response.info.username + " has been added as a " + response.info.title, "dismiss", {
          duration: 3000
        });
      });
    }
  }

  viewStaffMember(id, type) {
    this.appdata.setStaffId(id, type);
    this.router.navigate(['/staffdetail']);
  }

}
