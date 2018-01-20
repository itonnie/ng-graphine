import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-dashlogin',
  templateUrl: './dashlogin.component.html',
  styleUrls: ['./dashlogin.component.css']
})
export class DashloginComponent implements OnInit {

  acc_type = "admin";
  access_level: any;
  adminLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private live: AppdataService, private router: Router) {
    this.adminLoginForm = fb.group({
      "access_level": [null],
      "email": [null, Validators.compose([ Validators.email ])],
      "password": [null, Validators.compose([ Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  adminLoginSubmit(value) {
    console.log(value);
    if(this.adminLoginForm.controls['email'].invalid || this.adminLoginForm.controls['password'].invalid) {
      //Invalid data
    } else {
      this.live.adminlogin(value.email, value.password).subscribe(response => {
        console.log(response);
        if(response.ok == true) {
          window.localStorage.setItem("username", response.data.username);
          //save permissions
          window.localStorage.setItem("add_technician", response.data.permissions.add_technician);
          window.localStorage.setItem("approve_order", response.data.permissions.add_technician);
          window.localStorage.setItem("cancel_order", response.data.permissions.cancel_order);
          window.localStorage.setItem("complete_order", response.data.permissions.complete_order);
          window.localStorage.setItem("delete_technician", response.data.permissions.delete_technician);
          window.localStorage.setItem("edit_technician", response.data.permissions.edit_technician);
          window.localStorage.setItem("email_client", response.data.permissions.email_client);
          window.localStorage.setItem("generate_client_info", response.data.permissions.generate_client_info);
          window.localStorage.setItem("generate_report", response.data.permissions.generate_report);
          window.localStorage.setItem("quote_order", response.data.permissions.quote_order);
          window.localStorage.setItem("remove_technician", response.data.permissions.remove_technician);
          window.localStorage.setItem("view_clients", response.data.permissions.view_clients);

          this.router.navigate(["/dashhome"]);
        } else {
          alert(response.message);
        }
      })
    }
  }

}
