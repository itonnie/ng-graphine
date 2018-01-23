import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppdataService } from "../appdata.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  id: String;
  fullname: String;
  phone: Number;
  category: String;
  sub: String;
  subsub: String;
  price: Number;

  quotation_box: Number;

  constructor(private rActivated: ActivatedRoute, private appdata: AppdataService, private router: Router) {
    this.appdata.currentId.subscribe(data => {
      this.id = data;
      this.appdata.viewOrder(data).subscribe(response => {
        console.log(response.data);
        this.fullname = response.data.fullname;
        this.phone = response.data.phone;
        this.category = response.data.category;
        this.sub = response.data.sub;
        this.subsub = response.data.subsub;
      });
    });

    if(this.id == "") {
      this.router.navigate(['/dashhome']);
    }
  }

  ngOnInit() {
  }

  quoteOrder(id: String, quote: Number) {
    this.appdata.quoteOrder(id, quote).subscribe(response => {
      this.price = response.data.price;
      console.log(response);
    })
  }

}