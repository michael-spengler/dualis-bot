import UserController from '../../../routes/users.ts';
import IUser from "../../../interfaces/user.interface.ts";

import {
    mockRequest,
    mockResponse,
  } from "https://deno.land/x/opine_unittest_utils@0.2/mod.ts";
  import { MockCollection } from "https://deno.land/x/denomongo_unittest_utils@v0.3/mod.ts";
  import { assertSpyCall, Spy } from "https://deno.land/x/mock@0.13.0/mod.ts";
  import { Filter, FindOptions, UpdateOptions, UpdateFilter, Bson } from "https://deno.land/x/mongo@v0.29.2/mod.ts";

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


[
    {
        name: "successfull update",
        expectedStatus: 204,
        body: {
            password: "somesecretshit",
            dualis_password: "somesecretshit",
            dualis_username: "somesecretshit"
        },
        jwt: "myJWT"
    },
    {
        name: "wrong JWT",
        expectedStatus: 400,
        body: {
            password: "somesecretshit",
            dualis_password: "somesecretshit",
            dualis_username: "somesecretshit"
        },
        jwt: "noUser"
    },
    {
        name: "incomplete body",
        expectedStatus: 400,
        body: {
            dualis_password: "somesecretshit",
            dualis_username: "somesecretshit"
        },
        jwt: "myJWT"
    },
    {
        name: "username in body",
        expectedStatus: 400,
        body: {
            username: "IShouldNotbeHere",
            password: "somesecretshit",
            dualis_password: "somesecretshit",
            dualis_username: "somesecretshit"
        },
        jwt: "myJWT"
    },   
    {
        name: "update goes wrong",
        expectedStatus: 400,
        body: {
            password: "somesecretshit",
            dualis_password: "somesecretshit1",
            dualis_username: "somesecretshit"
        },
        jwt: "myJWT"
    }
].forEach((testcase)=>{
    Deno.test(testcase.name, async ()=>{
        const req = mockRequest({
            headers: new Headers({
                auth: testcase.jwt,
            }),
            body: testcase.body
        });
    
        const sendMock = mockResponse({});
    
        const res = mockResponse({
          setStatus: () => sendMock,
        });
    
        MockCollection.initMock({
            findOne: async (filter?: Filter<unknown> | undefined, _options?: FindOptions | undefined): Promise<IUser | null> => {
                if(filter?._id?.toString() == "507f1f77bcf86cd799439011") {
                    return {
                        username: "d93757eea53cf23bd810f1d332296912",
                        active: true
                    } as IUser;
                } else {
                    return null;
                }
            },
            updateOne: async (filter: Filter<unknown>, update: UpdateFilter<unknown>, options?: UpdateOptions | undefined): Promise<{
                upsertedId: Bson.ObjectId;
                upsertedCount: number;
                matchedCount: number;
                modifiedCount: number;
            }> => {
                if(
                    update?.$set?.password == "hashed" && update?.$set?.dualis_password == "d93757eea53cf23bd810f1d332296912"
                        && update?.$set?.dualis_username == "d93757eea53cf23bd810f1d332296912" && update?.$set?.username == "d93757eea53cf23bd810f1d332296912"
                            && update?.$set?.active == true
                ) {
    
                    return {
                        upsertedId: new Bson.ObjectId(),
                        upsertedCount: 1,
                        matchedCount: 1,
                        modifiedCount: 1
                    }
                } else {
                    throw new Error("that did not go as expected")
                }
                
            }
        });
    
        await UserController.updateLoggedInUser(req, res);
    
        assertSpyCall(res.setStatus as Spy<any>, 0, { args: [testcase.expectedStatus] });
        assertSpyCall(sendMock.json as Spy<any>, 0, { });
    });
})