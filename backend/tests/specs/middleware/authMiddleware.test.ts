import authMiddleware from "../../../middleware/authMiddleware.ts";
import {
  assertSpyCall,
  mockNextFunction,
  mockRequest,
  mockResponse,
  Spy,
} from "../../test_deps.ts";

Deno.test("Test successfull auth", async () => {
  //set env
  Deno.env.set("JWT_SECRET", "supersecret");

  //create mocks
  const req = mockRequest({
    headers: new Headers({
      "auth": "myJWT",
    }),
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
      "auth": "wrongJWT",
    }),
  });

  const sendMock = mockResponse();
  const res = mockResponse({
    setStatus: () => sendMock,
  });
  const next = mockNextFunction(() => {});

  await authMiddleware(req, res, next);

  assertSpyCall(res.setStatus as Spy<any>, 0, { args: [401] });
  assertSpyCall(sendMock.send as Spy<any>, 0, {});
});
