import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  
  schedule(id, sub, subsub) {
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

    this.router.navigate(['/schedule'], {
      queryParams: {
        category: category,
        sub: sub,
        subsub: subsub
      }
    });
  }


}
