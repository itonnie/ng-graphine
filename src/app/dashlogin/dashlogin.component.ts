import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";
import { MatSnackBar } from "@angular/material";
import { DashboardDataService } from "../dashboard-data.service";

@Component({
  selector: 'app-dashlogin',
  templateUrl: './dashlogin.component.html',
  styleUrls: ['./dashlogin.component.css']
})
export class DashloginComponent implements OnInit {

  acc_type = "admin";
  access_level: any = "Admin";
  adminLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private live: AppdataService, private router: Router,
    private snack: MatSnackBar, private applive: DashboardDataService) {
    this.adminLoginForm = fb.group({
      "access_level": [null],
      "email": [null, Validators.compose([ Validators.email ])],
      "password": [null, Validators.compose([ Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  adminLoginSubmit(value) {
    if(this.adminLoginForm.controls['email'].invalid || this.adminLoginForm.controls['password'].invalid) {
      this.snack.open("Please input valid data", "Dismiss", {
        duration: 3000
      })
    } else {
      this.live.login(value.access_level.toLowerCase(), value.email, value.password).subscribe(response => {
        if(response.ok == true) {
          //set access level and username, will set permissions as well
          this.applive.setAccessLevel(value.access_level.toLowerCase());
          this.applive.setUsername(response.data.username);
          this.applive.setPermission("add_technician", response.data.permissions.add_technician);
          this.applive.setPermission("approve_order", response.data.permissions.approve_order);
          this.applive.setPermission("cancel_order", response.data.permissions.cancel_order);
          this.applive.setPermission("complete_order", response.data.permissions.complete_order);
          this.applive.setPermission("delete_technician", response.data.permissions.delete_technician);
          this.applive.setPermission("edit_technician", response.data.permissions.edit_technician);
          this.applive.setPermission("email_client", response.data.permissions.email_client);
          this.applive.setPermission("generate_client_info", response.data.permissions.generate_client_info);
          this.applive.setPermission("generate_report", response.data.permissions.generate_report);
          this.applive.setPermission("quote_order", response.data.permissions.quote_order);
          this.applive.setPermission("remove_technician", response.data.permissions.remove_technician);
          this.applive.setPermission("view_clients", response.data.permissions.view_clients);
          this.router.navigate(["/dashhome"]);
        } else {
          this.snack.open(response.message, "Dismiss", {
            duration: 3000,
            verticalPosition: "top"
          })
        }
      })
    }
  }

}
