import socketIOClient from 'socket.io-client'
import React, { useState, useEffect } from "react";

const SOCKET_SERVER_URL = "http://192.168.0.100:3000"

export class Socket {

  constructor() {
    this.connected = false
    this.sio = socketIOClient(SOCKET_SERVER_URL);

    this.sio.on('connect', () => {
      console.log('Inside')
    })
  }

  send_msg(msg) {
    this.sio.send(msg)
  }
}