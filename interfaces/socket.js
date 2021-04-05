import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

export class Socket {
  constructor() {
    this.connected = false;
    this.sio = socketIOClient(SERVER_URL);
  }

  send_msg(msg) {
    this.sio.send(msg);
  }
}
