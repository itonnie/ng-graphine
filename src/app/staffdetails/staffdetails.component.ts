import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-staffdetails',
  templateUrl: './staffdetails.component.html',
  styleUrls: ['./staffdetails.component.css']
})
export class StaffdetailsComponent implements OnInit {

  id: String;
  username: String;
  title: String;
  staff_id: String;
  phone: Number;
  last_login: Date;
  email: String;
  account_created: Date;
  permissions: any;

  add_technician: Boolean;
  approve_order: Boolean;
  cancel_order: Boolean;
  complete_order: Boolean;
  delete_order: Boolean;
  edit_technician: Boolean;
  email_client: Boolean;
  generate_client_info: Boolean;
  generate_report: Boolean;
  quote_order: Boolean;
  remove_technician: Boolean;
  view_clients: Boolean;

  setpermissions: any[];

  constructor(private appdata: AppdataService, private router: Router) {
    this.appdata.currentStaffId.subscribe(id => {
      this.id = id;
    });
  }

  ngOnInit() {
    if(this.id == "") {
      this.router.navigate(['/staff']);
    } else {
      this.appdata.currentLevel.subscribe(level => {
        this.appdata.viewStaff(this.id, level).subscribe(userData => {

          var ll = new Date(userData.data.last_login);
          var ac = new Date(userData.data.account_created);
          console.log(userData.data.permissions);

          this.username = userData.data.username;
          this.title = userData.data.title;
          this.staff_id = userData.data.staff_id;
          this.phone = userData.data.phone;
          this.last_login = ll;
          this.email = userData.data.email;
          this.account_created = ac;
          this.add_technician = userData.data.permissions.add_technician;
          this.approve_order = userData.data.permissions.approve_order;
          this.cancel_order = userData.data.permissions.cancel_order;
          this.complete_order = userData.data.permissions.complete_order;
          this.delete_order = userData.data.permissions.delete_order;
          this.edit_technician = userData.data.permissions.edit_technician;
          this.email_client = userData.data.permissions.email_client;
          this.generate_client_info = userData.data.permissions.generate_client_info;
          this.generate_report = userData.data.permissions.generate_report;
          this.quote_order = userData.data.permissions.quote_order;
          this.remove_technician = userData.data.permissions.remove_technician;
          this.view_clients = userData.data.permissions.view_clients;
        });
      });
    }
  }

  updatePermissions(id) {
    let permissions = {
      id: id,
      gr: this.generate_report,
      qo: this.quote_order,
      at: this.add_technician,
      rt: this.remove_technician,
      et: this.edit_technician,
      do: this.delete_order,
      co: this.cancel_order,
      vc: this.view_clients,
      gci: this.generate_client_info,
      ao: this.approve_order,
      como: this.complete_order,
      ec: this.edit_technician
    }

    this.appdata.updateTechPermissions(permissions).subscribe(userData => {
      this.add_technician = userData.data.permissions.add_technician;
      this.approve_order = userData.data.permissions.approve_order;
      this.cancel_order = userData.data.permissions.cancel_order;
      this.complete_order = userData.data.permissions.complete_order;
      this.delete_order = userData.data.permissions.delete_order;
      this.edit_technician = userData.data.permissions.edit_technician;
      this.email_client = userData.data.permissions.email_client;
      this.generate_client_info = userData.data.permissions.generate_client_info;
      this.generate_report = userData.data.permissions.generate_report;
      this.quote_order = userData.data.permissions.quote_order;
      this.remove_technician = userData.data.permissions.remove_technician;
      this.view_clients = userData.data.permissions.view_clients;
    })
  }
}
