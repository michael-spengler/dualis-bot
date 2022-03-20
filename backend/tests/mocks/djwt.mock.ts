import { IJWTPayload } from '../../routes/users.ts';
import {
    spy,
  } from "https://deno.land/x/mock@0.13.0/mod.ts";

export const verify = spy(function(jwt: string, secret: string, algo: string){
  if(jwt == "wrongJWT") {
    throw new Error("You provided a wrong jwt");
  } else {
    return true;
  }
});

export const create = function(...args: any[]) {
  return "myJWT"
}

export const decode = function(token: string): any[] {
  if(token == "myJWT") {
    return [ {}, {
      userId: "507f1f77bcf86cd799439011"
    }] as any[]
  } else if(token == "noUser") {
    return [ {}, {
      userId: "507f1f77bcf86cd799439012"
    }] as any[]
  }

  return [{}, null]
}