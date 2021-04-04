import { API } from "./api";

var api = new API();

test("echo", async () => {
  var res = await api.ping("HI2");
  expect(res).toEqual("HI2");
});

test("calibration", async () => {
  jest.setTimeout(30000);

  var res = await api.calibration(0, 18);
  var success = (res == "False") | (res == "True") ? true : false;
  expect(success).toEqual(true);

  jest.setTimeout(5000);
});
