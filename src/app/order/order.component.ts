import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppdataService } from "../appdata.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from "@angular/material";
import { window, document } from 'angular-bootstrap-md/utils/facade/browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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
  to: Date;
  from: Date;
  desc: String;
  comments: any[]

  quotation_box: Number;
  commentForm: FormGroup;

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
  view_clients: Boolean;

  constructor(
    private rActivated: ActivatedRoute,
    private appdata: AppdataService, 
    private router: Router, 
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {

    this.appdata.currentId.subscribe(data => {
      this.id = data;
      this.appdata.viewOrder(data).subscribe(response => {
        console.log(response.data);
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
        this.to = new Date(response.data.to);
        this.from = new Date(response.data.from);
        this.price = response.data.price;
        this.desc = response.data.desc;
        this.comments = response.data.comments;
      });
    });

    if(this.id == "") {
      this.router.navigate(['/dashhome']);
    }

    this.commentForm = this.fb.group({
      "comment": [null, Validators.compose([ Validators.minLength(3), Validators.maxLength(150)])]
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
    this.quote_order = new Boolean(window.localStorage.getItem("quote_order"));
    this.remove_technician = Boolean(window.localStorage.getItem("remove_technician"));
    this.view_clients = Boolean(window.localStorage.getItem("view_clients"));
    console.log(this.quote_order);

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
      this.appdata.comment(window.localStorage.getItem("username"), id, value.comment).subscribe(response => {
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
        this.to = new Date(response.data.to);
        this.from = new Date(response.data.from);
        this.price = response.data.price;
        this.desc = response.data.desc;
        this.comments = response.data.comments;
      });
    }
  }

}