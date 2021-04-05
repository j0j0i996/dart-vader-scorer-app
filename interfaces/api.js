import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";
import axios from "axios";

export class API {
  constructor() {
    let service = axios.create({
      baseURL: SERVER_URL,
    });
    this.service = service;
  }

  async ping(msg) {
    var response = await this.service.get("/echo/" + msg);
    return response.data;
  }

  async calibration(cam_idx, closest_field) {
    var success = {
      connection: null,
      calibration: null,
    };

    var response = await this.service
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
