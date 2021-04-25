import { findServer } from "./findBoardServer";
import { API } from "./api";
import axios from "axios";

test.skip("is_board_manual", async () => {
  var ipBase = "192.168.0.";
  var ip = 100;
  var port = 3000;
  var address = "http://" + ipBase + ip + ":" + port;
  let service = axios.create({
    baseURL: address,
  });
  var address = await service.get("/name", { timeout: 100 }).catch((err) => {
    console.log(err.code);
  });
  expect(address).toEqual("DartBoard");
});

test("findServer", async () => {
  jest.setTimeout(30000);

  var res = await findServer(
    (port = 3000),
    (ipBase = "192.168.0."),
    (timeout = 20)
  );

  console.log(res);

  expect(res.success).toEqual(true);
  expect(res.address).toEqual("http://192.168.0.100:3000");

  jest.setTimeout(5000);
});
