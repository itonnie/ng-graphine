import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppdataService } from "../appdata.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  talkForm: FormGroup;

  constructor(private fb: FormBuilder, private snack: MatSnackBar, private app: AppdataService) {
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
      this.app.feedback(value.name, value.email, value.message).subscribe(response => {
        this.snack.open(response.message, "Ok", {
          duration: 5000  
        });
        this.talkForm.reset();
      });
    }
  }

}
