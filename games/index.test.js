import { waitThrow } from "./index";

test("api response", async () => {
  var response = await waitThrow();
  expect(response).toEqual({
    score: false,
    multiplier: false,
    nextPlayer: true,
  });
});
