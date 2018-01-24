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
          console.log(userData);

          this.username = userData.data.username;
          this.title = userData.data.title;
          this.staff_id = userData.data.staff_id;
          this.phone = userData.data.phone;
          this.last_login = ll;
          this.email = userData.data.email;
          this.account_created = ac;
          this.permissions = userData.data.permissions;
        });
      });
    }
  }

}
