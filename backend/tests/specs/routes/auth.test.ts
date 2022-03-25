import AuthController from "../../../routes/auth.ts";
import IUser from "../../../interfaces/user.interface.ts";

import {
  assertSpyCall,
  Filter,
  FindOptions,
  InsertDocument,
  InsertOptions,
  MockCollection,
  mockRequest,
  mockResponse,
  Spy,
} from "../../test_deps.ts";

[
  {
    name: "Test successfull login",
    username: "somesecretshit",
    password: "password",
    success: true,
  },
  {
    name: "Test wrong password",
    username: "somesecretshit",
    password: "notpassword",
    success: false,
  },
  {
    name: "Test user not exists",
    username: "IDoNotExist",
    password: "password",
    success: false,
  },
].forEach((testcase) => {
  Deno.test(testcase.name, async () => {
    Deno.env.set("AES_SECRET", "thisissomesupersecretshithideit!");

    const req = mockRequest({
      body: {
        username: testcase.username,
        password: testcase.password,
      },
    });

    const sendMock = mockResponse({});

    const res = mockResponse({
      setStatus: () => sendMock,
    });

    MockCollection.initMock({
      findOne: (
        filter?: Filter<unknown> | undefined,
        _options?: FindOptions | undefined,
      ): Promise<IUser | null> => {
        return new Promise((resolve, _reject) => {
          if (filter?.username == "d93757eea53cf23bd810f1d332296912") {
            resolve({
              password: "password",
            } as IUser);
          } else {
            resolve(null);
          }
        });
      },
    });

    await AuthController.loginUser(req, res);

    if (testcase.success) {
      assertSpyCall(res.json as Spy<any>, 0, { args: [{ "jwt": "myJWT" }] });
    } else {
      assertSpyCall(res.setStatus as Spy<any>, 0, { args: [401] });
      assertSpyCall(sendMock.send as Spy<any>, 0, {});
    }
  });
});

[
  {
    name: "Test Successfull register",
    body: {
      username: "username",
      password: "password",
      dualis_username: "dualisusername",
      dualis_password: "dualispassword",
      active: true,
    },
    success: true,
  },
  {
    name: "Test register invalid",
    body: {
      password: "password",
      dualis_username: "dualisusername",
      dualis_password: "dualispassword",
      active: true,
    },
    success: false,
  },
  {
    name: "Test register user exists",
    body: {
      username: "somesecretshit",
      password: "password",
      dualis_username: "dualisusername",
      dualis_password: "dualispassword",
      active: true,
    },
    success: false,
  },
  {
    name: "Test something is weird",
    body: {
      username: "usernameerr",
      password: "password",
      dualis_username: "dualisusername",
      dualis_password: "dualispassword",
      active: true,
    },
    success: false,
  },
].forEach((testcase) => {
  Deno.test(testcase.name, async () => {
    Deno.env.set("CRAWLER_URL", "http://testhost:8080");

    const req = mockRequest({
      body: testcase.body,
    });

    const sendMock = mockResponse({});

    const res = mockResponse({
      setStatus: () => sendMock,
    });

    MockCollection.initMock({
      findOne: (
        filter?: Filter<unknown> | undefined,
        _options?: FindOptions | undefined,
      ): Promise<IUser | null> => {
        return new Promise((resolve, reject) => {
          if (filter?.username == "d93757eea53cf23bd810f1d332296912") {
            resolve({
              password: "password",
            } as IUser);
          } else if (filter?.username == "0706bd2685dfd8348fa7bae64444d7b7") {
            reject("Somthing went wrong");
          } else {
            resolve(null);
          }
        });
      },
      insertOne: async (
        doc: InsertDocument<any>,
        options?: InsertOptions | undefined,
      ): Promise<any> => {
        return true;
      },
    });

    await AuthController.registerUser(req, res);

    if (testcase.success) {
      assertSpyCall(res.setStatus as Spy<any>, 0, { args: [201] });
      assertSpyCall(sendMock.send as Spy<any>, 0, {});
    } else {
      assertSpyCall(res.setStatus as Spy<any>, 0, { args: [400] });
      assertSpyCall(sendMock.json as Spy<any>, 0, {});
    }
  });
});
