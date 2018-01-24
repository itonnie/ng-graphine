import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketsService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

  sendLocation(pos) {
    this.socket.emit("locationinfo", pos);
  }

  recieveLocation() {
    this.socket.on("loc", (data) => {
      console.log(data);
    });
  }

}
