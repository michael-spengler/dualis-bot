import authMiddleware from "../../../middleware/authMiddleware.ts";

import { mockResponse, mockRequest, mockNextFunction } from "https://deno.land/x/opine_unittest_utils@0.2/mod.ts";

Deno.test("Test successfull auth", ()=>{
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNextFunction();

    
});

Deno.test("Test invalid jwt", ()=>{

});
