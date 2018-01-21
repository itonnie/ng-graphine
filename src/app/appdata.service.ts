import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()

export class AppdataService {

  constructor(public http: Http) { }

  getCounties() {
    return this.http.get('assets/json/counties.json').map(res => res.json());
  }

  makeAppointment(from, to, county, fullname, town, street, phone, category, sub, subsub) {
    return this.http.post('http://localhost:3000/addschedule', {
      from: from,
      to: to,
      county: county,
      category: category,
      fullname: fullname,
      town: town,
      street: street,
      phone: phone,
      sub: sub,
      subsub: subsub
    }).map(res => res.json());
  }

  login(type: String, email: String, password: String) {
    return this.http.post("http://localhost:3000/auth/login", {
      type: type,
      email: email,
      password: password
    }).map(res => res.json());
  }

  getOrders(type) {
    return this.http.get("http://localhost:3000/admin/schedules/"+type).map(res => res.json());
  }

}
