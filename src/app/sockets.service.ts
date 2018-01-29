import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketsService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

}
