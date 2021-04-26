import socketIOClient from "socket.io-client";
import { API } from "./api";
import axios from "axios";

export async function findServer(port, ipBase, timeout) {
  success = false;
  var i = 0;
  var address, name;
  while (success == false && i <= 255) {
    address = "http://" + ipBase + i + ":" + port;
    let service = axios.create({
      baseURL: address,
    });
    await service
      .get("/name", { timeout: timeout })
      .catch((err) => {
        console.log(address + " fail");
      })
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data == "DartBoard") {
            console.log(address + " success");
            success = true;
            name = "DartBoard";
          }
        }
      });
    i++;
  }
  return {
    success: success,
    address: address,
    name: name,
  };
}
