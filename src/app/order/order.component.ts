import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppdataService } from "../appdata.service";
import { DatePipe } from "@angular/common";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { window, document } from 'angular-bootstrap-md/utils/facade/browser';
import { DashboardDataService } from "../dashboard-data.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  username: String;

  id: String;
  fullname: String;
  phone: Number;
  county: String;
  street: String;
  town: String;
  category: String;
  sub: String;
  subsub: String;
  price: Number;
  quoted: Boolean;
  approved: Boolean;
  completed: Boolean;
  pending: Boolean;
  cancelled: Boolean;
  email: String;
  time: Date;
  schedule_datentime: Date;
  date: Date;
  timestamp: Date;
  desc: String;
  comments: any[];
  dispached_experts: any[];

  tech: any;
  experts: any[];

  quotation_box: Number;
  commentForm: FormGroup;
  dispatchForm: FormGroup;

  //User permissions
  add_technician: Boolean;
  approve_order: Boolean;
  cancel_order: Boolean;
  complete_order: Boolean;
  delete_technician: Boolean;
  edit_technician: Boolean;
  email_client: Boolean;
  generate_client_info: Boolean;
  generate_report: Boolean;
  quote_order: Boolean;
  remove_technician: Boolean;

  constructor(
    private rActivated: ActivatedRoute,
    private appdata: AppdataService, 
    private router: Router, 
    private fb: FormBuilder,
    private snack: MatSnackBar, private applive: DashboardDataService, private dialog: MatDialog
  ) {

    //get the username
    this.applive.username.subscribe(username => {
      this.username = username;
    });

    //GET and SET permissions
    this.applive.quoteorder.subscribe(foo => {
      this.quote_order = foo;
    });
    this.applive.addtechnician.subscribe(fooo => {
      this.add_technician = fooo;
    })

    this.appdata.currentId.subscribe(data => {
      this.id = data;
      this.appdata.viewOrder(data).subscribe(response => {
        this.fullname = response.data.fullname;
        this.phone = response.data.phone;
        this.category = response.data.category;
        this.sub = response.data.sub;
        this.subsub = response.data.subsub;
        this.county = response.data.county;
        this.town = response.data.town;
        this.street = response.data.street;
        this.quoted = response.data.quoted;
        this.email = response.data.email;
        this.approved = response.data.approved;
        this.completed = response.data.completed;
        this.pending = response.data.pending;
        this.cancelled = response.data.cancelled;
        this.time = response.data.time;
        this.date = response.data.date;
        this.timestamp = new Date(response.data.timestamp);
        this.schedule_datentime = new Date(response.data.date + ',' + response.data.time);
        this.price = response.data.price;
        this.desc = response.data.desc;
        this.comments = response.data.comments;
        this.dispached_experts = response.data.dispached_experts;
      });
    });

    this.appdata.getTechnicians().subscribe(technicians => {
      this.experts = technicians.data;
    })

    if(this.id == "") {
      this.router.navigate(['/dashhome']);
    }

    this.commentForm = this.fb.group({
      "comment": [null, Validators.compose([ Validators.minLength(3), Validators.maxLength(150)])]
    });

    this.dispatchForm = this.fb.group({
      "tech": [null]
    });

    //set permissions from LocalStorage
    this.add_technician = Boolean(window.localStorage.getItem("add_technician"));
    this.approve_order = Boolean(window.localStorage.getItem("approve_order"));
    this.cancel_order = Boolean(window.localStorage.getItem("cancel_order"));
    this.complete_order = Boolean(window.localStorage.getItem("complete_order"));
    this.delete_technician = Boolean(window.localStorage.getItem("delete_technician"));
    this.edit_technician = Boolean(window.localStorage.getItem("edit_technician"));
    this.email_client = Boolean(window.localStorage.getItem("email_client"));
    this.generate_client_info = Boolean(window.localStorage.getItem("generate_client_info"));
    this.generate_report = Boolean(window.localStorage.getItem("generate_report"));

    this.remove_technician = Boolean(window.localStorage.getItem("remove_technician"));

  }

  ngOnInit() {
  }

  quoteOrder(id: String, quote: Number) {
    this.appdata.quoteOrder(id, quote).subscribe(response => {
      if(response.ok == false) {
        this.snack.open(response.message, "dismiss", {
          duration: 3000
        });
      } else {
        this.price = response.data.price;
      }
    });
  }

  submitForm(id, value) {
    if(this.commentForm.controls["comment"].invalid) {
      this.snack.open("Comment with values between 3 - 150 words", "dismiss", {
        duration: 3000,
        verticalPosition: "bottom"
      });
    } else {
      this.appdata.comment(this.username, id, value.comment).subscribe(response => {
        this.fullname = response.data.fullname;
        this.phone = response.data.phone;
        this.category = response.data.category;
        this.sub = response.data.sub;
        this.subsub = response.data.subsub;
        this.county = response.data.county;
        this.town = response.data.town;
        this.street = response.data.street;
        this.quoted = response.data.quoted;
        this.email = response.data.email;
        this.approved = response.data.approved;
        this.completed = response.data.completed;
        this.pending = response.data.pending;
        this.cancelled = response.data.cancelled;
        this.time = response.data.time;
        this.date = response.data.date;
        this.timestamp = new Date(response.data.timestamp);
        this.price = response.data.price;
        this.desc = response.data.desc;
        this.comments = response.data.comments;
        this.dispached_experts = response.data.dispached_experts;
      });
    }
    this.commentForm.controls["comment"].setValue("");
  }

  dispatch_tech(username, id) {
    this.appdata.dispatchTechnician(id, username.tech.username).subscribe(data => {
      this.snack.open(username.tech.username + " successfully dispatched.", "Ok", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right",
      });
    });
    this.submitForm(id, { comment: username.tech.username + " has been dispatched to work on project."});
  }

  sendSMS() {
    this.dialog.open(SMSDialog, {
      width: "300px",
      data: { phone: this.phone, username: this.username, }
    });
  }

  cancelOrder(id) {
    this.appdata.cancelOrder(id).subscribe(data => {
      if(data.ok == true) {
        this.snack.open("Order has been successfully cancelled.", "Okay", {
          duration: 3000,
          verticalPosition: "top"
        });
        this.router.navigate(["/dashhome"]);
      } else {
        this.snack.open("Could not cancel order, please contact admin or check your connection", "ok", {
          duration: 3000,
          verticalPosition: "top"
        });
      }
    })
  }

}

@Component({
  selector: "sms-dialog",
  templateUrl: "sms-dialog.html"
})

export class SMSDialog {
  constructor(public dialogRef: MatDialogRef<SMSDialog>,@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  closeSMS() {
    this.dialogRef.close();
  }
}