import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppdataService } from "../appdata.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from "@angular/material";

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

  }

  ngOnInit() {
  }

  quoteOrder(id: String, quote: Number) {
    this.appdata.quoteOrder(id, quote).subscribe(response => {
      this.price = response.data.price;
      console.log(response);
    })
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