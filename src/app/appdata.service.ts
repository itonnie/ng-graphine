import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";

@Injectable()

export class AppdataService {

  private idSource = new BehaviorSubject<String>("");
  private staffIdSource = new BehaviorSubject<String>("");
  private stafflevel = new BehaviorSubject<String>("");
  currentId = this.idSource.asObservable();
  currentStaffId = this.staffIdSource.asObservable();
  currentLevel = this.stafflevel.asObservable();

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

  viewOrder(id) {
    return this.http.post("http://localhost:3000/admin/order", {
      id: id
    }).map(res => res.json());
  }

  viewOrderById(id: String) {
    this.idSource.next(id);
  }

  setStaffId(id: String, type: String) {
    this.staffIdSource.next(id);
    this.stafflevel.next(type);
  }

  quoteOrder(id: String, quotation: Number) {
    return this.http.post("http://localhost:3000/admin/quote", {
      id: id,
      quotation: quotation
    }).map(res => res.json());
  }

  approveOrder(id: String) {
    return this.http.post("http://localhost:3000/admin/approve", {
      id: id
    }).map(res => res.json());
  }

  completeOrder(id: String) {
    return this.http.get("http://localhost:3000/admin/paid/"+id).map(res => res.json());
  }

  addTechnician(username, email, phone, staffid, title) {
    return this.http.post("http://localhost:3000/admin/addtechnician", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid,
      title: title
    }).map(res => res.json());
  }

  addManager(username, email, phone, staffid) {
    return this.http.post("http://localhost:3000/admin/addmanager", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid
    }).map(res => res.json());
  }

  getTechnicians() {
    return this.http.get("http://localhost:3000/users/technicians").map(res => res.json());
  }

  getManagers() {
    return this.http.get("http://localhost:3000/users/managers").map(res => res.json());
  }

  viewStaff(id, level) {
    if(level == "technician") {
      return this.http.get("http://localhost:3000/users/technician/"+id).map(res => res.json());
    } else if(level == "manager") {
      return this.http.get("http://localhost:3000/users/manager/"+id).map(res => res.json());
    }
  }

}
