import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class API {
  constructor() {}

  async get_address() {
    try {
      var address = await AsyncStorage.getItem("@server_address");
    } catch (e) {
      console.log(e);
      var address = "192.168.0.2";
    }
    return address;
  }

  async create_service() {
    var address = await this.get_address();

    let service = axios.create({
      baseURL: address,
    });
    return service;
  }

  async ping(msg) {
    let service = await this.create_service();
    var response = await service.get("/echo/" + msg);
    return response.data;
  }

  async calibration(cam_idx, closest_field) {
    let service = await this.create_service();

    var success = {
      connection: null,
      calibration: null,
    };

    var response = await service
      .patch(
        "/calibration?cam_idx=" + cam_idx + "&closest_field=" + closest_field
      )
      .catch(function (err) {
        console.log(err);
        success.connection = false;
        return success;
      });

    success.connection = true;
    success.calibration = response.data == "True";
    return success;
  }
}
