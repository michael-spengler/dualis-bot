import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import {IUser} from "../schemas/user.schema.ts"
import User from "../schemas/user.schema.ts"
import {
    Bson,
  } from "https://deno.land/x/mongo@v0.29.2/mod.ts";



const router = Router();

router.get("/users", async (_req, res) => {
    try {
        //TODO remove password from result
        let users = await User.find({username: { '$ne': 'null'}}).toArray()
        res.json(users)
    } catch (e) {
        res.json(e)
    }
})

router.get("/user/:id(*)", async (req, res) => {
    console.log(req.params[0])
    try {
        //TODO remove password from result
        let users = await User.find({_id: new Bson.ObjectId(req.params[0])}).toArray()
        res.json(users)
    } catch (e) {
        res.json(e)
    }
})



export default router;