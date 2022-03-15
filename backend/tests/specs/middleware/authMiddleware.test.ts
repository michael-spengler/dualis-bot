import authMiddleware from "../../../middleware/authMiddleware.ts";
import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { assertSpyCall, Spy } from "https://deno.land/x/mock@0.13.0/mod.ts";
import {
  mockNextFunction,
  mockRequest,
  mockResponse,
} from "https://deno.land/x/opine_unittest_utils@0.2/mod.ts";

Deno.test("Test successfull auth", async () => {
  //set env
  Deno.env.set("JWT_SECRET", "supersecret");

  //create mocks
  const req = mockRequest({
    headers: new Headers({
      'auth': 'myJWT'
    })
  });

  const res = mockResponse({});
  const next = mockNextFunction(() => {});

  await authMiddleware(req, res, next);

  assertSpyCall(next as Spy<any>, 0, {});
});

Deno.test("Test invalid jwt", async () => {
  //set env
  Deno.env.set("JWT_SECRET", "supersecret");

  //create mocks
  const req = mockRequest({
    headers: new Headers({
      'auth': 'wrongJWT'
    })
  });

  const sendMock = mockResponse();
  const res = mockResponse({
    setStatus: () => sendMock
  });
  const next = mockNextFunction(() => {});

  await authMiddleware(req, res, next);

  assertSpyCall(res.setStatus as Spy<any>, 0, { args: [ 401 ] });
  assertSpyCall(sendMock.send as Spy<any>, 0, { });
});
