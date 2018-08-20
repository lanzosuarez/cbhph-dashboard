import { API_URL, SOCKET_EVENTS } from "./globals";

import * as io from "socket.io-client";

class AppSocket {
  socket;

  constructor() {
    let URL = API_URL.replace("/api/v1", "");
    this.socket = io(URL, {
      transports: ["websocket"]
    });
  }

  forceJoin() {
    this.emitEvent(SOCKET_EVENTS.CONNECT);
  }

  subscribeToEvent(event, cb) {
    this.socket.on(event, data => {
      cb(data);
    });
  }

  emitEvent(event) {
    this.socket.emit(event);
  }
}

export default new AppSocket();
