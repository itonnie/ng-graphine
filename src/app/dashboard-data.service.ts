import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Injectable()
export class DashboardDataService {
  
  //set username to use for the application
  private usernameSource = new BehaviorSubject<String>("");
  username = this.usernameSource.asObservable();

  //Set access level as an observable string as observable strings
  private access_level = new BehaviorSubject<String>("");
  accesslevel = this.access_level.asObservable();

  //set token as an observable string for impoved security measures
  private tokenSource = new BehaviorSubject<String>("");
  token = this.tokenSource.asObservable();

  private generate_report = new BehaviorSubject<Boolean>(false);
  generatereport = this.generate_report.asObservable();
  private quote_order = new BehaviorSubject<Boolean>(false);
  quoteorder = this.quote_order.asObservable();
  private add_technician = new BehaviorSubject<Boolean>(false);
  addtechnician = this.add_technician.asObservable();
  private remove_technician = new BehaviorSubject<Boolean>(false);
  removetechnician = this.remove_technician.asObservable();
  private edit_technician = new BehaviorSubject<Boolean>(false);
  edittechnician = this.edit_technician.asObservable();
  private delete_order = new BehaviorSubject<Boolean>(false);
  deleteorder = this.delete_order.asObservable();
  private cancel_order = new BehaviorSubject<Boolean>(false);
  cancelorder = this.cancel_order.asObservable();
  private view_clients = new BehaviorSubject<Boolean>(false);
  viewclients = this.view_clients.asObservable();
  private generate_client_info = new BehaviorSubject<Boolean>(false);
  generateclientinfo = this.generate_client_info.asObservable();
  private approve_order = new BehaviorSubject<Boolean>(false);
  approveorder = this.approve_order.asObservable();
  private complete_order = new BehaviorSubject<Boolean>(false);
  completeorder = this.complete_order.asObservable();
  private email_client = new BehaviorSubject<Boolean>(false);
  emailclient = this.email_client.asObservable();

  constructor() {

  }

  //set username
  setUsername(username: String) {
    this.usernameSource.next(username);
  }

  //set the access level
  setAccessLevel(accesslevel: String) {
    this.access_level.next(accesslevel);
  }

  //--ACCOUNT EXPERTS PERMISSIONS--//
  setPermission(permission, value) {
    switch(permission) {
      case 'add_technician':
        this.add_technician.next(value);
      break;
      case 'generate_report':
        this.generate_report.next(value);
      break;
      case 'quote_order':
        this.quote_order.next(value);
      break;
      case 'remove_technician':
        this.remove_technician.next(value);
      break;
      case 'edit_technician':
        this.edit_technician.next(value);
      break;
      case 'delete_order':
        this.delete_order.next(value);
      break;
      case 'cancel_order':
        this.cancel_order.next(value);
      break;
      case 'view_clients':
        this.view_clients.next(value);
      break;
      case 'generate_client_info':
        this.generate_client_info.next(value);
      break;
      case 'approve_order':
        this.approve_order.next(value);
      break;
      case 'complete_order':
        this.complete_order.next(value);
      break;
      case 'email_client':
        this.email_client.next(value);
      break;
    }
  }

}
