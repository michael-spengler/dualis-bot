import authMiddleware from "../../../middleware/authMiddleware.ts";
import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { assertSpyCall, Spy } from "https://deno.land/x/mock@0.13.0/mod.ts";
import {
  mockNextFunction,
  mockRequest,
  mockResponse,
} from "https://deno.land/x/opine_unittest_utils@0.2/mod.ts";

Deno.test("Test successfull auth", () => {
  //set env
  Deno.env.set("JWT_SECRET", "supersecret");

  //create mocks
  const req = mockRequest({
    headers: new Headers({
      'auth': 'myJWT'
    })
  });

  const sendMock = mockResponse();
  const res = mockResponse({
    setStatus: () => sendMock
  });
  const next = mockNextFunction(() => {});

  authMiddleware(req, res, next);

  assertSpyCall(next as Spy<any>, 0, { args: undefined });
});

Deno.test("Test invalid jwt", () => {
});
