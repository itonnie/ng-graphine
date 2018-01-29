import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  //Reactive Forms
  rForm: FormGroup;

  category: String;
  sub: String;
  subsub: String;
  counties: String[];

  from: Date;
  to: Date;
  fullname: String = "";
  town: String = "";
  select: String = "";
  street: String = "";
  email: String = "";
  phone: Number;

  fromerr: String;
  toerr: String;
  fullerr: String;
  twnerr: String;
  selerr: String;
  sterr: String;
  pherr: String;

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(
    public ar: ActivatedRoute, private snackbar: MatSnackBar, 
    public router: Router, 
    public appdata: AppdataService,
    public fb: FormBuilder
  ) 
  {
    this.rForm = fb.group({
      'fullname': [null, Validators.required],
      'from': [null, Validators.required],
      'to': [null, Validators.required],
      'town': [null, Validators.required],
      'street': '',
      'select': [null, Validators.required],
      'email': [null, Validators.compose([ Validators.email ])],
      'newsletter': '',
      'description': [null],
      'warrant': [null],
      'phone': [null, Validators.compose([ Validators.required, Validators.minLength(10), Validators.maxLength(11)])]
    })
  }

  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      this.category = params['category'];
      this.sub = params['sub'];
      this.subsub = params['subsub'];
    });

    this.appdata.getCounties().subscribe(data => {
      this.counties = data;
    })
  }

  getScheduleInfo(category, name, subsub) {
    this.category = category;
    this.sub = name;
    this.subsub = subsub;
  }

  scheduleAppointment(form) {
    
    this.appdata.makeAppointment(form.from, form.to, form.select, form.fullname, form.town, form.street, form.phone, this.category, this.sub, this.subsub, form.description, form.email, form.warranty).subscribe(data => {
      if(data.ok == true) {
        this.snackbar.open("Order id " + data.id.toString().toUpperCase() + " has been recieved", "dismiss", {
          duration: 3000
        });
        this.router.navigate(['/']);
      }
    });
  }

  schedule(id, name, subsub) {
    var category;
    switch(id) {
      case 1:
        category = "Residential Repair and Maintenance";
        break;
      case 2:
        category = "Hotels and Institutions Repair and Maintenance";
        break;
      case 3:
        category = "Commercial Repair and Maintenance";
        break;
      case 4:
        category = "Building Repairs and Maintenance";
        break;
      case 5:
        category = "Entertainment Equipment Repair and Maintenance";
        break;
      case 6:
        category = "Green Energy Solutions";
        break;
      default:
        category = "None Picked";
        break;
    }

    this.getScheduleInfo(category, name, subsub);
  }

}
