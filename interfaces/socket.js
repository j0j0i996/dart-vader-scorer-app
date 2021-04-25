import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Socket {
  constructor() {
    this.connected = false;
  }

  async start_socket() {
    try {
      var address = await AsyncStorage.getItem("@server_address");
    } catch (e) {
      console.log(e);
      var address = "192.168.0.2";
    }

    this.sio = socketIOClient(address);
  }

  send_msg(msg) {
    this.sio.send(msg);
  }
}
