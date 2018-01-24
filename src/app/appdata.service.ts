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
  host: String = "http://localhost:3000";

  constructor(public http: Http) { }

  getCounties() {
    return this.http.get('assets/json/counties.json').map(res => res.json());
  }

  makeAppointment(from, to, county, fullname, town, street, phone, category, sub, subsub) {
    return this.http.post('/addschedule', {
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
    return this.http.post("/auth/login", {
      type: type,
      email: email,
      password: password
    }).map(res => res.json());
  }

  getOrders(type) {
    return this.http.get("/admin/schedules/"+type).map(res => res.json());
  }

  viewOrder(id) {
    return this.http.post("/admin/order", {
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
    return this.http.post("/admin/quote", {
      id: id,
      quotation: quotation
    }).map(res => res.json());
  }

  approveOrder(id: String) {
    return this.http.post("/admin/approve", {
      id: id
    }).map(res => res.json());
  }

  completeOrder(id: String) {
    return this.http.get("/admin/paid/"+id).map(res => res.json());
  }

  addTechnician(username, email, phone, staffid, title) {
    return this.http.post("/admin/addtechnician", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid,
      title: title
    }).map(res => res.json());
  }

  addManager(username, email, phone, staffid) {
    return this.http.post("/admin/addmanager", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid
    }).map(res => res.json());
  }

  getTechnicians() {
    return this.http.get("/users/technicians").map(res => res.json());
  }

  getManagers() {
    return this.http.get("/users/managers").map(res => res.json());
  }

  viewStaff(id, level) {
    if(level == "technician") {
      return this.http.get("/users/technician/"+id).map(res => res.json());
    } else if(level == "manager") {
      return this.http.get("/users/manager/"+id).map(res => res.json());
    }
  }

}
