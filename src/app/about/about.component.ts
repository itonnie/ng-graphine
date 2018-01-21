import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  talkForm: FormGroup;

  constructor(private fb: FormBuilder, private snack: MatSnackBar) {
    this.talkForm = fb.group({
      "name": [null],
      "email": [null, Validators.compose([ Validators.email ])],
      "message": [null, Validators.compose([ Validators.minLength(10), Validators.maxLength(600)])]
    });
  }

  ngOnInit() {
  }

  talktous(value) {
    if(this.talkForm.invalid) {
      this.snack.open("Please validate the information filled out", "dismiss", {
        duration: 2000
      });
    }
    else {
      console.log(value);
      this.snack.open("Thank you for your feeback, we will get back to you shortly...", "Ok", {
        duration: 5000
      });
    }
  }

}
