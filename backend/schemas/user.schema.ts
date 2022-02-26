import {
    Bson,
  } from "https://deno.land/x/mongo@v0.29.2/mod.ts";
  import Utils from "../utils/utils.ts"

// Defining schema interface
interface UserSchema {
    _id: Bson.ObjectId;
    username: string;
    password: string;
  }
  export default (await Utils.getDatabaseClient()).database("myFirstDatabase").collection<UserSchema>("users");
  
