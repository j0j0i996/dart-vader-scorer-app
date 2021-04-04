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
    response = await this.service.get("/echo/" + msg);
    return response.data;
  }

  async calibration(cam_idx, closest_field) {
    response = await this.service.patch(
      "/calibration?cam_idx=" + cam_idx + "&closest_field=" + closest_field
    );
    return response.data;
  }
}
