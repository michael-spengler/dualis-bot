import UserController from '../../../routes/users.ts';
import { IJWTPayload } from '../../../routes/users.ts';
import IUser from "../../../interfaces/user.interface.ts";

import {
    mockRequest,
    mockResponse,
  } from "https://deno.land/x/opine_unittest_utils@0.2/mod.ts";
  import { MockCollection } from "https://deno.land/x/denomongo_unittest_utils@v0.3/mod.ts";
  import { assertSpyCall, Spy } from "https://deno.land/x/mock@0.13.0/mod.ts";
  import { Filter, FindOptions } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

[
    {
        name: "Test successfull get logged in user",
        expectedStatus: 200,
        jwt: "myJWT",
        expectedResp: {
            dualis_password: "",
            dualis_username: "",
            password: "",
            username: "somesecretshit"
        },
        success: true
    },
    {
        name: "Test Something went wrong",
        jwt: "lol",
        expectedStatus: 500,
        expectedResp: {},
        success: false
    },
    {
        name: "Test user not found",
        jwt: "noUser",
        expectedStatus: 404,
        expectedResp: {},
        success: false
    }
].forEach((testcase)=>{
    Deno.test(testcase.name, async ()=>{
        const req = mockRequest({
            headers: new Headers({
                auth: testcase.jwt
            })
        });
    
        const sendMock = mockResponse({});
    
        const res = mockResponse({
          setStatus: () => sendMock,
        });
    
        MockCollection.initMock({
            findOne: async (filter?: Filter<unknown> | undefined, _options?: FindOptions | undefined): Promise<IUser | null> => {
                if(filter?._id?.toString() == "507f1f77bcf86cd799439011") {
                    return {
                        username: "d93757eea53cf23bd810f1d332296912"
                    } as IUser;
                } else {
                    return null;
                }
            }
        });
    
        await UserController.getLoggedInUser(req, res);
    
        if(testcase.success) {
            assertSpyCall(res.json as Spy<any>, 0, { args: [testcase.expectedResp] });
        } else {
            assertSpyCall(res.setStatus as Spy<any>, 0, { args: [ testcase.expectedStatus ]});
            assertSpyCall(sendMock.json as Spy<any>, 0, { });
        }
        
    });
});