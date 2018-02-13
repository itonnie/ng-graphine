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

  host: String = "";

  constructor(public http: Http) { }

  getCounties() {
    return this.http.get('assets/json/counties.json').map(res => res.json());
  }

  makeAppointment(time, date, county, fullname, town, street, phone, category, sub, subsub, desc, email, warranty) {
    return this.http.post(this.host+'/addschedule', {
      time: time,
      date: date,
      county: county,
      category: category,
      fullname: fullname,
      town: town,
      street: street,
      phone: phone,
      sub: sub,
      subsub: subsub,
      desc: desc,
      email: email,
      warranty: warranty
    }).map(res => res.json());
  }

  login(type: String, email: String, password: String) {
    return this.http.post(this.host+"/auth/login", {
      type: type,
      email: email,
      password: password
    }).map(res => res.json());
  }

  getOrders(type) {
    return this.http.get(this.host+"/admin/schedules/"+type).map(res => res.json());
  }

  viewOrder(id) {
    return this.http.post(this.host+"/admin/order", {
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
    return this.http.post(this.host+"/admin/quote", {
      id: id,
      quotation: quotation
    }).map(res => res.json());
  }

  approveOrder(id: String) {
    return this.http.post(this.host+"/admin/approve", {
      id: id
    }).map(res => res.json());
  }

  completeOrder(id: String) {
    return this.http.get(this.host+"/admin/paid/"+id).map(res => res.json());
  }

  cancelOrder(id: String) {
    return this.http.get(this.host+"/admin/cancel/"+id).map(res => res.json());
  }

  addTechnician(username, email, phone, staffid, title) {
    return this.http.post(this.host+"/admin/addtechnician", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid,
      title: title
    }).map(res => res.json());
  }

  addManager(username, email, phone, staffid) {
    return this.http.post(this.host+"/admin/addmanager", {
      username: username,
      phone: phone,
      email: email,
      staff_id: staffid
    }).map(res => res.json());
  }

  getTechnicians() {
    return this.http.get(this.host+"/users/technicians").map(res => res.json());
  }

  getManagers() {
    return this.http.get(this.host+"/users/managers").map(res => res.json());
  }

  viewStaff(id, level) {
    if(level == "technician") {
      return this.http.get(this.host+"/users/technician/"+id).map(res => res.json());
    } else if(level == "manager") {
      return this.http.get(this.host+"/users/manager/"+id).map(res => res.json());
    }
  }

  saveUserInfo(acrcy, altde, altdeAcc, hdn, lat, lon, sp) {
    return this.http.post(this.host+"/updateinfo", {
      accuracy: acrcy,
      altitude: altde,
      altitudeAccuracy: altdeAcc,
      heading: hdn,
      latitude: lat,
      longitude: lon,
      speed: sp
    }).map(res => res.json());
  }

  feedback(name, email, message) {
    return this.http.post(this.host+"/feedback", {
      name: name,
      email: email,
      message: message
    }).map(res => res.json());
  }

  getFeedback() {
    return this.http.get("/feedback").map(res => res.json());
  }

  comment(username, id, comment) {
    return this.http.post(this.host+"/admin/comment", {
      id: id,
      username: username,
      comment: comment
    }).map(res => res.json());
  }

  updateTechPermissions(data) {
    return this.http.post(this.host+"/admin/technician_permissions", {
      id: data.id,
      g_r: data.gr,
      q_o: data.qo,
      a_t: data.at,
      r_t: data.rt,
      e_t: data.et,
      d_o: data.do,
      c_o: data.co,
      v_c: data.vc,
      g_c_i: data.gci,
      a_o: data.ao,
      com_o: data.como,
      e_c: data.ec
    }).map(res => res.json());
  }

  changepassword(username, current, newp) {
    return this.http.post(this.host+"/admin/changepassword", {
      username: username,
      current: current,
      newpassword: newp
    }).map(res => res.json());
  }

  dispatchTechnician(id, username) {
    return this.http.post(this.host+"/admin/dispach_expert", {
      id: id,
      techname: username
    });
  }

}
